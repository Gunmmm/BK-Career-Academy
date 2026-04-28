import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Info, 
  CheckCircle2, 
  ListChecks, 
  Calendar, 
  Users,
  Coins,
  History,
  Globe2,
  PieChart,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  Dna,
  Scale
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface MPSCDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
}

export const MPSCDetailsPage: React.FC<MPSCDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background relative selection:bg-brand selection:text-ink scroll-smooth"
    >
      {/* Premium Navbar */}
      <nav className="fixed top-10 left-0 right-0 z-[100] px-4 sm:px-8 h-18 flex items-center justify-between bg-white border-b-4 border-ink shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setView('home')}
        >
          <BrandLogo className="w-10 h-10" />
          <div className="flex flex-col mt-1">
            <span className="text-xl font-display font-black uppercase text-ink leading-none">MPSC</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Academic Portal</span>
          </div>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 mr-8">
           <button onClick={() => scrollToSection('group-b')} className="text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">गट ब (Group B)</button>
           <button onClick={() => scrollToSection('group-c')} className="text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">गट क (Group C)</button>
           <button onClick={() => scrollToSection('syllabus')} className="text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">अभ्यासक्रम</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsRegistrationModalOpen(true)}
            className="flex btn-brutalist bg-brand px-6 py-2 text-xs"
          >
            Inquiry
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-8 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FFC107 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-brand mb-8 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-black">Return to Courses</span>
          </button>
          <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
            Maharashtra <span className="text-brand">Combined</span> Services
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-body max-w-3xl leading-relaxed">
            Detailed orientation for MPSC Group B and Group C recruitment — Your strategic roadmap to administrative excellence in Maharashtra.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 pb-40">
        <div className="grid grid-cols-1 gap-40">
          
          {/* SECTION 1: GROUP B DETAILS */}
          <section id="group-b" className="relative scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 border-b-8 border-ink pb-8">
              <div className="w-20 h-20 bg-brand border-4 border-ink flex items-center justify-center shadow-[6px_6px_0_0_#1A1A1A] shrink-0">
                <BookOpen size={40} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-ink leading-none">
                  MPSC गट ब परीक्षेविषयी
                </h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {["PSI", "STI", "ASO", "S-14 Scale"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-ink text-brand text-[10px] font-black uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-20">
              
              {/* Introduction & Eligibility B */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-12">
                  <div className="bg-white border-4 border-ink p-8 md:p-12 shadow-[-16px_16px_0_0_#F7931A] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                      <GraduationCap size={400} />
                    </div>
                    
                    <div className="prose prose-xl max-w-none mb-16">
                      <h3 className="text-2xl font-display font-black uppercase mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-brand" /> पात्रता (Eligibility - Group B)
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-brand">
                            <GraduationCap size={20} />
                            <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">शैक्षणिक पात्रता</h4>
                          </div>
                          <ul className="space-y-3 text-sm text-ink/80 leading-relaxed font-body">
                            <li>• सांविधिक विद्यापीठाची पदवी किंवा तिच्याशी समतुल्य.</li>
                            <li>• पदवी परीक्षेस बसलेले उमेदवार पूर्व परीक्षेस पात्र.</li>
                            <li className="font-bold text-ink underline">• मराठी भाषेचे ज्ञान आवश्यक.</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-brand">
                            <ListChecks size={20} />
                            <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">शारीरिक मोजमापे (PSI)</h4>
                          </div>
                          <div className="bg-background p-4 border-2 border-ink shadow-[4px_4px_0_0_#1A1A1A]">
                            <div className="mb-4">
                              <div className="text-[10px] font-black uppercase text-brand mb-1">पुरुष उमेदवार</div>
                              <div className="text-xs text-ink/80 font-bold">उंची: १६५ सें मी | छाती: ७९ सें मी</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase text-brand mb-1">महिला उमेदवार</div>
                              <div className="text-xs text-ink/80 font-bold">उंची: १५७ से. मी.</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-brand">
                            <Calendar size={20} />
                            <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">वयोमर्यादा</h4>
                          </div>
                          <div className="space-y-2 text-sm text-ink/80 leading-relaxed">
                            <div className="p-3 border-2 border-ink bg-white">
                              <span className="font-black text-ink block text-[10px] uppercase">सर्वसाधारण:</span> १८ ते ४३ वर्षे
                            </div>
                            <div className="p-3 border-2 border-ink bg-white">
                              <span className="font-black text-ink block text-[10px] uppercase">PSI साठी:</span> १९-३१ वर्षे (खुल्या), ३४ वर्षे (मागासवर्गीय).
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-ink text-white p-6 md:p-8 border-4 border-ink relative">
                      <div className="absolute top-0 right-0 h-full w-1 bg-brand" />
                      <p className="text-sm md:text-base font-bold italic border-l-4 border-brand pl-6 leading-relaxed">
                        सन २०२३ पासून MPSC गट ब व गट क आणि सहाय्यक मोटार वाहन निरीक्षक या पदांसाठी एकच संयुक्त पूर्व परीक्षा घेण्यात येणार आहे. त्यानंतर मुख्य परीक्षा प्रत्येक पदासाठी स्वतंत्र घेण्यात येईल.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group B stages Summary Table */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-ink text-brand flex items-center justify-center font-black">01</div>
                  <h3 className="text-2xl font-display font-black uppercase text-ink">MPSC गट ब परीक्षेचे स्वरूप (Stages)</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-4 border-ink text-left">
                    <thead>
                      <tr className="bg-brand text-ink border-b-4 border-ink uppercase text-[10px] sm:text-xs">
                        <th className="p-4 border-r-4 border-ink w-12 text-center">#</th>
                        <th className="p-4 border-r-4 border-ink">पदाचे नाव</th>
                        <th className="p-4 border-r-4 border-ink">परीक्षा</th>
                        <th className="p-4 border-r-4 border-ink text-center">पूर्व परीक्षा</th>
                        <th className="p-4 border-r-4 border-ink text-center">मुख्य परीक्षा</th>
                        <th className="p-4 border-r-4 border-ink text-center">शारीरिक चाचणी</th>
                        <th className="p-4 text-center">मुलाखत</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold text-[11px] sm:text-xs">
                      {[
                        { id: 1, name: "राज्य कर निरीक्षक (STI)", type: "एकत्रित पूर्व परीक्षा आणि स्वतंत्र मुख्य परीक्षा", pre: "100 गुण", main: "400 गुण", physical: "---", interview: "---" },
                        { id: 2, name: "सहाय्यक विभाग अधिकारी (ASO)", type: "एकत्रित पूर्व परीक्षा आणि स्वतंत्र मुख्य परीक्षा", pre: "100 गुण", main: "400 गुण", physical: "---", interview: "---" },
                        { id: 3, name: "दुय्यम निबंधक/मुद्रांक निरीक्षक", type: "एकत्रित पूर्व परीक्षा आणि स्वतंत्र मुख्य परीक्षा", pre: "100 गुण", main: "400 गुण", physical: "---", interview: "---" },
                        { id: 4, name: "पोलीस उपनिरीक्षक (PSI)", type: "संयुक्त पूर्व + स्वतंत्र मुख्य + शारीरिक + मुलाखत", pre: "100 गुण", main: "400 गुण", physical: "100 गुण", interview: "40 गुण" },
                      ].map((row, index) => (
                        <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-background'} border-b-2 border-ink hover:bg-brand/5 transition-colors`}>
                          <td className="p-4 border-r-4 border-ink text-center">{row.id}</td>
                          <td className="p-4 border-r-2 border-ink text-ink">{row.name}</td>
                          <td className="p-4 border-r-2 border-ink">{row.type}</td>
                          <td className="p-4 border-r-2 border-ink text-center font-black">{row.pre}</td>
                          <td className="p-4 border-r-2 border-ink text-center font-black">{row.main}</td>
                          <td className="p-4 border-r-2 border-ink text-center text-muted italic">{row.physical}</td>
                          <td className="p-4 text-center text-muted italic">{row.interview}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: GROUP C DETAILS (NEW CONTENT ADDED) */}
          <section id="group-c" className="relative scroll-mt-24">
             <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 border-b-8 border-brand pb-8">
              <div className="w-20 h-20 bg-ink border-4 border-brand flex items-center justify-center shadow-[6px_6px_0_0_#FFC107] shrink-0">
                <Monitor size={40} className="text-brand" strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-ink leading-none">
                  MPSC गट क परीक्षेविषयी
                </h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {["Clerk-Typist", "Tax Asst", "Excise Sub-Insp", "Typing Test"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brand text-ink text-[10px] font-black uppercase tracking-widest border border-ink">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-20">
              
              {/* Introduction & Eligibility C */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 <div className="lg:col-span-12">
                   <div className="bg-white border-4 border-ink p-8 md:p-12 shadow-[16px_16px_0_0_#1A1A1A] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Dna size={400} />
                      </div>
                      
                      <div className="prose prose-xl max-w-none">
                        <h3 className="text-2xl font-display font-black uppercase mb-6 flex items-center gap-3">
                          <CheckCircle2 className="text-brand" /> पात्रता (Eligibility - Group C)
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                          {/* Education Group C */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-brand">
                              <GraduationCap size={20} />
                              <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">शैक्षणिक पात्रता</h4>
                            </div>
                            <ul className="space-y-3 text-sm text-ink/80 leading-relaxed font-body">
                              <li>• सांविधिक विद्यापीठाची पदवी किंवा तिच्याशी समतुल्य.</li>
                              <li>• पदवी परीक्षेस बसलेले उमेदवार पूर्व परीक्षेस तात्पुरते पात्र.</li>
                              <li className="font-bold text-ink">• मराठी भाषेचे ज्ञान आवश्यक.</li>
                              <li className="text-[10px] bg-brand/10 p-2 font-bold italic tracking-tight">टीप: पदवी उत्तीर्ण असणे मुख्य परीक्षेच्या अर्जाच्या दिनांकापर्यंत अनिवार्य.</li>
                            </ul>
                          </div>

                          {/* Age Limits Group C */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-brand">
                              <Calendar size={20} />
                              <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">वयोमर्यादा (Age)</h4>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                               {[
                                 { l: "खुला प्रवर्ग", a: "18 ते 38 वर्षे" },
                                 { l: "मागास प्रवर्ग", a: "18 ते 43 वर्षे" },
                                 { l: "खेळाडू", a: "18 ते 43 वर्षे" },
                                 { l: "दिव्यांग", a: "18 ते 45 वर्षे" }
                               ].map(age => (
                                 <div key={age.l} className="flex justify-between items-center p-2 border-2 border-ink text-[11px] font-bold">
                                   <span className="uppercase text-ink/60">{age.l}</span>
                                   <span className="font-display text-ink uppercase tracking-tighter">{age.a}</span>
                                 </div>
                               ))}
                            </div>
                          </div>

                          {/* Physical Section Group C */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-brand">
                              <Scale size={20} />
                              <h4 className="font-display font-black uppercase text-sm tracking-widest text-ink">शारीरिक पात्रता</h4>
                            </div>
                            <p className="text-xs text-ink/70 leading-relaxed mb-4">
                               MPSC Group C च्या <span className="font-black text-ink underline">दुय्यम निरीक्षक राज्य उत्पादन शुल्क</span> या पदासाठीच फक्त शारीरिक पात्रता आहे. बाकी पदांस ही पात्रता लागू नाही.
                            </p>
                            <div className="bg-brand/5 p-4 border-2 border-brand border-dashed">
                               <p className="text-[10px] font-black uppercase text-ink">Special Note:</p>
                               <p className="text-[11px] font-body text-ink/80 italic">Refer to official notification for specific height and chest measurements required for Excise SI.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>

              {/* Group C stages Summary Table */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand text-ink border-2 border-ink flex items-center justify-center font-black">01</div>
                  <h3 className="text-2xl font-display font-black uppercase text-ink underline decoration-4 decoration-brand underline-offset-8">MPSC गट क परीक्षेचे स्वरूप</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {[
                      { l: "पूर्व परीक्षा", v: "100 गुण" },
                      { l: "मुख्य परीक्षा", v: "200 गुण" },
                      { l: "टंकलेखन चाचणी", v: "Clerk-Typist साठी अनिवार्य", i: true }
                    ].map((st, i) => (
                      <div key={i} className="bg-white border-4 border-ink p-6 shadow-[4px_4px_0_0_#FFC107]">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand block mb-2">{st.l}</span>
                        <h4 className={`text-xl font-display font-black uppercase ${st.i ? 'text-xs italic' : ''}`}>{st.v}</h4>
                      </div>
                    ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-4 border-ink text-left">
                    <thead>
                      <tr className="bg-ink text-brand border-b-4 border-ink uppercase text-[10px] sm:text-xs">
                        <th className="p-4 border-r-4 border-brand">विषय व संकेतांक</th>
                        <th className="p-4 border-r-4 border-brand text-center">प्रश्नसंख्या</th>
                        <th className="p-4 border-r-4 border-brand text-center">एकूण गुण</th>
                        <th className="p-4 border-r-4 border-brand text-center">दर्जा</th>
                        <th className="p-4 border-r-4 border-brand text-center">माध्यम</th>
                        <th className="p-4 border-r-4 border-brand text-center">कालावधी</th>
                        <th className="p-4 text-center">स्वरूप</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold text-[11px] sm:text-xs bg-white">
                      <tr className="hover:bg-brand/5 transition-colors">
                        <td className="p-6 border-r-2 border-ink text-lg font-black uppercase">सामान्य क्षमता चाचणी (संयुक्त पूर्व)</td>
                        <td className="p-6 border-r-2 border-ink text-center text-2xl font-display font-black">100</td>
                        <td className="p-6 border-r-2 border-ink text-center text-2xl font-display font-black text-brand">100</td>
                        <td className="p-6 border-r-2 border-ink text-center">पदवी</td>
                        <td className="p-6 border-r-2 border-ink text-center">मराठी व इंग्रजी</td>
                        <td className="p-6 border-r-2 border-ink text-center font-black">एक तास</td>
                        <td className="p-6 text-center italic opacity-60">वस्तुनिष्ठ बहुपर्यायी (MCQ)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-[10px] font-mono text-muted uppercase mt-3 italic text-right">• नकारात्मक गुण: प्रत्येक चुकीच्या उत्तरासाठी ०.२५ (१/४) गुण वजा.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SALARY & SCHEDULE */}
          <section id="salary-schedule" className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-mt-24">
             {/* Salary Scale */}
             <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                    <Coins size={24} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase text-ink">पदांची वेतन श्रेणी (Group B Salary)</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "सहायक कक्ष अधिकारी (ASO)",
                    "राज्य कर निरीक्षक (STI)",
                    "पोलीस उपनिरीक्षक (PSI)"
                  ].map((pos, i) => (
                    <div key={i} className="bg-white border-4 border-ink p-6 flex justify-between items-center group hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_#1A1A1A] hover:bg-brand/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand uppercase tracking-widest mb-1 italic">MPSC Group B</span>
                        <span className="font-display font-black text-ink uppercase">{pos}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase text-ink/40 mb-1">Scale S-14</div>
                        <div className="text-lg font-display font-black text-ink">₹38,600 - 1,22,800</div>
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] font-mono text-muted uppercase mt-4 italic">+ महागाई भत्ता व नियमाप्रमाणे देय भत्ते</p>
                </div>
             </div>

             {/* Schedule */}
             <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ink text-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#FFC107] shrink-0">
                    <History size={24} strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase text-ink">वेळापत्रक (Exam Schedule 2023)</h3>
                </div>
                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[4px] before:bg-ink">
                  {[
                    { t: "परीक्षेची जाहिरात", d: "जानेवारी २०२३", b: true },
                    { t: "पूर्व परीक्षा", d: "३० एप्रिल २०२३" },
                    { t: "पूर्व परीक्षेचा निकाल", d: "जून २०२३", i: true },
                    { t: "मुख्य परीक्षा", d: "२ सप्टेंबर २०२३", b: true },
                    { t: "मुख्य परीक्षेचा निकाल", d: "ऑक्टोबर २०२३", i: true },
                  ].map((step, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[29px] top-1.5 w-6 h-6 border-4 border-ink rounded-full z-10 transition-colors ${step.b ? 'bg-brand' : 'bg-white'}`} />
                      <div className="bg-white border-4 border-ink p-4 shadow-[4px_4px_0_0_#1A1A1A]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-brand mb-1">{step.t}</h4>
                        <p className={`font-display font-black text-lg uppercase ${step.i ? 'italic opacity-60' : ''}`}>{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </section>

          {/* SECTION 4: DETAILED SYLLABUS GRID (COMBINED B & C) */}
          <section id="syllabus" className="space-y-24 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <div className="w-20 h-20 bg-brand border-4 border-ink flex items-center justify-center shadow-[6px_6px_0_0_#1A1A1A] shrink-0">
                <PieChart size={40} strokeWidth={3} />
              </div>
              <div>
                 <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-ink leading-none">
                   संपूर्ण अभ्यासक्रम (Syllabus)
                 </h2>
                 <p className="text-xs font-mono tracking-widest uppercase mt-4 text-muted">(गट ब व क संयुक्त परीक्षांसाठी एकत्रित अभ्यासक्रम)</p>
              </div>
            </div>

            {/* Prelims Syllabus Grid (Joint B & C) */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display font-black uppercase text-ink border-l-8 border-brand pl-6 italic">
                १) पूर्व परीक्षा (Prelims Syllabus - Combined)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { n: "1", t: "चालु घडामोडी", d: "जागतिक तसेच भारतातील." },
                   { n: "2", t: "नागरिकशास्त्र", d: "भारताच्या घटनेचा प्राथमिक अभ्यास, राज्य व्यवस्थापन (प्रशासन), ग्राम व्यवस्थापन (प्रशासन)." },
                   { n: "3", t: "इतिहास", d: "आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास." },
                   { n: "4", t: "भूगोल", d: "पृथ्वी, जगातील विभाग, हवामान, अक्षांश रेखांश, महाराष्ट्राच्या भूगोलाच्या विशेष अभ्यासासह (जमिनीचे प्रकार, पिके, शहरे, नद्या, उद्योगधंदे)." },
                   { n: "5", t: "अर्थव्यवस्था", d: "भारतीय अर्थव्यवस्था (राष्ट्रीय उत्पन्न, शेती, बँकिंग, लोकसंख्या, दारिद्रय), शासकीय अर्थव्यवस्था (अर्थसंकल्प, लेखापरीक्षण)." },
                   { n: "6", t: "सामान्य विज्ञान", d: "भौतिकशास्त्र, रसायनशास्त्र, प्राणिशास्त्र, वनस्पतीशास्त्र, आरोग्यशास्त्र (Hygiene)." },
                   { n: "7", t: "अंकगणित & बुध्दिमापन", d: "बेरीज, वजाबाकी, गुणाकार, भागाकार आणि अचूकपणे विचार करण्याची चाचणी." },
                 ].map((sub, i) => (
                   <div key={i} className="bg-white border-4 border-ink p-8 hover:bg-brand transition-all group relative overflow-hidden">
                     <span className="absolute -top-4 -right-4 text-8xl font-display font-black text-ink opacity-5 group-hover:opacity-10 transition-all">{sub.n}</span>
                     <h4 className="text-xl font-display font-black uppercase text-ink mb-4">{sub.t}</h4>
                     <p className="text-sm font-body text-ink/80 leading-relaxed group-hover:text-ink">{sub.d}</p>
                   </div>
                 ))}
              </div>
            </div>

            {/* Mains Syllabus Combined */}
            <div className="space-y-12">
               <h3 className="text-2xl font-display font-black uppercase text-ink border-l-8 border-brand pl-6 italic underline underline-offset-8 decoration-ink">
                 २) मुख्य परीक्षा (Mains Syllabus Overview)
               </h3>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Paper 1 Joint Details */}
                  <div className="bg-ink text-white p-10 border-4 border-ink relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                      <Globe2 size={150} />
                    </div>
                    <h4 className="text-2xl font-display font-black uppercase text-brand mb-8 border-b-2 border-brand/20 pb-4">संयुक्त पेपर क्र. १ (Joint Paper)</h4>
                    <div className="space-y-8">
                       <div className="p-4 border border-white/10 hover:border-brand transition-colors">
                          <h5 className="text-lg font-display font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-brand text-ink flex items-center justify-center text-xs">01</span> मराठी
                          </h5>
                          <p className="text-[11px] text-white/70 leading-relaxed font-body">सर्वसामन्य शब्दसंग्रह, वाक्यरचना, व्याकरण, म्हणी व वाक्यप्रचार यांचा अर्थ आणि उपयोग तसेच उतान्यावरील प्रश्नांची उत्तरे.</p>
                       </div>
                       <div className="p-4 border border-white/10 hover:border-brand transition-colors">
                          <h5 className="text-lg font-display font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-brand text-ink flex items-center justify-center text-xs">02</span> इंग्रजी
                          </h5>
                          <p className="text-[11px] text-white/70 leading-relaxed font-body italic">Common Vocabulary, Sentence structure, Grammar, use of Idioms and phrases & their meaning and comprehension of passage.</p>
                       </div>
                    </div>
                  </div>

                  {/* Paper 2 Detailed Topics Combined */}
                  <div className="bg-white border-4 border-ink p-10 shadow-[12px_12px_0_0_#1A1A1A]">
                    <h4 className="text-2xl font-display font-black uppercase text-ink mb-8 border-b-2 border-ink/10 pb-4 flex items-center justify-between">
                       पेपर क्र. २ (निवडक महत्वाचे विषय) <Zap className="text-brand shrink-0" size={24} />
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         "सामान्य बुद्धिमापन व आकलन",
                         "चालू घडामोडी (जागतिक/भारत/महाराष्ट्र)",
                         "अंकगणित आणि सांख्यिकी",
                         "माहिती अधिकार (RTI) 2005",
                         "लोकसेवा हक्क अधिनियम 2015"
                       ].map((item, i) => (
                         <div key={i} className="p-3 border-2 border-ink flex items-center gap-3 hover:bg-brand transition-colors cursor-default">
                           <ShieldCheck size={16} className="text-brand shrink-0" />
                           <span className="text-[10px] font-black uppercase leading-tight tracking-tighter">{item}</span>
                         </div>
                       ))}
                    </div>
                    
                    <div className="mt-8 space-y-4">
                       <div className="p-4 border-r-4 border-brand bg-background hover:translate-x-1 transition-transform">
                          <h5 className="text-xs font-black uppercase text-ink mb-1">भारतीय राज्यघटना</h5>
                          <p className="text-[10px] text-ink/70 leading-relaxed font-body tracking-tight">घटना निर्मिती, प्रस्तावना, महत्वाची कलमे, केंद्र व राज्य संबंध, मूलभूत हक्क व कर्तव्ये, राज्यपाल-मुख्यमंत्री Role, राज्य विधीमंडळ.</p>
                       </div>
                       <div className="p-4 border-r-4 border-ink bg-brand/5 hover:translate-x-1 transition-transform">
                          <h5 className="text-xs font-black uppercase text-ink mb-1">भारताचा व महाराष्ट्राचा भूगोल</h5>
                          <p className="text-[10px] text-ink/70 leading-relaxed font-body tracking-tight underline decoration-brand">Physical sections, Climate, Agriculture, Population migration effects, Rural settlement features, पर्यावरणीय आपत्ती.</p>
                       </div>
                       <div className="p-4 border-r-4 border-brand bg-ink text-white hover:translate-x-1 transition-transform">
                          <h5 className="text-xs font-black uppercase text-brand mb-1">अर्थव्यवस्था व नियोजन</h5>
                          <p className="text-[10px] text-white/50 leading-relaxed font-body italic">समग्रलक्षी अर्थशास्त्र, वृद्धी आणि विकास, सार्वजनिक वित्त, भारतीय शेती व ग्रामीण विकास, सहकार क्षेत्र, पायाभूत सुविधा विकास.</p>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Science & Tech Specialty Block Combined */}
               <div className="bg-white border-4 border-ink p-10 flex flex-col md:flex-row gap-12 hover:shadow-[-16px_16px_0_0_#FFC107] transition-all">
                  <div className="flex-1">
                     <h4 className="text-2xl font-display font-black uppercase mb-6 flex items-center gap-4">
                       <Globe size={40} className="text-brand p-1 border-2 border-ink" /> सामान्य विज्ञान व तंत्रज्ञान
                     </h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Physics", "Chemistry", "Zoology", "Botany"].map(s => (
                          <div key={s} className="flex flex-col p-2 border border-ink/10 bg-background">
                             <span className="text-[10px] font-mono text-brand uppercase font-black">{s}</span>
                             <span className="text-[11px] font-black uppercase">{s === 'Physics' ? 'भौतिकशास्त्र' : s === 'Chemistry' ? 'रसायनशास्त्र' : s === 'Zoology' ? 'प्राणीशास्त्र' : 'वनस्पतीशास्त्र'}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="flex-1 bg-ink text-white p-8 border-4 border-ink relative">
                     <div className="absolute top-0 right-0 w-2 h-full bg-brand" />
                     <h5 className="text-sm font-black uppercase text-brand mb-4 italic tracking-widest flex items-center gap-2 underline underline-offset-4 decoration-white/20">
                       <Zap size={14} /> Modern Tech Matrix
                     </h5>
                     <p className="text-[11px] text-white/70 leading-relaxed font-body">
                        Remote Sensing, Aerial and Drone photography, Geographic Information System (GIS) and its application etc. 
                        माहिती व संप्रेषण तंत्रज्ञान (ICT) integration in governace.
                     </p>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </main>

      {/* Global Footer Call to Action */}
      <section className="bg-ink py-24 px-8 text-center border-t-8 border-brand">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-8 leading-tight">
              Start Your <span className="text-brand">MPSC</span> Preparation Today
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
               <button onClick={onRegister} className="btn-brutalist bg-brand px-12 py-5 text-lg group">
                  <span className="group-hover:translate-x-2 transition-transform inline-block">Join Batch 2026 →</span>
               </button>
               <button onClick={() => setIsAdmissionModalOpen(true)} className="btn-brutalist bg-white text-ink px-12 py-5 text-lg">
                  Get Syllabus PDF
               </button>
            </div>
         </div>
      </section>

      {/* Quick Access Mobile Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
         <div className="bg-ink border-4 border-brand p-2 flex gap-4 shadow-2xl">
            <button onClick={() => scrollToSection('group-b')} className="bg-brand text-ink p-3 border-2 border-ink active:scale-95 transition-all"><BookOpen size={20} /></button>
            <button onClick={() => scrollToSection('group-c')} className="bg-white text-ink p-3 border-2 border-ink active:scale-95 transition-all"><Monitor size={20} /></button>
            <button onClick={() => scrollToSection('syllabus')} className="bg-brand text-ink p-3 border-2 border-ink active:scale-95 transition-all"><PieChart size={20} /></button>
         </div>
      </div>
    </motion.div>
  );
};
