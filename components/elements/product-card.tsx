"use client";


import { Product } from "@/db/schema"
import Link from "next/link";
import Image from "next/image";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { formatCurrency } from "@/lib/utils";


const ProductCard = (product: Product) => {

    const filledStars = Math.floor(product.rating);
    const emptyStars = 5 - filledStars

    return  (
        <div>
            <Link href={`/products/${product.productId}`}>
            <div className='w-full h-48'>
                <Image 
                   src={product.images![0]}
                   height={100}
                   width={100}
                   objectFit='cover'
                   className="object-cover w-full h-full rounded-lg"
                   alt='product image'
                />

            </div>
            </Link>
            <div>
                <Link href={`/product/${product.productId}`} className='flex flex-col items-center'>
                <h1 className='text-muted-foreground'>{product.name}</h1>
                <div className='flex'>
                    {Array(filledStars).fill([]).map((_, index) => (
                        <StarFilledIcon key={index} />
                    ))}
                    {Array(emptyStars).fill([]).map((_, index) => (
                        <StarIcon key={index + filledStars} />
                    ))}

                </div>
                <p>{formatCurrency(Number(product.price))}</p>
                </Link>

            </div>
        </div>
    )

}

export default ProductCard