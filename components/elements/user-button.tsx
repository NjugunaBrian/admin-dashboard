"use client";

import Link from "next/link";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

const UserButton = () => {
    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                    {user?.firstName ? <p>{user.firstName}</p> : <p>{user?.firstName}</p>}
                    <p className="text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={'/admin/account'}>
                <DropdownMenuItem className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                        </svg>
                        <p>Profile</p>
                </DropdownMenuItem>
                </Link>
                <Link href={'/admin/stores'}>
                <DropdownMenuItem className="flex items-center space-x-2">
                    <DashboardIcon />
                    <p>Dashboard</p>
                </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <Link href={'/admin/settings'} className='flex items-center space-x-2'>
                    <GearIcon />
                    <p>Settings</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='space-x-2'>
                    <ExitIcon />
                    <SignOutButton />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    )

}

export default UserButton