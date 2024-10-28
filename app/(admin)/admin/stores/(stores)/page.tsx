import { getAllStores } from '@/actions/store';
import CreateStore from '@/app/(admin)/_components/create-store';
import StoreCard from '@/components/elements/store-card';
import AdminSection from '@/components/shells/admin-section';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const page = async () => {

  const { userId } = auth();
  const { data } = await getAllStores();
  return (
    <AdminSection title="Stores" subtitle='Manage your stores'>
      <CreateStore userId={userId!} />
      <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
        {data?.map((store) => (
          <Link key={store.storeId} href={`/admin/stores/${store.storeId}`} >
            <StoreCard name={store.name} description={store.description!} className='h-40' />
          </Link>
        ))}
      </div>

    </AdminSection>
    
  )
}

export default page