const express = require('express');
const router = express.Router();
console.log('>>> SYSTEM ROUTES LOADING...');
const systemController = require('../controllers/systemController');

router.get('/visitor-count', systemController.getVisitorCount);
router.post('/track/download', systemController.trackDownload);
router.post('/tickets', systemController.raiseTicket);
router.post('/chat', systemController.chat);

module.exports = router;
