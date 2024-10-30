"use server";

import db from "@/db/drizzle";

//GET ORDERS

export const getOrders = async() => {
    try {
        const orders = await db.query.OrderTable.findMany({
            with: {
                orderItems: {
                    with: {
                        product: true
                    },
                },
                
                store: true
            }
        })

        return orders

    } catch (err){
        console.error(err)
    }
}