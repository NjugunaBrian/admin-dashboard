import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"


const StorefrontBanner = () => {
    return (
        <div className='flex flex-col items-center text-center justify-center gap-4 max-w-6xl'>
            <Link href={'https://github.com/NjugunaBrian/admin-dashboard'}>
            <Button variant={'secondary'} className='flex items-center'>
                <GitHubLogoIcon className='mr-2' />
                Star on Github
            </Button>
            </Link>

            <h1 className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent lg:text-7xl text-5xl font-bold'>
                No compromises, just freshness. Eat fresh. Live healthy.
            </h1>
            <p className='text-muted-foreground lg:text-xl'>
                FarmToHouse is a fresh way of shopping for groceries. We bring the farm to your house.
            </p>
            <div className='flex gap-2'>
                <Link href={'#'}>
                <Button>
                    Buy Now
                </Button>
                </Link>
                <Link href={'/dashboard/store'}>
                <Button variant={'outline'}>
                    Sell Now
                </Button>
                </Link>
            </div>
        </div>

    )

}

export default StorefrontBanner