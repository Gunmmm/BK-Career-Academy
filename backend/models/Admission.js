const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  salutation: String,
  firstName: String,
  middleName: String,
  surname: String,
  firstNameLocal: String,
  middleNameLocal: String,
  surnameLocal: String,
  fatherName: String,
  motherName: String,
  motherTongue: String,
  dob: String,
  age: String,
  gender: String,
  mobileSelf: String,
  mobileParents: String,
  email: String,
  schoolName: String,
  examCategory: String,
  courses: String, // Stringified array from frontend
  category: String,
  isIndianNational: String,
  isMaharashtraDomiciled: String,
  isNonCreamyLayer: String,
  fatherOccupation: String,
  fatherMobile: String,
  fatherEducation: String,
  motherEducation: String,
  maritalStatus: String,
  isDisabled: String,
  disabilityType: String,
  place: String,
  registrationNo: String,
  otherCategory: String,
  formNo: String,
  photoUrl: String,
  signatureUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema, 'academic_admissions');
