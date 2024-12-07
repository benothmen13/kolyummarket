import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import CartItem from './cartitem.js'; // Import the CartItem component

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  // Calculate total price of all items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.prix || 0) * (item.quantity || 1), 0)
      .toFixed(2); // Convert total to a fixed-point number
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/payment', { state: { cartItems, total: calculateTotal() } });
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {/* Render all items in the cart */}
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}

          {/* Display the total price */}
          <div className="cart-total">
            <h3>Total: DTN {calculateTotal()}</h3>
          </div>

          {/* Proceed to Checkout button */}
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;


