"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { PlusIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ContentShell from '@/components/shells/content-shell';
import { Store } from '@/db/schema/store-table';
import { getSingleStore } from '@/actions/store';
import { Product } from '@/db/schema';
import { getStoreProducts } from '@/actions/product';
import ProductTable from '../../_components/product-table';



const Page = () => {

  const { storeId } = useParams();
  const [ storeData, setStoreData ] = useState<Store | null>(null);
  const [productsData, setProductsData] = useState<Product[] | null >(null)

  const getStoreData = async() => {
    try {
      const [store, products] = await Promise.all([getSingleStore(storeId as string), getStoreProducts(storeId as string)])
      setStoreData(store!)
      setProductsData(products!)

    } catch{
      toast.error("An unexpected error occurred")
    }
  }

  useEffect(() => {
    getStoreData();
  })

  return (
      <ContentShell title={storeData?.name || 'Unnamed store'} subtitle={storeData?.description || 'No description available'}>
        <Link href={`/admin/stores/${storeId}/create-product`}>
          <Button className='space-x-1'>
            <span>Create product</span>
            <PlusIcon />

          </Button>
      
        </Link>
        
        {productsData && <ProductTable products={productsData} />}
    </ContentShell>
  )
}

export default Page