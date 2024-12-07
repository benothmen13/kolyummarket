const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password', // If using Gmail, use App Passwords
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer!',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Test email sent!');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

sendTestEmail();
