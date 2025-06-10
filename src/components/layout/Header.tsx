import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, UserCircle, Menu, Search } from 'lucide-react'; // Added Menu and Search
import { Input } from '@/components/ui/input'; // For search input

interface HeaderProps {
  onToggleSidebar?: () => void; // Optional: For mobile sidebar toggle
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  console.log("Rendering Header component");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Sidebar Toggle */}
      {onToggleSidebar && (
        <Button size="icon" variant="outline" className="sm:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}

      {/* Placeholder for a global search or breadcrumbs if not handled by Sidebar */}
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Example Search - can be more complex or part of breadcrumbs */}
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        /> */}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Link to="/settings/profile"> {/* Example link */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">User Profile</span>
          </Button>
        </Link>
        {/* Add Logout functionality here */}
      </div>
    </header>
  );
};

export default Header;