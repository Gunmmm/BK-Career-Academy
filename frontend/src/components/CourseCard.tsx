import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  isNew: boolean;
  image: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, index, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col bg-white rounded-[2.5rem] h-full cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden"
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Course Logo Section */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="relative aspect-[3/2] flex items-center justify-center p-4"
      >
        <div className="w-32 h-32 rounded-full bg-white shadow-2xl shadow-blue-500/20 border-4 border-blue-50 flex items-center justify-center p-5 transition-transform duration-500 group-hover:scale-110">
          <img 
            src={course.image} 
            alt={`${course.title} Course at BK Career Academy`}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        {course.isNew && (
          <div className="absolute top-6 right-6">
            <span className="bg-brand/90 text-ink text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-brand/20 uppercase tracking-widest border border-ink/5">
              NEW
            </span>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-6 sm:p-10 pt-4 flex flex-col flex-grow relative z-10"
      >
        <div className="mb-4">
          <span className="inline-block px-5 py-1.5 bg-brand/90 text-ink text-[11px] font-black uppercase tracking-wider rounded-xl shadow-md shadow-brand/10 border border-ink/5">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-display font-black leading-[1.2] mb-8 text-ink group-hover:text-brand transition-colors duration-300 line-clamp-2 uppercase italic tracking-tighter">
          {course.title}
        </h3>
        
        <div className="mt-auto flex flex-col gap-6">
          <button className="w-full bg-brand text-ink font-display font-black py-3.5 px-10 rounded-[2rem] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(255,193,7,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(255,193,7,0.6)] active:scale-[0.97] group/btn border-2 border-transparent relative">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[2rem]" />
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-[2rem]" />
            
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap relative z-10">Explore Program</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10"
            >
              <ArrowRight size={14} strokeWidth={3} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};


export default CourseCard;
