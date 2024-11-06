"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { type Product } from "@/db/schema"

import { useCart } from "@/components/cart/cart-provider";
import ContentShell from "@/components/shells/content-shell";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { getSingleProduct } from "@/actions/product";

export interface CartProduct extends Product {
    quantity: number
}

const Product = () => {

    const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const { productId}  = useParams();
    const [productData, setProductData] = useState<Product | null>(null);

    const getCategories = async() => {
        const data = await getSingleProduct(productId as string);
        setProductData(data!)
    }

    useEffect(() => {
        getCategories();
    })

    const quantity = getItemQuantity(productData?.productId as string);
    
    const ratingElements = Array.from({ length: productData?.rating as number }, (_, index) => (
        <StarFilledIcon key={index}/>
    ))

    return (
        productData && 
        <ContentShell title={productData.name}>
            <div className='md:flex lg:flex gap-12'>
                <div className='max-w-2xl w-full lg:m-0 mb-8'>
                    <Image
                       src={productData.images![0]} 
                       height={500}
                       width={500}
                       alt=""
                       className="w-full h-full object-cover"
                    />

                </div>
                <div className="w-full h-full flex flex-col gap-6">
                    <div>
                        <h1 className="text-5xl font-bold">{productData.name}</h1>
                    </div>
                    <div>
                        <p className="text-lg text-muted-foreground">{productData.description}</p>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{`KSh ${productData.price}`}</h1>
                        <div className="text-yellow-300 flex items-center gap-1">{ratingElements}</div>
                        <div className="text-muted-foreground">
                            {productData.inventory > 0 ? <p>(in stock)</p> : <p>(out of stock)</p>}
                        </div>
                    </div>
                    <div>
                        {quantity > 0 ? 
                            <div className="flex items-center gap-2">
                                <Button size={'icon'} variant={'outline'} onClick={() => decreaseQuantity(productData.productId)}>
                                    <MinusIcon />
                                </Button>
                                <div>{quantity}</div>
                                <Button size={'icon'} variant={'outline'} onClick={() => increaseQuantity(productData.productId)}>
                                    <PlusIcon />
                                </Button>
                            </div>
                            : 
                            <Button size={'sm'} className="w-full" onClick={() => addToCart(productData as CartProduct)}>
                                Add to Cart
                            </Button>
                            
                        }
                    </div>

                </div>
            </div>

        </ContentShell>
    )

}

export default Product