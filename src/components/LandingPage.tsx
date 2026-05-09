import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  ShieldCheck,
  Bus,
  Laptop,
  Beaker,
  Library,
  Music,
  Camera,
  MessageSquare,
  Sparkles,
  Clock,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Navigation,
  Globe,
  School,
  Trophy
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface LandingPageProps {
  onLoginClick: () => void;
  onApplyClick: () => void;
}

export function LandingPage({ onLoginClick, onApplyClick }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trustCards = [
    { icon: <Users className="w-6 h-6" />, title: "Qualified Teachers", desc: "Expert faculty dedicated to nurturing young minds." },
    { icon: <Laptop className="w-6 h-6" />, title: "Digital Classrooms", desc: "Modern technology integrated for smart learning." },
    { icon: <Bus className="w-6 h-6" />, title: "Safe Transport", desc: "GPS enabled buses for secure student commute." },
    { icon: <BookOpen className="w-6 h-6" />, title: "Activity Based Learning", desc: "Holistic growth through interactive sessions." }
  ];

  const classes = [
    { name: "Nursery", age: "3-4 Years", desc: "Early childhood development through play and exploration.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
    { name: "KG Section", age: "4-6 Years", desc: "Foundation building with creative and linguistic focus.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop" },
    { name: "Primary", age: "6-11 Years", desc: "Developing core academic skills and critical thinking.", image: "https://images.unsplash.com/photo-1577891721396-227da347358f?q=80&w=600&auto=format&fit=crop" },
    { name: "Middle School", age: "11-14 Years", desc: "Advanced learning and preparation for competitive futures.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop" }
  ];

  const facilities = [
    { icon: <Laptop />, name: "Smart Classes", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=400&auto=format&fit=crop" },
    { icon: <Beaker />, name: "Science Lab", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop" },
    { icon: <Navigation />, name: "Computer Lab", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop" },
    { icon: <Library />, name: "Library", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop" },
    { icon: <Globe />, name: "Playground", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=400&auto=format&fit=crop" },
    { icon: <ShieldCheck />, name: "CCTV Security", image: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?q=80&w=400&auto=format&fit=crop" },
    { icon: <Bus />, name: "School Transport", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop" },
    { icon: <Music />, name: "Music & Arts", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* 1. TOP BAR */}
      <div className="hidden md:block bg-slate-900 text-white/80 py-2 border-b border-white/10 no-print">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[11px] font-bold tracking-widest uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-500" /> Admissions Open 2026-27</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Mangaldoi, Darrang, Assam</span>
          </div>
          <div className="flex gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors"><MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp</a>
          </div>
        </div>
      </div>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-white py-2 px-4 flex justify-between border-b border-slate-100 no-print sticky top-0 z-[60]">
        <Button variant="ghost" size="icon" className="h-10 w-10 text-blue-900" onClick={() => window.open('tel:+919876543210')}>
          <Phone className="w-5 h-5" />
        </Button>
        <span className="text-[10px] font-bold uppercase tracking-widest self-center text-blue-900">Skyline Public School</span>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-emerald-600">
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>

      {/* 2. NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 no-print ${
        isScrolled ? 'top-0 bg-white shadow-sm py-4' : 'top-12 md:top-10 bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isScrolled ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 shadow-xl'
            }`}>
              <School className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled ? 'text-blue-900' : 'text-blue-900'}`}>SKYLINE</span>
              <span className={`text-[8px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${isScrolled ? 'text-slate-400' : 'text-slate-400'}`}>Public School</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Academics', 'Facilities', 'Gallery', 'Admissions', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-slate-600' : 'text-blue-900'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <Button 
                onClick={onLoginClick}
                variant="ghost" 
                className={`hidden sm:flex text-[11px] font-black uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-slate-600 hover:text-blue-900' : 'text-blue-900 hover:bg-white/10'
                }`}
             >
                Portal
             </Button>
             <Button 
                onClick={onApplyClick}
                className="bg-blue-800 text-white px-8 h-12 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
             >
                Apply Now
             </Button>
             <button 
                className="lg:hidden h-12 w-12 flex items-center justify-center text-blue-900"
                onClick={() => setIsMobileMenuOpen(true)}
             >
                <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[100] p-8 flex flex-col no-print"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black tracking-tighter text-blue-900">SKYLINE</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex flex-col gap-8">
              {['Home', 'About', 'Academics', 'Facilities', 'Gallery', 'Admissions', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-tight"
                >
                  {item}
                </a>
              ))}
              <Button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} variant="outline" className="h-14 rounded-2xl font-bold uppercase tracking-widest mt-4">Parent Portal</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION */}
      <header className="relative min-h-screen md:min-h-[90vh] flex items-center px-6 pt-40 pb-16 md:pt-0 md:pb-0 overflow-hidden bg-gradient-to-br from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start">
              <Badge variant="outline" className="border-blue-200 text-blue-700 rounded-full px-4 py-1 text-[11px] font-black tracking-[0.2em] uppercase bg-white/50 backdrop-blur-sm">
                Excellence Redefined
              </Badge>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-blue-900 uppercase">
                Building <br /> <span className="text-amber-500">Bright</span> Futures
              </h1>
              <p className="text-base md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium md:text-justify">
                From <span className="text-blue-900 font-bold">Nursery to Class VIII</span>, we offer smart learning, caring teachers, safe campus, and holistic growth for every student.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                onClick={onApplyClick}
                className="w-full sm:w-auto h-16 px-10 rounded-full bg-blue-800 hover:bg-blue-900 text-white font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 active:scale-95 transition-all group"
              >
                Admission Open 2026
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto h-16 px-10 rounded-full border-blue-100 bg-white text-blue-900 font-black text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-all"
              >
                Virtual Tour
              </Button>
            </div>

            {/* Achievement Mini Cards - Mobile Scrollable, Desktop Fixed */}
            <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              {[
                { label: "Faculty", value: "15+", sub: "Qualified Teachers", icon: <Users className="w-4 h-4" /> },
                { label: "Learning", value: "Smart", sub: "Classrooms", icon: <Laptop className="w-4 h-4" /> },
                { label: "Safety", value: "100%", sub: "Safe Campus", icon: <ShieldCheck className="w-4 h-4" /> }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="shrink-0 bg-white p-5 rounded-3xl border border-blue-50 shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-sm font-black text-blue-900">{stat.value}</p>
                    <p className="text-[10px] text-slate-500 font-medium whitespace-nowrap">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,64,175,0.2)] border-[16px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2670&auto=format&fit=crop" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                alt="Happy Skyline Student" 
              />
            </div>
            {/* Background shapes */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-100 rounded-full blur-[80px] -z-0 opacity-60" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-50 rounded-full blur-[80px] -z-0 opacity-60" />
          </motion.div>
        </div>
      </header>

      {/* 4. TRUST SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustCards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group transition-all flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-2">{card.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed md:text-justify">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT SCHOOL SECTION */}
      <section id="about" className="py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4 md:gap-6 scale-95 md:scale-100">
                    <div className="aspect-[3/4] bg-slate-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden mt-10 md:mt-20 shadow-2xl relative">
                      <img src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="School Gate" />
                    </div>
                    <div className="aspect-[3/4] bg-slate-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative border-4 md:border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Lab" />
                    </div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="space-y-8 md:space-y-10 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="space-y-4 flex flex-col items-center lg:items-start">
                  <Badge className="bg-blue-50 text-blue-800 border-none px-4 h-8 text-[10px] uppercase font-black tracking-widest">Legacy of Excellence</Badge>
                  <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase leading-tight md:leading-[0.9] tracking-tighter">
                    Nurturing <br /> Minds, <br /> Inspiring <br /> <span className="text-amber-500">Dreams.</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium italic md:text-justify lg:max-w-md">
                    "At Skyline Public School, our vision is to create a nurturing environment where innovation meets character, empowering every child to reach their full potential."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
                    <div className="space-y-2 flex flex-col items-center lg:items-start">
                       <h4 className="flex items-center gap-2 font-black text-blue-900 uppercase tracking-widest text-xs">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Our Mission
                       </h4>
                       <p className="text-sm text-slate-400 font-medium">To provide tech-forward education while remaining rooted in cultural values and ethical growth.</p>
                    </div>
                    <div className="space-y-2 flex flex-col items-center lg:items-start">
                       <h4 className="flex items-center gap-2 font-black text-blue-900 uppercase tracking-widest text-xs">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Core Values
                       </h4>
                       <p className="text-sm text-slate-400 font-medium">Integrity, Compassion, Innovation, and Discipline are the four pillars of Skyline education.</p>
                    </div>
                  </div>
                </div>

                <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3">
                   Principal's Message
                   <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </section>

      {/* 6. CLASS SECTION */}
      <section id="academics" className="py-16 md:py-24 bg-slate-900 text-white rounded-[2.5rem] md:rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16 md:mb-20 relative z-10 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">Academic Structure</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">Academic <br /> <span className="text-blue-400">Pathways</span></h2>
            </div>
            <p className="text-slate-400 max-w-sm text-base md:text-lg font-medium leading-relaxed md:text-justify">Systematic learning tiers designed for progressive cognitive development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {classes.map((cls, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img src={cls.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={cls.name} />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{cls.name}</h3>
                    <Badge className="bg-amber-500/20 text-amber-500 border-none text-[9px] font-black uppercase mt-2">{cls.age}</Badge>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">{cls.desc}</p>
                  <Button variant="link" className="text-blue-400 p-0 h-auto font-black text-[10px] uppercase tracking-widest hover:text-white justify-start gap-2">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Large BG Decoration */}
        <div className="absolute -bottom-20 -left-20 text-[20rem] font-black text-white/[0.03] select-none uppercase tracking-tighter italic">Skyline</div>
      </section>

      {/* 7. FACILITIES SECTION */}
      <section id="facilities" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12 md:space-y-20 flex flex-col items-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase tracking-tighter leading-tight md:leading-none italic">Premium <br /> Campus Facilities</h2>
            <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed md:text-justify max-w-2xl mx-auto">Providing a world-class infrastructure and specialized environments for modern, activity-based education.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {facilities.map((fac, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="relative h-64 md:h-72 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group shadow-lg"
              >
                <img src={fac.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={fac.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-950/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-left transition-all group-hover:from-blue-600/90">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                    {React.cloneElement(fac.icon as React.ReactElement, { className: "w-5 h-5" })}
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">{fac.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US (STATS) */}
      <section className="py-16 md:py-24 bg-blue-900 text-white rounded-[2.5rem] md:rounded-[4rem] mx-4 mb-16 md:mb-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
            {[
              { val: "1000+", label: "Family Trust", sub: "Growing Every Year" },
              { val: "95%", label: "Satisfaction", sub: "Registry Reviews" },
              { val: "15+", label: "Activities", sub: "Sports & Creative" },
              { val: "18+", label: "Qualified", sub: "Expert Mentors" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2 md:space-y-3">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic text-amber-500">{stat.val}</h3>
                <div className="h-0.5 w-8 md:w-12 bg-white/20 mx-auto" />
                <p className="text-sm md:text-xl font-black uppercase tracking-tight">{stat.label}</p>
                <p className="text-[8px] md:text-xs font-medium text-blue-200/50 uppercase tracking-widest">{stat.sub}</p>
              </div>
            ))}
         </div>
         {/* Decorative Circles */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] border border-white/[0.05] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] border border-white/[0.05] rounded-full -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* 9. GALLERY SECTION */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-12 md:mb-16">
             <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                <Badge className="bg-blue-50 text-blue-800 border-none px-4 h-8 text-[10px] uppercase font-black tracking-widest">Life at Skyline</Badge>
                <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase leading-none tracking-tighter italic">Gallery <br /> <span className="text-slate-300">Curations</span></h2>
             </div>
             <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide justify-center">
                {['Classroom', 'Sports', 'Events', 'Celebrations'].map((cat) => (
                  <Button key={cat} variant="ghost" className="shrink-0 h-10 px-4 md:px-6 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-900 hover:bg-blue-50">
                    {cat}
                  </Button>
                ))}
             </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
             {[
               "https://images.unsplash.com/photo-1577891721396-227da347358f?q=80&w=600&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop"
             ].map((img, i) => (
               <motion.div 
                key={i} 
                whileHover={{ scale: 1.01 }}
                className="break-inside-avoid rounded-[2rem] overflow-hidden shadow-md group border border-slate-100"
               >
                 <img src={img} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i}`} />
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 10. ADMISSION PROCESS */}
      <section id="admissions" className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16 md:space-y-20 flex flex-col items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase tracking-tighter italic">Simple Admission Process</h2>
            <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto md:text-justify">Follow these four simple steps to secure your child's seat in the academic session 2026-27.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 relative w-full">
             {/* Timeline Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-20 right-20 h-px bg-slate-200" />
             
             {[
               { id: 1, title: "Fill Form", desc: "Digital or physical application form submission." },
               { id: 2, title: "Visit Campus", desc: "Experience the infrastructure and environment." },
               { id: 3, title: "Interaction", desc: "Casual session with the child and parents." },
               { id: 4, title: "Confirm", desc: "Fee deposit and ledger entry for enrollment." }
             ].map((step, i) => (
               <div key={i} className="relative z-10 space-y-4 md:space-y-6 group">
                 <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-center mx-auto text-2xl md:text-3xl font-black text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all">
                   {step.id}
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-black text-blue-900 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed md:text-justify md:max-w-[200px] md:mx-auto">{step.desc}</p>
                 </div>
               </div>
             ))}
          </div>

          <Button 
            onClick={onApplyClick}
            className="h-16 px-12 rounded-full bg-blue-800 hover:bg-blue-900 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
          >
             Start The Admission Process
          </Button>
        </div>
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <Badge className="bg-amber-50 text-amber-700 border-none px-4 h-8 text-[10px] uppercase font-black tracking-widest">Parent Voice</Badge>
            <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase tracking-tighter italic">Trusted by <span className="text-slate-300">Families</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            {[
              { name: "Rahul Sharma", class: "Class 4 Parent", text: "The growth we've seen in our daughter's confidence and analytical skills since joining Skyline is remarkable. Truly smart classrooms!" },
              { name: "Anjali Das", class: "KG-II Parent", text: "Safe transport and caring atmosphere. My son loves going to school every day. The teachers are incredibly dedicated." },
              { name: "Mubasir A.", class: "Class 7 Parent", text: "Advanced facility and a very systematic admission Process. The best school in Darrang if you are looking for tech-driven learning." }
            ].map((t, i) => (
              <Card key={i} className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-slate-50 bg-slate-50/50 space-y-6 md:space-y-8 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-default flex flex-col items-center lg:items-start text-center lg:text-left">
                 <div className="flex gap-1 text-amber-500">
                    {[1,2,3,4,5].map(s => <Sparkles key={s} className="w-4 h-4 fill-current" />)}
                 </div>
                 <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed italic md:text-justify lg:max-w-xs">"{t.text}"</p>
                 <div className="flex items-center gap-4 border-t border-slate-100 pt-6 w-full justify-center lg:justify-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold uppercase text-xs">
                       {t.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-blue-900 uppercase text-sm tracking-tight">{t.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{t.class}</p>
                    </div>
                 </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NOTICE / EVENTS */}
      <section className="py-16 md:py-24 bg-slate-100 mb-16 md:mb-20 rounded-[2.5rem] md:rounded-[3rem] mx-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-16 relative z-10">
          <div className="space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase italic">Bulletin <span className="text-amber-500">&</span> Events</h2>
              <p className="text-slate-500 font-medium text-base md:text-justify lg:max-w-sm">Stay updated with the latest circulars and upcoming school activities.</p>
            </div>
            <div className="space-y-4 w-full">
              {[
                { date: "15 May, 2026", title: "Summer Vacation Announcement", type: "Holiday" },
                { date: "20 May, 2026", title: "Annual Sports Meet Registration", type: "Activity" },
                { date: "02 June, 2026", title: "Periodic Assessment - I Schedule", type: "Exam" }
              ].map((n, i) => (
                <div key={i} className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 flex items-center gap-4 md:gap-6 group hover:border-blue-900 transition-colors text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg md:text-xl font-black text-blue-900 leading-none">{n.date.split(' ')[0]}</span>
                    <span className="text-[7px] md:text-[8px] font-black uppercase text-blue-400">{n.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-blue-900 uppercase tracking-tight text-sm md:text-base">{n.title}</h4>
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400">{n.type}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-blue-900 shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block bg-white rounded-[3.5rem] p-12 shadow-2xl space-y-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center">
                 <Clock className="w-5 h-5" />
               </div>
               <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Event Calendar</h3>
             </div>
             <div className="space-y-6">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-6 items-start pb-6 border-b border-slate-50 last:border-none">
                     <div className="text-center shrink-0">
                        <p className="text-[10px] font-black text-slate-300 uppercase">May</p>
                        <p className="text-2xl font-black text-blue-900 italic">{24+i}</p>
                     </div>
                     <div className="space-y-1">
                        <h5 className="font-black text-blue-900 uppercase text-sm">Parent-Teacher Interaction Phase {i}</h5>
                        <p className="text-xs text-slate-400 font-medium">Conference Room 102 • 09:00 AM</p>
                     </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest">See Full Calendar</Button>
             </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] -z-0" />
      </section>

      {/* 13. CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-stretch">
          <div className="space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-6 flex flex-col items-center lg:items-start">
              <h2 className="text-3xl md:text-6xl font-black text-blue-900 uppercase leading-tight md:leading-none tracking-tighter italic">Connect With <br /> <span className="text-amber-500">Registry.</span></h2>
              <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed max-w-sm text-justify">Have queries or want to schedule a visit? Our helpdesk is 24x7 ready to assist you.</p>
            </div>

            <div className="space-y-4 md:space-y-6 w-full max-w-md lg:max-w-none">
              <div className="flex items-center gap-6 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 group hover:bg-blue-900 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-900 shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 group-hover:text-blue-200">Call Now</p>
                   <p className="text-2xl font-black text-blue-900 tracking-tighter group-hover:text-white">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 group hover:bg-emerald-600 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 group-hover:text-white/60">Registry WhatsApp</p>
                   <p className="text-2xl font-black text-slate-800 tracking-tighter group-hover:text-white">Chat with Advisor</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 group hover:bg-blue-600 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-white/60">Location</p>
                   <p className="text-base font-bold text-white leading-tight">Skyline Nagar, Mangaldoi, Darrang, Assam - 784125</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-slate-50 border border-slate-100 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm flex flex-col space-y-8 items-center lg:items-center text-center">
             <div className="space-y-2 flex flex-col items-center">
               <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Inquiry Ledger</h3>
               <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">We respond within 24 operational hours.</p>
             </div>
             <form className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Guardian Name" className="h-14 w-full bg-white rounded-2xl px-6 border border-slate-200 font-bold text-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
                  <input placeholder="+91 Mobile Number" className="h-14 w-full bg-white rounded-2xl px-6 border border-slate-200 font-bold text-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
                </div>
                <input placeholder="Electronic Mail Address" className="h-14 w-full bg-white rounded-2xl px-6 border border-slate-200 font-bold text-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all" />
                <textarea placeholder="How can we help you?" className="h-32 w-full bg-white rounded-2xl px-6 py-4 border border-slate-200 font-bold text-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all resize-none" />
                <Button className="h-16 w-full rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/10">Submit Inquiry</Button>
             </form>
             <div className="h-px bg-slate-200 w-full" />
             <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-2xl overflow-hidden relative cursor-pointer group">
                <span className="text-[10px] font-black uppercase tracking-widest relative z-10">Get Realtime directions</span>
                <Navigation className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-blue-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
             </div>
          </Card>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-slate-900 text-white pt-24 pb-32 md:pb-12 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10 text-center md:text-left items-center md:items-start">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-8 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-900">
                <School className="w-7 h-7" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black tracking-tighter leading-none">SKYLINE</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Public School</span>
              </div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm text-justify">Dedicated to building brighter futures through innovative learning and holistic character development since 2009.</p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all cursor-pointer">
                    <Globe className="w-4 h-4" />
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500">Quick Links</h4>
            <div className="flex flex-col gap-4 text-center md:text-left">
              {['About School', 'Academics', 'Campus Facilities', 'Gallery', 'Work With us'].map(item => (
                <a key={item} href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">{item}</a>
              ))}
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500">Admissions</h4>
            <div className="flex flex-col gap-4 text-center md:text-left">
              {['Admission Process', 'Fee Structure', 'Required Documents', 'Online Application', 'Scholarships'].map(item => (
                <a key={item} href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-bold">{item}</a>
              ))}
            </div>
          </div>

          <div className="space-y-8 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-amber-500">Support</h4>
            <div className="space-y-4 w-full">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
                   <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500">Contact Number</p>
                  <p className="text-sm font-bold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 shrink-0">
                   <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500">Email Address</p>
                  <p className="text-sm font-bold">contact@skyline.edu.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
           <p>© 2026 Skyline Public School. All Rights Reserved.</p>
           <div className="flex gap-10">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Public Disclosures</a>
           </div>
        </div>
        
        {/* Background Noise/Gradient */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] -z-0" />
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 flex gap-4 no-print">
        <Button 
          onClick={() => window.open('tel:+919876543210')}
          className="flex-1 h-14 rounded-2xl bg-white text-blue-900 border border-slate-100 shadow-2xl font-black uppercase tracking-widest text-[11px] active:scale-95"
        >
          Call Now
        </Button>
        <Button 
          onClick={onApplyClick}
          className="flex-1 h-14 rounded-2xl bg-blue-900 text-white shadow-2xl font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
