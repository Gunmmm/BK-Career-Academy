const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category: { $regex: category, $options: 'i' } } : {};
  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, items: books });
}));

// @desc    Add a new book
// @route   POST /api/books
// @access  Private (Admin)
router.post('/', authenticate, authorize(['Super Admin']), upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
  }

  const { title, category, description } = req.body;
  const book = await Book.create({
    title,
    category,
    description,
    pdfUrl: `/uploads/${req.file.filename}`
  });

  res.status(201).json({ success: true, data: book });
}));

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (Admin)
router.put('/:id', authenticate, authorize(['Super Admin']), asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { title, category, description },
    { new: true, runValidators: true }
  );
  
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  res.json({ success: true, data: book });
}));

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private (Admin)
router.delete('/:id', authenticate, authorize(['Super Admin']), asyncHandler(async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Book deleted successfully' });
}));

module.exports = router;
