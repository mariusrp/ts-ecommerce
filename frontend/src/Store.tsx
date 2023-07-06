import React from 'react'
import { Cart, CartItem } from './types/Cart'

type Mode = 'light' | 'dark'

type AppState = {
  mode: Mode
  cart: Cart
}

const getInitialMode = (): Mode => {
  const storedMode = localStorage.getItem('mode') as Mode
  const mode =
    storedMode ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light'

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
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  }
  return cart
}

const initialState: AppState = {
  mode: getInitialMode(),
  cart: getInitialCart(),
}

type Action =
  | { type: 'TOGGLE_MODE' }
  | { type: 'ADD_TO_CART'; payload: CartItem }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_MODE':
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
