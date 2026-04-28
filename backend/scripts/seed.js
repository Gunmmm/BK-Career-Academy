const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = 'integrated_portal_db';

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    const db = client.db(DB_NAME);

    // Seed Courses
    const courses = [
      { 
        title: "UPSC Civil Services (IAS, IPS, IFS)", 
        category: "Civil Services", 
        instructor: "Dr. Arjun Sharma", 
        isNew: false, 
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
        status: 'published',
        createdAt: new Date()
      },
      { 
        title: "SSC CGL (Graduate Level) - Batch 2026", 
        category: "SSC", 
        instructor: "Prof. Marcus Thorne", 
        isNew: true, 
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        status: 'published',
        createdAt: new Date()
      },
      { 
        title: "Banking & Finance Mastery (IBPS/SBI)", 
        category: "Banking", 
        instructor: "Meera Deshmukh", 
        isNew: true, 
        image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800",
        status: 'published',
        createdAt: new Date()
      }
    ];

    await db.collection('academic_courses').deleteMany({});
    await db.collection('academic_courses').insertMany(courses);
    console.log('✅ Seeded academic_courses');

    // Create default Admin if not exists
    const admin = {
      username: 'admin',
      password: 'password123', // In a real app, this should be hashed
      role: 'superadmin'
    };
    await db.collection('academic_admins').updateOne(
      { username: 'admin' },
      { $set: admin },
      { upsert: true }
    );
    console.log('✅ Admin credentials set: admin / password123');

    console.log('🚀 Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await client.close();
  }
}

seed();
