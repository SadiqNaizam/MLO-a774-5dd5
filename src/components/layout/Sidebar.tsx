import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, BarChart2, ShoppingCart, Users, Settings, Package } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/sales-analytics', label: 'Sales Analytics', icon: BarChart2 },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/customers', label: 'Customers', icon: Users },
  // Add more items as needed for your application structure
  // { href: '/products', label: 'Products', icon: Package },
];

const settingsNavItems: NavItem[] = [
    { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar component, current path:", location.pathname);

  const renderNavLinks = (items: NavItem[]) => {
    return items.map((item) => (
      <Link
        key={item.label}
        to={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          location.pathname.startsWith(item.href) && "bg-muted text-primary",
          "group" // Added for potential group hover effects
        )}
      >
        <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
        {item.label}
      </Link>
    ));
  };

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6 text-primary" /> {/* Placeholder Logo */}
            <span className="">Dashboard Inc</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto grid items-start px-2 text-sm font-medium lg:px-4 space-y-1 py-4">
          {renderNavLinks(navItems)}
        </nav>
        <nav className="mt-auto grid items-start px-2 text-sm font-medium lg:px-4 space-y-1 pb-4">
          {renderNavLinks(settingsNavItems)}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;