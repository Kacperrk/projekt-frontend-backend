import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeFromCart } from '../slices/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th align="left">Title</th>
              <th align="right">Quantity</th>
              <th align="right">Unit Price</th>
              <th align="right">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.itemId} style={{ borderBottom: '1px solid #eee' }}>
                <td>{item.title}</td>
                <td align="right">{item.quantity}</td>
                <td align="right">{item.unitPrice.toFixed(2)} zł</td>
                <td align="right">{(item.quantity * item.unitPrice).toFixed(2)} zł</td>
                <td align="center">
                  <button onClick={() => handleRemove(item.itemId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {items.length > 0 && (
        <h3 style={{ textAlign: 'right', marginTop: '1rem' }}>
          Total: {totalPrice.toFixed(2)} zł
        </h3>
      )}
    </div>
  );
};

export default CartPage;
