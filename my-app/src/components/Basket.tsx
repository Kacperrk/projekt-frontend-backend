import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearBasket } from '../slices/basketSlice';

const Basket = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.total);

  return (
    <div>
      <h2>Koszyk</h2>
      {items.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item.title} – {item.price} zł</li>
            ))}
          </ul>
          <p>Suma: {total.toFixed(2)} zł</p>
          <button onClick={() => dispatch(clearBasket())}>Wyczyść koszyk</button>
        </>
      )}
    </div>
  );
};

export default Basket;
