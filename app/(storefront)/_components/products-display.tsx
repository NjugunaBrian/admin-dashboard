import React from "react";
import ProductCard from "@/components/elements/product-card"
import { Product } from "@/db/schema"


const ProductsDisplay = ({ products }: { products: Product[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {products?.map((product) => (
                <ProductCard key={product.productId} {...product} />
            ))}
        </div>

    )

}

export default ProductsDisplay