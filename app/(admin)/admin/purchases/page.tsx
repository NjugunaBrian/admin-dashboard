import { getOrders } from "@/actions/order";
import ContentShell from "@/components/shells/content-shell";
import { formatCurrency } from "@/lib/utils";
import PurchasesTable from "../_components/purchases-table";


const Purchases = async() => {
    const orders = await getOrders();

    const formattedOrders = orders?.map((order) => ({
        orderId: order.orderId,
        address: order.address,
        isPaid: order.isPaid,
        products: order!.products!.map((orderItem) => orderItem.name).join(', '),
        totalPrice: formatCurrency(order!.products!.reduce((total, item) => {
            return total + Number(item.price)
        }, 0)),
        createdAt: order.createdAt
    }));

    return (
        <ContentShell title='Purchases' subtitle='Manage your purchases'>
            <PurchasesTable purchases={formattedOrders!} />
        </ContentShell>
    )
}

export default Purchases