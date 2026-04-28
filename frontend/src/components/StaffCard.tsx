import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

interface StaffCardProps {
  member: StaffMember;
  index: number;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member, index }) => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col bg-white rounded-[2.5rem] h-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500 overflow-hidden w-full min-h-[480px] cursor-pointer"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Top Header - Diagonal/Soft Split */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="h-32 bg-ink/5 w-full relative shrink-0"
      >
         <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 w-32 h-32 rounded-full border-4 border-white shadow-xl shadow-brand/10 overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 bg-white">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
         </div>
      </div>

      <div 
        style={{ transform: "translateZ(40px)" }}
        className="p-8 pt-20 flex flex-col items-center text-center flex-grow relative z-10"
      >
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-brand/90 text-ink text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-brand/10 border border-ink/5">
            {member.specialty}
          </span>
        </div>

        <h3 className="text-2xl font-display font-black leading-tight mb-1 text-ink uppercase tracking-tighter group-hover:text-brand transition-colors duration-300">
          {member.name}
        </h3>
        <div className="text-brand font-mono text-[10px] uppercase tracking-[0.2em] font-black mb-6">
          {member.role}
        </div>
        
        <p className="text-sm text-ink/70 font-body leading-relaxed mb-6 line-clamp-3">
          {member.bio}
        </p>

        <div className="mt-auto flex gap-4 text-ink/40 group-hover:text-ink/80 transition-colors">
          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-brand hover:text-ink transition-colors cursor-pointer border border-transparent hover:border-ink/10 shadow-sm active:scale-95">
             <Linkedin size={14} />
          </div>
          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-brand hover:text-ink transition-colors cursor-pointer border border-transparent hover:border-ink/10 shadow-sm active:scale-95">
             <Twitter size={14} />
          </div>
          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-brand hover:text-ink transition-colors cursor-pointer border border-transparent hover:border-ink/10 shadow-sm active:scale-95">
             <ExternalLink size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StaffCard;
