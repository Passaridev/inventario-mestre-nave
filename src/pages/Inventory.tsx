
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductList } from '@/components/inventory/ProductList';
import { StockMovement } from '@/components/inventory/StockMovement';
import { Dashboard } from '@/components/inventory/Dashboard';
import { Product } from '@/components/inventory/ProductCard';
import { SidebarProvider } from '@/components/layout/Sidebar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

// Sample data for initial products
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-1000',
    category: 'Electronics',
    quantity: 25,
    price: 149.99,
    threshold: 5,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Ergonomic Chair',
    sku: 'EC-2000',
    category: 'Furniture',
    quantity: 8,
    price: 299.99,
    threshold: 3,
    imageUrl: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Premium Notebook',
    sku: 'NB-3000',
    category: 'Office Supplies',
    quantity: 42,
    price: 19.99,
    threshold: 10,
    imageUrl: 'https://images.unsplash.com/photo-1531346680769-a1e79e0fb1fa?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Smart Watch',
    sku: 'SW-4000',
    category: 'Electronics',
    quantity: 3,
    price: 249.99,
    threshold: 5,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
  },
];

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  const handleStockUpdate = (productId: string, newQuantity: number) => {
    setProducts(products.map((product) => 
      product.id === productId 
        ? { ...product, quantity: newQuantity } 
        : product
    ));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background animate-fade-in">
        <Sidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="stock">Stock Movement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-0">
                <Dashboard products={products} />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductList 
                  initialProducts={products} 
                />
              </TabsContent>
              
              <TabsContent value="stock" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Stock Movement</h2>
                <StockMovement 
                  products={products}
                  onStockUpdate={handleStockUpdate}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;
