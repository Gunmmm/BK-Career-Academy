const Admission = require('../models/Admission');
const Counter = require('../models/Counter');
const formatFormNo = require('../utils/formatFormNo');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get next preview data
// @route   GET /api/registration/next-form-meta
// @access  Public
exports.getNextFormMeta = asyncHandler(async (req, res) => {
  const counter = await Counter.findOne({ _id: 'student_form' });
  const nextSeq = (counter ? counter.seq : 0) + 1;
  const nextFormNo = formatFormNo(nextSeq);
  const year = new Date().getFullYear();
  const nextRegNo = `BK-${year}-${nextSeq.toString().padStart(4, '0')}`;

  res.status(200).json({
    success: true,
    nextFormNo,
    nextFormNoRaw: nextSeq,
    nextRegNo,
    registrationStatus: "AUTO-GENERATED"
  });
});


// @desc    Submit registration form
// @route   POST /api/registration/submit
// @access  Public
exports.submitRegistration = asyncHandler(async (req, res) => {
  // 0. Check for existing email to prevent duplicate admissions
  const existingAdmission = await Admission.findOne({ email: req.body.email });
  if (existingAdmission) {
    return res.status(400).json({ 
      success: false, 
      message: 'REGISTRATION ERROR: This Email ID is already registered in our database. Please use a different email or contact admin if you need to update your record.' 
    });
  }

  // 1. Get atomic next sequence number
  const counter = await Counter.findOneAndUpdate(
    { _id: 'student_form' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  
  const formNoRaw = counter.seq;
  const formNoDisplay = formatFormNo(formNoRaw);

  // 2. Sync registration number with form sequence
  const year = new Date().getFullYear();
  const regNo = `BK-${year}-${formNoRaw.toString().padStart(4, '0')}`;


  // 3. Save full admission details
  const admissionData = {
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    surname: req.body.surname,
    firstNameLocal: req.body.firstNameLocal,
    middleNameLocal: req.body.middleNameLocal,
    surnameLocal: req.body.surnameLocal,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    motherTongue: req.body.motherTongue,
    dob: req.body.dob,
    age: req.body.age,
    gender: req.body.gender,
    mobileSelf: req.body.mobileSelf,
    mobileParents: req.body.mobileParents,
    email: req.body.email,
    schoolName: req.body.schoolName,
    examCategory: req.body.examCategory,
    courses: req.body.courses,
    category: req.body.category,
    isIndianNational: req.body.isIndianNational,
    isMaharashtraDomiciled: req.body.isMaharashtraDomiciled,
    isNonCreamyLayer: req.body.isNonCreamyLayer,
    fatherOccupation: req.body.fatherOccupation,
    fatherMobile: req.body.fatherMobile,
    fatherEducation: req.body.fatherEducation,
    motherEducation: req.body.motherEducation,
    maritalStatus: req.body.maritalStatus,
    isDisabled: req.body.isDisabled,
    disabilityType: req.body.disabilityType,
    place: req.body.place,
    registrationNo: regNo,
    formNo: formNoDisplay
  };

  // Ensure courses is stored as a stringified array
  if (Array.isArray(req.body.courses)) {
    admissionData.courses = JSON.stringify(req.body.courses);
  } else if (typeof req.body.courses === 'string') {
    // If it's a single value, wrap in array then stringify
    admissionData.courses = JSON.stringify([req.body.courses]);
  }

  if (req.files) {
    if (req.files.photo) admissionData.photoUrl = `/uploads/${req.files.photo[0].filename}`;
    if (req.files.signature) admissionData.signatureUrl = `/uploads/${req.files.signature[0].filename}`;
  }

  const admission = await Admission.create(admissionData);

  res.status(201).json({
    success: true,
    message: "Admission form submitted successfully",
    data: {
      regNo: admission.registrationNo,
      formNo: admission.formNo,
      id: admission._id
    }
  });
});
