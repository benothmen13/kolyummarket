import React, { useState } from 'react';
import Cart from './cart.js';

const ParentComponent = () => {
  // Example initial cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nomProduit: 'Product A',
      price: 50.0,
      quantity: 1,
      imageBase64: 'https://via.placeholder.com/100', // Placeholder image
    },
    {
      id: 2,
      nomProduit: 'Product B',
      price: 30.0,
      quantity: 2,
      imageBase64: 'https://via.placeholder.com/100',
    },
  ]);

  // Function to handle quantity updates
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Corrected calculation for totalAmount
  const totalAmount = cartItems((total, item) => total + item.price * item.quantity, 0);

  // Function to handle item removal
  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <Cart
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        totalAmount={totalAmount} // Pass the totalAmount to the Cart component
      />
    </div>
  );
};

export default ParentComponent;
