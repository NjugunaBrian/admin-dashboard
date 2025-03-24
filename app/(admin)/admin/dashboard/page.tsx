import { getSalesCount, getStockCount, getTotalRevenue } from "@/actions/dashboard-values"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/utils"
import ContentShell from "@/components/shells/content-shell"

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
    const [totalRevenue, salesCount, stockCount] = await Promise.all([getTotalRevenue(), getSalesCount(), getStockCount()]);

    return (
        <ContentShell title="Dashboard" subtitle="Stats for your site.">
        <div className='grid grid-cols-3 gap-2'>
        { /* Revenue */ }
        <DashboardCard title={"Revenue"} value={formatCurrency(totalRevenue || 0)} />

        { /* Sales */ }
        <DashboardCard title={"Sales"} value={formatNumber(salesCount?.count || 0)} />

        { /* Stock */ }
        <DashboardCard title={"In Stock"} value={formatNumber(stockCount?.count || 0)} />

        </div>
        
        </ContentShell>
    )
}

export default Dashboard