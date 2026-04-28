const validateRegistration = (req, res, next) => {
  console.log('Validating request body:', req.body);
  const { firstNameLocal, surnameLocal, mobileSelf, email, dob, gender, schoolName, courses } = req.body;
  const errors = [];

  if (!firstNameLocal || firstNameLocal.trim().length < 2) errors.push('First Name (Local) is required');
  if (!surnameLocal || surnameLocal.trim().length < 2) errors.push('Surname (Local) is required');
  if (!mobileSelf || !/^[0-9+ ]{10,15}$/.test(mobileSelf)) errors.push('Valid Mobile Number (10 digits) is required');
  if (email && !/\S+@\S+\.\S+/.test(email)) errors.push('Invalid Email format');
  if (!dob) errors.push('Date of Birth is required');
  if (!gender) errors.push('Gender selection is required');
  if (!schoolName) errors.push('School/College Name is required');
  
  // Robust course validation
  let courseCount = 0;
  if (Array.isArray(courses)) {
    courseCount = courses.length;
  } else if (typeof courses === 'string') {
    try {
      const parsed = JSON.parse(courses);
      if (Array.isArray(parsed)) courseCount = parsed.length;
    } catch (e) {
      if (courses.trim().length > 0 && courses !== '[]') courseCount = 1;
    }
  }

  if (courseCount === 0) errors.push('At least one Course / Exam must be selected');

  if (errors.length > 0) {
    console.log('Validation failed:', errors);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: errors
    });
  }

  next();
};

module.exports = validateRegistration;
