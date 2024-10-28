"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { PlusIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import ContentShell from '@/components/shells/content-shell';
import { Button } from '@/components/ui/button';
import { Store } from '@/db/schema/store-table';
import { getSingleStore } from '@/actions/store';



const Page = () => {

  const { storeId } = useParams();
  const [ storeData, setStoreData ] = useState<Store | null>(null);

  const getStoreData = async() => {
    try {
      const data = await getSingleStore(storeId as string);
      setStoreData(data!);

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

    </ContentShell>
  )
}

export default Page