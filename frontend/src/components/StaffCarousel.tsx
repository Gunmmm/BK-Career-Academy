import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'motion/react';
import { StaffCard } from './StaffCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

interface StaffCarouselProps {
  staff: StaffMember[];
}

export const StaffCarousel: React.FC<StaffCarouselProps> = ({ staff }) => {
  // Triple the items for seamless infinite scroll
  const items = [...staff, ...staff, ...staff];
  const [currentIndex, setCurrentIndex] = useState(staff.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = staff.length;
  
  // Responsive card widths
  // Mobile: 100% width
  // MD: 45% (to show 2 cards + portion of 3rd)
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 100;
    if (window.innerWidth >= 768) return 45; // md: 2 cards + peek
    return 85; // mobile: 1 card + peek
  };

  const [cardWidth, setCardWidth] = useState(getCardWidth());

  useEffect(() => {
    const handleResize = () => setCardWidth(getCardWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Infinite loop logic: jump without animation when reaching boundaries
  const handleAnimationComplete = () => {
    setIsTransitioning(false);
    if (currentIndex >= totalItems * 2) {
      setCurrentIndex(totalItems);
    } else if (currentIndex < totalItems) {
      setCurrentIndex(totalItems * 2 - 1);
    }
  };

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(handleNext, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [handleNext]);

  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(handleNext, 5000);
  };

  return (
    <div className="relative w-full overflow-hidden group/carousel py-12">
      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { 
            e.stopPropagation();
            if(!isTransitioning) {
              setIsTransitioning(true);
              handlePrev(); 
              resetAutoplay(); 
            }
          }}
          className="w-12 h-12 rounded-full bg-white/90 shadow-lg border border-ink/5 flex items-center justify-center text-ink hover:bg-brand hover:text-ink transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { 
            e.stopPropagation();
            if(!isTransitioning) {
              setIsTransitioning(true);
              handleNext(); 
              resetAutoplay(); 
            }
          }}
          className="w-12 h-12 rounded-full bg-white/90 shadow-lg border border-ink/5 flex items-center justify-center text-ink hover:bg-brand hover:text-ink transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel Track */}
      <motion.div
        className="flex gap-6 px-6"
        initial={false}
        animate={{
          x: `calc(-${currentIndex * (cardWidth)}% - ${currentIndex * 24}px)` 
        }}
        transition={isTransitioning ? {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        } : { duration: 0 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {items.map((member, idx) => (
          <div 
            key={`${member.id}-${idx}`}
            style={{ width: `${cardWidth}%` }}
            className="flex-shrink-0"
          >
            <StaffCard 
              member={member}
              index={idx % totalItems}
            />
          </div>
        ))}
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-12">
        {staff.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(totalItems + idx);
              resetAutoplay();
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              (currentIndex % totalItems) === idx 
                ? 'w-8 bg-brand' 
                : 'w-2 bg-ink/10 hover:bg-ink/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StaffCarousel;
