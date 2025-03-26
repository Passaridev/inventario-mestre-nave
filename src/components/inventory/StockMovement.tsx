
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Product } from './ProductCard';
import { useToast } from '@/hooks/use-toast';

type StockMovementProps = {
  products: Product[];
  onStockUpdate: (productId: string, newQuantity: number) => void;
};

export const StockMovement = ({ products, onStockUpdate }: StockMovementProps) => {
  const { toast } = useToast();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [operation, setOperation] = useState<'add' | 'remove'>('add');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleSubmit = () => {
    if (!selectedProductId) {
      toast({
        title: 'No product selected',
        description: 'Please select a product to update',
        variant: 'destructive',
      });
      return;
    }

    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    const newQuantity = operation === 'add' 
      ? product.quantity + quantity 
      : Math.max(0, product.quantity - quantity);
    
    onStockUpdate(selectedProductId, newQuantity);
    
    toast({
      title: 'Stock updated',
      description: `${product.name} stock ${operation === 'add' ? 'increased' : 'decreased'} by ${quantity}`,
    });
    
    // Reset form
    setSelectedProductId('');
    setQuantity(1);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Stock Movement</CardTitle>
        <CardDescription>Add or remove stock from inventory</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium">
              Product
            </label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="operation" className="text-sm font-medium">
              Operation
            </label>
            <Select value={operation} onValueChange={(value: 'add' | 'remove') => setOperation(value)}>
              <SelectTrigger id="operation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">
                  <div className="flex items-center">
                    <ArrowDownToLine className="mr-2 h-4 w-4" />
                    Add Stock
                  </div>
                </SelectItem>
                <SelectItem value="remove">
                  <div className="flex items-center">
                    <ArrowUpFromLine className="mr-2 h-4 w-4" />
                    Remove Stock
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedProductId || quantity < 1}
          className="w-full"
        >
          {operation === 'add' ? (
            <>
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              Add Stock
            </>
          ) : (
            <>
              <ArrowUpFromLine className="mr-2 h-4 w-4" />
              Remove Stock
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
