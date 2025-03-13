"use client"

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import type { ProductItem } from '@/types/products'

interface AddToCartProps {
  product: ProductItem
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const addToCart = useCartStore(state => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-primary hover:bg-primary/90 text-primary-foreground !rounded-button"
    >
      Agregar al Carrito
    </Button>
  )
}
