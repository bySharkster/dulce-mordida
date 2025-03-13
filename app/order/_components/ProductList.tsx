"use client"

import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ProductItem } from '@/types/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AddToCart } from '@/components/btns/addToCart'
import { useProductsStore } from '@/store/useProductsStore'

export const ProductList = () => {
  const products = useProductsStore(state => state.products)

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link href="/" data-readdy="true" className="flex gap-2 items-center text-primary hover:text-secondary">
          <i className="fas fa-arrow-left"/>
          Volver al Inicio
        </Link>
      </div>

      <Tabs defaultValue="cakes" className="w-full">
        <TabsList className="flex justify-start mb-8 bg-transparent">
          {Object.keys(products).map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="px-6 py-3 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <i className={`fas fa-${category === 'cakes' ? 'birthday-cake' : category === 'donuts' ? 'dot-circle' : 'coffee'} mr-2`}/>
              {category === 'cakes' ? 'Pasteles' : category === 'donuts' ? 'Donas' : 'Café'}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(products).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[calc(100vh-240px)] hide-scrollbar">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {items.map((product: ProductItem) => (
                  <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="overflow-hidden h-48">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-primary">{product.name}</h3>
                      <p className="mb-4 text-muted-foreground">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
                        <AddToCart product={product} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
