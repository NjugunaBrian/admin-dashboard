import SiteHeader from '@/components/shells/site-header'
import React from 'react'
import SidebarNav from './_components/sidebar-nav'

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div>
            <SiteHeader>
                placeholder
            </SiteHeader>
            <div className='grid lg:flex h-[calc(100vh-4rem)]'>
                <aside className='border-r w-80 hidden lg:block'>
                    <SidebarNav />
                </aside>

            </div>
            <div className='w-full px-4 py-2'>
            {children}
            </div>
        </div>
    )
}

export default layout