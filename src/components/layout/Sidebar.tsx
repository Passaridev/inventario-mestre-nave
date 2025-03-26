
import React, { createContext, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, LayoutDashboard, Package, FileText, BarChart2, Settings, LogOut } from 'lucide-react';

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  close: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

type SidebarProviderProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const SidebarProvider = ({
  children,
  defaultOpen = true,
}: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarTrigger = ({ 
  children,
  className,
}: { 
  children?: React.ReactNode;
  className?: string;
}) => {
  const { toggle } = useSidebar();
  
  return (
    <div className={className} onClick={toggle}>
      {children}
    </div>
  );
};

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  end?: boolean;
};

const NavItem = ({ icon: Icon, label, to, end }: NavItemProps) => {
  const { isOpen } = useSidebar();
  
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/70",
          !isOpen && "justify-center px-0"
        )
      }
    >
      <Icon className={cn("h-5 w-5", !isOpen && "h-6 w-6")} />
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

export const Sidebar = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "relative z-20 flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center w-full")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          {isOpen && <span className="text-lg font-semibold">Inventory</span>}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-md"
        onClick={toggle}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      
      <div className="flex flex-1 flex-col gap-2 p-4">
        <NavItem icon={LayoutDashboard} label="Dashboard" to="/" end />
        <NavItem icon={Package} label="Products" to="/inventory" />
        <NavItem icon={FileText} label="Reports" to="/reports" />
        <NavItem icon={BarChart2} label="Analytics" to="/analytics" />
      </div>
      
      <div className="border-t p-4">
        <div className="flex flex-col gap-2">
          <NavItem icon={Settings} label="Settings" to="/settings" />
          <NavItem icon={LogOut} label="Logout" to="/logout" />
        </div>
      </div>
    </aside>
  );
};
