import { create } from 'zustand'
import { toast } from 'sonner'
import type { ProductItem } from '@/types/products'

interface CartItem extends ProductItem {
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  deliveryOption: 'delivery'
  orderDate: string
  orderTime: string
  addToCart: (product: ProductItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  calculateTotal: () => {
    subtotal: number
    tax: number
    total: number
  }
  clearCart: () => void
  setDeliveryOption: (option: 'delivery') => void
  setOrderDate: (date: string) => void
  setOrderTime: (time: string) => void
  getCartQuantity: () => number
}

const TAX_RATE = 0.115 // 11.5%

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  deliveryOption: 'delivery',
  orderDate: '',
  orderTime: '',

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id)

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        toast.success('¡Producto actualizado!')
        return { cart: updatedCart }
      }

      toast.success('¡Producto agregado al carrito!')
      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    })
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }))
    toast.success('¡Producto eliminado del carrito!')
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeFromCart(productId)
      return
    }

    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }))
  },

  calculateTotal: () => {
    const cart = get().cart
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax

    return {
      subtotal,
      tax,
      total,
    }
  },

  clearCart: () => {
    set({
      cart: [],
      deliveryOption: 'delivery',
      orderDate: '',
      orderTime: '',
    })
  },

  setDeliveryOption: (option) => {
    set({ deliveryOption: option })
  },

  setOrderDate: (date) => {
    set({ orderDate: date })
  },

  setOrderTime: (time) => {
    set({ orderTime: time })
  },

  getCartQuantity: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0)
  }
}))
