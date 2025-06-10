import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICard from '@/components/KPICard';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Users, UserPlus, BarChartHorizontalBig, TrendingUp } from 'lucide-react';

const customerKpiData = [
  { title: "Total Customers", value: "1,250", icon: Users, description: "+50 this month" },
  { title: "New Customers (MTD)", value: "75", icon: UserPlus, trend: 'up' as 'up' | 'down' | 'neutral', description: "vs. 58 last month" },
  { title: "Customer Lifetime Value (Avg)", value: "$875", icon: BarChartHorizontalBig, description: "Based on last 12 months" },
  { title: "Customer Acquisition Rate", value: "15%", icon: TrendingUp, trend: 'up' as 'up' | 'down' | 'neutral', description: "+2% vs. last period" },
];

const customerGrowthData = [
  { name: 'Jan', new: 30, total: 800 }, { name: 'Feb', new: 45, total: 845 }, { name: 'Mar', new: 60, total: 905 },
  { name: 'Apr', new: 50, total: 955 }, { name: 'May', new: 70, total: 1025 }, { name: 'Jun', new: 75, total: 1100 },
];
const customerGrowthSeries = [
    { dataKey: 'new', name: 'New Customers', stroke: '#82ca9d', fill: '#82ca9d' },
    { dataKey: 'total', name: 'Total Customers', stroke: '#8884d8', fill: '#8884d8', type: 'line' }
];

const topCustomersData = [
    { id: "CUST001", name: "Eleanor Vance", email: "eleanor@example.com", totalOrders: 15, totalSpent: "$2,500.00", lastOrderDate: "2023-06-10" },
    { id: "CUST002", name: "Marcus Rivera", email: "marcus@example.com", totalOrders: 12, totalSpent: "$1,800.00", lastOrderDate: "2023-06-05" },
    { id: "CUST003", name: "Lena Petrova", email: "lena@example.com", totalOrders: 10, totalSpent: "$1,550.00", lastOrderDate: "2023-06-12" },
];

const CustomerInsightsPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  console.log('CustomerInsightsPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar className="hidden md:flex" />
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="sm:max-w-xs p-0 pt-14 md:hidden">
          <Sidebar className="flex border-r-0" />
        </SheetContent>
      </Sheet>

      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)} />
        <main className="flex-1 p-4 sm:px-6 sm:py-6 md:gap-8 overflow-auto">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Customer Insights</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {customerKpiData.map(kpi => (
              <KPICard key={kpi.title} {...kpi} />
            ))}
          </div>

          <InteractiveDataChart
            title="Customer Growth Over Time"
            description="Tracks new and total customer counts monthly."
            data={customerGrowthData}
            series={customerGrowthSeries}
            chartType="bar" // Primarily bar, with one line series
            className="mb-6"
          />

          <h3 className="text-xl font-semibold mb-4">Top Customers</h3>
          <div className="rounded-md border bg-card">
            <Table>
                <TableCaption>List of top customers by spending or order frequency.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topCustomersData.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.totalOrders}</TableCell>
                            <TableCell className="text-right">{customer.totalSpent}</TableCell>
                            <TableCell>{customer.lastOrderDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default CustomerInsightsPage;