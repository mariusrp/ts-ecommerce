export type CartItem = {
  image: string
  slug: string
  quantity: number
  countInStock: number
  price: number
  _id: string
  name: string
}

export type ShippingAdress = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type Cart = {
  cartItems: CartItem[]
  shippingAddress: ShippingAdress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}
