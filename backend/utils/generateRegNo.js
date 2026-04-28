const Registration = require('../models/Registration');

const generateRandomString = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateRegNo = async (prefix = 'BK', includeYear = true) => {
  const year = includeYear ? new Date().getFullYear() : '';
  let isUnique = false;
  let regNo = '';
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    const randomPart = generateRandomString(6);
    regNo = `${prefix}${year ? '-' + year : ''}-${randomPart}`;
    
    // Check if duplicate exists
    const existing = await Registration.findOne({ regNo });
    if (!existing) {
      isUnique = true;
    }
    attempts++;
  }

  if (!isUnique) {
    // Fallback if random part fails multiple times (very rare)
    regNo = `${prefix}${year}-${Date.now().toString().slice(-6)}`;
  }

  return regNo;
};

module.exports = generateRegNo;
