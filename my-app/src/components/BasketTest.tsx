import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToBasket, clearBasket } from '../slices/basketSlice';

const BasketTest = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);

  const handleAdd = () => {
    dispatch(
      addToBasket({
        id: Math.random(),
        title: 'Testowa książka',
        author: 'Autor',
        price: 49.99,
      })
    );
  };

  return (
    <div>
      <h2>Koszyk (test)</h2>
      <button onClick={handleAdd}>Dodaj książkę</button>
      <button onClick={() => dispatch(clearBasket())}>Wyczyść</button>
      <p>Suma: {total} zł</p>
      <ul>
        {products.map((book, i) => (
          <li key={i}>{book.title} – {book.price} zł</li>
        ))}
      </ul>
    </div>
  );
};

export default BasketTest;
