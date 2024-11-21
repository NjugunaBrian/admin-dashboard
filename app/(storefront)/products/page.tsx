import { getProducts } from "@/actions/product"
import ProductsDisplay from "../_components/products-display"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import SearchFilters from "../_components/search-filters"
import { ProductsPageProps } from "@/lib/types"


const Products = async({ searchParams }: ProductsPageProps) => {

    const products = await getProducts(searchParams)

    return (
        <>
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button>Filter</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <SearchFilters />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
 
            {JSON.stringify(searchParams)}

            <ProductsDisplay products={products!} />
        </div>
        </>
    )
}

export default Products