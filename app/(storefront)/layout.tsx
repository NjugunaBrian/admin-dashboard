import SiteHeader from '@/components/shells/site-header'
import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className='space-y-4'>
        <SiteHeader />
        <div className='space-y-24'>
          {children}
        </div>
    </div>
  )
}

export default layout