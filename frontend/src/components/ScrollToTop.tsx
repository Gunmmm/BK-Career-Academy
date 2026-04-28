import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      
      setScrollProgress(scroll);
      setIsVisible(totalScroll > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 36; // 80/2 - 8/2 = 36
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-4 md:left-[calc(13rem+2rem)] z-50 cursor-pointer group"
          onClick={scrollToTop}
          title="Scroll to Top"
        >
          {/* Base Container */}
          <div className="relative flex items-center justify-center w-[80px] h-[80px] rounded-full bg-white drop-shadow-2xl 
            before:absolute before:inset-[-6px] before:rounded-full before:bg-gray-200/40 before:-z-10 before:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]
            after:absolute after:inset-[-12px] after:rounded-full after:bg-gray-100/30 after:-z-20
            hover:scale-105 transition-transform duration-300"
          >
            {/* SVG for Track and Progress */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 80 80"
            >
              {/* Outer Layer (Track) */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              {/* Active Layer (Progress Bar) */}
              <motion.circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#FF9933"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </svg>

            {/* Inner Core */}
            <motion.div 
              className="relative w-[60px] h-[60px] rounded-full bg-[#1A1A1A] border-2 border-transparent hover:border-brand/30 overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center z-10 transition-colors"
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              {/* Glow overlay */}
              <motion.div 
                variants={{
                  rest: { opacity: 0, scale: 0.8 },
                  hover: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,153,51,0.5)_0%,_transparent_60%)]"
              />

              {/* Main Arrow */}
              <motion.div
                variants={{
                  rest: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
                  hover: { y: -40, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
                }}
                className="absolute flex items-center justify-center text-[#FF9933]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.div>

              {/* Entering Arrow */}
              <motion.div
                variants={{
                  rest: { y: 40, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
                  hover: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.1, ease: "easeOut" } }
                }}
                className="absolute flex items-center justify-center text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
