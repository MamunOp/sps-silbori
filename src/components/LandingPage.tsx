import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
} from "lucide-react";

export default function WorldClassSchoolLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stats = [
    { value: "1200+", label: "Students" },
    { value: "18+", label: "Experienced Faculty" },
    { value: "100%", label: "Safe Campus" },
    { value: "15+", label: "Academic Activities" },
  ];

  const facilities = [
    {
      title: "Smart Classrooms",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Science Laboratories",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Modern Library",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Sports Facilities",
      image:
        "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      {/* NAVBAR */}

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <School className="w-5 h-5" />
            </div>

            <div>
              <h1 className="font-bold text-lg leading-none">
                Skyline Public School
              </h1>
              <p className="text-xs text-slate-500">
                Mangaldoi, Assam
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-600">
            {[
              "About",
              "Academics",
              "Facilities",
              "Admissions",
              "Gallery",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-slate-950 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button className="h-11 px-5 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-100 transition">
              Parent Portal
            </button>

            <button className="h-11 px-6 rounded-full bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition">
              Apply Now
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[100] p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <h2 className="font-bold text-xl">
                Skyline Public School
              </h2>

              <button onClick={() => setMenu(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-8 text-2xl font-semibold">
              {[
                "About",
                "Academics",
                "Facilities",
                "Admissions",
                "Gallery",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenu(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}

      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 text-sm text-white">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Admissions Open 2026–27
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white max-w-3xl">
                A Modern School Built for Future Leaders
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Skyline Public School combines academic excellence,
                discipline, technology-driven learning, and character
                development in a safe and inspiring environment.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="h-14 px-8 rounded-full bg-white text-slate-950 font-semibold hover:bg-slate-100 transition flex items-center gap-2">
                Start Admission
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="h-14 px-8 rounded-full border border-white/20 text-white backdrop-blur-md hover:bg-white/10 transition">
                Virtual Campus Tour
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
              {stats.map((item, i) => (
                <div key={i}>
                  <h3 className="text-3xl font-bold text-white">
                    {item.value}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FLOATING CARD */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-[32px] p-8 shadow-2xl max-w-md ml-auto">
              <div className="space-y-8">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
                  className="rounded-[24px] h-72 w-full object-cover"
                />

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <GraduationCap />
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        Future-Focused Education
                      </h4>

                      <p className="text-sm text-slate-500">
                        Smart learning with values and discipline.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div className="grid grid-cols-2 gap-5">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <Monitor className="w-5 h-5 mb-3 text-blue-600" />

                      <p className="font-semibold">
                        Smart Campus
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <Shield className="w-5 h-5 mb-3 text-blue-600" />

                      <p className="font-semibold">
                        CCTV Security
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <Bus className="w-5 h-5 mb-3 text-blue-600" />

                      <p className="font-semibold">
                        GPS Transport
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                      <Trophy className="w-5 h-5 mb-3 text-blue-600" />

                      <p className="font-semibold">
                        Sports Activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
          {[
            "CBSE Curriculum",
            "Digital Learning",
            "Safe Campus",
            "Experienced Faculty",
            "Sports & Arts",
            "Since 2009",
          ].map((item, i) => (
            <div
              key={i}
              className="text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="py-28"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-blue-600 font-medium">
                About Skyline
              </p>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Education Rooted in Excellence and Values
              </h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              We believe education should shape both intellect and
              character. Our campus provides modern academic resources,
              experienced faculty, activity-based learning, and a safe
              environment where students grow with confidence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Modern Digital Classrooms",
                "Safe & Disciplined Campus",
                "Holistic Student Development",
                "Activity-Based Learning",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </div>

                  <p className="text-slate-700 font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?q=80&w=1400&auto=format&fit=crop"
              className="rounded-[36px] shadow-2xl"
            />

            <div className="absolute -bottom-10 -left-10 bg-white shadow-xl rounded-[28px] p-6 max-w-xs">
              <p className="text-sm text-slate-500 leading-relaxed">
                “Our mission is to inspire confident learners,
                responsible citizens, and future-ready leaders.”
              </p>

              <div className="mt-5">
                <h4 className="font-semibold">
                  Principal, Skyline Public School
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}

      <section
        id="facilities"
        className="py-28 bg-slate-950 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="max-w-3xl">
            <p className="text-blue-400 font-medium mb-5">
              Campus Infrastructure
            </p>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Designed for Modern Learning
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((item, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-[30px] bg-white/5 border border-white/10"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    className="h-72 w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="py-28"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-blue-600 font-medium mb-5">
                Contact Us
              </p>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Begin Your Child’s Learning Journey
              </h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Schedule a campus visit or speak with our admission
              office to learn more about Skyline Public School.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Phone />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Call Us
                  </p>

                  <h4 className="font-semibold text-lg">
                    +91 98765 43210
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Mail />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <h4 className="font-semibold text-lg">
                    contact@skyline.edu.in
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <MapPin />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Campus Address
                  </p>

                  <h4 className="font-semibold text-lg">
                    Mangaldoi, Darrang, Assam
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}

          <div className="bg-slate-50 border border-slate-200 rounded-[36px] p-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold">
                  Admission Inquiry
                </h3>

                <p className="text-slate-500 mt-2">
                  Our team will contact you within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="Parent Name"
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 outline-none focus:border-slate-950 transition"
                />

                <input
                  placeholder="Mobile Number"
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 outline-none focus:border-slate-950 transition"
                />

                <input
                  placeholder="Email Address"
                  className="w-full h-14 rounded-2xl border border-slate-200 bg-white px-5 outline-none focus:border-slate-950 transition"
                />

                <textarea
                  placeholder="Message"
                  className="w-full h-36 rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none resize-none focus:border-slate-950 transition"
                />

                <button className="w-full h-14 rounded-2xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition">
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-14">
          <div className="space-y-6 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center">
                <School />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Skyline Public School
                </h3>

                <p className="text-sm text-slate-400">
                  Mangaldoi, Assam
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg">
              Skyline Public School is committed to academic
              excellence, character development, and future-ready
              education in a safe and inspiring environment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">
              Quick Links
            </h4>

            <div className="space-y-4 text-slate-400">
              <p>About School</p>
              <p>Admissions</p>
              <p>Facilities</p>
              <p>Gallery</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">
              Contact
            </h4>

            <div className="space-y-4 text-slate-400">
              <p>+91 98765 43210</p>
              <p>contact@skyline.edu.in</p>
              <p>Mangaldoi, Darrang, Assam</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 Skyline Public School. All rights reserved.</p>

          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}