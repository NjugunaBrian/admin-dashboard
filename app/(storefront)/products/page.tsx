import { getProducts } from "@/actions/product"
import ProductsDisplay from "../_components/products-display"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ProductsPageProps } from "@/lib/types"
import SearchFiltersClient from "../_components/search-filters-client"


const Products = async({ searchParams }: ProductsPageProps) => {

    const products = await getProducts(searchParams)

    return (
        <>
        <div className="space-y-6">
            <Sheet>
                <SheetTrigger>
                    <Button>Filters</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                            <SearchFiltersClient />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
 
            {/* {JSON.stringify(searchParams)} */}

            <ProductsDisplay products={products!} />
        </div>
        </>
    )
}

export default Products