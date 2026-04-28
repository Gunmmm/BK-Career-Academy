const express = require('express');
const router = express.Router();
const { getNextFormMeta, submitRegistration } = require('../controllers/registrationController');
const validateRegistration = require('../middleware/validateRegistration');

const upload = require('../middleware/upload');

router.get('/next-form-meta', getNextFormMeta);
router.post('/submit', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), validateRegistration, submitRegistration);

module.exports = router;
