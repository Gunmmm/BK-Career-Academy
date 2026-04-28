import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowLeft, Quote } from 'lucide-react';
import { Story } from '../data/stories';

interface SuccessStoriesPageProps {
  stories: Story[];
  onBack: () => void;
  onAddYours: () => void;
}

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ stories, onBack, onAddYours }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-32 pb-20 px-6 sm:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b-8 border-ink pb-12">
          <div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-brand mb-6 hover:translate-x-1 transition-transform"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] font-black">Back to Academy</span>
            </button>
            <h1 className="text-4xl md:text-7xl font-display font-black text-ink uppercase tracking-tighter leading-none mb-4">
              Our <span className="text-brand">Success</span> Stories
            </h1>
            <p className="text-lg text-muted font-body max-w-2xl leading-relaxed">
              Real results from real aspirants. Discover the journeys of those who turned their administrative dreams into absolute reality with BK Career Academy.
            </p>
          </div>
          <button 
            onClick={onAddYours}
            className="btn-brutalist bg-brand px-10 py-5 text-lg"
          >
            Share Your Story
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-white border-4 border-ink shadow-[12px_12px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all relative group h-full flex flex-col"
            >
              <div className="absolute top-6 right-8 text-brand opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={60} />
              </div>

              <div className="flex gap-1 mb-8 text-brand">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < story.rating ? "currentColor" : "transparent"} 
                    className={i < story.rating ? "text-brand" : "text-ink/10"}
                  />
                ))}
              </div>

              <p className="text-lg font-body leading-relaxed mb-10 text-ink/90 italic flex-grow">
                 "{story.content}"
              </p>

              <div className="flex items-center gap-5 mt-auto pt-8 border-t-2 border-ink/5">
                <div className="w-16 h-16 bg-brand/10 border-4 border-ink/5 flex items-center justify-center text-2xl font-display font-black text-brand group-hover:bg-brand group-hover:text-ink transition-colors">
                  {story.initials}
                </div>
                <div>
                  <div className="text-xl font-display font-black text-ink leading-none mb-1">{story.name}</div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted font-bold">{story.role || 'Successful Candidate'}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 p-12 bg-ink border-4 border-brand text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FFC107 1px, transparent 0)`,
               backgroundSize: '24px 24px'
             }}
           />
           <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase mb-8 relative z-10 italic">
             Are You the <span className="text-brand">Next</span> Success Story?
           </h2>
           <button 
             onClick={onAddYours}
             className="btn-brutalist bg-brand px-12 py-5 text-xl relative z-10"
           >
             Start Your Journey Now →
           </button>
        </div>
      </div>
    </motion.div>
  );
};
