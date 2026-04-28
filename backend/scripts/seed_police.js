const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/integrated_portal_db';

const WebContentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String },
  subCategory: { type: String },
  instructor: { type: String },
  image: { type: String },
  isFeatured: { type: Boolean, default: true },
  status: { type: String, default: 'published' },
  examDate: { type: Date },
  dynamicSections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

const WebContent = mongoose.model('WebContent', WebContentSchema, 'portal_web_content');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Remove existing "Explore Govt exam" content to avoid duplicates
    await WebContent.deleteMany({ category: 'Explore Govt exam' });
    await WebContent.deleteMany({ category: 'Police & Security Services' });

    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 45); // 45 days from now

    const policeData = new WebContent({
      section: 'exams',
      title: 'Maharashtra Police Bharti 2026',
      category: 'Explore Govt exam',
      subCategory: 'Security Forces',
      instructor: 'BK Training Team',
      image: '/Ashok stambh.png',
      isFeatured: true,
      examDate: examDate,
      dynamicSections: [
        {
          title: 'लेखी परीक्षा अभ्यासक्रम (Written Syllabus)',
          content: `• अंकगणित (Arithmetic): २५ गुण\n• बुद्धिमत्ता चाचणी (Intelligence Test): २५ गुण\n• मराठी व्याकरण (Marathi Grammar): २५ गुण\n• सामान्य ज्ञान व चालू घडामोडी (GK & Current Affairs): २५ गुण\n\nएकूण १०० गुणांची बहुपर्यायी परीक्षा असेल.`
        },
        {
          title: 'मैदानी चाचणी (Physical Test)',
          content: `मुलांसाठी (Boys):\n• १६०० मी धावणे (२० गुण)\n• १०० मी धावणे (१५ गुण)\n• गोळाफेक (१५ गुण)\n\nमुलींसाठी (Girls):\n• ८०० मी धावणे (२० गुण)\n• १०० मी धावणे (१५ गुण)\n• गोळाफेक (१५ गुण)`
        },
        {
          title: 'पात्रता (Eligibility)',
          content: `• शिक्षण: १२ वी उत्तीर्ण (पोलीस शिपाई), १० वी उत्तीर्ण (चालक/बॅण्डसमन)\n• वयोमर्यादा: १८ ते २८ वर्षे (खुल्या वर्गासाठी), ३३ वर्षांपर्यंत (राखीव)\n• उंची: मुले १६५ सेमी, मुली १५० सेमी`
        }
      ]
    });

    await policeData.save();
    console.log('✅ Seeded Police Bharti data into Explore Govt exam category');

    await mongoose.disconnect();
    console.log('✅ Disconnected');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
