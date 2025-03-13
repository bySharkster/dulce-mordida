import { create } from 'zustand'
import type { ProductCategories } from '@/types/products'

interface ProductsStore {
  products: ProductCategories
  setProducts: (products: ProductCategories) => void
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: {
    cakes: [
      {
        id: "1",
        name: "Torta de Chocolate Clásica",
        description: "Delicioso bizcocho de chocolate con relleno de ganache y decoración artesanal",
        price: 45.99,
        image: "/images/products/chocolate-cake.jpg"
      },
      {
        id: "2",
        name: "Tres Leches Tradicional",
        description: "Suave bizcocho bañado en tres tipos de leche con crema batida",
        price: 39.99,
        image: "/images/products/tres-leches.jpg"
      },
      {
        id: "3",
        name: "Torta de Vainilla y Frutas",
        description: "Bizcocho de vainilla decorado con frutas frescas de temporada",
        price: 42.99,
        image: "/images/products/fruit-cake.jpg"
      }
    ],
    donuts: [
      {
        id: "4",
        name: "Donas Glaseadas",
        description: "Donas artesanales con glaseado tradicional",
        price: 2.99,
        image: "/images/products/glazed-donut.jpg"
      },
      {
        id: "5",
        name: "Donas de Chocolate",
        description: "Donas cubiertas de chocolate con chispas de colores",
        price: 3.49,
        image: "/images/products/chocolate-donut.jpg"
      },
      {
        id: "6",
        name: "Donas Rellenas",
        description: "Donas rellenas de crema pastelera o mermelada",
        price: 3.99,
        image: "/images/products/filled-donut.jpg"
      }
    ],
    coffee: [
      {
        id: "7",
        name: "Café Americano",
        description: "Café recién molido preparado al momento",
        price: 2.49,
        image: "/images/products/americano.jpg"
      },
      {
        id: "8",
        name: "Cappuccino",
        description: "Espresso con leche vaporizada y espuma",
        price: 3.99,
        image: "/images/products/cappuccino.jpg"
      },
      {
        id: "9",
        name: "Latte",
        description: "Café espresso con leche cremosa",
        price: 3.49,
        image: "/images/products/latte.jpg"
      }
    ]
  },
  setProducts: (products) => set({ products })
}))
