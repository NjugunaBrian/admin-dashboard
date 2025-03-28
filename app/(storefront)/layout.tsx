import Footer from '@/components/elements/footer'
import SiteHeader from '@/components/shells/site-header'
import React from 'react'
import StoreNavigation from './_components/store-navigation'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className="space-y-4">
        <SiteHeader className="h-24" />
        <StoreNavigation />
        <div className='space-y-24'>
          {children}
          <Footer />
        </div>
    </div>
  )
}

export default layout