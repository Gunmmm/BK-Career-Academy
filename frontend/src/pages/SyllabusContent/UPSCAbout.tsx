import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';


interface AboutUPSCProps {
  onBack: () => void;
  onRegister: () => void;
  setView: (view: any) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const AboutUPSC: React.FC<AboutUPSCProps> = ({
  onBack,
  onRegister,
  setView,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const [hubContent, setHubContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/content/upsc_hub')
      .then(res => res.json())
      .then(data => {
        if (data.success) setHubContent(data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void pt-20 pb-32"
    >
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 h-16 flex items-center justify-between bg-white text-black drop-shadow-xl border-b border-black/10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nav-brand flex items-center gap-4 cursor-pointer"
          onClick={() => setView('home')}
        >
          <BrandLogo className="scale-[0.65] sm:scale-75" />
          <div className="hidden sm:flex flex-col ml-3">
            <span className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight text-[#0F1115] leading-none">Career Academy</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#F7931A] font-bold mt-1">Education & Welfare Society</span>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsRegistrationModalOpen(true)}
            className="bg-brand text-ink py-1.5 px-3 text-[10px] font-bold uppercase border-2 border-ink"
          >
            Inquiry
          </button>
          <button 
            onClick={() => setIsAdmissionModalOpen(true)}
            className="bg-ink text-brand py-1.5 px-3 text-[10px] font-bold uppercase border-2 border-ink hover:bg-brand hover:text-ink transition-all"
          >
            Admission
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 relative">
        <button 
          onClick={onBack}
          className="fixed top-40 left-8 btn-outline px-6 py-3 z-50 bg-void/50 backdrop-blur-md"
        >
          <ChevronRight className="rotate-180 inline mr-2" size={16} />
          <span className="text-xs font-mono uppercase tracking-widest">Back to Hub</span>
        </button>

        <article className="prose prose-invert max-w-none">
          <header className="mb-20 text-center border-b border-white/10 pb-12">
            <div className="text-[#F7931A] text-xs font-mono uppercase tracking-[0.4em] mb-6">Strategic orientation</div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tighter uppercase mb-6">
              Career Opportunities <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent italic">Through UPSC</span>
            </h1>
            <p className="text-[#94A3B8] font-body text-xl max-w-3xl mx-auto leading-relaxed">
              A Gateway to Prestigious Government Services — The blueprint for absolute administrative leadership in modern India.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-16">
            {loading ? (
              <div className="py-20 text-center text-[#F7931A] animate-pulse uppercase font-mono tracking-widest">
                Fetching Strategic Insights...
              </div>
            ) : hubContent.length > 0 ? (
              hubContent.map((item, idx) => (
                <section key={idx} className="relative group">
                  <div className="flex justify-between items-center mb-10 border-l-4 border-[#F7931A] pl-6 py-2">
                    <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-tight">
                      {item.title} <span className="text-[#F7931A] text-sm font-mono block tracking-widest mt-1 opacity-60">{item.subCategory}</span>
                    </h2>
                    {item.isFeatured && <span className="bg-brand text-ink text-[10px] font-bold px-3 py-1 uppercase rounded-sm">Featured</span>}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {item.dynamicSections.map((sec: any, sIdx: number) => (
                      <div key={sIdx} className="p-10 bg-[#0F1115] border border-white/5 rounded-2xl relative overflow-hidden transition-all hover:border-[#F7931A]/30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7931A]/5 rounded-full blur-[60px]" />
                        <h3 className="text-2xl font-heading font-bold text-[#F7931A] uppercase tracking-wider mb-6 flex items-center gap-4">
                           {sec.title}
                        </h3>
                        <div className="text-white/80 text-lg leading-relaxed font-body whitespace-pre-wrap">
                          {sec.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-40 border border-white/5 rounded-3xl">
                <p className="text-[#94A3B8] text-xl font-body italic">"Strategic content for this hub is being finalized. Check back soon for the full blueprint."</p>
              </div>
            )}

            <footer className="text-center py-20 border-t border-white/10 mt-20">
              <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Ready to Forge Your Legacy?</h2>
              <p className="text-[#94A3B8] mb-10 max-w-xl mx-auto text-lg italic leading-relaxed">
                "Motivation fades, but discipline stays forever. A career through UPSC CSE opens doors to prestigious, impactful roles that contribute to India’s growth."
              </p>
              <button 
                 onClick={onRegister}
                 className="btn-primary py-5 px-16 text-xl uppercase tracking-[0.2em]"
              >
                Start Your Journey →
              </button>
            </footer>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default AboutUPSC;
