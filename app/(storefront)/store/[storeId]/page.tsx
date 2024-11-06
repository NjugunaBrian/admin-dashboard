"use client";

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ContentShell from "@/components/shells/content-shell"
import { Product, Store } from "@/db/schema"
import ProductsDisplay from "../../_components/products-display"
import { toast } from "sonner"
import { getSingleStoreProducts } from "@/actions/store"


interface StoreProductsProps extends Store {
    products: Product[]
}

const StoreProducts = () => {

    const [storeData, setStoreData] = useState<StoreProductsProps | null>(null);
    const { storeId }  = useParams();

    const fetchStoreData = async() => {
        try{
            const data = await getSingleStoreProducts(storeId as string)
            setStoreData(data!);

        } catch {
            toast.error("Failed to fetch store data.");
        } 
    }
     
    useEffect(() => {
        fetchStoreData()
    })

    return (
        
        storeData && 
        <ContentShell title={storeData.name} subtitle={storeData.description!}>
            <ProductsDisplay products={storeData.products} />

        </ContentShell>

    )

}

export default StoreProducts