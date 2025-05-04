import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addToBasket,         // ← dodany
  removeFromBasket,
  clearBasket,
  decreaseQuantity,
} from '../slices/basketSlice';

const Basket = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Twój koszyk</h2>
      {products.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              {product.title} – {product.author} – {product.price} zł × {product.quantity}
              <button
                onClick={() => dispatch(decreaseQuantity(product.id))}
                style={{ marginLeft: '10px' }}
              >–</button>
              <button
                onClick={() => dispatch(addToBasket(product))}
                style={{ marginLeft: '5px' }}
              >+</button>
              <button
                onClick={() => dispatch(removeFromBasket(product.id))}
                style={{ marginLeft: '5px' }}
              >Usuń</button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Łącznie:</strong> {total} zł</p>
      {products.length > 0 && (
        <button onClick={() => dispatch(clearBasket())}>Wyczyść koszyk</button>
      )}
    </div>
  );
};

export default Basket;
