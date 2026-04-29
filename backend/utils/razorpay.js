const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_SUYpNkNbUNgC9A',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'AKRGkSxjRvogqGHf2hT1gKZy'
});

module.exports = razorpay;
