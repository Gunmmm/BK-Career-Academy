import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, GraduationCap, ArrowLeft, Target, ShieldCheck, Sparkles } from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';

interface DynamicExamDetailsPageProps {
  examName: string;
  onBack: () => void;
  onRegister: () => void;
}

// ── Smart Content Renderer ──────────────────────────────────────────────
const SmartContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const isRoutine = content.toLowerCase().includes('daily routine') || content.includes('→');
  const isPhases = content.toLowerCase().includes('phase') && (content.includes('1') || content.includes('Foundation'));
  const isChecklist = content.toLowerCase().includes('task tracker') || content.includes('[ ]');

  if (isRoutine) {
    const lines = content.split('\n').filter(l => l.includes('→') || l.includes(':'));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lines.map((line, i) => {
          const parts = line.split(/[→:]/);
          if (parts.length < 2) return null;
          const [time, activity] = parts.map(s => s.trim());
          return (
            <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-black/5 shadow-sm group hover:bg-brand transition-all">
               <div className="px-4 py-2 bg-brand/10 group-hover:bg-white rounded-xl text-brand group-hover:text-ink font-mono font-black text-xs">
                  {time}
               </div>
               <div className="font-display font-bold text-lg uppercase tracking-tight group-hover:text-ink">{activity}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (isPhases) {
    const phases = content.split(/Phase\s*\d+/i).filter(p => p.trim().length > 10);
    return (
      <div className="space-y-8">
        {phases.map((p, i) => (
          <div key={i} className="relative pl-12 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-brand/20">
            <div className="absolute left-[-10px] top-0 w-6 h-6 bg-brand rounded-full border-4 border-white shadow-lg" />
            <div className="bg-brand/5 p-8 rounded-[2.5rem] border border-brand/10">
               <h4 className="text-brand font-mono font-black uppercase tracking-[0.3em] text-xs mb-4">Phase 0{i+1} Deployment</h4>
               <div className="text-ink font-body leading-relaxed whitespace-pre-wrap">{p.trim()}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isChecklist) {
    const items = content.split('\n').filter(l => l.trim().startsWith('[ ]') || l.trim().startsWith('-'));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-white border border-black/5 rounded-[1.5rem] hover:border-brand transition-all group">
             <div className="w-6 h-6 rounded-lg border-2 border-brand/30 flex items-center justify-center group-hover:bg-brand">
                <ShieldCheck size={14} className="text-transparent group-hover:text-ink" />
             </div>
             <span className="font-display font-bold uppercase text-xs tracking-wide">{item.replace(/\[\s?\]|-/, '').trim()}</span>
          </div>
        ))}
      </div>
    );
  }

  return <div className="whitespace-pre-wrap">{content}</div>;
};

// ── Premium Countdown Widget ───────────────────────────────────────────────
const CountdownTimer: React.FC<{ examDate: string }> = ({ examDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(examDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        passed: false
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [examDate]);

  if (timeLeft.passed) return null;

  return (
    <div className="mb-20 p-1 bg-gradient-to-br from-brand/20 via-transparent to-brand/10 rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20">
      <div className="bg-[#0A0A0A]/90 p-8 md:p-12 rounded-[2.9rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center shadow-[0_0_30px_rgba(247,147,26,0.2)]">
              <Clock className="text-brand animate-pulse" size={32} />
            </div>
            <div>
              <h4 className="text-white text-3xl font-display font-black tracking-tight uppercase">Strategic <span className="text-brand">Deadline</span></h4>
              <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] mt-1">Operational Window Closing</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 backdrop-blur-md">
            <Calendar size={18} className="text-brand/60" />
            <span className="text-white/80 font-display font-bold text-sm">
              {new Date(examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              {` | ${new Date(examDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {[
            { l: 'Days', v: timeLeft.days },
            { l: 'Hrs', v: timeLeft.hours },
            { l: 'Min', v: timeLeft.minutes },
            { l: 'Sec', v: timeLeft.seconds }
          ].map(b => (
            <div key={b.l} className="group">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] text-center backdrop-blur-md transition-all hover:bg-brand/10 hover:border-brand/30">
                <span className="text-5xl md:text-7xl font-display font-black text-white block mb-2 tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {String(b.v).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-brand/60 group-hover:text-brand transition-colors">{b.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DynamicExamDetailsPage: React.FC<DynamicExamDetailsPageProps> = ({
  examName,
  onBack,
  onRegister
}) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [upscResp, coursesResp, examsResp] = await Promise.all([
          fetch('/api/content/upsc_hub'),
          fetch('/api/content/courses'),
          fetch('/api/content/exams')
        ]);
        const [upscData, coursesData, examsData] = await Promise.all([
          upscResp.json(),
          coursesResp.json(),
          examsResp.json()
        ]);
        const allItems = [...(upscData.items || []), ...(coursesData.items || []), ...(examsData.items || [])];
        const matches = allItems.filter(item => 
          item.subCategory?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.title?.trim().toLowerCase() === examName.trim().toLowerCase() ||
          item.category?.trim().toLowerCase() === examName.trim().toLowerCase()
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (matches.length > 0) {
          // Aggregate ALL sections from history
          const allSections = matches.reduce((acc, curr) => [...acc, ...(curr.dynamicSections || [])], []);
          
          // Find the most recent non-empty image and date
          const firstWithImage = matches.find(m => m.image);
          const firstWithDate = matches.find(m => m.examDate);
          
          setContent({ 
            ...matches[0], 
            image: firstWithImage ? firstWithImage.image : matches[0].image,
            examDate: firstWithDate ? firstWithDate.examDate : matches[0].examDate,
            dynamicSections: allSections 
          });
        } else {
          setContent(null);
        }
      } catch (err) {
        console.error("Failed to fetch exam details", err);
      } finally {
        setLoading(false);
      }
    };
    if (examName) fetchContent();
  }, [examName]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F9FA] relative">
      <nav className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-7xl">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/40 h-20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
            <BrandLogo className="w-10 h-10" />
            <div className="hidden sm:flex flex-col mt-1">
              <span className="text-xl font-display font-black uppercase text-ink leading-none">{examName}</span>
              <span className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Institutional</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-3 rounded-2xl bg-background border border-ink/5 text-ink hover:bg-brand hover:text-ink transition-all"><ArrowLeft size={20} /></button>
          </div>
        </div>
      </nav>

      <header className="pt-56 pb-32 px-8 bg-white relative overflow-hidden text-center">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full mb-8">
          <Sparkles size={14} className="text-brand" />
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-brand">Exclusive Strategic Content</span>
        </motion.div>
        <h1 className="text-6xl md:text-9xl font-display font-black text-ink uppercase tracking-tighter leading-[0.8] mb-10">
          {examName} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand/60">Blueprints</span>
        </h1>
        <p className="text-muted text-xl md:text-2xl font-body max-w-3xl mx-auto leading-relaxed">
          The ultimate institutional framework for {examName} candidates.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 pb-40">
        {loading ? (
           <div className="py-40 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">Syncing Protocols...</span>
           </div>
        ) : content ? (
          <div className="grid grid-cols-1 gap-16">
            {content.examDate && <CountdownTimer examDate={content.examDate} />}
            {content.image && (
              <div className="w-full h-[500px] md:h-[700px] overflow-hidden rounded-[3rem] shadow-2xl relative">
                 <img src={content.image} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                 <div className="absolute bottom-12 left-12">
                    <div className="text-brand text-xs font-mono font-black uppercase tracking-[0.5em] mb-4">Official Visual Record</div>
                    <h2 className="text-white text-5xl font-display font-black uppercase tracking-tight">{examName} Orientation</h2>
                 </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-12 mt-12">
              {content.dynamicSections?.map((sec: any, idx: number) => (
                <motion.section 
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white border-4 border-ink p-10 md:p-16 shadow-[16px_16px_0_0_#F7931A] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <GraduationCap size={400} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-12 border-b-4 border-ink pb-8">
                      <div className="w-16 h-16 bg-brand border-4 border-ink flex items-center justify-center shadow-[6px_6px_0_0_#1A1A1A] shrink-0">
                         {idx % 2 === 0 ? <Target size={32} strokeWidth={3} /> : <ShieldCheck size={32} strokeWidth={3} />}
                      </div>
                      <div>
                        <h3 className="text-4xl md:text-5xl font-display font-black text-ink uppercase tracking-tight leading-none">{sec.title}</h3>
                        <div className="mt-2 text-[10px] font-mono text-brand font-black uppercase tracking-[0.4em]">Strategic Module 0{idx + 1}</div>
                      </div>
                    </div>
                    <div className="prose prose-xl max-w-none">
                       <SmartContentRenderer content={sec.content} />
                    </div>
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[4rem] shadow-xl">
            <h3 className="text-4xl font-display font-black text-ink uppercase mb-6 italic">Protocol Not Active</h3>
            <button onClick={onRegister} className="px-16 py-6 bg-brand text-ink rounded-3xl font-display font-black text-2xl uppercase">Inquire Now</button>
          </div>
        )}
      </main>

      <section className="bg-ink py-40 px-8 relative overflow-hidden border-t-[32px] border-white text-center">
        <GraduationCap size={80} className="text-brand mx-auto mb-12 opacity-50" />
        <h2 className="text-6xl md:text-9xl font-display font-black text-white uppercase mb-16 leading-[0.8]">
          Initiate Your <br/> <span className="text-brand">Training</span> Phase
        </h2>
        <button onClick={onRegister} className="px-16 py-8 bg-brand text-ink rounded-[2.5rem] font-display font-black text-2xl uppercase shadow-2xl">Join Academy</button>
      </section>
    </motion.div>
  );
};

export default DynamicExamDetailsPage;
