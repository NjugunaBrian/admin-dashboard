import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import UserButton from '../elements/user-button'
import CartSheet from '../cart/cart-sheet'
import { cn } from '@/lib/utils'
import MobileNav from '../elements/mobile-nav'
import SignInButton from '../elements/sign-in-button'


interface SiteHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
}


const SiteHeader = ({children, className } : SiteHeaderProps) => {
  return (
    <header className={cn('flex z-50 justify-between items-center border-b h-16 gap-2 sticky px-3 bg-background', className)}>
        <Link href={'/'} className='font-bold text-xl'>Groceries</Link>
        {children}
        <div className='flex items-center gap-2'>
            <CartSheet />
            <SignedIn>
              <UserButton />
            </SignedIn>

            <MobileNav />

            <SignedOut>
              <Link href={'/sign-in'}>
                <SignInButton />
              </Link>
            </SignedOut>
        </div>
    </header>
  )
}

export default SiteHeader