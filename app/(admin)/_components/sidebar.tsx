"use client"

import { adminConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className='p-4 space-y-1'>
            {adminConfig.sidebarNav.map((item) => (
                <Link
                href={`/admin/${item}`}
                key={`/admin/${item}`}
                className={cn("group flex w-full items-center border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground", pathname.split('/').includes(item)
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
                >
                    <span className='capitalize'>{item}</span>
                </Link>
            ))}

        </div>
    )

}

export default Sidebar