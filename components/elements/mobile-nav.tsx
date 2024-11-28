"use client";

import { useState } from "react";
import { useSiteConfig } from "@/app/(storefront)/_config/useSiteConfig";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";


export const dashboardNavConfig = [
    {
        title: 'account',
        href: '/dashboard/account',
    },
    {
        title: 'site',
        href: '/dashboard/site',
    },
    {
        title: 'stores',
        href: '/dashboard/stores',
    },
    {
        title: 'blog',
        href: '/dashboard/blog'
    },
]

const MobileNav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { siteConfig } = useSiteConfig();

    return (
        <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button variant={"outline"} size={"icon"}>
                        <HamburgerMenuIcon />
                    </Button>
                </SheetTrigger>

                {siteConfig && 
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {siteConfig!.name}
                            </SheetTitle>
                            <SheetDescription>

                            </SheetDescription>
                        </SheetHeader>

                        <div className="h-[calc(100vh - 4rem)] overflow-y-scroll overflow-x-hidden">
                            <Accordion type="multiple">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="capitalize text-secondary-foreground">
                                        {siteConfig!.siteNav.title}
                                    </AccordionTrigger>
                                    {siteConfig!.siteNav.items.map((nav, index) => (
                                        <div key={index}>
                                            <AccordionContent>
                                                <Link href={nav.href} onClick={() => setIsOpen(false)} className="text-muted-foreground focus:text-secondary-foreground">
                                                    {nav.title}
                                                </Link>
                                            </AccordionContent>
                                        </div>
                                    ))}
                                </AccordionItem>
                                <AccordionItem value="item-2" className="md:hidden">
                                    <AccordionTrigger className="capitalize text-secondary-foreground">
                                        My Account
                                    </AccordionTrigger>
                                    {dashboardNavConfig.map((nav) => (
                                        <AccordionContent key={nav.title}>
                                            <Link href={nav.href} onClick={() => setIsOpen(false)} className="capitalize text-muted-foreground focus:text-secondary-foreground">
                                                {nav.title}
                                            </Link>
                                        </AccordionContent>
                                    ))}
                                </AccordionItem>
                                {siteConfig!.mainNav.map((nav, index) => (
                                    <AccordionItem value={`item-${index+3}`} key={index}>
                                        <AccordionTrigger className="capitalize text-secondary-foreground">
                                            {nav.title}
                                        </AccordionTrigger>
                                        {nav.items.map((nav, index) => (
                                            <div key={index}>
                                                <AccordionContent>
                                                    <Link href={nav.href} onClick={() => setIsOpen(false)} className="text-muted-foreground focus:text-secondary-foreground">
                                                        {nav.title}
                                                    </Link>
                                                </AccordionContent>
                                            </div>
                                        ))}

                                    </AccordionItem>
                                ))}

                            </Accordion>
                            
                        </div>

                    </SheetContent>
                }
            </Sheet>

        </div>
    )

}

export default MobileNav;