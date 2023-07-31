import { CartItem, ShippingAdress } from './Cart'
import { User } from './User'

export type Order = {
  _id: string
  user: User
  OrderItems: CartItem[]
  shippingAddress: ShippingAdress
  createdAt: string
  paymentMethod: string
  payedAt: string
  isPaid: boolean
  deliveredAt: string
  isDelivered: boolean
  totalPrice: number
  taxPrice: number
  shippingPrice: number
  itemsPrice: number
}
