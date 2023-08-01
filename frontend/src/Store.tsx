import React from 'react'
import { Cart, CartItem, ShippingAdress } from './types/Cart'
import { UserInfo } from './types/UserInfo'

type Mode = 'light' | 'dark'

type AppState = {
  mode: Mode
  cart: Cart
  userInfo?: UserInfo
}

const getInitialMode = (): Mode => {
  const storedMode = localStorage.getItem('mode') as Mode
  const mode =
    storedMode ||
    (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')

  return mode
}

const getInitialCart = (): Cart => {
  const cart: Cart = {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') as string)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress') as string)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod') as string)
      : 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  }
  return cart
}

const getInitialUserInfo = (): UserInfo | undefined => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : undefined
  return userInfo
}

const initialState: AppState = {
  mode: getInitialMode(),
  cart: getInitialCart(),
  userInfo: getInitialUserInfo(),
}

type Action =
  | { type: 'TOGGLE_MODE' }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAdress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_MODE':
      localStorage.setItem('mode', state.mode === 'light' ? 'dark' : 'light')
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' }
    case 'ADD_TO_CART':
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    case 'REMOVE_FROM_CART':
      const id = action.payload
      const cartItemsAfterDelete = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItemsAfterDelete))
      return {
        ...state,
        cart: { ...state.cart, cartItems: cartItemsAfterDelete },
      }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return {
        mode:
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        cart: {
          cartItems: [],
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
          },
          paymentMethod: 'PayPal',
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      }
    case 'SAVE_PAYMENT_METHOD':
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
    default:
      return state
  }
}

const defaultDispatch = (): never => {
  throw new Error('Forgot to wrap component in a StoreProvider')
}

type StoreContextValue = {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const Store = React.createContext<StoreContextValue>({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
