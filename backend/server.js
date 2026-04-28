require('dotenv').config();
console.log('>>> SERVER.JS STARTING...');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3001;

// Connect to Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 BK Academy Backend running on http://localhost:${PORT}`);
  });
});
