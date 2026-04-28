const express = require('express');
console.log('>>> APP.JS LOADING...');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const Counter = require('./models/Counter');
const Registration = require('./models/Registration');
const Enquiry = require('./models/Enquiry');
const formatFormNo = require('./utils/formatFormNo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Version identification & Logger
app.use((req, res, next) => {
  res.setHeader('X-Server-Version', '2.0.1-mongoose');
  console.log(`[DEBUG] ${req.method} ${req.url} (Content-Type: ${req.headers['content-type']})`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, version: '2.0.1-mongoose', timestamp: new Date() });
});

app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'Backend is ALIVE' });
});

app.post('/api/post-ping', (req, res) => {
  res.json({ success: true, message: 'POST PING ALIVE' });
});

// Lightweight inquiry endpoint used by the website modal.
app.post('/api/register', async (req, res, next) => {
  try {
    const {
      name = '',
      email = '',
      phone = '',
      category = '',
      subCategory = '',
      address = ''
    } = req.body || {};

    const errors = [];

    if (name.trim().length < 2) errors.push('Name is required');
    if (!/\S+@\S+\.\S+/.test(email.trim())) errors.push('Valid email is required');
    if (!/^\d{10}$/.test(phone.trim())) errors.push('Valid 10-digit phone is required');
    if (!category.trim()) errors.push('Primary service is required');
    if (!subCategory.trim()) errors.push('Sub-service / exam is required');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: errors
      });
    }

    const counter = await Counter.findOneAndUpdate(
      { _id: 'student_form' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const formNo = counter.seq;
    const year = new Date().getFullYear();
    const regNo = `BK-${year}-${formNo.toString().padStart(4, '0')}`;

    await Enquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      category: category.trim(),
      subCategory: subCategory.trim(),
      address: address.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully'
    });
  } catch (err) {
    next(err);
  }
});

// Routes
const registrationRoutes = require('./routes/registration');
const adminRoutes = require('./routes/admin');
const systemRoutes = require('./routes/system');
const contentRoutes = require('./routes/content');
const bookRoutes = require('./routes/book');

// Mount Routes
app.use('/api', systemRoutes); 
app.use('/api/registration', registrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/books', bookRoutes);

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));


// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.url} not found`
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
