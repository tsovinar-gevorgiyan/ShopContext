
import React, { useEffect } from 'react'
import { ProductItem } from './ProductItem'
import { useBasket } from '../BasketContext'

export const ProductList = () => {
  const { state, dispatch } = useBasket()

  useEffect(() => {
    fetch("http://localhost:3004/books")
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'SET_BOOKS', payload: res })
      })
  }, [dispatch])

  const moveToCart = id => {
    dispatch({ type: 'ADD_TO_BASKET', payload: id })
  }

  return (
    <div>
      <h3>Product List</h3>
      <div className="list">
        {state.book.map(elm => (
          <ProductItem key={elm.id} {...elm} onMove={moveToCart} />
        ))}
      </div>
    </div>
  )
}
