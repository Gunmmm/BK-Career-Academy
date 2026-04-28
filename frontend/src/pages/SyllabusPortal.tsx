import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, 
  Star, 
  Award,
  ArrowRight,
  ChevronDown,
  Book,
  Download
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface SyllabusPortalProps {
  category: any;
  onBack: () => void;
  onRegister: () => void;
  initialModule?: string | null;
  view: string;
  setView: (view: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setIsRegistrationModalOpen: (open: boolean) => void;
  setIsAdmissionModalOpen: (open: boolean) => void;
}

export const SyllabusPortal: React.FC<SyllabusPortalProps> = ({
  category,
  onBack,
  onRegister,
  initialModule = null,
  view,
  setView,
  isMenuOpen,
  setIsMenuOpen,
  setIsRegistrationModalOpen,
  setIsAdmissionModalOpen
}) => {
  const [activeModule, setActiveModule] = useState<string | null>(initialModule);
  const [activeContent, setActiveContent] = useState<number | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence', 
    'Teaching', 'Insurance', 'Engineering', 'Law', 'Medical', 'FCI', 'Question Papers'
  ];

  React.useEffect(() => {
    setLoading(true);
    // If Question Papers is active, we fetch all to filter locally for the prefix
    const isQP = activeModule === 'Question Papers';
    const url = (activeModule && !isQP) ? `/api/books?category=${activeModule}` : '/api/books';
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (isQP) {
            // Filter books that have "Question Paper" in their category string
            const filtered = data.items.filter((b: any) => 
              b.category && b.category.toLowerCase().includes('question paper')
            );
            setBooks(filtered);
          } else {
            setBooks(data.items);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeModule]);

  const syllabusItems = categories.map(cat => ({ 
    name: cat, 
    icon: Book 
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-void"
    >
      {/* Portal Navbar */}
      <nav className="sticky top-10 z-50 bg-white border-b-4 border-ink px-8 py-6 mb-16">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
            <BrandLogo className="w-12 h-12" />
            <div className="flex flex-col mt-1">
              <div className="text-xl font-display font-black text-ink uppercase leading-none">Book Portal</div>
              <div className="text-[10px] font-mono text-brand font-bold uppercase tracking-widest mt-1">Academic Resources</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={onRegister}
               className="bg-brand text-ink py-1.5 px-3 text-[10px] font-bold uppercase border-2 border-ink"
             >
               Inquiry
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-6">
              <button 
                onClick={activeModule ? () => setActiveModule(null) : onBack}
                className="w-12 h-12 flex items-center justify-center border-4 border-ink bg-brand hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0_0_#1A1A1A]"
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {activeModule ? (
                  <>
                    <span className="text-ink">{activeModule}</span> <span className="outline-text">Archive</span>
                  </>
                ) : (
                  <>
                    <span className="text-ink">Book</span> <span className="outline-text">Portal</span>
                  </>
                )}
              </h2>
            </div>
            <p className="text-muted text-lg font-body max-w-2xl leading-relaxed">
              Access Nashik's most comprehensive digital library. Specialized notes and strategic PDF roadmaps for all major competitive exams.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span className="text-[10px] font-mono text-ink uppercase tracking-[0.3em] mb-2 font-bold">Quick Navigator</span>
            <div className="relative group">
              <select 
                onChange={(e) => setActiveModule(e.target.value)}
                value={activeModule || ""}
                className="bg-white border-4 border-ink text-ink text-xs font-display font-black uppercase px-6 py-3 pr-12 appearance-none cursor-pointer focus:outline-none hover:bg-brand transition-all shadow-[4px_4px_0_0_#1A1A1A]"
              >
                <option value="">Switch Module</option>
                {syllabusItems.map(item => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-ink p-8 md:p-12 min-h-[600px] shadow-[-12px_12px_0_0_#F7931A]">
           <div className="mb-12 border-b-4 border-ink pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div>
               <h2 className="text-3xl font-display font-black uppercase">Digital Library</h2>
               <p className="text-muted text-xs font-mono uppercase mt-2 tracking-widest">All Resources & Notes</p>
             </div>
             
             {/* Dynamic Filter Bar */}
             <div className="flex flex-wrap gap-2">
               {['All', ...categories].map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveModule(cat === 'All' ? null : cat)}
                   className={`px-4 py-2 text-[9px] font-black uppercase border-2 transition-all ${
                     (activeModule === cat || (cat === 'All' && !activeModule))
                       ? 'bg-brand text-ink border-ink'
                       : 'bg-white text-ink/40 border-ink/10 hover:border-ink hover:text-ink'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>

           {loading ? (
             <div className="py-20 text-center uppercase font-mono animate-pulse">Loading Library Resources...</div>
           ) : books.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {books.map((book: any) => (
                 <div key={book._id} className="group relative bg-white border-2 border-ink p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all hover:shadow-[6px_6px_0_0_#1A1A1A]">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-ink text-brand flex items-center justify-center shrink-0">
                         <Download size={24} />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm uppercase leading-tight">{book.title}</h4>
                        <span className="text-[8px] font-mono text-muted uppercase tracking-widest">{book.category}</span>
                      </div>
                   </div>
                   {book.description && <p className="text-[10px] text-muted line-clamp-2">{book.description}</p>}
                   <a 
                     href={book.pdfUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="mt-4 w-full bg-brand text-ink py-2 text-[10px] font-black uppercase border-2 border-ink text-center hover:bg-ink hover:text-brand transition-all"
                     onClick={() => {
                        fetch('/api/track/download', {
                           method: 'POST',
                           headers: { 'Content-Type': 'application/json' },
                           body: JSON.stringify({ formType: book.title, studentName: 'Portal User' })
                        });
                     }}
                   >
                     Download PDF
                   </a>
                 </div>
               ))}
             </div>
           ) : (
             <div className="py-20 text-center">
               <div className="text-4xl opacity-10 mb-4">📚</div>
               <h2 className="text-xl font-display font-black uppercase">No Resources Found</h2>
               <p className="text-muted mt-2">Content for this section is being curated.</p>
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default SyllabusPortal;
