import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Users, BookOpen, Quote, Shield, Globe, Award, Heart, CheckCircle2 } from 'lucide-react';

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-100 border-2 border-ink ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-ink/[0.03] to-transparent" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <Info size={40} className="text-ink" />
    </div>
  </div>
);

const OrganizationCard = ({ name, url, logo }: { name: string; url: string; logo?: string }) => {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  const isAvailable = url !== "Coming Soon";

  return (
    <a 
      href={isAvailable ? fullUrl : '#'} 
      target={isAvailable ? "_blank" : undefined}
      rel={isAvailable ? "noopener noreferrer" : undefined}
      className={`group bg-white border-4 border-ink p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between h-full ${!isAvailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div>
        <div className="w-16 h-16 bg-white border-2 border-ink mb-6 flex items-center justify-center group-hover:bg-brand transition-colors overflow-hidden">
          {typeof logo === 'string' ? (
            <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain p-2" />
          ) : (
            <Shield size={32} className="text-ink" />
          )}
        </div>
        <h3 className="text-xl font-display font-black text-ink uppercase tracking-tighter leading-tight mb-2 group-hover:text-brand transition-colors">{name}</h3>
        <p className="text-xs font-mono text-muted uppercase tracking-widest">{url.replace('https://', '').replace('www.', '')}</p>
      </div>
      {isAvailable && (
        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-ink group-hover:text-brand transition-colors">
          Visit Website <Globe size={12} />
        </div>
      )}
    </a>
  );
};

export const AboutUs = () => {
  const networks = [
    { name: "BK Educational And Welfare Society", url: "https://bkngo.in", logo: "/images/about_logos/bk.png" },
    { name: "BK Science Academy", url: "https://bkscience.in", logo: "/images/about_logos/bk.png" },
    { name: "BK Sports Academy", url: "https://www.bksports.in/", logo: "/images/about_logos/bksports.png" },
    { name: "BK Times", url: "https://www.bktimes.co.in/", logo: "/images/about_logos/bktimes.png" },
    { name: "Gurukul Vidya Niketan", url: "https://bkgurukul.in/testimonials", logo: "/images/about_logos/GurukulLogo.jpg" },
    { name: "Sanskar English Medium School", url: "https://www.bksanskar.in/", logo: "/images/about_logos/sanskar.png?v=" + Date.now() },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-40 pb-40"
    >

      {/* Journey & Founder's Message Section */}
      <section className="px-6 sm:px-12 mb-40 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Left: Content Column */}
            <div className="lg:col-span-7 space-y-16">
              <div className="relative">
                {/* Decorative Year Watermark */}
                <div className="absolute -top-12 -left-8 text-[10rem] font-display font-black text-ink/[0.03] select-none pointer-events-none">
                  2009
                </div>
                
                <div className="relative z-10 pl-10 border-l-8 border-brand">
                  <h2 className="text-4xl md:text-6xl font-display font-black text-ink uppercase leading-none tracking-tighter mb-8">
                    Our journey started with a <br />
                    <span className="text-brand">simple dream</span>
                  </h2>
                  <p className="text-xl md:text-2xl font-body text-ink/80 leading-relaxed italic max-w-2xl">
                    "To give every child a chance to succeed. Since 2009, we've evolved into a thriving ecosystem of excellence."
                  </p>
                </div>
              </div>

              <div className="bg-ink/5 p-8 border-4 border-ink relative">
                <div className="absolute -top-4 left-6 bg-ink text-white px-4 py-1 font-mono text-[10px] uppercase tracking-widest">Vision Statement</div>
                <p className="text-lg font-body leading-relaxed text-ink/70 italic">
                  We believe that education is not just about passing exams, but about building character and confidence. For more than 15+ years, we have worked hard to help students learn and grow through our different schools.
                </p>
              </div>

              {/* Stats Grid - Clean & Structured */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { val: '15+', label: 'Years of Legacy', desc: 'Educational Excellence' },
                  { val: '10K+', label: 'Students Guided', desc: 'Across All Networks' },
                  { val: '2000+', label: 'Selections', desc: 'Successful Placements' }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white border-4 border-ink shadow-[6px_6px_0_0_#1A1A1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
                    <div className="text-4xl font-display font-black text-ink group-hover:text-brand transition-colors mb-1">{stat.val}</div>
                    <div className="text-[10px] font-mono font-black uppercase text-brand tracking-widest mb-2">{stat.label}</div>
                    <div className="h-0.5 w-8 bg-ink/10" />
                    <p className="text-[9px] font-mono text-ink/40 mt-2 uppercase">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Founder Composition */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Background Framing */}
                <div className="absolute -top-10 -left-10 w-full h-full bg-brand/10 border-4 border-brand/20 -z-10 translate-x-4 translate-y-4" />
                
                <div className="relative group">
                  <div className="border-8 border-ink overflow-hidden bg-ink shadow-[20px_20px_0_0_#F7931A]">
                    <img 
                      src="/boss.jpeg" 
                      alt="DR. ADV. ER. BHAGWAN ELMAME" 
                      className="w-full h-auto transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                  </div>

                  {/* Founder Badge */}
                  <div className="absolute -bottom-10 -right-4 lg:-right-10 bg-white border-4 border-ink p-8 shadow-[12px_12px_0_0_#000] max-w-[320px]">
                    <div className="space-y-3">
                      <div className="text-xl font-display font-black text-ink leading-tight uppercase italic">
                        DR. ADV. ER. BHAGWAN ELMAME
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-px bg-brand" />
                        <div className="text-[9px] font-mono font-black text-brand uppercase tracking-[0.2em]">
                          Secretary & Founder
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Network */}
      <section className="px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-ink uppercase tracking-tighter">
              Our Educational <span className="text-brand text-outline-ink">Network</span>
            </h2>
            <p className="text-muted mt-4 font-mono uppercase tracking-[0.3em] text-xs">Serving diverse educational needs since 2009</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networks.map((org, i) => (
              <OrganizationCard key={i} {...org} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUs;
