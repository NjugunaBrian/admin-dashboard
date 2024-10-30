"usee client";
import { getSalesCount, getStockCount, getTotalRevenue } from "@/actions/dashboard-values"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

type DashboardCardProps = {
    title: string,
    value: string
}
const DashboardCard = ({ title, value }: DashboardCardProps) => {
    return (
    <Card className="rounded">
        <CardHeader>
            <CardTitle>

            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className='text-muted-foreground'>{title}</p>
            <p className='font-bold text-xl'>{value}</p>
        </CardContent>

    </Card>
    )

}

const Dashboard = async () => {
    const [totalRevenue, salesCount, stockCount ] = await Promise.all([getTotalRevenue(), getSalesCount(), getStockCount()]);

    return (
        <div className='grid grid-cols-3 gap-2'>
        { /* Revenue */ }
        <DashboardCard title={"Revenue"} value={formatCurrency(totalRevenue!)} />

        { /* Sales */ }
        <DashboardCard title={"Sales"} value={formatCurrency(salesCount?.count || 0)} />

        { /* Stock */ }
        <DashboardCard title={"In Stock"} value={formatCurrency(stockCount?.count || 0)} />

        </div>
    )
}

export default Dashboard