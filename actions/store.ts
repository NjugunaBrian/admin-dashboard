"use server";

import db from "@/db/drizzle";
import { StoreTable } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateStoreProps = {
    name: string,
    description: string,
    userId: string
}

//GET ALL STORES
export const getAllStores = async() => {
    try{
        const allStores = await db.select().from(StoreTable)
        return {
            data: allStores,
            error: null
        }
    } catch {
        return {
            data: null,
            error: 'Something went wrong!'
        }

    }
}

//CREATE NEW STORE
export const createStore = async (input: CreateStoreProps) => {
    try {
        const newStore = await db.insert(StoreTable).values({
            name: input.name,
            description: input.description,
            userId: input.userId,
            slug: slugify(input.name)
        })
        .returning({
            id: StoreTable.storeId,
            name: StoreTable.name
        })
        .then((res) => res[0])

        revalidatePath('/app/(admin)/admin/stores')

        return {
            data: newStore,
            error: null
        }
    } catch{
        return {
            data: null,
            err: 'Something went wrong!'
        }

    }

};

//GET SINGLE STORE
export const getSingleStore = async (storeId: string) => {
    try {
        const store = await db.query.StoreTable.findFirst({
            where: eq(StoreTable.storeId, storeId)
        });

        if(!store){
            throw new Error("Store not found.")
        }
        return store;
    } catch (error) {
        console.error(error);

    }
}

//GET FEATURED STORES 
export const getFeaturedStores = async() => {
    try{ 
        const stores = await db.select().from(StoreTable).limit(5)
        return stores

    } catch (err){
        console.error(err);
    }
}

//GET SINGLE STORE WITH PRODUCTS
export const getSingleStoreProducts = async(storeId: string) => {
    try{
        const store = await db.query.StoreTable.findFirst({
            where: eq(StoreTable.storeId, storeId),
            with: {
                products: true
            }
        });

        if(!store){
            throw new Error("Store not found.")
        }
        return store;

    } catch(err){
        console.error(err)
    }
}

//DELETE STORE
export const deleteStore = async(storeId: string) => {
    try{
      await db.delete(StoreTable).where(eq(StoreTable.storeId, storeId))
      return "Store deleted successfully"
      
    } catch(err){
        console.error(err);
    }
}