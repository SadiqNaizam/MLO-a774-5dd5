import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Search, Filter, Eye } from 'lucide-react';

const ordersData = [
  { id: "ORD10248", customer: "Olivia Martin", customerEmail: "olivia.martin@example.com", date: "2023-10-20", status: "Delivered", total: "$120.99", items: [{name: "Wireless Mouse", qty: 1, price: "$25.99"}, {name: "Keyboard", qty: 1, price: "$75.00"}, {name: "Mousepad", qty:1, price: "$20.00"}]},
  { id: "ORD10249", customer: "Jackson Lee", customerEmail: "jackson.lee@example.com", date: "2023-10-22", status: "Shipped", total: "$85.50", items: [{name: "Bluetooth Speaker", qty: 1, price: "$85.50"}] },
  { id: "ORD10250", customer: "Isabella Nguyen", customerEmail: "isabella.nguyen@example.com", date: "2023-10-23", status: "Processing", total: "$45.00", items: [{name: "USB-C Cable", qty:2, price: "$15.00"}, {name: "Phone Charger", qty:1, price: "$15.00"}] },
  { id: "ORD10251", customer: "William Kim", customerEmail: "william.kim@example.com", date: "2023-10-24", status: "Pending", total: "$200.75", items: [{name: "Gaming Headset", qty:1, price: "$200.75"}] },
  { id: "ORD10252", customer: "Sophia Garcia", customerEmail: "sophia.garcia@example.com", date: "2023-10-25", status: "Cancelled", total: "$30.25", items: [{name: "Notebook", qty:5, price: "$6.05"}] },
];

type Order = typeof ordersData[0];

const OrdersManagementPage = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  console.log('OrdersManagementPage loaded');

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
              <BreadcrumbItem><BreadcrumbPage>Orders Management</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search orders (ID, customer)..." className="pl-8 w-full sm:w-[300px]" />
            </div>
            <Select defaultValue="all_statuses">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_statuses">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> More Filters</Button>
          </div>

          <div className="rounded-md border bg-card">
            <Table>
                <TableCaption>A list of all customer orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ordersData.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                            <TableCell className="text-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                            <Eye className="h-4 w-4 mr-1" /> View
                                        </Button>
                                    </DialogTrigger>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          
          <DialogContent className="sm:max-w-lg">
            {selectedOrder && (
                <>
                    <DialogHeader>
                        <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                        <DialogDescription>
                            Customer: {selectedOrder.customer} ({selectedOrder.customerEmail}) <br />
                            Date: {selectedOrder.date} | Status: {selectedOrder.status} | Total: {selectedOrder.total}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul>
                            {selectedOrder.items.map(item => (
                                <li key={item.name} className="flex justify-between text-sm">
                                    <span>{item.name} (Qty: {item.qty})</span>
                                    <span>{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </>
            )}
          </DialogContent>


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

export default OrdersManagementPage;