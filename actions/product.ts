"use server";

import db from "@/db/drizzle";
import { ProductTable } from "@/db/schema";
import { ProductForm, SearchParams } from "@/lib/types";
import { searchParamsSchema } from "@/lib/validators";
import { eq, and, gte, lte, asc, desc } from "drizzle-orm";
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
export const getProducts = async (searchParams: SearchParams) => {
    try{
        const search =  searchParamsSchema.parse(searchParams);
        const category = search.category?.split(".").toString() ?? null
        const subCategory = search.subCategory?.split(".").toString() ?? null
        const priceFrom = search.priceFrom?.split(".").toString() ?? null
        const priceTo = search.priceTo?.split(".").toString() ?? null
        const order = search.order?.split(".").toString() ?? "desc"
        const orderBy = search.orderBy?.split(".").toString() ?? "createdAt"
        const products = await db.select().from(ProductTable)
            .where(and(category ? eq(ProductTable.category, category) : undefined,
                subCategory ? eq(ProductTable.subcategory, subCategory) : undefined,
                priceFrom ? gte(ProductTable.price, priceFrom) : undefined,
                priceTo ? lte(ProductTable.price, priceTo) : undefined
            ))
            .orderBy(
                orderBy === "price" ?  order === "asc" ? asc(ProductTable.price) : desc(ProductTable.price)
                : order === "asc" ? asc(ProductTable.createdAt) : desc(ProductTable.createdAt)
            )

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
        const products = await db.select().from(ProductTable).limit(6)
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