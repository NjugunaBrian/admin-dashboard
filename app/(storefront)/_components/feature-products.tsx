import { getFeaturedProducts } from "@/actions/product";
import FeatureContent from "./feature-content";
import ProductsDisplay from "./products-display";


const FeatureProducts = async() => {
    const products = await getFeaturedProducts();

    return (
        <FeatureContent title='Feature Products' subtitle='Explore our feature products' href='/products' linkName='View Products'>
            <ProductsDisplay products={products!} />       
        </FeatureContent>
    )

}

export default FeatureProducts