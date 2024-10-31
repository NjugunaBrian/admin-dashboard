import Link from "next/link"
import ModeToggle from "../themes/mode-toggle"


const Footer = () => {
    return (
        <div className='w-full flex justify-between items-center border-t py-2 max-h-24'>
            <div className='flex flex-col gap-1'>
                <p>Built by <Link href={'#'} className='underline' target='_blank'>me</Link></p>
                <p>Source code available on <Link href={'#'} className='underline' target='_blank'>gitHub</Link></p>

            </div>
            <ModeToggle />

        </div>
    )

}

export default Footer