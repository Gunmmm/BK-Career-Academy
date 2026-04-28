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
  Globe
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface PoliceDetailsPageProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
}

export const PoliceDetailsPage: React.FC<PoliceDetailsPageProps> = ({
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
            <span className="text-xl font-display font-black uppercase text-ink leading-none">पोलीस भरती</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Maharashtra State Police</span>
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
              href="https://policerecruitment2024.mahait.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand text-ink px-6 py-3 border-4 border-ink shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-xs font-black uppercase tracking-widest"
            >
              <Globe size={16} /> Official Recruitment Portal
            </a>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
            Maharashtra <span className="text-brand">Police</span> Bharti
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-body max-w-3xl leading-relaxed">
            Your comprehensive orientation for the Maharashtra State Police recruitment — From application steps to physical and written exam mastery.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 pb-40">
        <div className="grid grid-cols-1 gap-32">
          
          {/* SECTION 1: अर्ज कसा भरायचा? */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <UserPlus size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                अर्ज कसा भरायचा? (Process)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] hover:bg-brand/5 transition-all">
                  <h3 className="text-xl font-display font-black uppercase text-brand mb-4">भरती प्रक्रियेचा क्रम</h3>
                  <p className="text-sm font-body text-ink/80 leading-relaxed">
                    २०१९ पर्यंत: अर्ज {">"} मैदानी {">"} लेखी. <br/>
                    २०१९ नंतर: लेखी आधी आणि नंतर मैदानी परीक्षा (टीप: जाहिरातीप्रमाणे बदल शक्य).
                  </p>
               </div>
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] hover:shadow-[-8px_8px_0_0_#F7931A] transition-all">
                  <h3 className="text-xl font-display font-black uppercase text-brand mb-4">एकापेक्षा जास्त अर्ज</h3>
                  <p className="text-sm font-body text-ink/80 leading-relaxed">
                    आता उमेदवार पात्रतेनुसार एकापेक्षा जास्त अर्ज भरू शकतात (उदा. चालक आणि बॅण्डसमन). जिल्ह्यानुसार स्वतंत्र अर्ज भरणे आवश्यक.
                  </p>
               </div>
               <div className="bg-white border-4 border-ink p-8 shadow-[8px_8px_0_0_#1A1A1A] group">
                  <h3 className="text-xl font-display font-black uppercase text-brand mb-4 group-hover:underline">अर्ज फी (अंदाजित)</h3>
                  <p className="text-sm font-body text-ink/80 leading-relaxed">
                    खुला प्रवर्ग: ४५० रुपये <br />
                    राखीव प्रवर्ग: ३५० रुपये <br />
                    <span className="text-[10px] italic">(जाहिरात आल्यावर अधिकृत फी समजेल)</span>
                  </p>
               </div>
            </div>

            <div className="bg-ink text-white p-8 border-4 border-ink relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand rotate-45 translate-x-12 -translate-y-12" />
               <h3 className="text-2xl font-display font-black uppercase text-brand mb-6">आवश्यक कागदपत्रे</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ul className="space-y-4">
                     {["शैक्षणिक पात्रता गुणपत्रिका (12th/10th)", "रहिवासी दाखला (Domicile)", "जातीचा दाखला (Caste Certificate)"].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-brand shrink-0" />
                          <span className="font-bold text-sm">{doc}</span>
                       </li>
                     ))}
                  </ul>
                  <ul className="space-y-4">
                     {["वाहन चालक परवाना (चालक पदासाठी)", "वाद्य प्रशिक्षण प्रमाणपत्र (बॅण्डसमनसाठी)", "महिलांसाठी लग्नानंतरचे नाव बदल दाखला"].map((doc, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="text-brand shrink-0" />
                          <span className="font-bold text-sm">{doc}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* SECTION 2: पात्रता */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Shield size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                पात्रता (Eligibility)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-white border-4 border-ink p-6 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1A1A1A]">
                  <Zap className="text-brand mb-4" size={24} />
                  <h4 className="font-display font-black uppercase text-ink text-sm mb-2">शिक्षण</h4>
                  <p className="text-xs font-body text-ink/70">पोलीस शिपाई साठी १२ वी उत्तीर्ण. पण चालक व बॅण्डसमन पदासाठी १० वी उत्तीर्ण आवश्यक.</p>
               </div>
               <div className="bg-white border-4 border-ink p-6 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1A1A1A]">
                  <Clock className="text-brand mb-4" size={24} />
                  <h4 className="font-display font-black uppercase text-ink text-sm mb-2">वयोमर्यादा</h4>
                  <p className="text-xs font-body text-ink/70">किमान १८ वर्ष. खुल्या वर्गासाठी २८ वर्ष, तर राखीव प्रवर्गासाठी ३३ वर्षापर्यंत सूट.</p>
               </div>
               <div className="bg-white border-4 border-ink p-6 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1A1A1A]">
                  <Ruler className="text-brand mb-4" size={24} />
                  <h4 className="font-display font-black uppercase text-ink text-sm mb-2">उंची</h4>
                  <p className="text-xs font-body text-ink/70">मुले: १६५ सेमी (सशस्त्र: १६७ सेमी). <br/>मुली: १५० सेमी.</p>
               </div>
               <div className="bg-white border-4 border-ink p-6 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1A1A1A]">
                  <Scale className="text-brand mb-4" size={24} />
                  <h4 className="font-display font-black uppercase text-ink text-sm mb-2">वजन</h4>
                  <p className="text-xs font-body text-ink/70">मुले: किमान ५० किलो. <br/>मुली: किमान ४५ किलो.</p>
               </div>
            </div>
            <div className="p-4 bg-ink text-brand font-mono text-[10px] uppercase text-center tracking-widest border-2 border-ink italic">
               दिव्यांग/अपंग व्यक्ती पोलीस शिपाई पदासाठी पात्र नसतात.
            </div>
          </section>

          {/* SECTION 3: मैदानी परीक्षा */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Dumbbell size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                मैदानी परीक्षा (Physical Test)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Boys */}
               <div className="bg-white border-4 border-ink relative">
                  <div className="bg-ink text-white p-4 font-display font-black uppercase text-center tracking-widest">मुलांसाठी (Boys - 50 Marks)</div>
                  <div className="p-8 space-y-6">
                     <div className="flex justify-between items-center border-b-2 border-ink/10 pb-4">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">१६०० मीटर धावणे</h4>
                          <p className="text-[10px] font-mono text-muted">Target: ५ मि १० सेकंद</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">२० गुण</span>
                     </div>
                     <div className="flex justify-between items-center border-b-2 border-ink/10 pb-4">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">१०० मीटर धावणे</h4>
                          <p className="text-[10px] font-mono text-muted">Target: ११:५० सेकंद</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">१५ गुण</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">गोळाफेक</h4>
                          <p className="text-[10px] font-mono text-muted">वजन: ७.२५ किलो | Target: ८.५ मी</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">१५ गुण</span>
                     </div>
                  </div>
               </div>

               {/* Girls */}
               <div className="bg-white border-4 border-ink relative">
                  <div className="bg-brand text-ink p-4 font-display font-black uppercase text-center tracking-widest border-b-4 border-ink">मुलींसाठी (Girls - 50 Marks)</div>
                  <div className="p-8 space-y-6">
                     <div className="flex justify-between items-center border-b-2 border-ink/10 pb-4">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">८०० मीटर धावणे</h4>
                          <p className="text-[10px] font-mono text-muted">Target: २ मि ५० सेकंद</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">२० गुण</span>
                     </div>
                     <div className="flex justify-between items-center border-b-2 border-ink/10 pb-4">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">१०० मीटर धावणे</h4>
                          <p className="text-[10px] font-mono text-muted">Target: १४:०० सेकंद</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">१५ गुण</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-display font-black text-ink uppercase">गोळाफेक</h4>
                          <p className="text-[10px] font-mono text-muted">वजन: ४ किलो | Target: ६ मी</p>
                        </div>
                        <span className="text-2xl font-display font-black text-brand">१५ गुण</span>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          {/* SECTION 4: लेखी परीक्षा */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <FileText size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                लेखी परीक्षा (Written Test)
              </h2>
            </div>

            <div className="bg-white border-4 border-ink p-6 md:p-12 shadow-[12px_12px_0_0_#1A1A1A]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                   <div className="md:col-span-4 space-y-6">
                      <div className="p-6 bg-ink text-white border-4 border-ink">
                         <div className="text-[10px] font-mono text-brand uppercase mb-2">Total Score</div>
                         <div className="text-4xl font-display font-black">१०० गुण</div>
                      </div>
                      <div className="p-6 bg-background border-4 border-ink border-dashed">
                         <div className="text-[10px] font-mono text-ink uppercase mb-2">Time Allocated</div>
                         <div className="text-2xl font-display font-black">९० मिनिटे (१.५ तास)</div>
                      </div>
                   </div>
                   <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { t: "अंकगणित", d: "संख्याप्रकार, बेरीज-वजाबाकी, सरासरी, नफा-तोटा, काळ-काम-वेग", m: "२५" },
                        { t: "बुद्धिमत्ता", d: "अक्षरमाला, सांकेतिक लिपी, नातेसंबंध, दिशा, कूटप्रश्न", m: "२५" },
                        { t: "मराठी व्याकरण", d: "वर्णमाला, संधी, समास, शब्दांच्या जाती, शुद्धलेखन", m: "२५" },
                        { t: "GK & चालू घडामोडी", d: "भूगोल, राज्यघटना, ऐतिहासिक घटना, नियुक्त्या", m: "२५" },
                      ].map((sub, i) => (
                        <div key={i} className="p-6 border-2 border-ink bg-white hover:bg-brand/10 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-display font-black text-ink uppercase text-sm">{sub.t}</h4>
                              <span className="text-xs font-mono font-black text-brand">{sub.m} Marks</span>
                           </div>
                           <p className="text-[10px] text-ink/70 leading-relaxed font-body">{sub.d}</p>
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </section>

          {/* SECTION 5: तयारी आणि टिप्स */}
          <section className="space-y-12">
            <div className="flex items-center gap-6 mb-8 border-b-4 border-ink pb-6">
              <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#1A1A1A] shrink-0">
                <Target size={32} strokeWidth={3} />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-ink leading-none">
                तयारी कशी करावी? (Prep Strategy)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white border-4 border-ink p-8 relative overflow-hidden group">
                  <Utensils className="absolute -top-4 -right-4 text-brand opacity-10 group-hover:scale-125 transition-transform" size={120} />
                  <h3 className="text-xl font-display font-black uppercase text-ink mb-4 border-b-2 border-brand pb-2">परिपूर्ण आहार</h3>
                  <ul className="space-y-3 text-sm font-body text-ink/80">
                    <li>• चणा-हरभरा, डाळी</li>
                    <li>• पालेभाज्या आणि अंडी</li>
                    <li>• शरीराला हायड्रेटेड ठेवा</li>
                  </ul>
               </div>
               <div className="bg-white border-4 border-ink p-8 relative overflow-hidden group shadow-[8px_8px_0_0_#1A1A1A]">
                  <Clock className="absolute -top-4 -right-4 text-brand opacity-10 group-hover:scale-125 transition-transform" size={120} />
                  <h3 className="text-xl font-display font-black uppercase text-ink mb-4 border-b-2 border-brand pb-2">दिनचर्या</h3>
                  <ul className="space-y-3 text-sm font-body text-ink/80">
                    <li>• किमान ७ तास गाढ झोप</li>
                    <li>• पहाटे लवकर उठण्याची सवय</li>
                    <li>• रोज वर्तमानपत्र वाचणे</li>
                  </ul>
               </div>
               <div className="bg-white border-4 border-ink p-8 relative overflow-hidden group">
                  <Users className="absolute -top-4 -right-4 text-brand opacity-10 group-hover:scale-125 transition-transform" size={120} />
                  <h3 className="text-xl font-display font-black uppercase text-ink mb-4 border-b-2 border-brand pb-2">स्मार्ट स्टडी</h3>
                  <ul className="space-y-3 text-sm font-body text-ink/80">
                    <li>• मागील वर्षाचे पेपर्स सोडवणे</li>
                    <li>• महत्वपूर्ण नोट्स काढून ठेवणे</li>
                    <li>• ७०% अभ्यासक्रम हा मागील बेसवर असतो</li>
                  </ul>
               </div>
            </div>

            <div className="bg-brand border-4 border-ink p-8 text-center">
               <p className="font-display font-black uppercase text-ink text-lg leading-relaxed">
                  पोलीस प्रशिक्षण अकॅडमीमध्ये प्रवेश घेतल्यास तज्ज्ञ मार्गदर्शक आणि शिस्तबद्ध सरावाचा फायदा होतो.
               </p>
               <span className="block mt-4 text-[10px] font-mono font-black uppercase tracking-widest text-ink italic opacity-60">Success is a journey of consistency.</span>
            </div>
          </section>

        </div>
      </main>

      {/* Global Footer Call to Action */}
      <section className="bg-ink py-24 px-8 text-center border-t-8 border-brand">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-8">
              Join the <span className="text-brand">BK Career Academy</span> Police Force Batch
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
