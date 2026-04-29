import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Download } from 'lucide-react';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionFormModal({ isOpen, onClose }: AdmissionFormModalProps) {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    signature: null as File | null,
    schoolName: '',
    salutation: '',
    surname: '',
    firstName: '',
    middleName: '',
    surnameLocal: '',
    firstNameLocal: '',
    middleNameLocal: '',
    fatherName: '',
    motherName: '',
    motherTongue: '',
    dob: '',
    age: '',
    gender: '',
    mobileSelf: '',
    mobileParents: '',
    email: '',
    isIndianNational: '',
    isMaharashtraDomiciled: '',
    canReadWriteSpeakMarathi: '',
    maritalStatus: '',
    isDisabled: '',
    disabilityType: '',
    category: '',
    isNonCreamyLayer: '',
    fatherOccupation: '',
    fatherMobile: '',
    fatherEducation: '',
    motherEducation: '',
    examCategory: '',
    courses: [] as string[],
    date: '',
    place: '',
    otherCategory: '',
    registrationNo: '',
    formNo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [admissionId, setAdmissionId] = useState<string | null>(null);
  const [razorpayPaymentId, setRazorpayPaymentId] = useState<string | null>(null);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          alert('File size must be less than 1MB');
          return;
        }
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const courseData: Record<string, string[]> = {
    "UPSC": ["Civil Services (IAS, IPS, IFS)", "Indian Forest Service (IFoS)", "Engineering Services (ESE/IES)", "CAPF (Assistant Commandant)", "Combined Defence Services (CDS)", "Combined Medical Services (CMS)", "Indian Economic Service (IES)", "Special Class Railway Apprentices (SCRA)"],
    "MPSC": ["MPSC Rajyaseva (Group A & B)", "PSI (Police Sub-Inspector)", "STI (Sales Tax Inspector)", "ASO (Assistant Section Officer)", "MPSC Group C Services", "MPSC Engineering Services", "MPSC Forest Service"],
    "Banking": ["IBPS PO", "IBPS Clerk", "IBPS SO", "IBPS RRB", "SBI PO", "SBI Clerk", "RBI Grade B", "RBI Assistant"],
    "Railways": ["RRB NTPC", "RRB Group D", "RRB JE (Junior Engineer)", "RRB ALP (Assistant Loco Pilot)"],
    "NDA / Defence": ["NDA (National Defence Academy)", "CDS (Combined Defence Services)", "AFCAT (Air Force)", "Indian Navy (INET)", "Coast Guard"],
    "Police Bharti": ["Maharashtra Police Bharti", "SRPF (State Reserved Police Force)", "Driver Police Bharti", "Railway Police Bharti"],
    "Staff Selection": ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD Constable", "SSC JE", "SSC CPO"],
    "Teaching": ["MAHA TET", "CTET", "UGC NET", "KVS / NVS Recruitment"],
    "State Board": ["10th (SSC)", "12th (HSC) Science", "12th (HSC) Commerce", "12th (HSC) Arts"],
    "CBSE Board": ["Class 10th", "Class 11th Science", "Class 11th Commerce", "Class 12th Science", "Class 12th Commerce"],
    "Others": ["Commerce (F.Y/S.Y/T.Y)", "Science (F.Y/S.Y/T.Y)", "Computer Courses", "Other Competitive Exams"]
  };

  const handleCourseToggle = (course: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  const salutations = ["Shri", "Smt.", "Kumar", "Kumari"];
  const categories = ["ST", "ESBC", "SC", "DT(A)", "SBC(A)", "Open", "NT(B)", "NT(C)", "NT(D)", "OBC", "SBC", "Other"];
  const disabilityTypes = ["Hearing Impairment", "Blindness / Low Vision", "Locomotor Disability", "Cerebral Palsy", "Other"];

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData(prev => ({ ...prev, age: calculatedAge.toString() }));
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
       const fetchNumbers = async () => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const res = await fetch('/api/registration/next-form-meta', { signal: controller.signal });
            clearTimeout(timeoutId);
             const data = await res.json();
              if (data.success) {
                 setFormData(prev => ({
                    ...prev,
                    registrationNo: data.nextRegNo || "GENERATED ON SUBMIT",
                    formNo: data.nextFormNo
                 }));
              }
          } catch (err) { 
            console.error('Failed to fetch reg numbers, using fallback');
            const ts = Date.now().toString().slice(-4);
            setFormData(prev => ({
              ...prev,
              registrationNo: `BK-2026-${ts}`,
              formNo: `${ts}`
            }));
          }
       };
       fetchNumbers();
    }
  }, [isOpen, isSubmitted]);

  const validateForm = () => {
    const required = [
      { field: 'firstNameLocal', label: 'First Name (Local)' },
      { field: 'surnameLocal', label: 'Surname (Local)' },
      { field: 'dob', label: 'Date of Birth' },
      { field: 'mobileSelf', label: 'Mobile (Self)' },
      { field: 'email', label: 'Email' },
      { field: 'schoolName', label: 'School / College Name' },
      { field: 'category', label: 'Category' },
      { field: 'place', label: 'Place' }
    ];

    for (const item of required) {
      if (!formData[item.field as keyof typeof formData]) {
        alert(`Please fill in: ${item.label}`);
        return false;
      }
    }
    
    if (formData.mobileSelf && formData.mobileParents && formData.mobileSelf === formData.mobileParents) {
      alert('DUPLICATE CONTACT DETECTED: Self Mobile and Parent Mobile cannot be the same. Please provide two different contact numbers for emergency purposes.');
      return false;
    }

    if (formData.courses.length === 0) {
      alert('Please select at least one Course / Exam');
      return false;
    }

    if (!formData.photo || !formData.signature) {
      alert('Please upload both Photo and Signature');
      return false;
    }

    return true;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (Array.isArray(value)) {
          // Standard multipart/form-data way to send arrays
          value.forEach(item => formDataToSend.append(key, item));
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });
      
      const response = await fetch('/api/registration/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      if (data.success) {
        // Update with FINAL assigned numbers from server
        setFormData(prev => ({
          ...prev,
          registrationNo: data.data.regNo,
          formNo: data.data.formNo
        }));
        setIsSubmitting(false);
        setAdmissionId(data.data.id);
        setIsSubmitted(true);
        // Automatically trigger payment flow
        handlePayment(data.data.id);
      } else {
        const errorMsg = data.error ? data.error.join('\n') : data.message;
        alert('Form Error:\n' + errorMsg);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert('Failed to submit form. Please check your internet connection.');
    }
  };

  const handlePayment = async (id: string) => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admissionId: id })
      });
      const data = await response.json();
      
      if (!data.success) {
        alert('Payment initialization failed: ' + data.message);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "BK Career Academy",
        description: "Admission Form Fee",
        order_id: data.orderId,
        handler: async function (response: any) {
          setIsVerifyingPayment(true);
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                admissionId: id
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setRazorpayPaymentId(response.razorpay_payment_id);
              setIsPaid(true);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Something went wrong during verification.');
          } finally {
            setIsVerifyingPayment(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.surname}`,
          email: formData.email,
          contact: formData.mobileSelf
        },
        theme: {
          color: "#800000"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Failed to start payment process.');
    }
  };

  const generatePDF = async () => {
    const photoBase64 = formData.photo ? await getBase64(formData.photo) : null;
    const sigBase64 = formData.signature ? await getBase64(formData.signature) : null;
    
    // Fetch and convert academy logo to Base64 for reliability
    let logoBase64 = '';
    try {
      const response = await fetch('/images/about_logos/bk.png');
      const blob = await response.blob();
      logoBase64 = await getBase64(new File([blob], 'logo.png'));
    } catch (e) { console.error('Logo fetch failed', e); }

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BK Admission Form - ${formData.firstName} ${formData.surname}</title>
          <style>
            @page { size: A4; margin: 0; }
            body { font-family: 'Inter', -apple-system, sans-serif; padding: 0; margin: 0; color: #1a1a1a; font-size: 11px; line-height: 1.4; }
            .page { width: 210mm; height: 297mm; padding: 15mm; box-sizing: border-box; position: relative; background: white; border: 15px solid #f8f8f8; }
            
            /* Header */
            .header-container { display: flex; flex-direction: column; align-items: center; border-bottom: 3px solid #1a1a1a; padding-bottom: 10px; margin-bottom: 10px; gap: 5px; }
            .logo-section { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
            .logo-img { width: 60px; height: 60px; object-fit: contain; }
            .brand-text h1 { margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase; color: #800000; line-height: 1.2; }
            .brand-text h2 { margin: 0; font-size: 14px; font-weight: 900; text-transform: uppercase; color: #800000; line-height: 1.2; }
            .brand-text p { margin: 0; font-size: 14px; font-weight: 900; color: #800000; line-height: 1.2; }
            .reg-no-text { font-size: 10px; font-weight: 900; color: #1a1a1a; margin-top: 5px; }
            .meta-info { text-align: center; width: 100%; display: flex; justify-content: center; gap: 20px; margin-top: 10px; }
            .meta-box { background: #1a1a1a; color: white; padding: 5px 12px; font-size: 10px; font-weight: 900; border-radius: 4px; display: inline-block; }
            .meta-label { font-size: 7px; color: #888; text-transform: uppercase; margin-bottom: 2px; font-weight: 700; }
            
            .form-title { text-align: center; font-size: 18px; font-weight: 900; text-transform: uppercase; margin: 10px 0; letter-spacing: 4px; color: #1a1a1a; }
            
            /* Photos */
            .visuals-row { display: flex; justify-content: flex-end; gap: 20px; margin-bottom: 10px; }
            .photo-frame { width: 100px; height: 120px; border: 2px solid #1a1a1a; padding: 2px; background: white; }
            .photo-img { width: 100%; height: 100%; object-fit: cover; }
            .sig-frame { width: 160px; height: 50px; border: 2px solid #1a1a1a; padding: 2px; margin-top: 5px; }
            .sig-img { width: 100%; height: 100%; object-fit: contain; }
            .label-small { font-size: 8px; font-weight: 900; text-transform: uppercase; color: #666; margin-top: 4px; text-align: center; }

            /* Sections */
            .section { margin-bottom: 15px; }
            .section-title { font-size: 10px; font-weight: 900; text-transform: uppercase; background: #f8f8f8; padding: 4px 10px; border-left: 4px solid #E89C10; margin-bottom: 10px; }
            
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
            
            .field { margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
            .field-label { font-size: 8px; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 2px; }
            .field-value { font-size: 11px; font-weight: 600; color: #1a1a1a; }
            
            .courses-container { display: flex; flex-wrap: wrap; gap: 5px; }
            .course-tag { background: #1a1a1a; color: white; padding: 3px 8px; font-size: 9px; font-weight: 700; border-radius: 3px; }

            /* Footer */
            /* Footer */
            .footer { border-top: 1px solid #eee; padding-top: 15px; margin-top: 40px; display: flex; justify-content: space-between; font-size: 9px; color: #666; width: 100%; }
            .contact-info { display: flex; gap: 15px; }
            .contact-info span { font-weight: 700; color: #1a1a1a; }

            .payment-badge { position: absolute; top: 15mm; right: 15mm; border: 3px solid #059669; color: #059669; padding: 4px 12px; font-size: 14px; font-weight: 900; text-transform: uppercase; transform: rotate(15deg); border-radius: 8px; background: rgba(5, 150, 105, 0.05); }
          </style>
        </head>
        <body>
          <div class="page">
            ${isPaid ? `<div class="payment-badge">PAID ONLINE</div>` : ''}
            <div class="header-container">
              <div class="logo-section">
                ${logoBase64 ? `<img src="${logoBase64}" class="logo-img" />` : ''}
                <div class="brand-text">
                  <h1>बीके एज्युकेशनल अँड वेल्फेअर सोसायटी</h1>
                  <h2>बीके ग्रुप ऑफ एज्युकेशन</h2>
                  <p>BK EDUCATIONAL & WELFARE SOCIETY</p>
                  <p>BK GROUP OF EDUCATION</p>
                  <div class="reg-no-text">Reg. No. : F-12121/Nashik/Maharashtra</div>
                </div>
              </div>
              <div class="meta-info">
                <div>
                  <div class="meta-label">Registration Number</div>
                  <div class="meta-box">${formData.registrationNo}</div>
                </div>
                <div>
                  <div class="meta-label">Form Number</div>
                  <div class="meta-box">${formData.formNo}</div>
                </div>
                <div style="font-size: 9px; font-weight: 900; color: #1a1a1a; display: flex; align-items: center; height: 32px;">DATE: ${formData.date || new Date().toISOString().split('T')[0]}</div>
              </div>
              ${isPaid ? `
              <div style="width: 100%; margin-top: 10px; display: flex; justify-content: center; gap: 20px;">
                <div style="font-size: 8px; color: #059669; font-weight: 900; text-transform: uppercase;">Payment Status: SUCCESSFUL</div>
                <div style="font-size: 8px; color: #1a1a1a; font-weight: 900; text-transform: uppercase;">TXN ID: ${razorpayPaymentId || 'N/A'}</div>
                <div style="font-size: 8px; color: #1a1a1a; font-weight: 900; text-transform: uppercase;">Amount: ₹199.00</div>
              </div>` : ''}
            </div>

            <div class="visuals-row">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div class="photo-frame">
                  ${photoBase64 ? `<img src="${photoBase64}" class="photo-img" />` : '<div style="height:100%; display:flex; align-items:center; justify-content:center; color:#ccc;">PHOTO</div>'}
                </div>
                <div class="label-small">Passport Photo</div>
              </div>
            </div>

            <div class="form-title">Student Admission Record</div>

            <div class="section">
              <div class="section-title">Selected Programs</div>
              <div style="font-weight: 900; font-size: 10px; margin-bottom: 5px; color: #E89C10; text-transform: uppercase;">Category: ${formData.examCategory || 'Competitive Exams'}</div>
              <div class="courses-container">
                ${formData.courses.map(c => `<span class="course-tag">${c}</span>`).join('')}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Personal Details</div>
              <div class="grid-3">
                <div class="field"><div class="field-label">Surname (Local)</div><div class="field-value">${formData.surnameLocal}</div></div>
                <div class="field"><div class="field-label">First Name (Local)</div><div class="field-value">${formData.firstNameLocal}</div></div>
                <div class="field"><div class="field-label">Middle Name (Local)</div><div class="field-value">${formData.middleNameLocal}</div></div>
              </div>
              <div class="field"><div class="field-label">School / College Name</div><div class="field-value">${formData.schoolName}</div></div>
            <div class="section">
              <div class="section-title">Family Details</div>
              <div class="grid-3">
                <div class="field"><div class="field-label">Father's Name</div><div class="field-value">${formData.fatherName}</div></div>
                <div class="field"><div class="field-label">Mother's Name</div><div class="field-value">${formData.motherName}</div></div>
                <div class="field"><div class="field-label">Mother Tongue</div><div class="field-value">${formData.motherTongue}</div></div>
              </div>
              <div class="grid-3">
                <div class="field"><div class="field-label">Father's Occupation</div><div class="field-value">${formData.fatherOccupation || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Father's Mobile</div><div class="field-value">${formData.fatherMobile || 'N/A'}</div></div>
                <div class="field"><div class="field-label">Father's Education</div><div class="field-value">${formData.fatherEducation || 'N/A'}</div></div>
              </div>
            </div>
              <div class="grid-3">
                <div class="field"><div class="field-label">Date of Birth</div><div class="field-value">${formData.dob}</div></div>
                <div class="field"><div class="field-label">Age</div><div class="field-value">${formData.age}</div></div>
                <div class="field"><div class="field-label">Gender</div><div class="field-value">${formData.gender}</div></div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Contact & Identification</div>
              <div class="grid-2">
                <div class="field"><div class="field-label">Student Mobile</div><div class="field-value">${formData.mobileSelf}</div></div>
                <div class="field"><div class="field-label">Parent Mobile</div><div class="field-value">${formData.mobileParents}</div></div>
              </div>
              <div class="field"><div class="field-label">Email Address</div><div class="field-value">${formData.email}</div></div>
              <div class="grid-3">
                <div class="field"><div class="field-label">Category</div><div class="field-value">${formData.category === 'Other' ? formData.otherCategory : formData.category}</div></div>
                <div class="field"><div class="field-label">National</div><div class="field-value">${formData.isIndianNational}</div></div>
                <div class="field"><div class="field-label">Domicile</div><div class="field-value">${formData.isMaharashtraDomiciled}</div></div>
              </div>
            </div>

            <div class="section" style="margin-top: 30px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                   <div style="font-weight: 700; margin-bottom: 10px;">Declaration:</div>
                   <p style="font-size: 8px; color: #666; max-width: 400px;">I hereby declare that the information provided above is true to the best of my knowledge and belief. I agree to abide by the rules and regulations of the BK Career Academy.</p>
                   <div style="margin-top: 20px; font-size: 9px;">Place: <strong>${formData.place}</strong></div>
                </div>
                <div style="text-align: center;">
                  <div class="sig-frame">
                    ${sigBase64 ? `<img src="${sigBase64}" class="sig-img" />` : ''}
                  </div>
                  <div class="label-small">Student Signature</div>
                </div>
              </div>
            </div>

            <div class="footer">
              <div class="contact-info">
                <div>OFFICE PH: <span>0253-2313962</span></div>
                <div>CELL: <span>9890633962</span></div>
                <div>EMAIL: <span>bkgroupofeducation@gmail.com</span></div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 800;">www.bkcareeracademy.in</div>
                <div style="font-size: 7px; color: #999; margin-top: 3px;">SENT TO: ${formData.email}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleDownload = generatePDF;

  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [isSubCoursesOpen, setIsSubCoursesOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 overflow-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
          />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[98vw] sm:max-w-4xl bg-white rounded-lg shadow-2xl z-50 overflow-hidden max-h-[98vh] overflow-y-auto"
            >
              <div className="bg-white border-b-4 border-ink p-6 relative">
                <button 
                  onClick={onClose}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors text-ink z-10"
                >
                  <X size={16} />
                </button>
                <div className="grid grid-cols-[1.2fr_0.6fr_1.2fr] items-center gap-2 sm:gap-8 px-2 py-2">
                  {/* Left: Marathi Wordings */}
                  <div className="text-[#800000] font-display font-black leading-[1.05] text-left border-r-4 border-brand/20 pr-4 sm:pr-8">
                    <h1 className="text-[16px] sm:text-[27px] uppercase tracking-tighter">बीके एज्युकेशनल अँड वेल्फेअर सोसायटी</h1>
                    <h2 className="text-[12px] sm:text-[18px] uppercase text-ink/70 mt-1">बीके ग्रुप ऑफ एज्युकेशन</h2>
                  </div>

                  {/* Center: Logo & Formal ID */}
                  <div className="flex flex-col items-center gap-4 relative">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full scale-150" />
                      <img src="/images/about_logos/bk.png" alt="BK Logo" className="w-20 h-20 sm:w-32 sm:h-32 object-contain relative z-10 drop-shadow-2xl" />
                    </div>
                    <div className="text-[#800000] text-[9px] sm:text-[11px] font-mono font-black uppercase tracking-[0.2em] opacity-60 whitespace-nowrap border-t border-[#800000]/20 pt-1">
                      Reg. No. : F-12121 / Nashik
                    </div>
                  </div>

                  {/* Right: English Wordings */}
                  <div className="text-[#800000] font-display font-black leading-[1.05] text-right border-l-4 border-brand/20 pl-4 sm:pl-8">
                    <p className="text-[16px] sm:text-[27px] uppercase tracking-tighter">BK EDUCATIONAL & WELFARE SOCIETY</p>
                    <p className="text-[12px] sm:text-[18px] uppercase text-ink/70 mt-1">BK GROUP OF EDUCATION</p>
                  </div>
                </div>
              </div>

          <div className="p-4 border-b flex justify-center gap-8 text-[11px] font-mono font-bold text-ink bg-gray-50/50">
              <div className="flex gap-2 items-center">
                 <span className="text-muted/60 uppercase text-[9px]">REGISTRATION NO:</span>
                 <span className="text-brand px-3 py-0.5 bg-ink rounded-sm shadow-sm">{formData.registrationNo || 'LOADING...'}</span>
              </div>
              <div className="flex gap-2 items-center">
                 <span className="text-muted/60 uppercase text-[9px]">FORM NO:</span>
                 <span className="text-brand px-3 py-0.5 bg-ink rounded-sm shadow-sm">{formData.formNo || 'LOADING...'}</span>
              </div>
            </div>

            <div className="p-3 border-b text-center">
              <h2 className="text-lg font-black uppercase">Admission Form</h2>
            </div>

            {!isSubmitted ? (
              <div className="admission-form-content">
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                
                {/* Compact Hierarchical Course Selection */}
                <div className="space-y-3 bg-gray-50/50 p-3 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-ink">Course Selection</p>
                    <span className="text-[9px] font-bold bg-ink text-brand px-2 py-0.5">{formData.courses.length} EXAMS SELECTED</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-muted uppercase">1. Pick Category:</p>
                      <select
                        value={formData.examCategory || ""}
                        onChange={(e) => {
                          const cat = e.target.value;
                          setExpandedCategory(cat);
                          setFormData(prev => ({ ...prev, examCategory: cat, courses: [] })); // Reset courses when category changes
                        }}
                        className="w-full border-2 border-ink px-2 py-1.5 text-xs focus:ring-2 focus:ring-brand outline-none bg-white font-bold"
                      >
                        <option value="">-- Choose Category --</option>
                        {Object.keys(courseData).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {expandedCategory && (
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-muted uppercase">2. Select {expandedCategory} Courses:</p>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsSubCoursesOpen(!isSubCoursesOpen)}
                            className="w-full border-2 border-ink px-3 py-1.5 text-[10px] font-bold bg-white flex justify-between items-center shadow-[2px_2px_0_0_#000]"
                          >
                            <span>SELECT {expandedCategory} EXAMS</span>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-ink"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                          
                          <AnimatePresence>
                            {isSubCoursesOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 z-[60] mt-1 border-2 border-ink bg-white shadow-xl max-h-48 overflow-y-auto p-2 space-y-1"
                              >
                                {courseData[expandedCategory].map(exam => (
                                  <label key={exam} className="flex items-center gap-2 cursor-pointer hover:bg-brand/10 p-1.5 rounded transition-colors group">
                                    <input
                                      type="checkbox"
                                      checked={formData.courses.includes(exam)}
                                      onChange={() => handleCourseToggle(exam)}
                                      className="w-3.5 h-3.5 accent-ink"
                                    />
                                    <span className="text-[9px] font-bold uppercase tracking-tight group-hover:text-brand">{exam}</span>
                                  </label>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>

                  {formData.courses.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-200">
                      {formData.courses.map(c => (
                        <span key={c} className="text-[8px] bg-ink text-white px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                          {c}
                          <button type="button" onClick={() => handleCourseToggle(c)} className="hover:text-red-400">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-[10px] font-bold uppercase">1. Name of School / College:</p>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-2 py-1 text-xs"
                    placeholder="____________________________"
                  />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">2. Salutation:</p>
                  <div className="flex gap-4 text-[10px]">
                    {salutations.map(s => (
                      <label key={s} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="salutation"
                          required
                          value={s}
                          onChange={handleInputChange}
                          className="w-2.5 h-2.5"
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border border-dashed border-gray-300 p-3 rounded-lg bg-gray-50/50 mb-2">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black uppercase flex items-center gap-2 text-ink">
                       Student Photo <span className="text-[7px] font-normal text-gray-400 leading-none">(MAX 1MB)</span>
                    </p>
                    <input 
                      type="file" 
                      name="photo" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                      className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[9px] file:font-black file:bg-brand file:text-ink cursor-pointer shadow-[1px_1px_0_0_#1A1A1A]" 
                    />
                    {formData.photo && <p className="text-[7px] text-green-600 font-bold mt-1 tracking-tighter">✓ {formData.photo.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black uppercase flex items-center gap-2 text-ink">
                       Signature <span className="text-[7px] font-normal text-gray-400 leading-none">(MAX 1MB)</span>
                    </p>
                    <input 
                      type="file" 
                      name="signature" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                      className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[9px] file:font-black file:bg-ink file:text-white cursor-pointer shadow-[1px_1px_0_0_#F7931A]" 
                    />
                    {formData.signature && <p className="text-[7px] text-green-600 font-bold mt-1 tracking-tighter">✓ {formData.signature.name}</p>}
                  </div>
                </div>



                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">4. Full Name (Local Language):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase">Surname:</p>
                      <input type="text" name="surnameLocal" value={formData.surnameLocal} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="Surname" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase">First Name:</p>
                      <input type="text" name="firstNameLocal" value={formData.firstNameLocal} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="First Name" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase">Middle Name:</p>
                      <input type="text" name="middleNameLocal" value={formData.middleNameLocal} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="Middle Name" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase">4. Father's Name:</p>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase">5. Mother's Name:</p>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase">6. Mother Tongue:</p>
                    <input type="text" name="motherTongue" value={formData.motherTongue} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">7. Date of Birth (YYYY-MM-DD):</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        name="dob_year" 
                        placeholder="YYYY" 
                        maxLength={4}
                        onChange={(e) => {
                          const year = e.target.value.replace(/\D/g, '');
                          const currentDob = formData.dob.split('-');
                          const newDob = `${year}-${currentDob[1] || '01'}-${currentDob[2] || '01'}`;
                          setFormData(prev => ({ ...prev, dob: newDob }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      />
                      <select 
                        onChange={(e) => {
                          const month = e.target.value;
                          const currentDob = formData.dob.split('-');
                          const newDob = `${currentDob[0] || '2000'}-${month}-${currentDob[2] || '01'}`;
                          setFormData(prev => ({ ...prev, dob: newDob }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      >
                        {["01","02","03","04","05","06","07","08","09","10","11","12"].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <input 
                        type="text" 
                        name="dob_day" 
                        placeholder="DD" 
                        maxLength={2}
                        onChange={(e) => {
                          const day = e.target.value.replace(/\D/g, '');
                          const currentDob = formData.dob.split('-');
                          const newDob = `${currentDob[0] || '2000'}-${currentDob[1] || '01'}-${day.padStart(2, '0')}`;
                          setFormData(prev => ({ ...prev, dob: newDob }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      />
                    </div>
                    <input type="hidden" name="dob" value={formData.dob} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">8. Age (Auto-calculated):</p>
                    <input type="text" name="age" readOnly value={formData.age} className="w-full border-2 border-ink px-2 py-1 text-sm bg-gray-100 font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">9. Gender:</p>
                  <div className="flex gap-4 text-xs">
                    {["Male", "Female", "Transgender", "Other"].map(g => (
                      <label key={g} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="gender" required value={g} onChange={handleInputChange} className="w-3 h-3" />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">10. Mobile Number (Self):</p>
                    <input type="tel" name="mobileSelf" required value={formData.mobileSelf} onChange={handleMobileChange} placeholder="10-digit number" className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">11. Mobile Number (Parent):</p>
                    <input type="tel" name="mobileParents" value={formData.mobileParents} onChange={handleMobileChange} placeholder="10-digit number" className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                </div>

                 <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">9. Email ID:</p>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">13. Indian National?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="isIndianNational" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="isIndianNational" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">14. Maharashtra Domiciled?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="isMaharashtraDomiciled" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="isMaharashtraDomiciled" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">15. Marathi?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="canReadWriteSpeakMarathi" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="canReadWriteSpeakMarathi" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">16. Marathi - Read:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiRead" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiRead" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">Write:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiWrite" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiWrite" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">Speak:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiSpeak" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiSpeak" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">17. Marital Status:</p>
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">18. Person with Disability?</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="isDisabled" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="isDisabled" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                {formData.isDisabled === 'Yes' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">19. Type of Disability:</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {disabilityTypes.map(d => (
                        <label key={d} className="flex items-center gap-1"><input type="radio" name="disabilityType" value={d} onChange={handleInputChange} /> {d}</label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">20. Category:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {categories.map(c => (
                      <label key={c} className="flex items-center gap-1">
                        <input type="radio" name="category" required value={c} onChange={handleInputChange} /> {c}
                      </label>
                    ))}
                  </div>
                </div>

                {formData.category === 'Other' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">Specify Caste / Category:</p>
                    <input
                      type="text"
                      name="otherCategory"
                      value={formData.otherCategory}
                      onChange={handleInputChange}
                      className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      placeholder="Enter your specific caste"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">21. Non-Creamy Layer?</p>
                  <div className="flex gap-2 text-xs">
                    <label><input type="radio" name="isNonCreamyLayer" value="Yes" onChange={handleInputChange} /> Yes</label>
                    <label><input type="radio" name="isNonCreamyLayer" value="No" onChange={handleInputChange} /> No</label>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <p className="text-xs font-bold uppercase mb-2">22. Additional Father Details (Optional):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 text-xs">
                    <div>
                      <p>Father's Occupation:</p>
                      <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                    <div>
                      <p>Father's Mobile:</p>
                      <input type="tel" name="fatherMobile" value={formData.fatherMobile} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                    <div>
                      <p>Father's Education:</p>
                      <input type="text" name="fatherEducation" value={formData.fatherEducation} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <p className="font-bold uppercase mb-1">Date (YYYY-MM-DD):</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="YYYY" 
                        maxLength={4}
                        onChange={(e) => {
                          const year = e.target.value.replace(/\D/g, '');
                          const current = formData.date.split('-');
                          setFormData((prev: any) => ({ ...prev, date: `${year}-${current[1] || '01'}-${current[2] || '01'}` }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      />
                      <input 
                        type="text" 
                        placeholder="MM" 
                        maxLength={2}
                        onChange={(e) => {
                          const month = e.target.value.replace(/\D/g, '').padStart(2, '0');
                          const current = formData.date.split('-');
                          setFormData((prev: any) => ({ ...prev, date: `${current[0] || '2024'}-${month}-${current[2] || '01'}` }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      />
                      <input 
                        type="text" 
                        placeholder="DD" 
                        maxLength={2}
                        onChange={(e) => {
                          const day = e.target.value.replace(/\D/g, '').padStart(2, '0');
                          const current = formData.date.split('-');
                          setFormData((prev: any) => ({ ...prev, date: `${current[0] || '2024'}-${current[1] || '01'}-${day}` }));
                        }}
                        className="w-full border-2 border-ink px-2 py-1 text-sm font-bold bg-white"
                      />
                    </div>
                    <input type="hidden" name="date" value={formData.date} />
                  </div>
                  <div>
                    <p className="font-bold uppercase mb-1">Place:</p>
                    <input type="text" name="place" required value={formData.place} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="City/Town" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <p>Student Signature: ____________________</p>
                  </div>
                  <div>
                    <p>Parent / Guardian Signature: ____________________</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Admission Form'}
                </button>
                </form>
                </div>
            ) : !isPaid ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 text-center"
              >
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black">₹</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-tight">Payment Pending</h3>
                <p className="text-gray-500 text-sm mb-6">Please complete the payment of ₹199 to finalize your admission and download the form.</p>
                
                <button
                  onClick={() => admissionId && handlePayment(admissionId)}
                  disabled={isVerifyingPayment}
                  className="w-full max-w-xs mx-auto px-6 py-4 bg-brand text-white font-black rounded-lg hover:bg-ink transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  {isVerifyingPayment ? 'Verifying...' : 'Pay ₹199 Now'}
                </button>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs font-bold text-gray-400 hover:text-brand transition-colors uppercase tracking-widest"
                >
                  Go Back to Form
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100 border-4 border-white animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                
                <h3 className="text-2xl font-black text-ink mb-1 uppercase tracking-tight">Admission Confirmed!</h3>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">Payment Successful</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded-full uppercase">TXN ID: {razorpayPaymentId}</span>
                </div>

                <div className="max-w-md mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-8 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <img src="/images/about_logos/bk.png" className="w-32" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Official Receipt Copy</p>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs font-bold text-gray-500">Student Name</span>
                      <span className="text-xs font-black text-ink uppercase">{formData.firstName} {formData.surname}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs font-bold text-gray-500">Registration No</span>
                      <span className="text-xs font-black text-brand tracking-widest">{formData.registrationNo}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs font-bold text-gray-500">Amount Paid</span>
                      <span className="text-xs font-black text-green-600 font-mono">₹199.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-gray-500">Form Status</span>
                      <span className="text-xs font-black text-blue-600 uppercase">Ready for Download</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      onClick={generatePDF}
                      className="flex-1 max-w-[240px] px-8 py-4 bg-brand text-white font-black rounded-xl hover:bg-ink transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95"
                    >
                      <Download size={20} /> Download Admission Form
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setIsPaid(false);
                        setAdmissionId(null);
                        setRazorpayPaymentId(null);
                        setFormData({
                          photo: null,
                          signature: null,
                          schoolName: '',
                          salutation: '',
                          surname: '',
                          firstName: '',
                          middleName: '',
                          surnameLocal: '',
                          firstNameLocal: '',
                          middleNameLocal: '',
                          fatherName: '',
                          motherName: '',
                          motherTongue: '',
                          dob: '',
                          age: '',
                          gender: '',
                          mobileSelf: '',
                          mobileParents: '',
                          email: '',
                          isIndianNational: '',
                          isMaharashtraDomiciled: '',
                          canReadWriteSpeakMarathi: '',
                          maritalStatus: '',
                          isDisabled: '',
                          disabilityType: '',
                          category: '',
                          isNonCreamyLayer: '',
                          fatherOccupation: '',
                          fatherMobile: '',
                          fatherEducation: '',
                          motherEducation: '',
                          examCategory: '',
                          courses: [],
                          date: new Date().toISOString().split('T')[0],
                          place: '',
                          registrationNo: '',
                          formNo: ''
                        });
                        setExpandedCategory(null);
                      }}
                      className="flex-1 max-w-[240px] px-8 py-4 bg-ink text-brand font-black rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95"
                    >
                      + New Registration
                    </button>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-ink text-[10px] font-black uppercase tracking-[0.2em] mt-6 border-b-2 border-transparent hover:border-ink transition-all"
                  >
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}