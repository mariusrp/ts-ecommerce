export type Product = {
  _id: string
  name: string
  slug: string
  images: string[]
  category: string
  brand: string
  price: number
  countInStock: number
  description: string
  rating: number
  numReviews: number
  reviews: Review[]
}

export type Review = {
  _id?: string
  productId: string
  user: string
  email: string
  rating: number
  comment: string
  createdAt: string
}
