"use server";

import { CartProduct } from "@/components/cart/cart-provider";
import db from "@/db/drizzle";
import { OrderTable } from "@/db/schema";

//GET ORDERS
export const getOrders = async() => {
    try {
        const orders = await db.select().from(OrderTable)

        return orders

    } catch (err){
        console.error(err)
    }
}

//CREATE ORDER
export const createOrder = async(cartItems: CartProduct[]) => {
    try {

        const data = await db.insert(OrderTable).values({ isPaid: true, products: cartItems }).returning();

        return data;

    } catch (err){
        console.error(err)
    }
}