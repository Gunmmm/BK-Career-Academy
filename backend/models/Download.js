const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  formType: { type: String, default: 'AdmissionForm' },
  studentName: { type: String, default: 'Guest Student' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Download', downloadSchema, 'academic_form_downloads');
