import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearBasket } from '../slices/basketSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);

  return (
    <div>
      <h2>Twój koszyk</h2>
      {items.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{item.title}</strong> – {item.author} – {item.price} zł
              </li>
            ))}
          </ul>
          <p><strong>Razem:</strong> {total} zł</p>
          <button onClick={() => dispatch(clearBasket())}>
            Wyczyść koszyk
          </button>
        </div>
      )}
    </div>
  );
};

export default Basket;
