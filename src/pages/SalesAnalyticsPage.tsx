import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Download } from 'lucide-react';

const salesDataByProduct = [
  { name: 'Jan', electronics: 4000, clothing: 2400, books: 1200 },
  { name: 'Feb', electronics: 3000, clothing: 1398, books: 1500 },
  { name: 'Mar', electronics: 2000, clothing: 9800, books: 1000 },
  { name: 'Apr', electronics: 2780, clothing: 3908, books: 1800 },
  { name: 'May', electronics: 1890, clothing: 4800, books: 2000 },
  { name: 'Jun', electronics: 2390, clothing: 3800, books: 1600 },
];
const productSeries = [
  { dataKey: 'electronics', name: 'Electronics', stroke: '#8884d8', fill: '#8884d8' },
  { dataKey: 'clothing', name: 'Clothing', stroke: '#82ca9d', fill: '#82ca9d' },
  { dataKey: 'books', name: 'Books', stroke: '#ffc658', fill: '#ffc658' },
];

const detailedSalesTableData = [
    { id: "SALE001", product: "Laptop Pro", category: "Electronics", date: "2023-06-15", quantity: 2, amount: "$2400.00" },
    { id: "SALE002", product: "T-Shirt Casual", category: "Clothing", date: "2023-06-15", quantity: 5, amount: "$125.00" },
    { id: "SALE003", product: "Science Fiction Novel", category: "Books", date: "2023-06-14", quantity: 3, amount: "$45.00" },
    { id: "SALE004", product: "Smartphone X", category: "Electronics", date: "2023-06-14", quantity: 1, amount: "$800.00" },
    { id: "SALE005", product: "Jeans Regular Fit", category: "Clothing", date: "2023-06-13", quantity: 2, amount: "$90.00" },
];

const SalesAnalyticsPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log('SalesAnalyticsPage loaded');

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
              <BreadcrumbItem><BreadcrumbPage>Sales Analytics</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select defaultValue="last_30_days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                <SelectItem value="custom_range">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border w-auto p-0" />
            <Button>Apply Filters</Button>
            <Button variant="outline" className="ml-auto">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </div>

          <InteractiveDataChart
            title="Sales by Product Category"
            description="Monthly sales performance across different product categories."
            data={salesDataByProduct}
            series={productSeries}
            chartType="bar"
            className="mb-6"
          />

          <h3 className="text-xl font-semibold mb-4">Detailed Sales Data</h3>
          <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sale ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {detailedSalesTableData.map((sale) => (
                        <TableRow key={sale.id}>
                            <TableCell className="font-medium">{sale.id}</TableCell>
                            <TableCell>{sale.product}</TableCell>
                            <TableCell>{sale.category}</TableCell>
                            <TableCell>{sale.date}</TableCell>
                            <TableCell>{sale.quantity}</TableCell>
                            <TableCell className="text-right">{sale.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;