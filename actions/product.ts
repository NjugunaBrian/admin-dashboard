"use server";

import db from "@/db/drizzle";
import { ProductTable } from "@/db/schema";
import { ProductForm } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//CREATE SINGLE PRODUCT
export const createProduct = async (productData: ProductForm) => {

    try{
        const product = await db.insert(ProductTable).values(productData)
        .returning({ name: ProductTable.name})
        .then((res) => res[0])

        revalidatePath('/admin/stores');
        return product;

    } catch (err) {
        console.error(err);
    }

}

//CREATE OR UPDATE PRODUCT
export const createOrUpdateProduct = async(productData: ProductForm) => {
    try{
        let product;

        if(!productData.productId || productData.productId === undefined){
            product = await createProduct(productData)
        } else {
            product = await updateProduct(productData)
        }

        revalidatePath('/admin/stores');
        return product;

    } catch(err){
        console.error(err);
    }
}

//GET PRODUCTS
export const getProducts = async () => {
    try{
        const products = await db.query.ProductTable.findMany();

        return products;

    } catch (err){
        console.error(err)
    }
}

//GET SINGLE PRODUCT
export const getSingleProduct = async (productId: string) => {
    try{
        const singleProduct = await db.query.ProductTable.findFirst({
            where: eq(ProductTable.productId, productId)
        });
        return singleProduct;

    } catch (err){
        console.error(err);
    }
}

//GET STORE PRODUCTS
export const getStoreProducts = async(storeId: string) => {
    try {
        const storeProducts = await db.query.ProductTable.findMany({
            where: eq(ProductTable.storeId, storeId)
        });
        return storeProducts

    } catch (err) {
        console.error(err)
    }
}

//GET FEATURED PRODUCTS
export const getFeaturedProducts = async() => {
    try{
        const products = await db.select().from(ProductTable).limit(5)
        return products

    } catch (err){
        console.error(err);
    }
}

//UPDATE SINGLE PRODUCT
export const updateProduct = async (productData: ProductForm) => {
    const productId  = productData.productId!;

    try{
        const product = await db.update(ProductTable).set(productData)
            .where(eq(ProductTable.productId, productId))
            .returning({ name: ProductTable.name}).then((res) => res[0])
        revalidatePath('/admin/stores');
        return product
            
    } catch (err){
        console.error(err);
    }
}

//DELETE SINGLE PRODUCT
export const deleteProduct = async(productId: string) => {
    try{
        const deletedProduct = await db.delete(ProductTable).where(eq(ProductTable.productId, productId))

        revalidatePath('/admin/stores/[storeId]', 'page')
        return "Deleted successfully"

    } catch (err){
        console.error(err);
    }
}