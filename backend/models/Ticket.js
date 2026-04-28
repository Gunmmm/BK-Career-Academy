const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'resolved'] },
  isNew: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema, 'academic_support_tickets');
