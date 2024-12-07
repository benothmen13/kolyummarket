import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = ({ cartItems = [], onPaymentSuccess = () => {}, userEmail = '' }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate the total amount of the cart
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0) * (item.prix || 0),
    0
  );

  // Handle the payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate payment form
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Please fill in all payment details.');
      setIsSubmitting(false);
      return;
    }

    const paymentData = {
      userEmail,
      cartItems,
      totalAmount,
    };

    try {
      const response = await fetch('http://localhost:3002/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Payment successful! A confirmation email has been sent.');
        onPaymentSuccess(); // Clear the cart or redirect the user
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
      alert('An error occurred while processing your payment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment</h2>

      <div className="payment-summary">
        <h3>Order Summary</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="payment-item">
              <span>{item.nomProduit}</span>
              <span>
                {item.quantity} x DTN {Number(item.prix || 0).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
        <div className="payment-total">
          <strong>Total: DTN {totalAmount.toFixed(2)}</strong>
        </div>
      </div>

      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9101 1121"
            maxLength={16}
            required
          />
        </div>

        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="pay-button">
          {isSubmitting ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
