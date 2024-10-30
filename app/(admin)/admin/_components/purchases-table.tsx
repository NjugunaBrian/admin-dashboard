import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

type PurchaseItem = {
    orderId: string,
    address: string | null,
    isPaid: boolean | null,
    products: string,
    totalPrice: string,
    storeName: string,
    createdAt: Date

}

const PurchasesTable = ({ purchases }: { purchases: PurchaseItem[] }) => {
    return (
        <Table>
            <TableCaption>A list of purchases made on the site.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Products</TableHead>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead className='sr-only'>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {purchases.map((purchase, index) => (
                    <TableRow key={index}>
                        <TableCell>{purchase.products}</TableCell>
                        <TableCell>{purchase.storeName}</TableCell>
                        <TableCell className='capitalize'>{purchase.address}</TableCell>
                        <TableCell>{formatCurrency(Number(purchase.totalPrice))}</TableCell>
                        <TableCell>{purchase.isPaid}</TableCell>

                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup='true' size='icon' variant='ghost'>
                                        <DotsHorizontalIcon className='size-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
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

export default PurchasesTable