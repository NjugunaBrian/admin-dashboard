import { ReactNode } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FeatureContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    title: string,
    subtitle: string,
    href: string,
    linkName: string
}

const FeatureContent = ({ children, title, subtitle, href, linkName, className }: FeatureContentProps) => {

    return (
        <div className={cn("w-full flex flex-col items-center text-center gap-4", className)}>
            <div>
                <h1 className='lg:text-3xl text-xl font-bold'>{title}</h1>
                <p className='text-muted-foreground'>{subtitle}</p>
            </div>

            {children}

            <div>
                <Link href={`/${href}`}>
                <Button variant={'outline'} className='flex items-center space-x-2'>
                    <p>{linkName}</p>
                    <ChevronRightIcon />
                </Button>
                </Link>
            </div>
        </div>
    )

}

export default FeatureContent