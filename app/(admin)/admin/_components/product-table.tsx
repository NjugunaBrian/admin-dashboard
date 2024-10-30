import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Product } from '@/db/schema';

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

interface ProductTableProps {
    products: Product[]
}


const ProductTable = ({ products }: ProductTableProps) => {

    return (
        <Table>
            <TableCaption>A list of products available for this store.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Tag</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className='sr-only'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.productId}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(Number(product.price))}</TableCell>
                        <TableCell>{product.inventory}</TableCell>
                        <TableCell className='capitalize'>{product.tags![0]}</TableCell>
                        <TableCell>{product.rating}</TableCell>

                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" variant='ghost' size='icon'>
                                        <DotsHorizontalIcon className='size-4' />
                                        <span className='sr-only'>Toggle Menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}

export default ProductTable