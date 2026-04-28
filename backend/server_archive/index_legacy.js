const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
const path = require('path');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Configuration
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/integrated_portal_db';
const DB_NAME = 'integrated_portal_db';
const REGISTRATION_COLLECTION = 'academic_student_leads';
const CHAT_COLLECTION = 'academic_ai_conversations';
const TICKETS_COLLECTION = 'academic_support_tickets';
const ADMISSIONS_COLLECTION = 'academic_admissions';
const DOWNLOADS_COLLECTION = 'academic_form_downloads';
const VISITORS_COLLECTION = 'site_visitors';
const COUNTERS_COLLECTION = 'system_counters';

let db = null;

// [ADMISSIONS] Get Next Registration & Form Numbers (PRIORITY)
app.get('/api/admission/next-numbers', async (req, res) => {
  try {
    if (!db) return res.json({ success: true, regNo: 'BK-2026-0001', formNo: 'FRM-0001' });
    
    // Just preview the next number without incrementing
    const counter = await db.collection(COUNTERS_COLLECTION).findOne({ _id: 'admission_no' });
    const nextSeq = (counter ? counter.seq : 0) + 1;
    const nextNum = nextSeq.toString().padStart(4, '0');
    
    res.json({ 
      success: true, 
      regNo: `BK-2026-${nextNum}`, 
      formNo: `FRM-${nextNum}` 
    });
  } catch (err) {
    res.json({ success: true, regNo: 'BK-2026-PREV', formNo: 'FRM-PREV' });
  }
});
let client = null;

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../frontend/public/uploads/'),
  filename: (req, file, cb) => cb(null, `img-${Date.now()}-${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// Initialize Routes
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

// Initialize Gemini AI
const GEMINI_KEY = process.env.GEMINI_API_KEY;
let genAI = null;
let aiModel = null;

if (GEMINI_KEY && GEMINI_KEY !== "MY_GEMINI_API_KEY") {
  genAI = new GoogleGenerativeAI(GEMINI_KEY);
  aiModel = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the BK Academy Assistant, a professional academic counselor for BK Career Academy. Your tone is authoritative yet encouraging."
  });
}

async function connectToMongo() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);   // short message
    console.error(err.stack);     // full error stack
    console.log("\nTIP: Ensure your IP is whitelisted in MongoDB Atlas and your network allows SRV lookups.");
    db = null;
  }
}

connectToMongo();

// [DEBUG] Content Route Logger
app.post('/api/content/*', (req, res, next) => {
  console.log(`[API HIT] ${req.method} ${req.url}`);
  next();
});

// Direct Content Routes
app.use('/api/content', contentRoutes);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    if (!data.name || !data.email || !data.phone) return res.status(400).json({ success: false });
    if (db) {
      await db.collection(REGISTRATION_COLLECTION).insertOne({ ...data, createdAt: new Date() });
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: true, isOffline: true });
    }
  } catch (err) { res.status(500).json({ success: false }); }
});

// Visitor Count Endpoint (Real Tracker)
app.get('/api/visitor-count', async (req, res) => {
  try {
    if (db) {
      const result = await db.collection(VISITORS_COLLECTION).findOneAndUpdate(
        { _id: 'global_counter' },
        { $inc: { count: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      
      const realIncrement = result && result.count ? result.count : 0;
      const baseCount = 125432; 
      res.json({ success: true, count: baseCount + realIncrement });
    } else {
      res.json({ success: true, count: 125432, isOffline: true });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Admission Form Endpoint
app.post('/api/admission', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};
    
    let finalRegNo = data.registrationNo;
    let finalFormNo = data.formNo;

    if (db) {
      // Atomic increment only on successful submission
      const counter = await db.collection(COUNTERS_COLLECTION).findOneAndUpdate(
        { _id: 'admission_no' },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
      const nextNum = (counter.seq || 1).toString().padStart(4, '0');
      finalRegNo = `BK-2026-${nextNum}`;
      finalFormNo = `FRM-${nextNum}`;
    }

    const admissionData = {
      ...data,
      registrationNo: finalRegNo,
      formNo: finalFormNo,
      photoUrl: files.photo ? `/uploads/${files.photo[0].filename}` : null,
      signatureUrl: files.signature ? `/uploads/${files.signature[0].filename}` : null,
      createdAt: new Date()
    };
    
    if (db) {
       await db.collection(ADMISSIONS_COLLECTION).insertOne(admissionData);
       res.json({ success: true, regNo: finalRegNo, formNo: finalFormNo });
    } else {
       res.status(201).json({ success: true, isOffline: true, regNo: finalRegNo });
    }
  } catch(err) {
    res.status(500).json({ success: false });
  }
});

// Track Downloads
app.post('/api/track/download', async (req, res) => {
  try {
    if (db) {
      await db.collection(DOWNLOADS_COLLECTION).insertOne({
        formType: req.body.formType || 'AdmissionForm',
        studentName: req.body.studentName || 'Guest Student',
        timestamp: new Date()
      });
    }
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ success: false });
  }
});

// Knowledge Base for the Assistant
const ACADEMY_KNOWLEDGE = {
  name: "BK Career Academy (Education & Welfare Society)",
  location: "2nd Floor, Gajanan Plaza, Gharpura Ghat Rd, Nashik, Maharashtra 422002",
  phone: "0253-2313962 / 9890633962",
  email: "bkgroupofeducation@gmail.com",
  vision: "To be the most trusted platform for civil services preparation, nurturing future leaders with integrity.",
  exams: [
    "UPSC: IAS, IPS, IFS, IFoS, Engineering Services (ESE), CAPF, IES/ISS",
    "MPSC: Rajyaseva (State Services), Forest, Agriculture, Engineering Services, Subordinate Services",
    "SSC: CGL, CHSL, MTS, GD Constable, JE, CPO, Stenographer",
    "Banking: IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B, NABARD",
    "Defence: NDA, CDS, AFCAT, INET, Territorial Army",
    "Teaching: MAHA TET, CTET, UGC NET, KVS/NVS",
    "Others: Railway (RRB NTPC), Insurance (LIC/NICL), GATE, Law (CLAT)",
  ],
  stats: "500+ Experts, 10K+ Careers Defined, 95% Success Rate"
};

function findLocalAnswer(message) {
  const msg = message.toLowerCase();
  if (msg.includes('upsc')) return "At BK Career Academy, our UPSC program covers IAS, IPS, and IFS with a focus on Phase 1 (Prelims) and Phase 2 (Mains) strategy. Our next batch for UPSC 2026 is now open!";
  if (msg.includes('mpsc')) return "We are specialists in MPSC (Maharashtra Services). We provide comprehensive GS and CSAT notes, State Board textbook analysis, and Answer Writing practice for Rajyaseva.";
  if (msg.includes('contact') || msg.includes('call') || msg.includes('phone') || msg.includes('address')) {
    return `You can visit us at: ${ACADEMY_KNOWLEDGE.location}. \n📞 Call: ${ACADEMY_KNOWLEDGE.phone} \n✉️ Email: ${ACADEMY_KNOWLEDGE.email}`;
  }
  if (msg.includes('ssc') || msg.includes('banking')) return "We offer elite coaching for SSC CGL and Banking (IBPS/SBI) exams with full-length mock tests and expert-led strategy sessions.";
  if (msg.includes('ticket') || msg.includes('issue') || msg.includes('complaint')) return "I understand you have an issue. You can raise a support ticket directly here and our team will get back to you within 24 hours. Just click 'Raise Ticket'.";
  if (msg.includes('help') || msg.includes('hello') || msg.includes('hi')) return "Namaste! I am your BK Academy Assistant. I can guide you on UPSC, MPSC, Banking, SSC, or share our contact details. What are you preparing for?";
  return null;
}

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (db) await db.collection(CHAT_COLLECTION).insertOne({ message, timestamp: new Date() });
    
    // 1. Try Local Knowledge First
    const localReply = findLocalAnswer(message);
    if (localReply) {
      return res.json({ success: true, reply: localReply });
    }

    // 2. Try Gemini AI if available
    let response = "Namaste! I've recorded your query. For immediate assistance regarding admissions, please call us at 0253-2313962 or 9890633962.";
    if (aiModel) {
      const prompt = `User Query: "${message}"\n\nContext about BK Career Academy: ${JSON.stringify(ACADEMY_KNOWLEDGE)}\n\nInstructions: Answer the user's query professionally. If they ask about exams, mention the specific ones we cover. If they ask for contact, give the Nashik address. Always end with 'Jay Hind'.`;
      const result = await aiModel.generateContent(prompt);
      response = result.response.text();
    }
    
    res.json({ success: true, reply: response });
  } catch (err) { 
    res.status(500).json({ success: false, message: "Server error in assistant unit." }); 
  }
});

// Ticket Creation Endpoint
app.post('/api/tickets', async (req, res) => {
  try {
    const { name, phone, issue } = req.body;
    if (!name || !phone || !issue) return res.status(400).json({ success: false, message: "Missing required fields" });
    
    const ticketData = {
      name,
      phone,
      issue,
      status: 'pending',
      createdAt: new Date(),
      isNew: true
    };

    if (db) {
      await db.collection(TICKETS_COLLECTION).insertOne(ticketData);
      res.json({ success: true, message: "Ticket raised successfully!" });
    } else {
      res.status(202).json({ success: true, isOffline: true, message: "Ticket received (Offline Mode)" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to raise ticket" });
  }
});

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Health check endpoint (Check if backend is running)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: db ? 'connected' : 'offline_mode',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date()
  });
});

// API 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// SPA fallback (VERY IMPORTANT - last route)
// Note: Express 5 requires the {*path} syntax for wildcards
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Advanced API Services live at http://localhost:${PORT}`);
});
