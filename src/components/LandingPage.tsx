import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Award, 
  BookOpen, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  School,
  GraduationCap,
  Beaker,
  Smartphone,
  Bus,
  Trophy
} from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onLoginClick: () => void;
  onApplyClick: () => void;
}

export function LandingPage({ onLoginClick, onApplyClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-orange-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. DISRUPTIVE NAVIGATION */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 mix-blend-difference invert pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black font-black text-lg group-hover:rotate-12 transition-transform duration-500">SP</div>
                <div className="flex flex-col">
                    <span className="text-white font-black text-sm tracking-tighter uppercase leading-none">Skyline</span>
                    <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.3em]">Public School</span>
                </div>
            </div>
            
            <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
                <a href="#academics" className="hover:text-white transition-colors">The Wings</a>
                <a href="#facilities" className="hover:text-white transition-colors">Campus</a>
                <button onClick={onLoginClick} className="hover:text-white transition-colors">Portal</button>
            </div>

            <button 
                onClick={onApplyClick}
                className="bg-white text-black px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-2xl"
            >
                Enroll Now
            </button>
        </div>
      </nav>

      {/* 2. EDITORIAL HERO SECTION */}
      <header className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
            >
                <div>
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "80px" }}
                     transition={{ duration: 1, delay: 0.5 }}
                     className="h-1 bg-orange-500 mb-8"
                   />
                   <h1 className="text-[12vw] lg:text-[9.5rem] font-[900] leading-[0.8] tracking-tighter text-blue-950 uppercase selection:bg-orange-500">
                      SKY<br />LINE
                   </h1>
                   <div className="mt-4 flex items-baseline gap-4">
                      <span className="text-4xl md:text-6xl font-black text-orange-500 italic tracking-tighter">Public School</span>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-300">ESTD 2009</span>
                   </div>
                </div>

                <p className="text-xl md:text-2xl text-slate-500 max-w-lg leading-relaxed font-medium">
                  We don't just teach. We <span className="text-blue-950 italic font-black">architect destiny</span>. A world-class cognitive ecosystem for Classes Nursery to 8.
                </p>

                <div className="flex items-center gap-8">
                    <button 
                      onClick={onApplyClick}
                      className="group flex items-center gap-4 bg-blue-950 text-white pl-10 pr-4 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-blue-900/10"
                    >
                      Start The Journey
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                    <div className="hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Success Rate</p>
                        <p className="text-2xl font-black text-blue-950">99.8%</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[20px] border-white relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?q=80&w=2670&auto=format&fit=crop" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110" 
                      alt="Skyline Campus" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:opacity-0 transition-opacity" />
                </div>
                
                {/* Floating Gimmick Badge */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [12, 10, 12] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full flex items-center justify-center p-8 text-white font-black text-center text-[10px] uppercase tracking-tighter leading-none shadow-2xl z-20"
                >
                    Nursery to Class 8 Excellence
                </motion.div>
            </motion.div>
        </div>

        {/* Dynamic Background Patterns */}
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-slate-50 rounded-full blur-[120px] -z-10 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-40 left-10 w-40 h-40 border border-slate-100 rounded-full -z-10 opacity-50" />
      </header>

      {/* 2.5 PHILOSOPHY SECTION (GIMMICK) */}
      <section id="about" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <div className="flex gap-4 mb-6">
                    <div className="w-12 h-1 bg-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Core Philosophy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-blue-950 uppercase tracking-tighter italic leading-[0.9] mb-4">
                    Knowledge <br />Without <br />Boundaries
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                    At Skyline, we believe education is not a race, but a journey of self-actualization. Our pedagogy blends ancient wisdom with futuristic technology.
                </p>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                <div className="h-64 bg-slate-100 rounded-[2rem] overflow-hidden scale-90 translate-y-10">
                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="History" />
                </div>
                <div className="h-64 bg-slate-900 rounded-[2rem] overflow-hidden translate-y-[-20px]">
                    <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2622&auto=format&fit=crop" className="w-full h-full object-cover" alt="Art" />
                </div>
            </div>
        </div>
      </section>

      {/* 3. ASYMMETRICAL ACADEMIC WINGS */}
      <section id="academics" className="py-20 px-6 bg-blue-950 text-white rounded-[3rem] mx-4 mb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none selection:bg-orange-500 selection:text-white">
                  The <br /><span className="text-orange-500">Academic</span> <br /> Wings
                </h2>
                <div className="max-w-md space-y-4">
                    <p className="text-xl text-blue-200/60 font-medium">Three specialized cognitive layers designed to transition from wonder to wisdom.</p>
                    <div className="h-px w-full bg-white/10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden">
                {[
                  { 
                    id: "01", 
                    name: "Foundation", 
                    levels: "Pre-Primary", 
                    desc: "Sensory mastery and linguistic foundations through the 'Sky-Play' methodology.",
                    icon: <Sparkles className="w-8 h-8" />
                  },
                  { 
                    id: "02", 
                    name: "Primary Unit", 
                    levels: "Classes 1 - 5", 
                    desc: "Scientific literacy and value-driven leadership at the core of every standard.",
                    icon: <GraduationCap className="w-8 h-8" />
                  },
                  { 
                    id: "03", 
                    name: "Middle Phase", 
                    levels: "Classes 6 - 8", 
                    desc: "Analytical depth and scientific inquiry preparing students for global competitive horizons.",
                    icon: <Beaker className="w-8 h-8" />
                  }
                ].map((wing, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-10 flex flex-col justify-between h-[400px]"
                  >
                    <div className="space-y-6">
                        <span className="text-sm font-mono text-orange-500 font-bold">{wing.id} /</span>
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500">
                          {wing.icon}
                        </div>
                        <div className="space-y-1">
                             <h3 className="text-3xl font-black uppercase tracking-tighter">{wing.name}</h3>
                             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{wing.levels}</span>
                        </div>
                    </div>
                    <p className="text-blue-200/40 text-sm font-medium leading-relaxed">{wing.desc}</p>
                  </motion.div>
                ))}
            </div>
        </div>
        
        {/* Large Decorative Text Background */}
        <div className="absolute -bottom-20 -left-10 text-[25rem] font-black text-white/5 pointer-events-none uppercase tracking-tighter">Skyline</div>
      </section>

      {/* 4. IMMERSIVE FACILITIES */}
      <section id="facilities" className="py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <motion.h4 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-orange-500 font-black text-xs uppercase tracking-[0.6em]"
                  >
                    Epicenter of Learning
                  </motion.h4>
                  <h2 className="text-6xl font-black uppercase tracking-tighter text-blue-950 leading-[0.8]">The <br /> Campus <br /> Matrix</h2>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {[
                      { l: "Smart Science Hub", d: "AR Integrated" },
                      { l: "Digital Archive", d: "40k+ Volumes" },
                      { l: "Cyber Labs", d: "Next-Gen Tech" },
                      { l: "Athletic Arena", d: "Olympic Grade" }
                    ].map((f, i) => (
                      <div key={i} className="group border-b border-slate-100 pb-6 hover:border-orange-500 transition-colors cursor-default">
                        <h5 className="font-black text-lg uppercase tracking-tighter text-blue-950 group-hover:text-orange-500 transition-colors">{f.l}</h5>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{f.d}</p>
                      </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative">
                <div className="grid grid-cols-2 gap-6 scale-90 md:scale-100">
                    <motion.div 
                      whileHover={{ y: -20, rotate: -2 }}
                      className="aspect-[3/4] bg-slate-100 rounded-[3rem] overflow-hidden mt-20 shadow-2xl"
                    >
                      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover" alt="Students" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -20, rotate: 2 }}
                      className="aspect-[3/4] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                      <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop" className="w-full h-full object-cover border-8 border-white" alt="Classroom" />
                    </motion.div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl opacity-50" />
            </div>
        </div>
      </section>

      {/* 5. BRUTALIST FOOTER */}
      <footer id="contact" className="bg-white px-4 pb-4">
        <div className="bg-blue-950 text-white rounded-[2rem] p-12 overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-blue-950 font-black text-xl group transition-transform hover:rotate-12">SP</div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">Skyline <br /> Public School</h3>
                   </div>
                   <div className="space-y-4">
                      <p className="text-blue-200/40 uppercase text-xs font-black tracking-[0.4em]">Connect With The Future</p>
                      <div className="space-y-2">
                        <a href="tel:+919876543210" className="text-3xl md:text-5xl font-[950] tracking-tighter hover:text-orange-500 transition-colors block underline-offset-[12px] decoration-white/10 underline">+91 98765 43210</a>
                        <a href="mailto:contact@skyline.edu" className="text-lg font-bold italic text-white/60 hover:text-white transition-colors">hello@skylinepublic.edu.in</a>
                      </div>
                   </div>
                </div>

                <div className="space-y-10 lg:text-right">
                    <p className="text-blue-200/60 text-lg font-medium leading-relaxed max-w-sm ml-auto">
                        123 Education Drive, Skyline Nagar, Mangaldoi, Darrang, Assam - 784125
                    </p>
                    <div className="flex lg:justify-end gap-12">
                        <div className="space-y-2">
                            <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">Office Hours</h4>
                            <p className="font-bold text-sm">Mon - Sat <br /> 08:00 AM — 03:00 PM</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">Social Reach</h4>
                            <div className="flex gap-4">
                                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer font-black text-[10px] uppercase tracking-tighter">Fb</span>
                                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer font-black text-[10px] uppercase tracking-tighter">Ig</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                <p>&copy; 2026 Skyline Education Trust. Managed by Premium Global Schools.</p>
                <div className="flex gap-12">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">CBSE Disclosures</a>
                    <a href="#" className="hover:text-white">Faculty Portal</a>
                </div>
            </div>
            
            {/* Background Spreader */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] -z-0" />
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-500/10 blur-[150px] -z-0" />
        </div>
      </footer>
    </div>
  );
}

