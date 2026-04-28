import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import RegistrationModal from './components/RegistrationModal';
import ChatWidget from './components/ChatWidget';
import HomeHero from './components/HomeHero';
import CourseCard from './components/CourseCard';
import { COURSES, EXAM_CATEGORIES } from './data/constants';
import { ErrorBoundary } from './components/common/ErrorBoundary';


export default function AppRest({ 
  view, 
  setView, 
  setSelectedCategory, 
  setIsRegistrationModalOpen, 
  isRegistrationModalOpen,
  selectedCategory,
  activeNavCategory,
  setSelectedSyllabusId,
  selectedSyllabusId,
  isMenuOpen,
  setIsMenuOpen
}: any) {
  return (
    <div className="bg-background text-ink min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomeHero 
              setView={setView} 
              setSelectedCategory={setSelectedCategory} 
            />

            {/* Career Excellence Section */}
            <section className="py-24 px-6 relative bg-background overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row items-end justify-between mb-16 gap-10">
                  <div className="max-w-3xl">
                    <div className="divider-line mb-8" />
                    <h2 className="section-title mb-6">
                      <span className="text-ink">COURSES</span>
                    </h2>
                    <div className="divider-line mb-8" />
                    <p className="text-muted text-xl font-body leading-relaxed max-w-2xl">
                      Our elite programs focus on building <span className="text-ink font-semibold">Titan-tier skills</span>. 
                      Bridging the gap between raw ambition and global success.
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <div className="stat-block">
                      <div className="text-5xl md:text-6xl font-display font-black mb-2">500+</div>
                      <div className="text-xs uppercase tracking-[0.3em] text-brand/70 font-mono">Global Experts</div>
                    </div>
                    <div className="stat-block">
                      <div className="text-5xl md:text-6xl font-display font-black mb-2">10K+</div>
                      <div className="text-xs uppercase tracking-[0.3em] text-brand/70 font-mono">Careers Defined</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {COURSES.map((course: any, index: number) => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-24 px-6 bg-ink relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" 
                style={{
                  backgroundImage: `linear-gradient(#FFC107 1px, transparent 1px), linear-gradient(90deg, #FFC107 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <div className="divider-line mx-auto mb-8" />
                  <h2 className="section-title mb-6">
                    <span className="text-brand">SUCCESS</span> STORIES
                  </h2>
                  <p className="text-lg text-white/70 font-body max-w-3xl mx-auto">
                    Watch as our graduates reshape global industries of technology and leadership.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white border border-ink/10 hover:border-brand/30 transition-all brutalist-card"
                  >
                    <div className="flex gap-2 mb-6 text-brand">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-lg font-body leading-relaxed mb-6 text-ink/90 italic">
                      "WE SHAPE CAREERS provided the roadmap I needed to transition from project manager to <span className="text-brand">Titan Executive</span>."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-none bg-brand/20 flex items-center justify-center text-lg font-bold text-brand">AM</div>
                      <div>
                        <div className="text-base font-display font-bold text-ink">Alex Morgan</div>
                        <div className="text-xs uppercase tracking-wider text-muted">Strategic Leadership Graduate</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-8 bg-white border border-ink/10 hover:border-brand/30 transition-all brutalist-card mt-0 md:mt-8"
                  >
                    <div className="flex gap-2 mb-6 text-brand">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <p className="text-lg font-body leading-relaxed mb-6 text-ink/90 italic">
                      "Direct access to <span className="text-brand">Industry Giants</span> was the turning point. Mentorship here is a strategic alliance."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-none bg-brand/20 flex items-center justify-center text-lg font-bold text-brand">SH</div>
                      <div>
                        <div className="text-base font-display font-bold text-ink">Sarah Hughes</div>
                        <div className="text-xs uppercase tracking-wider text-muted">Executive Alumna</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 text-center bg-background">
              <div className="max-w-3xl mx-auto high-contrast-block relative overflow-hidden">
                <h2 className="text-4xl sm:text-5xl font-display font-black uppercase mb-6 leading-tight">Ready to become a giant?</h2>
                <p className="text-lg text-brand/80 mb-8 font-body">
                  Join We Shape Careers and architect your absolute legacy.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setIsRegistrationModalOpen(true)}
                    className="bg-white text-ink font-display font-bold uppercase tracking-wider px-10 py-4 transition-all duration-300 hover:bg-brand hover:text-ink w-full sm:w-auto"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        ) : view === 'courses' ? (
          <div>Courses View Placeholder</div>
        ) : (
          <ErrorBoundary fallback="Could not load the Syllabus view. Please go back and try again.">
             <div>Syllabus View Placeholder</div>
          </ErrorBoundary>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-24 px-8 border-t-2 border-ink bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="divider-line mx-auto mb-8" />
          <h2 className="section-title mb-6">
            <span className="text-ink">CONTACT</span> US
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            © 2026 BK Career Academy. All rights reserved.
          </p>
        </div>
      </footer>

      <RegistrationModal 
        isOpen={isRegistrationModalOpen} 
        onClose={() => setIsRegistrationModalOpen(false)} 
      />

      <ChatWidget />
    </div>
  );
}
