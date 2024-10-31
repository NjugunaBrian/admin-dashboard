import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"


const StorefrontBanner = () => {
    return (
        <div className='flex flex-col items-center text-center h-[calc(100vh-5rem)] justify-center gap-4 max-w-6xl absolute top-0 bottom-0 right-12 left-12'>
            <Link href={'#'}>
            <Button variant={'secondary'} className='flex items-center'>
                <GitHubLogoIcon className='mr-2' />
                Star on Github
            </Button>
            </Link>

            <h1 className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent lg:text-7xl text-5xl font-bold'>
                No trends, just statement. Dress Loud. Express Yourself Loud.
            </h1>
            <p className='text-muted-foreground lg:text-xl'>
                Vinyl is a new way of listening to your favorite music.
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