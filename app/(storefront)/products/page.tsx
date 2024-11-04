import { getProducts } from "@/actions/product"
import ProductsDisplay from "../_components/products-display"


const Products = async() => {

    const products = await getProducts()

    return (
        <ProductsDisplay products={products!} />
    )
}

export default Products