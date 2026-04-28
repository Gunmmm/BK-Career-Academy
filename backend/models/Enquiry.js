const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  address: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema, 'academic_student_enquiries');
