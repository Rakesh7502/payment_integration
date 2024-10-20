
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 8080;

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });
// app.get('/api/payment-key', (req, res) => {
//     res.json({ key: process.env.PAYMENT_GATEWAY_KEY });
// });
//api for post payment details 
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/payment', async (req, res) => {
    const { payment_id, name, email } = req.body;

    console.log('Received payment request:', { payment_id, name, email });

    // Here, we can verify the payment and save order details to database
    // razorpay sends a success response to the our server 
 
    //  our server receives the payment status from Razorpay.
    //  server verifies the payment details, updates the order status, and proceeds with order fulfillment.
    // The customer receives a confirmation of the successful transaction from our side

    // For now, we will assume the payment is verified for simplicity
    res.json({ success: true });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
