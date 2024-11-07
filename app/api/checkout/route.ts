import { createOrder } from "@/actions/order";
import { CartProduct } from "@/components/cart/cart-provider";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

//POST request that initiate a Stripe checkout session for processing payments
export async function POST (req: Request){
    const { cartItems } = await req.json();

    if(!cartItems || cartItems.length === 0){
        return new NextResponse("Product ids required", { status: 400 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []; 

    cartItems.forEach((product: CartProduct) => {
        line_items.push({
            quantity: product.quantity,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: product.name
                },
                unit_amount: Number(product.price) * 100
            }

        })
    });

    const order = await createOrder(cartItems);

    //creating Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: { enabled: false },
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/products?cancelled=1`,
        metadata: {
            orderId: order![0].orderId
        }
    });

    return NextResponse.json({ url: session.url })
}