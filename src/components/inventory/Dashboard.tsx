
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from './ProductCard';
import { Package, AlertTriangle, DollarSign, BarChart } from 'lucide-react';

type DashboardProps = {
  products: Product[];
};

export const Dashboard = ({ products }: DashboardProps) => {
  // Calculate dashboard metrics
  const totalProducts = products.length;
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStockItems = products.filter(p => p.quantity <= p.threshold).length;
  const inventoryValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const DashboardCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon,
    color
  }: { 
    title: string; 
    value: string | number; 
    description: string;
    icon: React.ElementType;
    color: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Products" 
          value={totalProducts}
          description="Unique product types"
          icon={Package}
          color="bg-blue-500"
        />
        
        <DashboardCard 
          title="Total Items" 
          value={totalItems}
          description="Items in inventory"
          icon={BarChart}
          color="bg-green-500"
        />
        
        <DashboardCard 
          title="Low Stock Items" 
          value={lowStockItems}
          description="Items below threshold"
          icon={AlertTriangle}
          color="bg-orange-500"
        />
        
        <DashboardCard 
          title="Inventory Value" 
          value={`$${inventoryValue.toFixed(2)}`}
          description="Total value of inventory"
          icon={DollarSign}
          color="bg-violet-500"
        />
      </div>
      
      {products.length === 0 ? (
        <Card className="p-8 text-center">
          <CardTitle className="mb-2">Welcome to Inventory Control</CardTitle>
          <CardDescription>
            Add products to your inventory to see metrics and insights here.
          </CardDescription>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory changes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center py-8">
                Activity tracking will be implemented in a future update
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Products that need restocking</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockItems === 0 ? (
                <p className="text-sm text-center py-8">
                  No items are below their stock threshold
                </p>
              ) : (
                <div className="space-y-4">
                  {products
                    .filter(p => p.quantity <= p.threshold)
                    .slice(0, 5)
                    .map(product => (
                      <div key={product.id} className="flex justify-between items-center pb-2 border-b last:border-0">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.quantity} of {product.threshold} min
                          </div>
                        </div>
                        <div className="text-red-500 font-medium">
                          {Math.max(0, product.threshold - product.quantity)} needed
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
