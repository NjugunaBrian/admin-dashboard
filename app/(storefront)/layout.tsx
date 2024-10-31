import Footer from '@/components/elements/footer'
import SiteHeader from '@/components/shells/site-header'
import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div>
        <SiteHeader />
        <div className='space-y-24'>
          {children}
          <Footer />
        </div>
    </div>
  )
}

export default layout