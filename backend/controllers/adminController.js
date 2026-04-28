const Registration = require('../models/Registration');
const Ticket = require('../models/Ticket');
const Admission = require('../models/Admission');
const Download = require('../models/Download');
const Enquiry = require('../models/Enquiry');
const Book = require('../models/Book');
const asyncHandler = require('../utils/asyncHandler');


// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getStats = asyncHandler(async (req, res) => {
  const registrationsCount = await Registration.countDocuments();
  const admissionsCount = await Admission.countDocuments();
  const downloadsCount = await Download.countDocuments();
  const ticketsCount = await Ticket.countDocuments({ status: 'pending' });

  res.status(200).json({
    success: true,
    stats: {
      registrations: registrationsCount,
      admissions: admissionsCount,
      downloads: downloadsCount,
      tickets: ticketsCount
    }
  });
});

// @desc    Get all registrations
// @route   GET /api/admin/registrations
// @access  Private (Admin)
exports.getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    registrations
  });
});

// @desc    Get all tickets
// @route   GET /api/admin/tickets
// @access  Private (Admin)
exports.getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    tickets
  });
});

// @desc    Mark tickets as seen
// @route   POST /api/admin/tickets/seen
// @access  Private (Admin)
exports.markTicketsSeen = asyncHandler(async (req, res) => {
  await Ticket.updateMany({ isNew: true }, { $set: { isNew: false } });
  res.status(200).json({ success: true });
});

// @desc    Update ticket status
// @route   POST /api/admin/tickets/:id/status
// @access  Private (Admin)
exports.updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  await Ticket.findByIdAndUpdate(req.params.id, { status });
  res.status(200).json({ success: true });
});

// @desc    Get all admissions
// @route   GET /api/admin/admissions
// @access  Private (Admin)
exports.getAdmissions = asyncHandler(async (req, res) => {
  const admissions = await Admission.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    admissions
  });
});

// @desc    Get all downloads
// @route   GET /api/admin/downloads
// @access  Private (Admin)
exports.getDownloads = asyncHandler(async (req, res) => {
  const downloads = await Download.find().sort({ timestamp: -1 });
  res.status(200).json({
    success: true,
    downloads
  });
});

// @desc    Get all enquiries
// @route   GET /api/admin/enquiries
// @access  Private (Admin)
exports.getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ timestamp: -1 });
  res.status(200).json({
    success: true,
    enquiries
  });
});

// @desc    Bulk delete registrations
// @route   POST /api/admin/registrations/bulk-delete
// @access  Private (Admin)
exports.bulkDeleteRegistrations = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await Registration.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ success: true, message: 'Leads deleted successfully' });
});

// @desc    Bulk delete admissions
// @route   POST /api/admin/admissions/bulk-delete
// @access  Private (Admin)
exports.bulkDeleteAdmissions = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await Admission.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ success: true, message: 'Admissions deleted successfully' });
});

// @desc    Bulk delete tickets
// @route   POST /api/admin/tickets/bulk-delete
// @access  Private (Admin)
exports.bulkDeleteTickets = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await Ticket.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ success: true, message: 'Tickets deleted successfully' });
});

// @desc    Bulk delete enquiries
// @route   POST /api/admin/enquiries/bulk-delete
// @access  Private (Admin)
exports.bulkDeleteEnquiries = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  await Enquiry.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ success: true, message: 'Enquiries deleted successfully' });
});

// @desc    Bulk delete books
// @route   POST /api/admin/books/bulk-delete
// @access  Private (Admin)
exports.bulkDeleteBooks = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: 'Invalid IDs' });
  }
  await Book.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ success: true, message: 'Books deleted successfully' });
});


// @desc    Export data to CSV/JSON
// @route   GET /api/admin/export
// @access  Private (Admin)
exports.exportData = asyncHandler(async (req, res) => {
  const format = req.query.format || 'json';
  const registrations = await Registration.find().sort({ createdAt: -1 });
  const fileName = `registrations-backup-${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    const fields = ['regNo', 'formNoDisplay', 'fullName', 'phone', 'email', 'course', 'createdAt'];
    const csvRows = [fields.join(',')];
    for (const reg of registrations) {
      const row = fields.map(field => {
        const value = reg[field] ? reg[field].toString().replace(/,/g, ' ') : '';
        return `"${value}"`;
      });
      csvRows.push(row.join(','));
    }
    res.header('Content-Type', 'text/csv');
    res.attachment(`${fileName}.csv`);
    return res.send(csvRows.join('\n'));
  }

  res.header('Content-Type', 'application/json');
  res.attachment(`${fileName}.json`);
  res.send(JSON.stringify(registrations, null, 2));
});
