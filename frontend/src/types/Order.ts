import { CartItem, ShippingAdress } from './Cart'
import { User } from './User'

export type Order = {
  _id: string
  user: User
  orderItems: CartItem[]
  shippingAddress: ShippingAdress
  createdAt: string
  paymentMethod: string
  paidAt: string
  isPaid: boolean
  deliveredAt: string
  isDelivered: boolean
  totalPrice: number
  taxPrice: number
  shippingPrice: number
  itemsPrice: number
}
