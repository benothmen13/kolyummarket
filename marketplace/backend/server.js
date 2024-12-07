const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create an instance of the express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,POST' })); // Allow frontend to connect
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy payment processor for testing
const dummyPaymentProcessor = (paymentData) => {
  console.log("Processing payment:", paymentData);
  return { success: true, message: "Payment processed successfully." };
};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benothmenbrahim69@gmail.com', // Your email
    pass: 'zief xahc lwsq ibbw', // Your app password or email password
  },
  debug: true, // Enable debugging
  logger: true, // Enable detailed logs
});

// Helper function to send email
const sendConfirmationEmail = async (userEmail, cartItems, totalAmount) => {
  const itemsHtml = cartItems
    .map(
      (item) =>
        `<li>${item.nomProduit}: ${item.quantity} x DTN ${Number(item.prix || 0).toFixed(2)}</li>`
    )
    .join('');

  const mailOptions = {
    from: 'benothmenbrahim69@gmail.com', // Sender email
    to: userEmail, // Recipient email
    subject: 'Payment Confirmation',
    text: `Your payment was successful! Total amount: DTN ${totalAmount.toFixed(2)}`,
    html: `
      <h1>Payment Confirmation</h1>
      <p>Thank you for your purchase! Here are your order details:</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total Amount: DTN ${totalAmount.toFixed(2)}</strong></p>
      <p>If you have any questions, please contact us.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email sending failed');
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.post('/confirm-payment', async (req, res) => {
  const { userEmail, cartItems, totalAmount } = req.body;

  // Validate incoming request
  if (!userEmail || !cartItems || cartItems.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'Invalid payment request. Please check your data.' });
  }

  try {
    // Process payment
    const result = dummyPaymentProcessor({ userEmail, cartItems, totalAmount });

    if (result.success) {
      // Send confirmation email
      await sendConfirmationEmail(userEmail, cartItems, totalAmount);

      // Respond with success
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: 'Payment failed. Please try again later.' });
    }
  } catch (error) {
    console.error('Error in payment processing:', error);
    res.status(500).json({ message: error.message || 'An error occurred during payment processing.' });
  }
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

