
import React from 'react';
import { SidebarProvider } from '@/components/layout/Sidebar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ProductRegistrationForm } from '@/components/registration/ProductRegistrationForm';

const ProductRegistration = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background animate-fade-in">
        <Sidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary">Cadastro de Produtos</h1>
                <p className="text-muted-foreground mt-2">
                  Preencha os campos abaixo para cadastrar um novo produto no estoque.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg shadow-sm p-6">
                <ProductRegistrationForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProductRegistration;
