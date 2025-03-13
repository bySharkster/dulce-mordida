export interface Testimonial {
    image: string
    quote: string
    name: string
    event: string
  }

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface ProductCategories {
  cakes: Product[]
  donuts: Product[]
  coffee: Product[]
}