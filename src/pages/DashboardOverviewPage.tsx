import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICard from '@/components/KPICard';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import ActivityFeedItem from '@/components/ActivityFeedItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, MessageSquare, FileText } from 'lucide-react';

const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", description: "+20.1% from last month", icon: DollarSign, trend: 'up' as 'up' | 'down' | 'neutral' },
  { title: "Total Sales", value: "+12,234", description: "+15% from last month", icon: ShoppingCart, trend: 'up' as 'up' | 'down' | 'neutral' },
  { title: "New Customers", value: "+573", description: "+10% this month", icon: Users, trend: 'up' as 'up' | 'down' | 'neutral' },
  { title: "Average Order Value", value: "$120.50", description: "-2.5% from last month", icon: TrendingUp, trend: 'down' as 'up' | 'down' | 'neutral' },
];

const salesTrendData = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 }, { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 }, { name: 'Sun', sales: 3490 },
];
const salesSeries = [{ dataKey: 'sales', stroke: '#8884d8', name: 'Sales' }];

const recentActivities = [
  { actorName: "Olivia Martin", action: "placed an order", targetName: "Order #10248", targetLink: "/orders/10248", timestamp: "2 minutes ago", icon: ShoppingCart, actorImageUrl: "https://placehold.co/32x32/E0E0E0/757575/png?text=OM" },
  { actorName: "Jackson Lee", action: "updated product", targetName: "Ficus Tree", targetLink: "/products/ficus", timestamp: "1 hour ago", icon: Package, actorImageUrl: "https://placehold.co/32x32/D1C4E9/4527A0/png?text=JL" },
  { actorName: "System", action: "generated a report", targetName: "Monthly Sales Summary", timestamp: "3 hours ago", icon: FileText },
  { actorName: "Isabella Nguyen", action: "left a review", targetName: "Product 'Succulent Set'", timestamp: "5 hours ago", icon: MessageSquare, actorImageUrl: "https://placehold.co/32x32/C8E6C9/2E7D32/png?text=IN" },
];

const recentOrdersData = [
    { id: "ORD001", customer: "Liam Johnson", date: "2023-10-26", total: "$250.00", status: "Delivered" },
    { id: "ORD002", customer: "Noah Williams", date: "2023-10-25", total: "$150.00", status: "Shipped" },
    { id: "ORD003", customer: "Olivia Brown", date: "2023-10-25", total: "$350.00", status: "Processing" },
];

const DashboardOverviewPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  console.log('DashboardOverviewPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar className="hidden md:flex" />
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="sm:max-w-xs p-0 pt-14 md:hidden">
          <Sidebar className="flex border-r-0" /> {/* Ensure visible and remove border if redundant */}
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />
        <main className="flex-1 p-4 sm:px-6 sm:py-6 md:gap-8 overflow-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {kpiData.map(kpi => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <InteractiveDataChart
                title="Sales Trend (Last 7 Days)"
                data={salesTrendData}
                series={salesSeries}
                chartType="line"
                xAxisDataKey="name"
                description="Overview of sales performance this week."
              />
            </div>
            <div className="lg:col-span-3">
                <ScrollArea className="h-[400px] rounded-md border p-4 bg-card">
                    <h3 className="text-lg font-semibold mb-2 text-card-foreground">Recent Activity</h3>
                    {recentActivities.map((activity, index) => (
                        <ActivityFeedItem key={index} {...activity} />
                    ))}
                </ScrollArea>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <Table>
                <TableCaption>A list of the most recent orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentOrdersData.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;