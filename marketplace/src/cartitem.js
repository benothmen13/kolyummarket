import React from 'react';
import './cartitem.css';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  // Ensure prix is converted to a number
  const price = Number(item.prix) || 0; 
  const quantity = Number(item.quantity) || 1;
  const subtotal = (price * quantity).toFixed(2); // Calculate subtotal

  return (
    <div className="cart-item">
      {/* Product image */}
      <img
        src={item.imageBase64 || 'https://via.placeholder.com/100'}
        alt={item.nomProduit || 'Product'}
        className="cart-item-image"
      />

      {/* Product details */}
      <div className="cart-item-details">
        <h4>{item.nomProduit || 'Unnamed Product'}</h4>

        {/* Display price and subtotal */}
        <p className="price">Prix unitaire : DTN {price.toFixed(2)}</p>
        <p className="subtotal">Sous-total : DTN {subtotal}</p>

        {/* Quantity controls and remove button */}
        <div className="cart-item-actions">
          <div className="quantity-control">
            <button
              aria-label="Decrease quantity"
              onClick={() => onUpdateQuantity(item.id, Math.max(quantity - 1, 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="remove-item"
            aria-label="Remove item"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
