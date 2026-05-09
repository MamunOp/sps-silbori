import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  GraduationCap,
  Monitor,
  Bus,
  Trophy,
  ChevronRight,
  Star,
  School,
  Instagram,
  Facebook,
  Twitter,
  Search,
  MessageCircle,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stats = [
    { value: "1200+", label: "Students", icon: <Users className="w-5 h-5" /> },
    { value: "85+", label: "Expert Faculty", icon: <GraduationCap className="w-5 h-5" /> },
    { value: "100%", label: "Safe Campus", icon: <Shield className="w-5 h-5" /> },
    { value: "25+", label: "Sports & Arts", icon: <Trophy className="w-5 h-5" /> },
  ];

  const facilities = [
    {
      title: "Smart Classrooms",
      description: "Interactive digital learning environment with modern tools.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
      icon: <Monitor className="w-6 h-6" />,
    },
    {
      title: "Science Labs",
      description: "State-of-the-art laboratories for physics, chemistry & biology.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
      icon: <Monitor className="w-6 h-6" />,
    },
    {
      title: "Digital Library",
      description: "Extensive collection of books and digital learning resources.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
      icon: <Monitor className="w-6 h-6" />,
    },
    {
      title: "Sports Arena",
      description: "Indoor and outdoor facilities for diverse sporting activities.",
      image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1200&auto=format&fit=crop",
      icon: <Trophy className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 overflow-x-hidden font-sans">
      {/* TOP INFO BAR */}
      <div className="hidden md:block bg-blue-900 text-white py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium tracking-wide uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Admissions Open 2026</span>
            <span className="flex items-center gap-1.5 opacity-80"><MapPin className="w-3.5 h-3.5" /> Mangaldoi, Darrang, Assam</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="hover:text-blue-200 transition-colors flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</a>
            <a href="https://wa.me/919876543210" className="hover:text-green-300 transition-colors flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 md:top-9 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 md:top-0 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${scrolled ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"}`}>
              <School className={`w-5 h-5 md:w-6 md:h-6 ${scrolled ? "text-white" : "text-white"}`} />
            </div>
            <div>
              <h1 className={`font-display font-extrabold text-lg md:text-xl leading-none transition-colors duration-500 ${scrolled ? "text-slate-900" : "text-white"}`}>
                Skyline <span className={scrolled ? "text-blue-600" : "text-blue-400"}>Public</span>
              </h1>
              <p className={`text-[10px] uppercase tracking-widest font-bold mt-1 transition-colors duration-500 ${scrolled ? "text-slate-400" : "text-blue-200"}`}>
                Estd 2009
              </p>
            </div>
          </div>

          <nav className={`hidden lg:flex items-center gap-8 text-sm font-semibold transition-colors duration-500 ${scrolled ? "text-slate-600" : "text-white/90"}`}>
            {["About", "Academics", "Facilities", "Admissions", "Gallery", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button className={`h-11 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}>
              Login
            </button>
            <button className={`h-11 px-8 rounded-full text-sm font-bold shadow-lg transition-all duration-500 active:scale-95 ${scrolled ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200" : "bg-white text-blue-600 hover:bg-blue-50"}`}>
              Apply Now
            </button>
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-900 bg-slate-50" : "text-white bg-white/20"}`}
            onClick={() => setMenu(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <School className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-lg">Skyline Public</span>
              </div>
              <button onClick={() => setMenu(false)} className="p-2 bg-slate-50 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
              <nav className="flex flex-col gap-6 text-center">
                {["Home", "About", "Academics", "Facilities", "Admissions", "Gallery", "Contact"].map((item, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenu(false)}
                    className="text-3xl font-extrabold tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <div className="pt-8 border-t border-slate-100 space-y-4">
                <button className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-100">
                  Apply for Admission
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-slate-50 text-slate-600 font-semibold">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href="https://wa.me/919876543210" className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-slate-50 text-slate-600 font-semibold">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1523050335392-9bc567547bb3?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
          <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-400/20 px-5 py-2 text-sm font-bold text-blue-100 mb-8 mx-auto md:mx-0"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Empowering Minds, Shaping Futures
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-[72px] font-display font-extrabold leading-[0.95] tracking-tighter text-white mb-8 text-center"
            >
              Building <span className="text-blue-400">Leaders</span> <br className="hidden md:block" />
              Not Just Students.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-12 text-center text-justify mx-auto"
            >
              At Skyline Public School, we merge traditional values with modern innovation 
              to provide a world-class education that inspires confidence and excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y:30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start"
            >
              <button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                Apply for 2026–27
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto h-16 px-10 rounded-2xl border border-white/20 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-white" />
                Campus Video
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-300 opacity-80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SYMBOLS */}
      <section className="relative z-20 -mt-16 sm:-mt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100 grid md:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
            <div className="flex flex-col items-center gap-5 border-b md:border-b-0 pb-10 md:pb-0 border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-slate-900">CBSE Curriculum</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">Recognized standards</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 border-b lg:border-b-0 pb-10 md:pb-0 border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Monitor className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-slate-900">Digital Smartness</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">Tech-driven learning</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 border-b md:border-b-0 pb-10 md:pb-0 border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Shield className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-slate-900">Security + GPS</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">24/7 Campus safety</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Clock className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-slate-900">Since 2009</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">15 Years of excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / ABOUT */}
      <section id="about" className="py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[48px] overflow-hidden shadow-3xl"
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?q=80&w=1400&auto=format&fit=crop"
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                  <p className="text-white text-base md:text-lg font-medium italic mb-4">
                    "Our mission is to foster an environment where children are not just taught, 
                    but are inspired to discover their true potential."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/50 bg-slate-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm leading-none">Anand Sharma</h5>
                      <p className="text-blue-200 text-[10px] mt-1 uppercase font-bold tracking-widest leading-none">Founder & Principal</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -z-10 top-20 -right-20 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-60" />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-blue-600 font-extrabold uppercase tracking-[0.2em] text-sm mb-6 block mx-auto">Welcome to Skyline</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-[1.1] tracking-tight text-slate-950 mb-8 mx-auto max-w-xl text-center">
              True Education <br className="hidden md:block" />
              Beyond Classrooms.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto text-center text-justify">
              We provide a holistic learning experience that balances academic rigour with physical activity, 
              creativity, and character building. Our students aren't just learners—they are 
              curious explorers of the world.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12 text-center">
              {[
                { title: "Smart Digital Education", desc: "Interactive smart-boards in every classroom." },
                { title: "Holistic Growth", desc: "Equal focus on arts, sports, and soft skills." },
                { title: "Personal Attention", desc: "Low student-to-teacher ratio for better care." },
                { title: "Secure & Friendly", desc: "Safe, green, and disciplined environment." },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center gap-4 mx-auto">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{feature.title}</h5>
                    <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="h-14 px-10 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors w-full sm:w-auto">
              Read Our History
            </button>
          </motion.div>
        </div>
      </section>

      {/* FACILITIES / INFRASTRUCTURE */}
      <section id="facilities" className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col mb-20 gap-8">
            <div className="text-center mx-auto">
              <span className="text-blue-400 font-extrabold uppercase tracking-[0.2em] text-sm mb-6 block">Infrastructure</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-[1.1] tracking-tight text-center mx-auto">
                A World-Class Modern Campus.
              </h2>
            </div>
            <button className="h-14 px-8 rounded-2xl border border-white/20 font-bold hover:bg-white/10 transition-colors w-full md:w-max mx-auto">
              View All Facilities
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] rounded-[40px] overflow-hidden"
              >
                <img src={fac.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                    {fac.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{fac.title}</h3>
                  <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {fac.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="admissions" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 rounded-[56px] relative overflow-hidden px-8 py-20 md:p-24 text-center">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-slate-900/20 rounded-full blur-[80px]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight tracking-tighter text-center">
                Admissions Now Open.
              </h2>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90 text-center text-justify">
                Don't miss the chance to give your child the education they deserve. 
                Start their journey with us today and watch them grow into the leaders of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button className="h-16 px-10 rounded-2xl bg-white text-blue-600 font-bold text-lg shadow-xl shadow-blue-800/20 active:scale-95 transition-all">
                  Register for Admission 2026
                </button>
                <button className="h-16 px-10 rounded-2xl bg-blue-900/30 text-white border border-white/20 backdrop-blur-sm font-bold text-lg active:scale-95 transition-all">
                  Fee Structure 2026
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2 space-y-12 text-center mx-auto">
            <div>
              <span className="text-blue-600 font-extrabold uppercase tracking-[0.2em] text-sm mb-6 block text-center">Ready to Connect?</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold leading-[1.1] tracking-tight text-slate-950 mb-8 mx-auto text-center">
                Visit Us <br className="hidden md:block" />
                Today.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto text-center text-justify">
                Our office is open from Monday to Saturday, 9:00 AM – 3:30 PM. 
                Come feel the energy of our campus.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col items-center gap-6 justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Admission Desk</p>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">+91 98765 43210</h4>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Email Inquiry</p>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">info@skyline.edu.in</h4>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Campus Location</p>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight">Mangaldoi, Darrang, Assam</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-50 border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[48px] p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Parent's Name</label>
                    <input className="w-full h-16 rounded-2xl bg-white border border-slate-200 px-6 font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none" placeholder="Enter Full Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Mobile Number</label>
                    <input className="w-full h-16 rounded-2xl bg-white border border-slate-200 px-6 font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none" placeholder="+91" />
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Interested Grade/Class</label>
                  <select className="w-full h-16 rounded-2xl bg-white border border-slate-200 px-6 font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none">
                    <option>Select Class</option>
                    <option>Nursery - UKG</option>
                    <option>Grade 1 - 5</option>
                    <option>Grade 6 - 8</option>
                    <option>Grade 9 - 12</option>
                  </select>
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Message / Inquiry</label>
                  <textarea className="w-full h-32 rounded-2xl bg-white border border-slate-200 p-6 font-medium focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none" placeholder="Any specific requirements?" />
                </div>
                <button className="w-full h-16 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                  Submit Interest Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-24 pb-12 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-10 group text-center mx-auto">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-2xl">
                  <School className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-display font-extrabold tracking-tighter leading-none">Skyline <span className="text-blue-500">Public</span></h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">Nurturing Leaders</p>
                </div>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto text-center text-justify">
                Skyline Public School is a premium CBSE affiliated institution dedicated to academic brilliance 
                and holistic development. We believe in providing a safe, green, and modern environment 
                for every child.
              </p>
              <div className="flex gap-4 justify-center">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold mb-8">Navigation</h4>
              <ul className="space-y-4 text-slate-400">
                {["Home", "About Us", "Academics", "Facilities", "Admissions", "Gallery", "Contact Us"].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors"> {link} </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold mb-8">Contact Info</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3 justify-center"><Phone size={16} className="text-blue-500" /> +91 98765 43210</li>
                <li className="flex items-center gap-3 justify-center"><Mail size={16} className="text-blue-500" /> info@skyline.edu.in</li>
                <li className="flex items-center gap-3 justify-center text-center"><MapPin size={16} className="text-blue-500" /> Mangaldoi, Darrang, Assam 784125</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs text-center">
            <p>© 2026 Skyline Public School. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <MessageCircle className="w-8 h-8 relative z-10" />
      </a>
    </div>
  );
}
