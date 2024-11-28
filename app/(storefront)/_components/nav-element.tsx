import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useSiteConfig } from "../_config/useSiteConfig";
import { cn } from "@/lib/utils";


const NavElement = () => {

    const { siteConfig } = useSiteConfig();

    return (
        <div className="hidden lg:block">
            {siteConfig && 
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg text-muted-foreground">
                                {siteConfig!.siteNav.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a className="flex flex-col h-ful w-full select-none justify-end rounded-md no-underline outline-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md" href="/">
                                                <div className="font-medium mb-2 mt-4 text-lg">
                                                    {siteConfig!.name}
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    {siteConfig!.description}
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    {siteConfig && siteConfig.siteNav.items.map((component) => (
                                        <ListItem key={component.title} title={component.title} href={component.href}>
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        {siteConfig && siteConfig.mainNav.map((nav) => (
                            <NavigationMenuItem key={nav.title}>
                                <NavigationMenuTrigger className="text-muted-foreground text-lg capitalize">
                                    {nav.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="p-4 grid md:grid-cols-2 gap-3 w-[400px] md:w-[500px] lg:[600px]">
                                        {nav.items.map((component) => (
                                            <ListItem key={component.title} title={component.title} href={component.href}>
                                                {component.description}
                                            </ListItem>

                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>

                </NavigationMenu>
            }

        </div>
    )

}

export default NavElement

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
});

ListItem.displayName = "ListItem";