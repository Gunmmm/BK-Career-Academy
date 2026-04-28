import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { ExamAnimation3D } from "./ExamAnimation3D";

interface HomeHeroProps {
  setView: (view: string) => void;
  setSelectedCategory: (category: any) => void;
  onRegistration: () => void;
  onAdmission: () => void;
  heroContent?: any;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ 
  onRegistration, 
  heroContent 
}) => {
  
  const title = heroContent?.title || "MAHA-TET";
  const watchUrl = heroContent?.buttonUrl || "https://www.youtube.com/@bkcareeracademy2025";
  const mediaItems = heroContent?.media || [];
  
  const [activeMediaIndex, setActiveMediaIndex] = React.useState(0);
  const defaultMedia = [
    { mediaType: 'youtube' as const, src: 'Jof92fozWuk', title: 'Student Success 1' },
    { mediaType: 'youtube' as const, src: 'z18YX4x1Lw8', title: 'Student Success 2' },
    { mediaType: 'youtube' as const, src: 'wn7i39rNblw', title: 'Student Success 3' }
  ];
  const mediaToDisplay = mediaItems.length > 0 ? mediaItems : defaultMedia;

  React.useEffect(() => {
    if (mediaToDisplay.length <= 1) return;
    const timer = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaToDisplay.length);
    }, 8000); // 8 seconds per video
    return () => clearInterval(timer);
  }, [mediaToDisplay.length]);

  const activeMedia = mediaToDisplay[activeMediaIndex];

  const getYoutubeId = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : url;
  };

  const youtubeId = activeMedia?.mediaType === 'youtube' ? getYoutubeId(activeMedia.src) : '';

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-gradient-to-br from-white via-[#f8fbff] to-[#eef3fb]">
      
      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gray-400/10 blur-[160px]" />
        <div className="absolute center w-[30%] h-[30%] rounded-full bg-blue-300/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column: Content */}
        <div className="flex flex-col items-start text-left space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-5 py-2.5 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[12px] font-display font-bold uppercase tracking-widest text-blue-600">
              SINCE 2009
            </span>
          </motion.div>

          {/* Title Section */}
          <ExamAnimation3D 
            title={heroContent?.title || "Banking"} 
            accentColor={heroContent?.title ? (heroContent?.title === "Banking" ? "#FFC107" : "#00C853") : "#FFC107"} 
          />

          {/* Description / Subtitle - added for better balance, can be pulled from backend too if needed */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-500 text-lg md:text-xl font-body max-w-xl leading-relaxed"
          >
            Empowering aspirants with excellence since 2009. Join the league of successful officers with Maharashtra's premier coaching academy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <button
              onClick={onRegistration}
              className="group relative h-[68px] px-10 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full flex items-center justify-center gap-3 text-white font-display font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Get Started for Free
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-[68px] px-10 bg-white border border-gray-100 rounded-full flex items-center justify-center gap-3 text-gray-800 font-display font-bold text-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Play size={18} fill="currentColor" />
              </div>
              Watch Video Lectures
            </a>
          </motion.div>
        </div>

        {/* Right Column: Phone/Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Outer Glow Halo */}
          <div className="absolute inset-0 bg-blue-400/10 blur-[80px] rounded-full transform scale-75" />
          
          {/* Phone Shell */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[320px] h-[640px] bg-white rounded-[3rem] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[12px] border-white ring-1 ring-gray-100"
          >
            {/* Phone Top Details */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-100 rounded-full z-20" />
            
            {/* Viewport Area */}
            <div className="w-full h-full rounded-[2rem] bg-gray-900 overflow-hidden relative">
              {activeMedia.mediaType === 'youtube' ? (
                <iframe
                  className="w-full h-full object-cover scale-[1.3]"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                  title={activeMedia.title || "Hero Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : activeMedia.mediaType === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={activeMedia.poster}
                  className="w-full h-full object-cover"
                >
                  <source src={activeMedia.src} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={activeMedia.src} 
                  alt={activeMedia.title || "Hero Image"}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Shine Sweep Overlay */}
              <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-10 pointer-events-none"
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeHero;
