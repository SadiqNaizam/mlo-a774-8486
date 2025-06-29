import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Package,
  Search,
  Menu,
  LayoutDashboard,
  GanttChart,
  BarChart3,
  Users,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/r-f-p-pipeline', icon: GanttChart, label: 'RFP Pipeline' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/clients', icon: Users, label: 'Clients' },
];

const Header: React.FC = () => {
  console.log('Header loaded');

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
      { 'bg-muted text-foreground': isActive }
    );

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package className="h-6 w-6" />
          <span className="sr-only">RFP Insights</span>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Package className="h-6 w-6" />
              <span>RFP Insights</span>
            </Link>
            {navLinks.map(({ to, icon: Icon, label }) => (
              <NavLink key={label} to={to} className={mobileNavLinkClasses}>
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search RFPs..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;