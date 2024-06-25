import React from 'react';
import { BasketItem} from './Basket'
import { useBasket } from '../BasketContext';

export const BasketList = () => {
  const { state, dispatch } = useBasket();

  const addToCart = id => {
    dispatch({ type: 'INCREMENT_COUNT', payload: id });
  };

  const minusFromCart = id => {
    dispatch({ type: 'DECREMENT_COUNT', payload: id });
  };

  const deleteFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: id });
  };

  const onSale = () => {
    dispatch({ type: 'APPLY_SALE' });
  };

  return (
    <div>
      <button onClick={onSale}>Sale</button>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Count</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.basket.map(elm => (
            <BasketItem
              key={elm.id}
              {...elm}
              onAdd={addToCart}
              onDown={minusFromCart}
              onDelete={deleteFromCart}
            />
          ))}
        </tbody>
      </table>
      <div>Total: {state.total}</div>
    </div>
  );
};
