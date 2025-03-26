
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Menu, Search, X } from 'lucide-react';
import { SidebarTrigger } from '@/components/layout/Sidebar';

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SidebarTrigger>
          
          <h1 className="text-xl font-semibold tracking-tight">Inventory Control</h1>
        </div>
        
        <div className={`ml-auto flex items-center gap-4 ${showSearch ? 'w-full md:w-auto' : ''}`}>
          {showSearch ? (
            <div className="relative flex w-full items-center md:w-auto animate-fade-in">
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full md:w-[300px] pr-8"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSearch(true)}
                className="animate-fade-in"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">US</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
