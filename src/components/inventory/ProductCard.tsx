
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  threshold: number;
  imageUrl?: string;
};

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
};

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const isLowStock = product.quantity <= product.threshold;
  
  return (
    <Card className="hover-scale overflow-hidden">
      <div className="relative">
        <div className="h-40 bg-secondary flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <span className="text-6xl text-muted-foreground/30">{product.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        {isLowStock && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2 animate-pulse"
          >
            Low Stock
          </Badge>
        )}
        
        <Badge 
          className="absolute top-2 left-2"
          variant="secondary"
        >
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{product.name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(product.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div>
          <p className="text-sm font-medium">{product.quantity} in stock</p>
          <p className="text-xs text-muted-foreground">Min: {product.threshold}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Per Unit</p>
        </div>
      </CardFooter>
    </Card>
  );
};
