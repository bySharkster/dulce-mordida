export interface ProductItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface ProductCategories {
  cakes: ProductItem[]
  donuts: ProductItem[]
  coffee: ProductItem[]
}

export interface CartItem extends ProductItem {
  quantity: number
  price: number
}


