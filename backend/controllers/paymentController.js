const razorpay = require('../utils/razorpay');
const crypto = require('crypto');
const Admission = require('../models/Admission');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public
exports.createOrder = asyncHandler(async (req, res) => {
  const { admissionId } = req.body;

  if (!admissionId) {
    return res.status(400).json({ success: false, message: 'Admission ID is required' });
  }

  const admission = await Admission.findById(admissionId);
  if (!admission) {
    return res.status(404).json({ success: false, message: 'Admission record not found' });
  }

  const amount = 199 * 100; // ₹199 in paise
  const options = {
    amount,
    currency: 'INR',
    receipt: `receipt_adm_${admissionId.substring(0, 10)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    
    // Save orderId to admission record
    admission.paymentOrderId = order.id;
    await admission.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: razorpay.key_id
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Public
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature,
    admissionId
  } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'AKRGkSxjRvogqGHf2hT1gKZy')
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    // Payment verified
    const admission = await Admission.findById(admissionId);
    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission record not found' });
    }

    admission.paymentId = razorpay_payment_id;
    admission.paymentStatus = 'Paid';
    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid signature, payment verification failed'
    });
  }
});
