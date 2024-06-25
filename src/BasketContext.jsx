
import React, { createContext, useReducer, useContext } from 'react'

const BasketContext = createContext()

const initialState = {
  book: [],
  basket: [],
  total: 0,
}

const basketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, book: action.payload }
    case 'ADD_TO_BASKET': {
      const found = state.book.find(x => x.id === action.payload)
      const foundInBasket = state.basket.find(x => x.id === action.payload)

      let newBasket = null
      if (foundInBasket) {
        newBasket = state.basket.map(x => 
          x.id === action.payload ? { ...x, count: x.count + 1 } : x
        )
      } else {
        newBasket = [...state.basket, { ...found, count: 1 }]
      }
      const newTotal = newBasket.reduce((acc, item) => acc + item.price * item.count, 0)

      return { ...state, basket: newBasket, total: newTotal }
    }
    case 'INCREMENT_COUNT': {
      const newBasket = state.basket.map(x => 
        x.id === action.payload ? { ...x, count: x.count + 1 } : x
      )
      const newTotal = newBasket.reduce((acc, item) => acc + item.price * item.count, 0)

      return { ...state, basket: newBasket, total: newTotal }
    }
    case 'DECREMENT_COUNT': {
      const newBasket = state.basket.map(x => 
        x.id === action.payload ? { ...x, count: x.count === 1 ? x.count : x.count - 1 } : x
      )
      const newTotal = newBasket.reduce((acc, item) => acc + item.price * item.count, 0)

      return { ...state, basket: newBasket, total: newTotal }
    }
    case 'REMOVE_FROM_BASKET': {
      const newBasket = state.basket.filter(x => x.id !== action.payload)
      const newTotal = newBasket.reduce((acc, item) => acc + item.price * item.count, 0)

      return { ...state, basket: newBasket, total: newTotal }
    }
    case 'APPLY_SALE': {
      const newBasket = state.basket.map(x => 
        x.count >= 3 ? { ...x, count: x.count - 1 } : x
      )
      const newTotal = newBasket.reduce((acc, item) => acc + item.price * item.count, 0)

      return { ...state, basket: newBasket, total: newTotal }
    }
    default:
      return state
  }
}

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState)

  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => useContext(BasketContext)
