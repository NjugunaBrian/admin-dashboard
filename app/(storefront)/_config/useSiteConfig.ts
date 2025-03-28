"use client";

import { getCategories } from "@/actions/site";
import { useEffect, useState } from "react";


export interface SiteNavItem {
    title: string;
    href: string;
    description: string;
    items: SiteNavItem[];
}

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    siteNav: {
        title: string;
        items: SiteNavItem[];
    };
    mainNav: {
        title: string;
        items: SiteNavItem[];
    }[];
}

export function useSiteConfig(){
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiteConfig = async() => {
            try{
                const categories = await getCategories();
                const config = {
                    name: "FarmToHouse",
                    description: "A groceries ecommerce app with an integrated CMS dashboard built with NextJS and PostgreSQL.",
                    url: "https://groceriestore.vercel.app",
                    ogImage: "",
                    siteNav: {
                        title: "Store-front",
                        items: [
                            {
                                title: "Products",
                                href: "/products",
                                description: "All products we have to offer.",
                                items: [],
                            },
                            {
                                title: "Blog",
                                href: "/blog",
                                description: "Read out latest blog posts",
                                items: [],
                            },
                            {
                                title: "Contact",
                                href: "mailto:nbrianmuriithi@gmail.com",
                                description: "Reach out to me",
                                items: []
                            },
                        ],
                    },
                    mainNav: categories!.map((category) => ({
                        title: category.title,
                        items: [
                            {
                                title: "All",
                                href: `/products?category=${category.title}`,
                                description: `All ${category.title}.`,
                                items: [],
                            },
                            ...category.subcategories.map((subcategory) => ({
                                title: subcategory.title,
                                href: `products?subCategory=${subcategory.title}`,
                                description: subcategory.description,
                                items: [],
                            })),
                        ],
                    })),
                };
                setSiteConfig(config);

            } catch (error){
                console.error('Failed to fetch site config', error);
            } finally {
                setLoading(false)
            }
        };

        fetchSiteConfig();
    }, [])

    return { siteConfig, loading };
}