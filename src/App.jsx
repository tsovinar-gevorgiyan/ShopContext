import React from 'react'
import './App.css'
import { ProductList } from './component/ProductList'
import { BasketList } from './component/BasketList'
import { BasketProvider } from './BasketContext'

const App = () => {
  return (
    <BasketProvider>
      <div className="row">
        <ProductList />
        <BasketList />
      </div>
    </BasketProvider>
  )
}

export default App
