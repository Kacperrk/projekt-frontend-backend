import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearBasket } from '../slices/basketSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmitOrder = () => {
    setConfirmed(true);
    dispatch(clearBasket());

    // Opcjonalne: po 3 sek. wraca do strony głównej
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <div>
      <h2>Podsumowanie zamówienia</h2>

      {products.length === 0 && !confirmed && <p>Koszyk jest pusty.</p>}

      {confirmed ? (
        <p><strong>Dziękujemy za zamówienie!</strong> Zostaniesz przekierowany na stronę główną.</p>
      ) : (
        <>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.title} – {product.author} – {product.price} zł × {product.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Razem do zapłaty:</strong> {total} zł</p>
          {products.length > 0 && (
            <button onClick={handleSubmitOrder}>Złóż zamówienie</button>
          )}
        </>
      )}
    </div>
  );
};

export default OrderSummary;
