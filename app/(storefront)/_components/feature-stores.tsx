import { getFeaturedStores } from "@/actions/store"
import FeatureContent from "./feature-content";
import StoreCard from "@/components/elements/store-card";


const FeatureStores = async () => {
    const stores  = await getFeaturedStores();

    return (
        <FeatureContent title='Feature Stores' subtitle='Explore stores we think you might love' href='/products' linkName='View Products'>
            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                {stores?.map((store) => (
                    <StoreCard
                       key={store.storeId}
                       name={store.name}
                       description={store.description!}
                       className='h-48'
                    />
                ))}
            </div>
            
        </FeatureContent>
    )

}

export default FeatureStores