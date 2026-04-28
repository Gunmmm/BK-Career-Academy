const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');
const { 
  getStats, 
  getRegistrations, 
  getTickets, 
  markTicketsSeen, 
  updateTicketStatus, 
  getAdmissions, 
  getDownloads, 
  getEnquiries, 
  exportData,
  bulkDeleteRegistrations,
  bulkDeleteAdmissions,
  bulkDeleteTickets,
  bulkDeleteEnquiries,
  bulkDeleteBooks
} = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');

// [AUTH] Admin Login (Keep existing bypass logic for user convenience)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const normalizedUsername = username.toLowerCase().trim();
  
  // Master Bypass for testing
  if (normalizedUsername === 'superadmin' && password.trim() === 'bk@admin2026') {
    const token = jwt.sign(
      { username: 'superadmin', role: 'Super Admin' }, 
      JWT_SECRET, 
      { expiresIn: '8h' }
    );
    return res.status(200).json({
      success: true,
      token,
      admin: { username: 'superadmin', role: 'Super Admin' }
    });
  }

  res.status(401).json({ success: false, message: 'Invalid Credentials' });
});

// Protected Admin Routes
router.get('/dashboard', authenticate, getStats);
router.get('/registrations', authenticate, getRegistrations);
router.get('/tickets', authenticate, getTickets);
router.post('/tickets/seen', authenticate, markTicketsSeen);
router.post('/tickets/:id/status', authenticate, updateTicketStatus);
router.get('/admissions', authenticate, getAdmissions);
router.get('/downloads', authenticate, getDownloads);
router.get('/enquiries', authenticate, getEnquiries);
router.get('/export', authenticate, exportData);

// Bulk Deletion Routes
router.post('/registrations/bulk-delete', authenticate, bulkDeleteRegistrations);
router.post('/admissions/bulk-delete', authenticate, bulkDeleteAdmissions);
router.post('/tickets/bulk-delete', authenticate, bulkDeleteTickets);
router.post('/enquiries/bulk-delete', authenticate, bulkDeleteEnquiries);
router.post('/books/bulk-delete', authenticate, bulkDeleteBooks);


module.exports = router;
