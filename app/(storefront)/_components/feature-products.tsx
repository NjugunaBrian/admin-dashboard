import { getFeaturedProducts } from "@/actions/product";
import FeatureContent from "./feature-content";
import ProductCard from "@/components/elements/product-card";


const FeatureProducts = async() => {
    const products = await getFeaturedProducts();

    return (
        <FeatureContent title='Feature Products' subtitle='Explore our feature products' href='/products' linkName='View Products'>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-2" >
                {products?.map((product) => (
                    <ProductCard key={product.productId} {...product} />
                ))}
            </div>       
        </FeatureContent>
    )

}

export default FeatureProducts