
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Package, ShoppingCart, Save, RotateCcw } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome do produto deve ter pelo menos 2 caracteres.',
  }),
  sku: z.string().min(3, {
    message: 'O SKU deve ter pelo menos 3 caracteres.',
  }),
  category: z.string({
    required_error: 'Selecione uma categoria.',
  }),
  quantity: z.coerce.number().min(0, {
    message: 'A quantidade deve ser um número positivo.',
  }),
  price: z.coerce.number().min(0.01, {
    message: 'O preço deve ser maior que 0.',
  }),
  threshold: z.coerce.number().min(0, {
    message: 'O limite mínimo deve ser um número positivo.',
  }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  supplier: z.string().optional(),
});

const categories = [
  'Eletrônicos',
  'Vestuário',
  'Alimentos',
  'Bebidas',
  'Material de Escritório',
  'Móveis',
  'Outros',
];

export const ProductRegistrationForm = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      quantity: 0,
      price: 0,
      threshold: 5,
      imageUrl: '',
      description: '',
      supplier: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: 'Produto cadastrado',
      description: `${values.name} foi adicionado ao estoque com sucesso.`,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary text-lg font-semibold border-b border-border pb-2">
              <Package className="h-5 w-5" />
              <h2>Informações do Produto</h2>
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o código SKU" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormDescription>
                    Código único identificador do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus-visible:ring-primary">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do fornecedor" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/imagem.jpg" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormDescription>
                    URL para a imagem do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary text-lg font-semibold border-b border-border pb-2">
              <ShoppingCart className="h-5 w-5" />
              <h2>Estoque e Preço</h2>
            </div>
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormDescription>
                    Quantidade atual em estoque
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormDescription>
                    Preço por unidade
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limite Mínimo de Estoque</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="border-primary/20 focus-visible:ring-primary" />
                  </FormControl>
                  <FormDescription>
                    Alerta quando o estoque ficar abaixo deste nível
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhes do produto..." 
                      className="min-h-[120px] border-primary/20 focus-visible:ring-primary"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => form.reset()}
            className="border-primary/20 text-primary hover:bg-primary/5"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="mr-2 h-4 w-4" />
            Cadastrar Produto
          </Button>
        </div>
      </form>
    </Form>
  );
};
