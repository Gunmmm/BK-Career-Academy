const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized Access - No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (roles.length && !roles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden - Insufficient Permissions' });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
