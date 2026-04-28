import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, GraduationCap, Star, Globe, ChevronDown, ChevronUp, ExternalLink, HelpCircle, CheckCircle2, Clock, Ruler, Target, MessageSquarePlus, ArrowRight } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import CourseCard from '../components/CourseCard';
import StaffCarousel from '../components/StaffCarousel';
import { COURSES, STAFF } from '../data/constants';
import { Story } from '../data/stories';

interface HomeProps {
  setView: (view: any) => void;
  setSelectedCategory: (id: number | null) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  setIsAddStoryModalOpen: (open: boolean) => void;
  dynamicCourses: any[];
  dynamicExams: any[];
  stories: Story[];
  setSelectedExamName: (name: string) => void;
  quickAccessList: any[];
}

export const Home: React.FC<HomeProps> = ({
  setView,
  setSelectedCategory,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  setIsAddStoryModalOpen,
  dynamicCourses,
  dynamicExams,
  stories,
  setSelectedExamName,
  quickAccessList
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>('psi');
  const [heroContent, setHeroContent] = React.useState<any>(null);
  const [faqCategory, setFaqCategory] = React.useState<string>('RAILWAY');

  // Fetch Hero Content
  React.useEffect(() => {
    fetch('/api/content/hero')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.items.length > 0) {
          setHeroContent(data.items[0]);
        }
      })
      .catch(err => console.error("Hero Fetch Error:", err));
  }, []);

  // Sync selected tab with first item in dynamic list if available
  React.useEffect(() => {
    if (quickAccessList && quickAccessList.length > 0) {
      setSelectedTab(quickAccessList[0].category);
    }
  }, [quickAccessList]);

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <HomeHero 
        setView={setView} 
        setSelectedCategory={setSelectedCategory} 
        onRegistration={() => setIsRegistrationModalOpen(true)}
        onAdmission={() => setIsAdmissionModalOpen(true)}
        heroContent={heroContent}
      />

      {/* Career Excellence Section */}
      {dynamicCourses && dynamicCourses.length > 0 && (
        <section className="pt-2 pb-6 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-6 gap-0">
              <div className="max-w-3xl flex flex-col items-center">
                <div className="divider-line mb-0 mx-auto" />
                <h2 className="section-title text-4xl md:text-6xl lg:text-7xl !mb-3">
                  <span className="text-ink">COURSES</span>
                </h2>
                <div className="divider-line mb-1 mx-auto" />
                <p className="text-muted text-xl font-body leading-relaxed max-w-2xl mx-auto">
                  Our high-quality courses help you gain the{' '}
                  <span className="text-ink font-semibold">best skills</span> for a successful career. 
                  We help you turn your hard work into real success.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dynamicCourses.map((course, index) => (
                <CourseCard 
                  key={course._id || course.id} 
                  course={course} 
                  index={index} 
                  onClick={() => {
                    if (course.id === 100) {
                      setView('courseDetailPolice');
                    } else if (course._id) {
                      // It's a dynamic course from admin panel
                      setSelectedExamName(course.subCategory || course.title);
                      setView('dynamicExamDetail');
                    } else {
                      setSelectedCategory(course.id);
                      setView('courses');
                    }
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Exam Portal: 3 Tabs Section */}
      <section className="py-12 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-8">
             <div className="divider-line mb-1" />
             <h2 className="section-title text-2xl md:text-4xl !mb-8 uppercase">
               QUICK <span className="text-brand">EXAM</span> ACCESS
             </h2>
             
             {/* Tab Switcher */}
             <div className="flex flex-wrap justify-center gap-2 bg-ink/5 p-1.5 border-4 border-ink shadow-[4px_4px_0_0_#1A1A1A]">
                {(quickAccessList && quickAccessList.length > 0 ? quickAccessList : [
                  { category: 'psi', title: 'PSI / STI / ASO' },
                  { category: 'tet', title: 'TET / CTET' },
                  { category: 'police', title: 'POLICE BHARTI' }
                ]).map(tab => (
                  <button
                    key={tab.category}
                    onClick={() => setSelectedTab(tab.category)}
                    className={`px-6 py-3 font-display font-black text-[10px] uppercase tracking-widest transition-all ${
                      selectedTab === tab.category 
                        ? 'bg-brand text-ink border-2 border-ink shadow-[2px_2px_0_0_#1A1A1A]' 
                        : 'text-ink/40 hover:text-ink'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              {/* DYNAMIC CONTENT FROM ADMIN */}
              {quickAccessList.some(q => q.category === selectedTab) ? (
                quickAccessList.filter(q => q.category === selectedTab).map(item => (
                  <div 
                    key={item._id}
                    onClick={() => {
                      setSelectedExamName(item.subCategory || item.title);
                      setView('dynamicExamDetail');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                  >
                    <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                       <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase">
                         {item.title}
                       </h3>
                       {item.subCategory && (
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">{item.subCategory}</span>
                         </div>
                       )}
                    </div>
                    
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                       {item.dynamicSections?.map((module: any, mIdx: number) => (
                         <div key={mIdx} className={`space-y-6 ${mIdx > 0 ? 'md:pl-8' : ''}`}>
                            <div className="flex items-center gap-3">
                               <div className={`${mIdx % 2 === 0 ? 'bg-brand text-ink' : 'bg-ink text-white'} px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]`}>
                                 {module.title}
                               </div>
                            </div>
                            <div 
                              className="prose prose-sm max-w-none text-xs font-bold leading-relaxed space-y-4"
                              dangerouslySetInnerHTML={{ __html: module.content }}
                            />
                         </div>
                       ))}
                    </div>

                    <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                 {selectedTab === 'psi' && (
                   <div 
                     onClick={() => setView('courseDetailMPSC')}
                     className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                   >
                     <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                       <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase italic">
                         MPSC <span className="text-brand group-hover/card:text-ink">GROUP B & C</span>
                       </h3>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">GRADUATE LEVEL</span>
                       </div>
                     </div>
                     <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                       {/* Left: Eligibility */}
                       <div className="space-y-6">
                         <div className="inline-block bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]">
                           ELIGIBILITY (पात्रता)
                         </div>
                         <div className="space-y-4 text-xs font-bold">
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Graduate (कोणतीही पदवी)</span> <CheckCircle2 size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Age: 19-31 (PSI), 19-38 (Others)</span> <Clock size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Height (PSI): 165cm (M), 157cm (F)</span> <Ruler size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center pb-2">
                             <span>Typing Required (Clerk/Tax Asst)</span> <Target size={14} className="text-brand/50"/>
                           </div>
                         </div>
                       </div>
                       {/* Right: Exam Pattern */}
                       <div className="space-y-6 md:pl-8">
                         <div className="inline-block bg-ink text-brand px-4 py-1 text-[10px] font-black uppercase border-2 border-brand shadow-[2px_2px_0_0_#F7931A]">
                           EXAM PATTERN (स्वरूप)
                         </div>
                         <div className="space-y-3">
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">100M</span>
                             <span className="text-xs font-bold uppercase text-ink">PRELIMS (पूर्व परीक्षा)</span>
                           </div>
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">400M</span>
                             <span className="text-xs font-bold uppercase text-ink">MAINS (मुख्य परीक्षा)</span>
                           </div>
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">140M</span>
                             <span className="text-xs font-bold uppercase text-ink">PHYSICAL & INTERVIEW (फक्त PSI)</span>
                           </div>
                         </div>
                         <p className="text-[9px] text-ink/50 font-bold italic mt-4 leading-relaxed">
                           मुख्य परीक्षेसाठी पात्र होण्यासाठी पूर्व परीक्षेत कट-ऑफ गुण मिळवणे आवश्यक आहे.
                         </p>
                       </div>
                     </div>
                     <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                       <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                     </div>
                   </div>
                 )}

                 {selectedTab === 'tet' && (
                   <div 
                     onClick={() => setView('courseDetailMAHATET')}
                     className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                   >
                     <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                       <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase italic">
                         TEACHING <span className="text-brand group-hover/card:text-ink">MAHA TET / CTET</span>
                       </h3>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">TEACHER ELIGIBILITY</span>
                       </div>
                     </div>
                     <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                       {/* Left: Eligibility */}
                       <div className="space-y-6">
                         <div className="inline-block bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]">
                           ELIGIBILITY (पात्रता)
                         </div>
                         <div className="space-y-4 text-xs font-bold">
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Paper I: 12th (50%) + D.Ed/D.T.Ed</span> <CheckCircle2 size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Paper II: Graduation + B.Ed/D.Ed</span> <CheckCircle2 size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Age: No Age Limit</span> <Clock size={14} className="text-brand/50"/>
                           </div>
                         </div>
                       </div>
                       {/* Right: Exam Pattern */}
                       <div className="space-y-6 md:pl-8">
                         <div className="inline-block bg-ink text-brand px-4 py-1 text-[10px] font-black uppercase border-2 border-brand shadow-[2px_2px_0_0_#F7931A]">
                           EXAM PATTERN (स्वरूप)
                         </div>
                         <div className="space-y-3">
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">150M</span>
                             <span className="text-xs font-bold uppercase text-ink">TOTAL MARKS (एकूण गुण)</span>
                           </div>
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">150m</span>
                             <span className="text-xs font-bold uppercase text-ink">TOTAL TIME (वेळ - १५० मिनिटे)</span>
                           </div>
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">60%</span>
                             <span className="text-xs font-bold uppercase text-ink">PASSING (पात्रता निकष - खुला गट)</span>
                           </div>
                         </div>
                         <p className="text-[9px] text-ink/50 font-bold italic mt-4 leading-relaxed">
                           टीप: या परीक्षेत कोणतेही नकारात्मक गुण (Negative Marking) नाहीत.
                         </p>
                       </div>
                     </div>
                     <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                       <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                     </div>
                   </div>
                 )}

                 {selectedTab === 'police' && (
                   <div 
                     onClick={() => setView('courseDetailPolice')}
                     className="bg-white border-4 border-ink shadow-[12px_12px_0_0_#1A1A1A] overflow-hidden cursor-pointer group/card transition-transform hover:-translate-y-1"
                   >
                     <div className="bg-ink text-white p-4 flex justify-between items-center group-hover/card:bg-brand group-hover/card:text-ink transition-colors">
                       <h3 className="text-lg md:text-2xl font-display font-black leading-none uppercase italic">
                         POLICE <span className="text-brand group-hover/card:text-ink">BHARTI 2026</span>
                       </h3>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest bg-white/10 px-3 py-1 border border-brand/30 group-hover/card:border-ink/30 group-hover/card:text-ink">HSC LEVEL RECRUITMENT</span>
                       </div>
                     </div>
                     <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x-4 divide-ink/5 items-start">
                       {/* Left: Eligibility */}
                       <div className="space-y-6">
                         <div className="inline-block bg-brand text-ink px-4 py-1 text-[10px] font-black uppercase border-2 border-ink shadow-[2px_2px_0_0_#000]">
                           ELIGIBILITY (पात्रता)
                         </div>
                         <div className="space-y-4 text-xs font-bold">
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>12th Pass (HSC)</span> <CheckCircle2 size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Age: 18 - 28 Years</span> <Clock size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center border-b border-ink/5 pb-2">
                             <span>Height: 165cm (M), 155cm (F)</span> <Ruler size={14} className="text-brand/50"/>
                           </div>
                           <div className="flex justify-between items-center pb-2">
                             <span>Chest: 79cm (+5cm Expand)</span> <Target size={14} className="text-brand/50"/>
                           </div>
                         </div>
                       </div>
                       {/* Right: Exam Pattern */}
                       <div className="space-y-6 md:pl-8">
                         <div className="inline-block bg-ink text-brand px-4 py-1 text-[10px] font-black uppercase border-2 border-brand shadow-[2px_2px_0_0_#F7931A]">
                           EXAM PATTERN (स्वरूप)
                         </div>
                         <div className="space-y-3">
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">50M</span>
                             <span className="text-xs font-bold uppercase text-ink">PHYSICAL GROUND TEST (शारीरिक चाचणी)</span>
                           </div>
                           <div className="bg-ink/5 border border-ink/10 p-3 flex items-center gap-4">
                             <span className="text-brand font-black text-sm">100M</span>
                             <span className="text-xs font-bold uppercase text-ink">WRITTEN EXAMINATION (लेखी परीक्षा)</span>
                           </div>
                         </div>
                         <p className="text-[9px] text-ink/50 font-bold italic mt-4 leading-relaxed">
                           उमेदवारांना लेखी परीक्षेसाठी पात्र होण्यासाठी शारीरिक चाचणीत किमान ५०% गुण मिळवणे आवश्यक आहे.
                         </p>
                       </div>
                     </div>
                     <div className="bg-ink/5 p-4 text-center border-t border-ink/10 group-hover/card:bg-brand transition-colors">
                       <span className="text-[10px] font-display font-bold uppercase tracking-widest text-ink/60 group-hover/card:text-ink">Click for Detailed Syllabus & Exam Dates →</span>
                     </div>
                   </div>
                 )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Staff Highlights Section */}
      <section className="pt-6 pb-12 px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8 w-full">
            <div className="divider-line mb-2" />
            <h2 className="section-title !text-5xl md:!text-6xl lg:!text-7xl !mb-2 w-full text-center">
              <span className="text-ink">MEET OUR</span> <span className="text-brand">STAFF</span>
            </h2>
            <p className="text-lg text-ink/70 font-body max-w-3xl mx-auto w-full text-center">
              Guided by industry veterans and academic giants dedicated to your professional evolution.
            </p>
          </div>

          <div className="relative z-10 -mx-6">
            <StaffCarousel staff={STAFF} />
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
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


      {/* Resources & Links Section */}
      <section className="py-24 px-6 bg-white relative border-t-8 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-display font-black text-red-600 uppercase tracking-tight flex items-center gap-2">
               Our Resources
            </h2>
            <div className="w-12 h-1 bg-red-600 mt-1" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "THE HINDU", url: "https://www.thehindu.com", logo: "/images/resources/the-hindu-new.webp" },
              { name: "PIB INDIA", url: "https://pib.gov.in", logo: "/images/resources/press-information-bureau.webp" },
              { name: "THE INDIAN EXPRESS", url: "https://indianexpress.com", logo: "/images/resources/the-indian-express.webp" },
              { name: "LOKSATTA", url: "https://www.loksatta.com", logo: "/images/resources/loksatta.png" },
              { name: "UPSC", url: "https://www.upsc.gov.in", logo: "/images/resources/upscs.jpeg" },
              { name: "MPSC", url: "https://mpsc.gov.in", logo: "/images/resources/mpsc-logo.webp", scale: 1.4 },
              { name: "SSC", url: "https://ssc.nic.in", logo: "/images/resources/ssc-resc-logo.webp", scale: 1.4 },
              { name: "RBI", url: "https://www.rbi.org.in", logo: "/images/resources/download.jpg" },
              { name: "INDIAN RAILWAYS", url: "https://indianrailways.gov.in", logo: "/images/resources/railways-logo.webp" },
              { name: "MAHARASHTRA TIMES", url: "https://maharashtratimes.com", logo: "/images/resources/maharashtra-times.webp" },
              { name: "MY GOV", url: "https://www.mygov.in", logo: "/images/resources/my-gov.webp" },
              { name: "AAPLE SARKAR", url: "https://aaplesarkar.mahaonline.gov.in", logo: "/images/resources/aaple-sarkar.webp" },
            ].map((res, i) => (
              <a 
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-[0_4px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 min-h-[220px] group overflow-hidden"
              >
                {/* Logo and Name */}
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="relative w-full h-[140px] flex items-center justify-center">
                    <img 
                      src={res.logo} 
                      alt={res.name}
                      style={{ transform: `scale(${res.scale || 1})` }}
                      className="max-w-full max-h-[120%] object-contain transition-all duration-500 transform group-hover:scale-[1.2]"
                    />
                  </div>
                  <span className="text-[18px] font-display font-black text-ink uppercase tracking-tighter group-hover:text-brand transition-colors text-center px-2 leading-none">
                    {res.name}
                  </span>
                </div>
                <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink size={12} className="text-ink/30" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white border-t-8 border-ink">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="divider-line mb-3" />
            <h2 className="section-title text-3xl md:text-5xl lg:text-6xl !mb-4">
               FREQUENTLY ASKED <span className="text-brand">QUESTIONS</span>
            </h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
               {['RAILWAY', 'UPSC', 'MPSC', 'SSC', 'BANK'].map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-8 py-3 border-4 border-ink font-display font-black text-[10px] uppercase tracking-widest transition-all ${faqCategory === cat ? 'bg-brand shadow-[4px_4px_0_0_#1A1A1A] translate-y-1' : 'bg-white hover:bg-brand/10 hover:-translate-y-1'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
             {(faqCategory === 'RAILWAY' ? [
               { q: "Can I send RRB application form by Speed Post/Registered Post?", a: "No. RRB applications must be submitted online through the official portal. Physical submissions are no longer accepted." },
               { q: "Are there negative marking in RRB exam?", a: "Yes. Typically there is a deduction of 1/3 marks (0.33) for every wrong answer in Computer Based Tests." },
               { q: "Can ladies apply for Railway jobs?", a: "Absolutely. Women are encouraged to apply and often have specific relaxations and reserved quotas in various posts." },
               { q: "What is RRB?", a: "The Railway Recruitment Board (RRB) is a government agency responsible for recruiting staff for various positions in Indian Railways." }
             ] : faqCategory === 'UPSC' ? [
               { q: "How many attempts are allowed in UPSC Civil Services Exam?", a: "General category candidates have 6 attempts. OBC candidates have 9, and SC/ST candidates have unlimited attempts up to the upper age limit." },
               { q: "What is the upper age limit for UPSC CSE?", a: "The upper age limit is 32 years for General category, 35 for OBC, and 37 for SC/ST candidates." },
               { q: "Is coaching necessary to crack UPSC?", a: "While coaching can provide structured guidance, many candidates crack UPSC through rigorous self-study and consistent revision." },
               { q: "Can a final year college student apply for UPSC Prelims?", a: "Yes, final year students can appear for Prelims, provided they can produce proof of passing the degree examination before the Detailed Application Form (DAF) for Mains." }
             ] : faqCategory === 'MPSC' ? [
               { q: "What is the age limit for MPSC Rajyaseva?", a: "The minimum age is 19 years, and the maximum age limit is 38 years for the Open category and 43 years for Reserved categories." },
               { q: "Is Marathi language compulsory for MPSC?", a: "Yes, a good understanding of Marathi is essential. Candidates must have passed the Marathi language subject at the 10th (SSC) level or must clear a qualifying test." },
               { q: "How many stages are there in MPSC State Services Exam?", a: "The exam consists of three stages: Prelims (Objective), Mains (Descriptive starting 2025), and an Interview round." },
               { q: "Can candidates from other states apply for MPSC?", a: "Yes, candidates from other states can apply, but they will be considered under the Open (General) category and must fulfill the Marathi language requirement." }
             ] : faqCategory === 'SSC' ? [
               { q: "What are the most popular exams conducted by SSC?", a: "The Staff Selection Commission conducts CGL (Combined Graduate Level), CHSL (Combined Higher Secondary Level), MTS (Multi-Tasking Staff), and GD Constable exams." },
               { q: "Is there a physical test for SSC CGL?", a: "Physical tests and medical standards are required only for specific posts like Inspector (Central Excise/Preventive Officer/Examiner), Sub-Inspector in CBI, and NIA." },
               { q: "Can I apply for multiple SSC exams in the same year?", a: "Yes, you can apply for as many SSC exams as you want, provided you meet the educational and age eligibility criteria for each." },
               { q: "What is the validity of the SSC CGL score?", a: "The SSC CGL score is valid only for the recruitment cycle of that specific year." }
             ] : [
               { q: "Which organizations conduct bank exams in India?", a: "The primary organizations are IBPS (for public sector banks), SBI (State Bank of India), and RBI (Reserve Bank of India)." },
               { q: "What is the selection process for IBPS PO?", a: "The selection process involves three phases: Preliminary Exam, Main Exam, and a Personal Interview." },
               { q: "Is there any limit on the number of attempts for SBI PO?", a: "Yes, General category candidates can attempt SBI PO up to 4 times, General (PWD)/OBC up to 7 times, and there is no restriction for SC/ST candidates." },
               { q: "Do bank exams have sectional timing and cutoffs?", a: "Yes, most major bank exams like IBPS PO and SBI PO have strict sectional timings and require candidates to clear sectional cutoffs as well as the overall cutoff." }
             ]).map((faq, i) => (
               <FAQItem key={i + faqCategory} question={faq.q} answer={faq.a} />
             ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Sub-component for clean FAQ items
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`border-4 border-ink transition-all ${isOpen ? 'bg-brand/5' : 'bg-white'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left group"
      >
        <span className="text-sm md:text-lg font-display font-black text-ink uppercase pr-8 group-hover:text-brand transition-colors">
          {question}
        </span>
        <div className={`w-10 h-10 border-2 border-ink bg-white flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-brand' : ''}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-sm md:text-base font-body text-ink/70 border-t-2 border-ink/10 pt-4 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

