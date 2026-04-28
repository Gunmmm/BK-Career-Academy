const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Ticket = require('../models/Ticket');
const Download = require('../models/Download');

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
  if (msg.includes('help') || msg.includes('hello') || msg.includes('hi')) return "Aspirant, this is the BK Academy official portal. State your query regarding UPSC, MPSC or strategic admissions. Maintain protocol. JAY HIND.";
  if (msg.includes('fee') || msg.includes('price') || msg.includes('cost')) return "Fee structures are governed by academy regulations. Please provide your contact details via a Support Ticket for a formal fee schedule. JAY HIND.";
  if (msg.includes('time') || msg.includes('schedule') || msg.includes('batch')) return "Batch schedules are strategically planned for maximum efficiency. Our next major deployment (UPSC/MPSC) starts next month. Official details are available at our Nashik Headquarters. JAY HIND.";
  return null;
}

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) 
  : null;
const aiModel = genAI ? genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are a Senior Gazetted Officer and Chief Academic Dean at BK Career Academy. Your tone is strictly professional, highly disciplined, and authoritative. Use formal terminology (e.g., 'Aspirant', 'Protocol', 'Strategic Deployment'). Do not use emojis or informal greetings. Your mission is to provide accurate administrative and academic guidance for UPSC, MPSC, and other government services."
}) : null;

exports.getVisitorCount = async (req, res) => {
  try {
    const Visitors = mongoose.connection.collection('site_visitors');
    const result = await Visitors.findOneAndUpdate(
      { _id: 'global_counter' },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    
    const realIncrement = result && result.count ? result.count : 0;
    const baseCount = 125432; 
    res.json({ success: true, count: baseCount + realIncrement });
  } catch (err) {
    res.status(500).json({ success: false, count: 125432 });
  }
};

exports.trackDownload = async (req, res) => {
  try {
    const { formType, studentName } = req.body;
    await Download.create({
      formType,
      studentName: studentName || 'Guest Student',
      timestamp: new Date()
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.chat = async (req, res) => {
  console.log('>>> CHAT CONTROLLER HIT!');
  try {
    const { message } = req.body;
    
    // Log conversation (optional, could use a model)
    // await Chat.create({ message, timestamp: new Date() });

    const localReply = findLocalAnswer(message);
    if (localReply) {
      return res.json({ success: true, reply: localReply });
    }

    let response = "Namaste! I've recorded your query. For immediate assistance regarding admissions, please call us at 0253-2313962 or 9890633962.";
    if (aiModel) {
      const prompt = `Aspirant Query: "${message}"\n\nAcademy Knowledge Base: ${JSON.stringify(ACADEMY_KNOWLEDGE)}\n\nAdministrative Protocol:\n1. Respond as a high-ranking Government Officer.\n2. Maintain strict discipline and formal language.\n3. Address the specific exam or administrative query based on the Knowledge Base.\n4. If contact information is required, provide the Nashik Headquarters address formally.\n5. Conclude every communication with 'JAY HIND'.`;
      const result = await aiModel.generateContent(prompt);
      response = result.response.text();
    }
    
    res.json({ success: true, reply: response });
  } catch (err) {
    console.error('CHAT ERROR:', err);
    res.json({ 
      success: true, 
      reply: "OFFICIAL NOTICE: Our automated systems are undergoing maintenance. For immediate strategic guidance, please contact our Headquarters at 0253-2313962. JAY HIND." 
    });
  }
};

exports.raiseTicket = async (req, res) => {
  try {
    const { name, phone, issue } = req.body || {};
    if (!name || !phone || !issue) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    await Ticket.create({ name, phone, issue });
    res.status(201).json({ success: true, message: 'Ticket raised' });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
