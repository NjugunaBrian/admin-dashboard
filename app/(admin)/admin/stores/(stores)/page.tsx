import { getAllStores } from '@/actions/store';
import CreateStore from '@/app/(admin)/_components/create-store';
import AdminSection from '@/components/shells/admin-section';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {

  const { userId } = auth();
  const { data } = await getAllStores();
  return (
    <AdminSection title="Stores" subtitle='Manage your stores'>
      <CreateStore userId={userId!} />
      {JSON.stringify(data)}

    </AdminSection>
    
  )
}

export default page