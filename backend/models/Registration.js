const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  regNo: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  formNo: { 
    type: Number, 
    required: true, 
    unique: true, 
    index: true 
  },
  formNoDisplay: { 
    type: String 
  },
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  fatherName: { 
    type: String,
    trim: true
  },
  phone: { 
    type: String, 
    required: true,
    index: true,
    trim: true
  },
  alternatePhone: { 
    type: String,
    trim: true
  },
  email: { 
    type: String,
    index: true,
    lowercase: true,
    trim: true
  },
  dob: { 
    type: String 
  },
  gender: { 
    type: String 
  },
  address: { 
    type: String 
  },
  city: { 
    type: String 
  },
  state: { 
    type: String 
  },
  pincode: { 
    type: String 
  },
  course: { 
    type: String 
  },
  qualification: { 
    type: String 
  },
  schoolCollege: { 
    type: String 
  },
  notes: { 
    type: String 
  },
  status: { 
    type: String, 
    default: 'submitted' 
  },
  submittedBy: { 
    type: String, 
    default: 'public-form' 
  }
}, { 
  timestamps: true 
});

// Ensure indexes are created properly
RegistrationSchema.index({ createdAt: -1 });
RegistrationSchema.index({ fullName: 'text', phone: 'text', regNo: 'text' });

module.exports = mongoose.model('Registration', RegistrationSchema, 'academic_student_leads');
