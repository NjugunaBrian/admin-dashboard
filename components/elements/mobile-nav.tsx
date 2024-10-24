import { SheetContent, SheetDescription, SheetHeader, SheetTitle, } from '@/components/ui/sheet'
import Link from 'next/link';
import { ReactNode } from 'react';


interface MobileNavProps {
    children: ReactNode
}

const MobileNav = ({children}: MobileNavProps) => {

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    <Link href={'/'} className='font-bold text-xl'>BlackPitt</Link>
                </SheetTitle>
                <SheetDescription>
                    {children}
                </SheetDescription>
        
            </SheetHeader>
        </SheetContent>
    )

}

export default MobileNav;