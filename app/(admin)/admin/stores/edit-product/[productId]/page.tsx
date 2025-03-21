"use client";

import React, { useEffect, useState } from "react"
import ContentShell from "@/components/shells/content-shell";
import { Product } from "@/db/schema";
import ProductForm from "@/components/forms/product-form";
import { getSingleProduct } from "@/actions/product";
import { usePathname } from "next/navigation";

const EditProduct = () => {

    const [productData, setProductData] = useState<Product | null>(null);
    const pathname = usePathname();
    const productId = pathname.split('/').slice(-1)[0];

    const fetchProduct = async() => {
        const data = await getSingleProduct(productId as string)
        setProductData(data!)
    }

    useEffect(() => {
        fetchProduct();
    })

    return (
        <ContentShell title="Edit Product" subtitle="Add or edit details to your product">
            {productData && <ProductForm storeId={productData.storeId} productData={productData} />}
        </ContentShell>
    )

}

export default EditProduct