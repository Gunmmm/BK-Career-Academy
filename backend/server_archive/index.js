import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://bkgroupofeducation_db_user:a0vC9cltkSPe2uoZ@gurukul.lwoiufk.mongodb.net/gurukul?retryWrites=true&w=majority';
const DB_NAME = 'gurukul';
const COLLECTION_NAME = 'registrations';

let db;
let client;

async function connectToMongo() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

connectToMongo();

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, course, category } = req.body;
    
    if (!name || !email || !phone || !course) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    const registrationData = {
      name,
      email,
      phone,
      course,
      category: category || '',
      createdAt: new Date(),
      status: 'pending'
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(registrationData);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: { id: result.insertedId }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await db.collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    
    res.json({ success: true, data: registrations });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ success: false, message: 'Error fetching registrations' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});