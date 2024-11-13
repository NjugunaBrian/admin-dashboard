"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubCategory } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/actions/site";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type CategoryProps = {
    categoryId: string;
    title: string;
    subcategories: SubCategory[];
}

const SearchFilters = () => {
    const [categories, setCategories] = useState<CategoryProps[] | []>([]);

    const DEFAULT_FILTERS = {
        priceFrom: '',
        priceTo: '',
        order: '',
        orderBy: 'price',
        category: '',
        subCategory: ''
    };

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    const priceFrom = searchParams.get('priceFrom')
    const priceTo = searchParams.get('priceTo')
    const order = searchParams.get('order')
    const orderBy = searchParams.get('orderBy')
    const category = searchParams.get('category')
    const subCategory = searchParams.get('subCategory')

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
    }, [searchParams]);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data!)
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const setPriceFrom = (value: string) => {
        router.push(pathname + '?' + createQueryString('priceFrom', value))
    }

    const setPriceTo = (value: string) => {
        router.push(pathname + '?' + createQueryString('priceTo', value))
    }

    const handleOrder = (value: string) => {
        router.push(pathname + '?' + createQueryString('order', value))
    }

    const handleOrderBy = (value: string) => {
        router.push(pathname + '?' + createQueryString('orderBy', value))
    }

    const handleCategory = (value: string) => {
        router.push(pathname + '?' + createQueryString('category', value))
    }
    const handleSubcategory = (value: string) => {
        router.push(pathname + '?' + createQueryString('subCategory', value))
    }



    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Price</CardTitle>
                    <CardDescription>Set your price range</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Price from"
                          onChange={(e) => setPriceFrom(e.target.value)}
                        />
                        <span>-</span>
                        <Input
                          type="number"
                          placeholder="Price to"
                          onChange={(e) => setPriceTo(e.target.value)} 
                        />
                    </div>
                </CardContent>

            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Select onValueChange={handleOrder}>
                            <SelectTrigger>
                                <SelectValue placeholder="Order:" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={handleOrderBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Order By:" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price">Price</SelectItem>
                                <SelectItem value="createdAt">Date</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-2">
                <Select onValueChange={handleCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={handleSubcategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Set sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <div key={category.categoryId}>
                                {category.subcategories.map((subcategory) => (
                                    <SelectItem value={subcategory.title} key={subcategory.subcategoryId} className="subcategory">
                                        {subcategory.title}
                                    </SelectItem>
                                ))}
                            </div>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={() => router.push(pathname)} className="w-full justify-self-end">
                Clear Filters
            </Button>
        </div>

    )

}

export default SearchFilters