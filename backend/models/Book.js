const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    default: 'General'
  },
  pdfUrl: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    default: 'published' 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Book', BookSchema);
