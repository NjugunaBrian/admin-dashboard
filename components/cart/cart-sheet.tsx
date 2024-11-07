"use client";
import React, { useEffect } from "react"
import Image from "next/image";
import axios from "axios";
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { CartProduct, useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


const CartSheet = () => {

    const { cartQuantity, cartItems } = useCart();
    const  searchParams = useSearchParams();

    useEffect(() => {
        if(searchParams.get("success")){
            toast.success("Payment completed.")
        }
        if(searchParams.get("cancelled")){
            toast.error("Something went wrong!")
        }
    }, [searchParams])

    const checkout = async () => {
        const response = await axios.post('/api/checkout', {
            cartItems: cartItems
        })

        window.location = response.data.url;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button size='icon' variant='ghost' className='relative'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {cartQuantity > 0 && <span className="absolute rounded-full bg-red-600 h-5 w-5 bottom-[-.5rem] right-[-.5rem] text-sm text-[#fff] flex items-center justify-center">
                        {JSON.stringify(cartQuantity)}
                        </span>}
                </div>
                    
                </Button>
            </SheetTrigger>
            <SheetContent /*className='flex flex-col w-full pr-0 sm:max-w-lg'*/>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                        {cartItems && cartItems.length > 0 ? 
                        cartItems.map((item) => (
                            <CartItems key={item.productId} item={item} />
                        ))
                        : null}
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button className="rounded-full w-full" size={'lg'} disabled={cartItems.length < 0} onClick={checkout}>
                        Checkout
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )

}

export default CartSheet

const CartItems = ({item}: {item: CartProduct}) => {

    const { decreaseQuantity, increaseQuantity } = useCart();

    return (
        <div>
            <div>
                <Image 
                   src={item.images![0]}
                   height={100}
                   width={100}
                   alt=""
                />
            </div>
            <div>
                <p>{item.name}</p>
                <p>{formatCurrency(Number(item.price))}</p>
                <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Button size={'icon'} variant={'outline'} onClick={() => decreaseQuantity(item.productId)}>
                        <MinusIcon />
                    </Button>
                    <div>{item.quantity}</div>
                    <Button size={'icon'} variant={'outline'} onClick={() => increaseQuantity(item.productId)}>
                        <PlusIcon />
                    </Button>
                </div>
                <div>
                    <p>Total</p>
                    <p className="text-primary font-bold">
                        {formatCurrency(item.quantity * Number(item.price))}
                    </p>
                </div>
                </div>
            </div>
        </div>
    )

}