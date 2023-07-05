import React from 'react'

type Mode = 'light' | 'dark'

type AppState = {
  mode: Mode
}

const getInitialMode = (): Mode => {
  const storedMode = localStorage.getItem('mode')
  if (storedMode) {
    return storedMode as Mode
  }

  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const initialState: AppState = {
  mode: getInitialMode(),
}

type Action = { type: 'TOGGLE_MODE' }

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      return { mode: state.mode === 'light' ? 'dark' : 'light' }
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
