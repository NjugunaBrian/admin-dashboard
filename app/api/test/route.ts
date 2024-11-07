
import db from "@/db/drizzle";
import { ProductTable } from "@/db/schema";
import { inArray } from "drizzle-orm";
import Stripe from "stripe";
import { NextResponse } from "next/server";



export async function POST(req: Request){
    const { productIds } = await req.json();

    const products = await db.query.ProductTable.findMany({
        where: inArray(ProductTable.productId, productIds)
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name
                },
                unit_amount: Number(product.price) * 100,
            }    
        })
    });

    //const order = createOrder();

   return NextResponse.json(line_items);
}