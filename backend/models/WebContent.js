const mongoose = require('mongoose');

const WebContentSchema = new mongoose.Schema({
  section: { type: String, required: true, index: true }, // 'courses', 'upsc_hub', etc.
  title: { type: String, required: true },
  category: { type: String }, 
  subCategory: { type: String }, 
  instructor: { type: String },
  image: { type: String },
  isFeatured: { type: Boolean, default: true },
  status: { type: String, default: 'published' },
  examDate: { type: Date }, // Exam date for countdown timer
  buttonUrl: { type: String }, // For hero watch URL or other CTAs
  media: [{
    mediaType: { type: String, enum: ['youtube', 'video', 'image'], default: 'image' },
    src: { type: String },
    title: { type: String },
    poster: { type: String }
  }],
  // Dynamic Sections Array
  dynamicSections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('WebContent', WebContentSchema, 'portal_web_content');
