import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Star } from 'lucide-react';
import { EXAM_CATEGORIES } from '../data/constants';

type InquiryFormData = {
  name: string;
  email: string;
  phone: string;
  category: string;
  subCategory: string;
  address: string;
};

const INITIAL_FORM: InquiryFormData = {
  name: '',
  email: '',
  phone: '',
  category: '',
  subCategory: '',
  address: ''
};

export default function RegistrationModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSubExams = () => {
    if (formData.category === 'UPSC') {
      return EXAM_CATEGORIES.find((c) => c.id === 1)?.subcategories.find((s) => s.name === 'UPSC Exams')?.exams || [];
    }
    if (formData.category === 'MPSC') {
      const mpsc = EXAM_CATEGORIES.find((c) => c.id === 12);
      return mpsc ? mpsc.subcategories.flatMap((s) => s.exams) : [];
    }
    if (formData.category === 'SSC') {
      return EXAM_CATEGORIES.find((c) => c.id === 2)?.subcategories[0]?.exams || [];
    }
    if (formData.category === 'Banking') {
      return EXAM_CATEGORIES.find((c) => c.id === 3)?.subcategories[0]?.exams || [];
    }
    if (formData.category === 'Other') {
      return EXAM_CATEGORIES.filter((c) => c.id >= 4).map((c) => c.title);
    }
    return [];
  };

  const allSubExams = getSubExams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(result?.message || 'Inquiry submission failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Error submitting inquiry form:', err);
      alert(`Could not connect to the inquiry server. (${err.message}). Please check if the backend is running.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start sm:justify-center p-4 sm:p-8 overflow-y-auto bg-ink/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-[95vw] sm:max-w-xl bg-white border-4 border-ink p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 border-2 border-ink hover:bg-brand transition-all"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-ink mb-1 uppercase tracking-tighter">Inquiry Form</h2>
                    <div className="text-brand text-sm font-mono font-bold tracking-widest mb-2 uppercase">Jay Hind</div>
                    <div className="w-16 h-1 bg-brand mx-auto mb-3" />
                    <p className="text-xs font-body text-muted italic">Share your details and our team will call you back.</p>
                  </div>

                  <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Full Name</label>
                        <input
                          required
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body transition-all duration-200 focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Email Address</label>
                        <input
                          required
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body transition-all duration-200 focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Mobile Number</label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="9876543210"
                          className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body transition-all duration-200 focus:outline-none focus:border-brand"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Primary Service</label>
                        <div className="relative">
                          <select
                            required
                            name="category"
                            value={formData.category}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData((prev) => ({ ...prev, category: value, subCategory: '' }));
                            }}
                            className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:border-brand"
                          >
                            <option value="">Choose Service</option>
                            <option value="UPSC">UPSC</option>
                            <option value="MPSC">MPSC</option>
                            <option value="SSC">SSC</option>
                            <option value="Banking">Banking</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Sub-Service / Exam</label>
                      <div className="relative">
                        <select
                          required
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:border-brand"
                        >
                          <option value="">Choose Exam</option>
                          {allSubExams.map((exam) => (
                            <option key={exam} value={exam}>
                              {exam}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted">Full Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="2nd Floor, Gajanan Plaza, Gharpura Ghat Rd, Nashik, Maharashtra 422002"
                        rows={2}
                        className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-body transition-all duration-200 focus:outline-none focus:border-brand resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand text-ink font-display font-bold uppercase tracking-wider px-8 py-3 transition-all duration-300 hover:bg-ink hover:text-brand disabled:opacity-50 text-sm mt-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand flex items-center justify-center mx-auto mb-8">
                    <Star size={32} className="text-ink" fill="currentColor" />
                  </div>
                  <h2 className="text-4xl font-display font-black text-ink mb-4 uppercase">Inquiry Submitted!</h2>
                  <h3 className="text-xl text-brand font-mono uppercase tracking-wider mb-2">Jay Hind</h3>
                  <div className="mb-8 p-6 bg-background border-2 border-ink/10 inline-block text-left w-full max-w-sm mx-auto">
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">Submitted Details</div>
                    <div className="font-display font-black text-xl uppercase leading-none mb-4">{formData.name}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted font-mono uppercase">Service</span>
                        <span className="font-bold uppercase text-brand">{formData.category}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs">
                        <span className="text-muted font-mono uppercase">Examination</span>
                        <span className="font-bold uppercase text-ink text-right max-w-[150px]">{formData.subCategory}</span>
                      </div>
                      {formData.address && (
                        <div className="flex justify-between items-start text-xs">
                          <span className="text-muted font-mono uppercase">Address</span>
                          <span className="font-bold uppercase text-ink text-right max-w-[150px]">{formData.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted font-body max-w-sm mx-auto leading-relaxed mb-10 italic">
                    Thanks. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-ink text-brand font-display font-bold uppercase tracking-wider px-10 py-4 transition-all duration-300 hover:bg-brand hover:text-ink"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
