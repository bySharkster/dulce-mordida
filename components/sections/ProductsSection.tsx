"use client"

import type { Product, ProductCategories } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card } from "../ui/card"
import Image from "next/image"
import { AddToCart } from "../btns/addToCart"

interface ProductsSectionProps {
  products: ProductCategories
}

export const ProductsSection = ({ products }: ProductsSectionProps) => {
  
  // Función auxiliar para obtener el icono basado en la categoría
  const getCategoryIcon = (category: keyof ProductCategories): string => {
    switch(category) {
      case 'cakes': return 'birthday-cake'
      case 'donuts': return 'dot-circle'
      case 'coffee': return 'coffee'
      default: return 'circle'
    }
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl text-center font-great-vibes text-primary">Nuestras Deliciosas Ofertas</h2>
        <Tabs defaultValue="cakes" className="w-full">
          <TabsList className="flex justify-center mb-8">
            {(Object.keys(products) as Array<keyof ProductCategories>).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-6 py-3 capitalize"
              >
                <i className={`fas fa-${getCategoryIcon(category)} mr-2`}/>
                {category === 'cakes' ? 'Pasteles' : category === 'donuts' ? 'Donas' : 'Café'}
              </TabsTrigger>
            ))}
          </TabsList>
          {(Object.entries(products) as [keyof ProductCategories, Product[]][]).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="overflow-hidden h-48">
                      <Image src={product.image} alt={product.name} className="object-cover w-full h-full" width={300} height={300} />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-great-vibes text-primary">{product.name}</h3>
                      <p className="mb-4 text-gray-600">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary">${product.price}</span>
                       <AddToCart product={product} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
