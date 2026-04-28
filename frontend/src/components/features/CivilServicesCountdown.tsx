import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

function CompactBlock({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-mono font-bold text-[#F7931A]">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] font-mono text-[#94A3B8] uppercase">{label}</span>
    </div>
  );
}

export function CivilServicesCountdown() {
  const [preTime, setPreTime] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [mainTime, setMainTime] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  const calculateTimeLeft = (targetDate: string) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hrs: 0, mins: 0, secs: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPreTime(calculateTimeLeft("2026-05-26T00:00:00"));
      setMainTime(calculateTimeLeft("2026-05-31T00:00:00"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center justify-center p-0"
    >
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 glass-card">
          <div className="flex flex-col items-start gap-1 mb-4 sm:mb-0">
            <div className="text-[#F7931A] text-xs font-mono uppercase tracking-widest mb-1">Mission Phase 01</div>
            <div className="text-white text-sm font-mono uppercase tracking-wider opacity-60">Prelims — 26 May 2026</div>
          </div>
          <div className="grid grid-cols-4 gap-4 sm:gap-8">
            <CompactBlock value={preTime.days} label="days" />
            <CompactBlock value={preTime.hrs} label="hrs" />
            <CompactBlock value={preTime.mins} label="mins" />
            <CompactBlock value={preTime.secs} label="secs" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-6 glass-card">
          <div className="flex flex-col items-start gap-1 mb-4 sm:mb-0">
            <div className="text-[#F7931A] text-xs font-mono uppercase tracking-widest mb-1">Mission Phase 02</div>
            <div className="text-white text-sm font-mono uppercase tracking-wider opacity-60">Mains — 31 May 2026</div>
          </div>
          <div className="grid grid-cols-4 gap-4 sm:gap-8">
            <CompactBlock value={mainTime.days} label="days" />
            <CompactBlock value={mainTime.hrs} label="hrs" />
            <CompactBlock value={mainTime.mins} label="mins" />
            <CompactBlock value={mainTime.secs} label="secs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CivilServicesCountdown;
