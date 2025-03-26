
import React, { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddProductForm } from './AddProductForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ProductListProps = {
  initialProducts?: Product[];
};

export const ProductList = ({ initialProducts = [] }: ProductListProps) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleAddProduct = (values: Omit<Product, 'id'>) => {
    const newProduct = {
      ...values,
      id: Date.now().toString(),
    } as Product;

    setProducts((prev) => [...prev, newProduct]);
    setOpenDialog(false);
    
    toast({
      title: 'Product added',
      description: `${newProduct.name} has been added to inventory.`,
    });
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleUpdateProduct = (values: Omit<Product, 'id'>) => {
    if (!selectedProduct) return;

    const updatedProduct = {
      ...values,
      id: selectedProduct.id,
    } as Product;

    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    
    setOpenDialog(false);
    setSelectedProduct(null);
    
    toast({
      title: 'Product updated',
      description: `${updatedProduct.name} has been updated.`,
    });
  };

  const confirmDelete = (productId: string) => {
    setProductToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;

    const deletedProduct = products.find((p) => p.id === productToDelete);
    
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
    setOpenDeleteDialog(false);
    setProductToDelete(null);
    
    if (deletedProduct) {
      toast({
        title: 'Product deleted',
        description: `${deletedProduct.name} has been removed from inventory.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button onClick={() => {
          setSelectedProduct(null);
          setOpenDialog(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/30">
          <h3 className="text-lg font-medium">No products in inventory</h3>
          <p className="text-muted-foreground mt-2">
            Add your first product to get started.
          </p>
          <Button 
            className="mt-4" 
            onClick={() => {
              setSelectedProduct(null);
              setOpenDialog(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? 'Update the product details below'
                : 'Fill in the information to add a new product'}
            </DialogDescription>
          </DialogHeader>
          <AddProductForm
            onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
            initialValues={selectedProduct || {}}
            isEdit={!!selectedProduct}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
