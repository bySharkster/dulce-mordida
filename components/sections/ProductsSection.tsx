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

  // Función auxiliar para traducir categorías
  const getCategoryName = (category: keyof ProductCategories): string => {
    switch(category) {
      case 'cakes': return 'Pasteles'
      case 'donuts': return 'Donas'
      case 'coffee': return 'Café'
      default: return category
    }
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-4xl text-center font-great-vibes text-primary">Nuestras Deliciosas Ofertas</h2>
        <Tabs defaultValue="cakes" className="w-full">
          <div className="relative mb-8 w-full">
            <div className="flex absolute top-0 bottom-0 left-0 z-10 items-center w-8 bg-gradient-to-r to-transparent pointer-events-none from-background via-background/50 sm:hidden">
              <i className="ml-2 fas fa-chevron-left text-primary/50" />
            </div>
            <div className="overflow-x-auto relative scroll-smooth sm:overflow-y-hidden sm:py-0">
              <TabsList className="flex gap-2 px-8 py-2 mx-auto w-max">
                {(Object.keys(products) as Array<keyof ProductCategories>).map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="shrink-0 px-6 py-3 capitalize rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-primary/5 transition-colors cursor-pointer select-none border border-secondary "
                  >
                    <i className={`fas fa-${getCategoryIcon(category)} mr-2`}/>
                    {getCategoryName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="flex absolute top-0 right-0 bottom-0 z-10 justify-end items-center w-8 bg-gradient-to-l to-transparent pointer-events-none from-background via-background/50 sm:hidden">
              <i className="mr-2 fas fa-chevron-right text-primary/50" />
            </div>
          </div>
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
