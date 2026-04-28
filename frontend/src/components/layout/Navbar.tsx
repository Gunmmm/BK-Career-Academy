import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Search, Book } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  view: string;
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setSelectedSyllabusId: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  view,
  setView,
  setSelectedCategory,
  setSelectedSyllabusId,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  isMenuOpen,
  setIsMenuOpen
}) => {

  const tickerItems = [
    { text: "Breaking: 2026 Batch Admissions Open", action: () => setIsAdmissionModalOpen(true), highlight: false },
    { text: "UPSC Prelims Countdown Active", action: () => { setView('syllabus'); setSelectedSyllabusId(1); }, highlight: false },
    { text: "UPSC CSE 2026", action: () => { setView('courses'); setSelectedCategory(1); }, highlight: true },
    { text: "10K+ Careers Defined", action: () => setView('about'), highlight: false },
    { text: "All Group 'A' Profiles Updated", action: () => setView('courses'), highlight: false },
    { text: "Jay Hind", action: () => setView('home'), highlight: true }
  ];

  return (
    <>
      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-2.5 left-4 z-[120] md:hidden w-9 h-9 border-2 border-brand bg-ink flex items-center justify-center shadow-[2px_2px_0_0_#F7931A] focus:outline-none"
      >
        {isMenuOpen ? <X size={20} className="text-brand" /> : <Menu size={20} className="text-brand" />}
      </button>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[105] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Ticker */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-ink h-14 flex items-center overflow-hidden border-b-2 border-brand/20">
        <div className="flex whitespace-nowrap animate-[marquee-scroll_120s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8 group">
              {tickerItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    <button 
                      onClick={item.action}
                      className={`font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:scale-110 hover:brightness-150 cursor-pointer outline-none ${item.highlight ? 'text-brand' : 'text-brand/80 hover:text-brand underline-offset-4 hover:underline'}`}
                    >
                      {item.text}
                    </button>
                  </div>
                  {idx < tickerItems.length - 1 && <span className="opacity-30 text-brand">|</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sidebar */}
      <aside className={`fixed top-14 left-0 bottom-0 w-64 md:w-52 bg-white border-r-4 border-ink z-[110] flex flex-col items-center py-12 transition-transform duration-500 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-16 cursor-pointer group relative flex flex-col items-center" 
          onClick={(e) => { 
            e.stopPropagation();
            setView('home'); 
            setSelectedCategory(null); 
            setIsMenuOpen(false); 
          }}>
          
          <BrandLogo className="w-12 h-12 md:w-16 md:h-16 group-hover:rotate-6 transition-transform" />
          
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-1.5 h-6">
              <span className="text-[18px] font-black text-red-600 leading-none">BK</span>
              <div className="relative">
                <span className="text-[18px] font-black text-ink leading-none uppercase tracking-tight">Career</span>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-ink"></div>
              </div>
            </div>
            <div className="mt-1.5">
              <span className="text-[22px] font-black text-ink leading-none uppercase tracking-tighter">Academy</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow w-full px-6 flex flex-col gap-2">
          {[
            { id: 'home', label: 'Home', icon: '◰' },
            { id: 'about', label: 'About Us', icon: '◎' },
            { id: 'courses', label: 'Explore Govt exam', icon: '⌬' },
            { id: 'syllabus', label: 'Book', icon: '◈' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { 
                setView(item.id); 
                if (item.id === 'courses' || item.id === 'home') {
                  setSelectedCategory(null);
                }
                setIsMenuOpen(false); 
              }}
              className={`sidebar-link ${view === item.id ? 'active' : ''}`}
            >
              <span className="text-lg opacity-40 font-mono">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="mt-10 pt-8 border-t-4 border-ink flex flex-col gap-4">
            <button 
              onClick={() => setIsRegistrationModalOpen(true)}
              className="group relative bg-brand border-4 border-ink p-4 shadow-[4px_4px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <div className="flex items-center justify-center gap-3">
                <Search size={16} className="text-ink group-hover:rotate-90 transition-transform" />
                <span className="font-display font-black uppercase text-xs tracking-widest text-ink">Inquiry</span>
              </div>
            </button>

            <button 
              onClick={() => setIsAdmissionModalOpen(true)}
              className="group relative bg-brand border-4 border-ink p-4 shadow-[4px_4px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <div className="flex items-center justify-center gap-3">
                <Globe size={16} className="text-ink group-hover:animate-spin" />
                <span className="font-display font-black uppercase text-xs tracking-widest text-ink">Admission</span>
              </div>
            </button>
          </div>
        </nav>

      </aside>
    </>
  );
};

export default Navbar;
