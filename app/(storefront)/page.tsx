"use client";

import React from 'react'
//import Image from 'next/image'
import FeatureProducts from './_components/feature-products'
import FeatureStores from './_components/feature-stores'
import StorefrontBanner from './_components/storefront-banner'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-32'>
      {/*<div className='h-[calc(100vh-9rem)] object-cover object-center overflow-hidden relative'>
        <Image
          src={'https://utfs.io/f/34fa6a32-35cf-4aff-ae32-6f21c70ffc2e-9h2egh.jpg'}
          className='opacity-40'
          alt='Storefront banner'
          height={400}
          width={1400} 
        />

      </div>
      */}
      <div className='h-[calc(100vh-9rem)]'>
      <StorefrontBanner />
      </div>
    
      <div className='w-full max-w-[1200px] space-y-16'>
        <FeatureProducts />
        <FeatureStores />

      </div>
    </div>
  )
}

export default Home