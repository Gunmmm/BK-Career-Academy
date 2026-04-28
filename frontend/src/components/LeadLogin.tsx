import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, Mail, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface LeadLoginProps {
  onLogin: (data: { name: string; phone: string; email: string }, isSkip?: boolean) => void;
  showSkip?: boolean;
  onCancel?: () => void;
}

const LeadLogin: React.FC<LeadLoginProps> = ({ onLogin, showSkip = true, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in your name and email');
      return;
    }
    onLogin(formData);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-ink/80 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-lg bg-white border-4 border-ink shadow-[-12px_12px_0_0_#F7931A] relative overflow-hidden"
      >
        {/* Progress bar accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand" />

        {/* Branding Watermark */}
        <div className="absolute -top-10 -right-10 text-8xl font-display font-black text-ink/[0.03] select-none pointer-events-none">
          BKCA
        </div>

        {onCancel && (
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 bg-white border-2 border-ink text-ink hover:bg-brand transition-colors z-10 shadow-[2px_2px_0_0_#1A1A1A]"
          >
            <X size={20} />
          </button>
        )}

        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#1A1A1A]">
              <ShieldCheck size={32} className="text-ink" />
            </div>
            <h2 className="text-3xl font-display font-black text-ink uppercase tracking-tight">
              Aspirant <span className="text-brand">Verification</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-ink/60 pl-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink group-focus-within:text-brand transition-colors">
                  <User size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-void border-2 border-ink py-2.5 pl-10 pr-4 text-sm text-ink font-bold focus:outline-none focus:bg-white transition-all shadow-[3px_3px_0_0_#1A1A1A] group-focus-within:shadow-[4px_4px_0_0_#F7931A]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-ink/60 pl-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink group-focus-within:text-brand transition-colors">
                  <Phone size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value.slice(0, 15)})}
                  className="w-full bg-void border-2 border-ink py-2.5 pl-10 pr-4 text-sm text-ink font-bold focus:outline-none focus:bg-white transition-all shadow-[3px_3px_0_0_#1A1A1A] group-focus-within:shadow-[4px_4px_0_0_#F7931A]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-ink/60 pl-1">E-mail ID</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink group-focus-within:text-brand transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-void border-2 border-ink py-2.5 pl-10 pr-4 text-sm text-ink font-bold focus:outline-none focus:bg-white transition-all shadow-[3px_3px_0_0_#1A1A1A] group-focus-within:shadow-[4px_4px_0_0_#F7931A]"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-600 text-[10px] font-black uppercase tracking-widest text-center"
              >
                ⚠ {error}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full bg-brand text-ink border-2 border-ink py-3.5 flex items-center justify-center gap-3 font-display font-black uppercase tracking-widest group shadow-[3px_3px_0_0_#1A1A1A] hover:bg-ink hover:text-brand hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
            >
              {showSkip ? 'Get Started' : 'Unlock Chatbot'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {showSkip && (
              <button 
                type="button"
                onClick={() => onLogin({ name: 'Guest', phone: '0000000000', email: 'guest@example.com' }, true)}
                className="w-full py-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-ink transition-colors"
              >
                Skip for now
              </button>
            )}
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[8px] text-center font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <ShieldCheck size={10} className="text-gray-300" /> Secure Encryption • NO PASSWORDS
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadLogin;
