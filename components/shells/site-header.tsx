import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import UserButton from '../elements/user-button'
import { Button } from '../ui/button'


interface SiteHeaderProps {
    children: ReactNode
}


const SiteHeader = ({children} : SiteHeaderProps) => {
  return (
    <header className='flex justify-between items-center border-b h-16'>
        <Link href={'/'} className='font-bold text-xl'>Food</Link>
        {children}
        <div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <SignedOut>
            <Link href={'/sign-in'}>
              <Button>
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
    </header>
  )
}

export default SiteHeader