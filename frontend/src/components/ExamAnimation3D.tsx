import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ExamAnimation3DProps {
  title?: string;
  accentColor?: string;
}

export const ExamAnimation3D: React.FC<ExamAnimation3DProps> = ({ 
  title: manualTitle, 
  accentColor = "#FFC107" // Warm Golden Yellow
}) => {
  const [index, setIndex] = useState(0);
  
  const defaultWords = ["Banking", "Railways", "MPSC", "UPSC", "Maha TET"];
  const professionalColors = ["#FFC107", "#D32F2F", "#00C853", "#1565C0", "#E65100"]; // Gold, Crimson, Emerald, Royal Blue, Deep Orange
  
  const words = manualTitle 
    ? (manualTitle.includes(',') 
        ? manualTitle.split(',').map(w => w.trim()) 
        : (manualTitle === "Banking" ? defaultWords : [manualTitle])) 
    : defaultWords;

  const currentColor = words.length > 1 ? professionalColors[index % professionalColors.length] : accentColor;

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 5000); // 5 seconds per word (increased to 5s as requested)
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="relative flex flex-col items-start select-none min-h-[200px] transition-colors duration-500">
      {/* Background Soft Glow */}
      <div 
        className="absolute -inset-10 bg-white blur-[60px] opacity-50 pointer-events-none -z-10 transition-colors duration-500"
        style={{ backgroundColor: `${currentColor}10` }}
      />

      {/* Main Animated Title with Rotation */}
      <div className="relative h-40 flex items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-7xl md:text-8xl lg:text-9xl font-display font-black leading-none tracking-tighter absolute left-0 whitespace-nowrap transition-colors duration-500"
            style={{
              color: currentColor,
              textShadow: `
                0 1px 0 #d1d5db,
                0 2px 0 #c7d0d8,
                0 3px 0 #bbc7d1,
                0 4px 0 #afbeca,
                0 5px 0 #a3b5c3,
                0 10px 20px rgba(0,0,0,0.1),
                0 20px 40px rgba(0,0,0,0.05)
              `
            }}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* 3 Decorative Pulse Dots */}
      <div className="flex gap-4 mt-6 ml-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, scale: 0.7 }}
            animate={{ 
              opacity: [0.3, 1, 0.3], 
              scale: [0.8, 1.2, 0.8],
              boxShadow: [
                `0 0 0px ${currentColor}00`,
                `0 0 15px ${currentColor}60`,
                `0 0 0px ${currentColor}00`
              ]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="w-3.5 h-3.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: currentColor }}
          />
        ))}
      </div>

      {/* Soft floating particles (optional premium touch) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-20 h-20 bg-blue-100/20 blur-[40px] rounded-full"
        />
      </div>
    </div>
  );
};

export default ExamAnimation3D;
