import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  GanttChart,
  BarChart3,
  Users,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface NavLinkItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/r-f-p-pipeline', icon: GanttChart, label: 'RFP Pipeline' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/clients', icon: Users, label: 'Clients' },
];

const CollapsibleSidebar: React.FC = () => {
  console.log('CollapsibleSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      { 'bg-muted text-primary': isActive }
    );

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-muted/40 border-r transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex-grow p-4">
        <nav className="grid items-start gap-2">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Tooltip key={label} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink to={to} className={navLinkClasses}>
                  <Icon className="h-5 w-5" />
                  <span
                    className={cn('overflow-hidden transition-all', {
                      'w-0': isCollapsed,
                      'w-auto ml-1': !isCollapsed,
                    })}
                  >
                    {label}
                  </span>
                </NavLink>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button variant="ghost" size="icon" className="w-full" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;