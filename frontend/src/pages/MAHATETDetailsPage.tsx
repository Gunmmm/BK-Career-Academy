import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  UserPlus, 
  Scale, 
  Dumbbell, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Zap, 
  Ruler, 
  Target,
  Users,
  Globe,
  GraduationCap,
  Calendar,
  CreditCard,
  ClipboardList,
  BookOpen,
  Award,
  Lightbulb,
  Info
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface MAHATETDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
}

export const MAHATETDetailsPage: React.FC<MAHATETDetailsPageProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background relative selection:bg-brand selection:text-ink"
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
            <span className="text-xl font-display font-black uppercase text-ink leading-none">MAHA TET 2026</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Maharashtra State Teacher Eligibility</span>
          </div>
        </motion.div>
        
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-brand hover:translate-x-1 transition-transform"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] font-black">Return to Courses</span>
            </button>
            
            <a 
              href="https://mahatet.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand text-ink px-6 py-3 border-4 border-ink shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-xs font-black uppercase tracking-widest"
            >
              <Globe size={16} /> Official TET Portal
            </a>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
            MAHA <span className="text-brand">TET</span> 2026
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-body max-w-3xl leading-relaxed">
            'महाराष्ट्र शिक्षक पात्रता परीक्षा' (MAHA TET) ही एक राज्यस्तरीय परीक्षा आहे, जी महाराष्ट्रातील शाळांमध्ये इयत्ता १ ली ते ८ वी पर्यंतच्या अध्यापन पदांसाठी उमेदवारांची पात्रता निश्चित करते.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 pb-40">
        <div className="grid grid-cols-1 gap-32">
          
          {/* Timeline Section: महत्त्वाच्या तारखा */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Calendar size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                महत्त्वाच्या तारखा (Timeline)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] hover:bg-brand/5 transition-all">
                  <h3 className="text-sm font-mono font-bold uppercase text-brand mb-2">अधिसूचना प्रसिद्ध</h3>
                  <p className="text-2xl font-display font-black text-ink">२६ मार्च २०२६</p>
               </div>
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] hover:shadow-[-8px_8px_0_0_#F7931A] transition-all border-l-brand">
                  <h3 className="text-sm font-mono font-bold uppercase text-brand mb-2">अर्ज भरण्यास सुरुवात</h3>
                  <p className="text-2xl font-display font-black text-ink">२७ मार्च २०२६</p>
               </div>
               <div className="bg-ink border-4 border-ink p-8 shadow-[8px_8px_0_0_#F7931A] group">
                  <h3 className="text-sm font-mono font-bold uppercase text-brand mb-2">अंतिम मुदत (वाढवलेली)</h3>
                  <p className="text-2xl font-display font-black text-white">२४ एप्रिल २०२६</p>
                  <p className="text-[10px] text-brand uppercase mt-2 font-black italic">मुदतवाढ दिलेली आहे!</p>
               </div>
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] hover:bg-brand/5 transition-all">
                  <h3 className="text-sm font-mono font-bold uppercase text-brand mb-2">परीक्षेची तारीख</h3>
                  <p className="text-2xl font-display font-black text-ink">२१ जून २०२६</p>
               </div>
            </div>
          </section>

          {/* Eligibility Section: पात्रता निकष */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <GraduationCap size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                पात्रता निकष (Eligibility)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Paper 1 */}
               <div className="bg-white border-4 border-ink relative overflow-hidden group hover:shadow-[12px_12px_0_0_#1A1A1A] transition-all">
                  <div className="bg-ink text-white p-4 font-display font-black uppercase text-center tracking-widest">पेपर I (इयत्ता १ ली ते ५ वी)</div>
                  <div className="p-8 space-y-4">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          ५०% गुणांसह उच्च माध्यमिक (HSC) शिक्षण पूर्ण.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          D.T.Ed / पदविका शिक्षण (D.Ed) २ वर्षे पूर्ण.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          अथवा ५०% गुणांसह पदवी आणि B.Ed.
                        </p>
                      </div>
                  </div>
               </div>

               {/* Paper 2 */}
               <div className="bg-white border-4 border-ink relative overflow-hidden group hover:shadow-[12px_12px_0_0_#F7931A] transition-all">
                  <div className="bg-brand text-ink p-4 font-display font-black uppercase text-center tracking-widest border-b-4 border-ink">पेपर II (इयत्ता ६ वी ते ८ वी)</div>
                  <div className="p-8 space-y-4">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-ink shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          किमान ४५% गुणांसह पदवी (Graduation).
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-ink shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          B.Ed. पूर्ण केलेले असावे.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="text-ink shrink-0 mt-1" size={20} />
                        <p className="text-sm font-body text-ink/80 leading-relaxed">
                          अथवा ५०% गुणांसह HSC + B.El.Ed / B.A.Ed.
                        </p>
                      </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Process Section: अर्ज प्रक्रिया */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <ClipboardList size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                अर्ज प्रक्रिया (How to Apply)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { step: "01", text: "अधिकृत वेबसाइट mahatet.in ला भेट द्या." },
                 { step: "02", stepLabel: "New Registration", text: "'नवीन नोंदणी' बटणावर क्लिक करा." },
                 { step: "03", text: "SMS द्वारे नोंदणी क्रमांक व पासवर्ड मिळवा." },
                 { step: "04", stepLabel: "Log-in", text: "लॉग-इन करून अर्जात प्रवेश करा." },
                 { step: "05", text: "माहिती भरा व आवश्यक कागदपत्रे अपलोड करा." },
                 { step: "06", stepLabel: "Preview", text: "भरलेल्या माहितीची पडताळणी करा." },
                 { step: "07", text: "तुमच्या प्रवर्गाप्रमाणे अर्ज शुल्क भरा." },
                 { step: "08", text: "भविष्यासाठी अर्जाची प्रत डाउनलोड करा." },
               ].map((step, i) => (
                 <div key={i} className="bg-white border-4 border-ink p-6 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1A1A1A] flex flex-col justify-between">
                    <div>
                      <div className="text-3xl font-display font-black text-brand/30 mb-4">{step.step}</div>
                      {step.stepLabel && <p className="text-[10px] font-mono text-brand font-bold uppercase mb-2">[{step.stepLabel}]</p>}
                      <p className="text-xs font-bold text-ink leading-relaxed">{step.text}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Fees Section: अर्ज शुल्क */}
          <section className="space-y-12" id="fees">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <CreditCard size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                अर्ज शुल्क (Fee Structure)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white border-4 border-ink p-8 shadow-[12px_12px_0_0_#1A1A1A]">
                  <h3 className="text-xl font-display font-black bg-ink text-white px-6 py-3 uppercase tracking-tighter mb-6">SC / ST / दिव्यांग उमेदवार</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center border-b-2 border-ink/5 pb-4">
                        <span className="text-sm font-bold">फक्त एक पेपर (I किंवा II)</span>
                        <span className="text-2xl font-display font-black text-brand">₹ ७००/-</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">दोन्ही पेपर्स (I + II)</span>
                        <span className="text-2xl font-display font-black text-brand">₹ ९००/-</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white border-4 border-ink p-8 shadow-[12px_12px_0_0_#F7931A]">
                  <h3 className="text-xl font-display font-black bg-brand text-ink px-6 py-3 uppercase tracking-tighter mb-6">इतर सर्व प्रवर्ग (OBC/Open/EWS)</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center border-b-2 border-ink/5 pb-4">
                        <span className="text-sm font-bold">फक्त एक पेपर (I किंवा II)</span>
                        <span className="text-2xl font-display font-black text-ink">₹ १०००/-</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">दोन्ही पेपर्स (I + II)</span>
                        <span className="text-2xl font-display font-black text-ink">₹ १२००/-</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="p-4 bg-ink text-brand font-mono text-[10px] uppercase text-center tracking-widest border-2 border-ink italic">
               अर्ज शुल्क केवळ ऑनलाईन पद्धतीनेच स्वीकारले जाईल.
            </div>
          </section>

          {/* Exam Pattern Section: परीक्षेचा नमुना */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Target size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                परीक्षेचा नमुना (Exam Pattern)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Paper 1 Pattern */}
               <div className="space-y-6">
                  <div className="pill-accent inline-block">पेपर १: इयत्ता १ ते ५</div>
                  <div className="border-4 border-ink overflow-hidden shadow-[8px_8px_0_0_#1A1A1A]">
                    <div className="grid grid-cols-3 bg-ink text-white p-3 text-[10px] uppercase font-black tracking-widest text-center">
                      <span>विषय</span>
                      <span>प्रश्न</span>
                      <span>गुण</span>
                    </div>
                    {[
                      { s: "बालविकास व अध्यापनशास्त्र", q: "३०", m: "३०" },
                      { s: "भाषा १", q: "३०", m: "३०" },
                      { s: "भाषा २", q: "३०", m: "३०" },
                      { s: "गणित", q: "३०", m: "३०" },
                      { s: "पर्यावरण अभ्यास", q: "३०", m: "३०" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 border-t-2 border-ink/10 p-4 text-xs font-bold text-center">
                        <span className="text-left">{row.s}</span>
                        <span>{row.q}</span>
                        <span className="text-brand">{row.m}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 bg-brand p-3 text-sm font-black text-ink text-center border-t-4 border-ink">
                      <span>एकूण</span>
                      <span>१५०</span>
                      <span>१५०</span>
                    </div>
                  </div>
               </div>

               {/* Paper 2 Pattern */}
               <div className="space-y-6">
                  <div className="pill-accent inline-block bg-ink text-white">पेपर २: इयत्ता ६ ते ८</div>
                  <div className="border-4 border-ink overflow-hidden shadow-[8px_8px_0_0_#F7931A]">
                    <div className="grid grid-cols-3 bg-ink text-white p-3 text-[10px] uppercase font-black tracking-widest text-center">
                      <span>विषय</span>
                      <span>प्रश्न</span>
                      <span>गुण</span>
                    </div>
                    {[
                      { s: "बालविकास व अध्यापनशास्त्र", q: "३०", m: "३०" },
                      { s: "भाषा १", q: "३०", m: "३०" },
                      { s: "भाषा २", q: "३०", m: "३०" },
                      { s: "गणित/विज्ञान किंवा सामाजिक शास्त्र", q: "६०", m: "६०" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 border-t-2 border-ink/10 p-4 text-xs font-bold text-center">
                        <span className="text-left">{row.s}</span>
                        <span>{row.q}</span>
                        <span className="text-brand">{row.m}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 bg-ink text-brand p-3 text-sm font-black text-center border-t-4 border-ink">
                      <span>एकूण</span>
                      <span>१५०</span>
                      <span>१५०</span>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Qualifying Marks Section: पात्रता गुण */}
          <section className="bg-white border-4 border-ink p-12 shadow-[16px_16px_0_0_#1A1A1A]">
            <div className="flex items-center gap-6 mb-12 border-b-4 border-ink pb-6">
              <Award className="text-brand shrink-0" size={40} strokeWidth={3} />
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                पात्रता गुण (Pass Criteria)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <h3 className="text-xl font-display font-black uppercase text-ink">सर्वसाधारण प्रवर्ग (General)</h3>
                  <div className="flex items-end gap-4">
                     <span className="text-6xl font-display font-black text-ink">६०%</span>
                     <span className="text-xl font-mono text-muted mb-2 font-bold">(९० / १५० गुण)</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-display font-black uppercase text-brand">SC / ST / PwD प्रवर्ग</h3>
                  <div className="flex items-end gap-4">
                     <span className="text-6xl font-display font-black text-brand">५५%</span>
                     <span className="text-xl font-mono text-muted mb-2 font-bold">(८२ / १५० गुण)</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Expert Tips: परीक्षेच्या तयारीसाठी टिप्स */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Lightbulb size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                तयारीसाठी टिप्स (Expert Tips)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { t: "मूलभूत बाबी (Basics)", d: "दोन्ही पेपरमधील विषयांच्या मूलभूत संकल्पना अगदी मुळापासून (Roots level) स्पष्ट असाव्यात." },
                 { t: "अभ्यास साहित्य", d: "योग्य अभ्यास साहित्य आणि अभ्यासाचे वेळापत्रक (Timetable) यांचे काटेकोरपणे पालन करा." },
                 { t: "सराव परीक्षा", d: "परीक्षेच्या स्वरूपाशी जुळणाऱ्या 'मॉक टेस्ट्स' (Mock Tests) जास्तीत जास्त सोडवा." },
                 { t: "सामान्य ज्ञान", d: "चालू घडामोडी (Current Affairs) आणि सामान्य ज्ञानासाठी नियमितपणे अपडेट राहा." },
                 { t: "वेळेचे नियोजन", d: "प्रत्येक विषयासाठी पुरेसा वेळ देऊन वेळेचे अचूक नियोजन (Time Management) करा." },
                 { t: "पुनरावृत्ती", d: "अभ्यास केलेल्या घटकांची वारंवार उजळणी करणे यशासाठी अत्यंत महत्त्वाचे आहे." }
               ].map((tip, i) => (
                 <div key={i} className="bg-white border-4 border-ink p-8 hover:bg-brand/5 transition-all shadow-[6px_6px_0_0_#1A1A1A]">
                    <div className="w-8 h-8 bg-brand border-2 border-ink flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#000]">
                       <Zap size={16} strokeWidth={3} />
                    </div>
                    <h3 className="text-lg font-display font-black uppercase text-ink mb-3">{tip.t}</h3>
                    <p className="text-xs text-ink/70 font-bold leading-relaxed">{tip.d}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Exam Lifecycle Info Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <ClipboardList size={24} />, title: "उत्तरतालिका", label: "Answer Key", status: "लवकरच उपलब्ध" },
               { icon: <FileText size={24} />, title: "प्रवेशपत्र", label: "Admit Card", status: "परीक्षेपूर्वी उपलब्ध" },
               { icon: <Info size={24} />, title: "कट-ऑफ", label: "Cut Off", status: "निकालानंतर जाहीर" },
               { icon: <Zap size={24} />, title: "निकाल", label: "Results", status: "अधिकृत पोर्टलवर" }
             ].map((item, i) => (
               <div key={i} className="bg-white border-4 border-ink p-6 hover:shadow-[4px_4px_0_0_#F7931A] transition-all">
                  <div className="text-brand mb-4">{item.icon}</div>
                  <h3 className="text-xl font-display font-black text-ink">{item.title}</h3>
                  <p className="text-[10px] font-mono font-bold text-muted uppercase mb-4">{item.label}</p>
                  <div className="bg-ink text-white text-[10px] font-black p-2 text-center uppercase tracking-widest italic shadow-[2px_2px_0_0_#F7931A]">
                    {item.status}
                  </div>
               </div>
             ))}
          </section>

          {/* Resources & Books: महत्त्वाची पुस्तके */}
          <section className="space-y-8 bg-brand/5 p-12 border-4 border-ink border-dashed">
             <div className="flex items-center gap-4 mb-4">
                <BookOpen className="text-brand" size={28} />
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter">अभ्यास साहित्य (Books & Resources)</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-4">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                 <div key={num} className="bg-white border-2 border-ink p-2 shadow-[4px_4px_0_0_#1A1A1A] hover:-translate-y-1 transition-transform group">
                   <div className="aspect-[3/4] overflow-hidden bg-muted relative border border-ink/10">
                     <img 
                       src={`/images/tetbooks/${num}.jpg`} 
                       alt={`MAHA TET Book ${num}`}
                       className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                     />
                   </div>
                   <div className="mt-2 text-[10px] font-mono font-bold text-ink uppercase text-center opacity-40 group-hover:opacity-100 transition-opacity">
                     Ref: TET-BK-{num.toString().padStart(2, '0')}
                   </div>
                 </div>
               ))}
             </div>
             <p className="mt-8 text-sm font-bold text-ink leading-relaxed max-w-4xl">
               MAHA TET परीक्षेची पुस्तके अभ्यासक्रमाचा सखोल आढावा घेतात. यामध्ये समाविष्ट असलेले 'सराव संच' (Practice Sets) आणि 'नमुना प्रश्नपत्रिका' (Sample Papers) उमेदवारांना मूल्यांकनासाठी उपयुक्त ठरतात. सर्वोत्तम तयारीसाठी 'BK Career Academy' संदर्भांचा वापर करा.
             </p>
          </section>

        </div>
      </main>

      {/* Global Footer Call to Action */}
      <section className="bg-ink py-24 px-8 text-center border-t-8 border-brand">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-8">
              Join the <span className="text-brand">BK Career Academy</span> TET Force Batch
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={onRegister} className="btn-brutalist bg-brand px-12 py-5 text-lg">
                  Register For Batch
               </button>
               <button onClick={() => setIsAdmissionModalOpen(true)} className="btn-brutalist bg-white text-ink px-12 py-5 text-lg">
                  Enquiry Now
               </button>
            </div>
         </div>
      </section>
    </motion.div>
  );
};
