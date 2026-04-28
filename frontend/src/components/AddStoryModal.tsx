import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Send } from 'lucide-react';

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (story: { name: string; content: string; rating: number; role: string }) => void;
}

export default function AddStoryModal({ isOpen, onClose, onAdd }: AddStoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;
    onAdd(formData);
    onClose();
    setFormData({ name: '', role: '', content: '', rating: 5 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white border-4 border-ink p-6 shadow-[8px_8px_0px_0px_#1A1A1A]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 border-2 border-ink hover:bg-brand transition-all"
            >
              <X size={20} strokeWidth={3} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-display font-black text-ink uppercase tracking-tighter">Share Your Story</h2>
              <div className="w-10 h-1 bg-brand mt-1" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest font-black text-muted">Your Rating</label>
                <div className="flex gap-1 overflow-visible">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="p-0.5 transition-transform hover:scale-125"
                    >
                      <Star 
                        size={22} 
                        fill={(hoverRating || formData.rating) >= star ? "#FFC107" : "transparent"} 
                        className={(hoverRating || formData.rating) >= star ? "text-brand" : "text-ink/20"}
                        strokeWidth={2.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest font-black text-muted">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Rohan Mane"
                  className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-bold focus:outline-none focus:border-brand transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest font-black text-muted">Role / Achievement (Optional)</label>
                <input 
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. Selected as PSI 2024"
                  className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-bold focus:outline-none focus:border-brand transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest font-black text-muted">Your Experience</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Describe your journey with BK Career Academy..."
                  className="w-full bg-background border-2 border-ink px-4 py-2 text-sm text-ink font-medium focus:outline-none focus:border-brand transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand text-ink font-display font-black uppercase tracking-widest py-3 border-2 border-ink shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 text-sm"
              >
                Submit Story <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
