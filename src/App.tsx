import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import SalesAnalyticsPage from "./pages/SalesAnalyticsPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import CustomerInsightsPage from "./pages/CustomerInsightsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardOverviewPage />} /> 
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/sales-analytics" element={<SalesAnalyticsPage />} />
          <Route path="/orders" element={<OrdersManagementPage />} />
          <Route path="/customers" element={<CustomerInsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Add other application routes above this line */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;