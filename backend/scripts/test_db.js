const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://localhost:27017/integrated_portal_db').then(async () => {
  const books = await Book.find({ category: { $regex: 'UPSC', $options: 'i' } });
  console.log(books.length);
  process.exit(0);
}).catch(console.error);
