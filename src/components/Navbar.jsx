'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Lock logic to prevent background scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Products', id: 'products' },
  ];

  const handleScrollTo = id => {
    setIsMobileMenuOpen(false);

    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || isMobileMenuOpen
          ? 'py-4 bg-[#050505] border-b border-white/10 shadow-2xl'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO SECTION */}
        <div
          className="flex items-center gap-3 cursor-pointer group z-[120]"
          onClick={() => {
            if (pathname !== '/') {
              router.push('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setIsMobileMenuOpen(false);
          }}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg]">
            <Rocket size={20} className="text-black fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter text-lg leading-none">
              CodeWild<span className="text-orange-500">Tech</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-[0.2em] uppercase">
              Innovate.
            </span>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors group py-2">
              Join Us
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 p-1.5 bg-zinc-900 border border-white/10 rounded-2xl shadow-xl"
                >
                  <button
                    onClick={() => router.push('/careers?type=jobs')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    Careers
                  </button>
                  <button
                    onClick={() => router.push('/careers?type=internship')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    Internship
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ACTION BUTTONS & TOGGLE */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleScrollTo('contact')}
            className="hidden md:flex group relative px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:bg-orange-500 hover:text-white"
          >
            Get in Touch
          </button>

          <button
            className="md:hidden z-[120] relative w-12 h-12 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* FULL SCREEN MOBILE OVERLAY (SOLID DESIGN) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="fixed inset-0 bg-[#080808] z-[110] md:hidden flex flex-col"
          >
            {/* High Opacity Header Strip */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-[#050505] border-b border-white/5 shadow-xl" />

            {/* Solid Decorative Shapes (Not transparent) */}
            <div className="absolute top-[20%] right-[-10%] w-[250px] h-[250px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col h-full p-8 pt-32 overflow-y-auto relative z-20">
              <nav className="flex flex-col gap-2">
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                  Menu
                </p>
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleScrollTo(item.id)}
                    className="text-5xl font-bold text-white text-left py-4 tracking-tighter hover:text-orange-500 transition-colors border-b border-white/5"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {/* Solid Background Join Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 rounded-3xl bg-white/[0.03] border border-white/10"
              >
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">
                  Collaborate
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      router.push('/careers?type=jobs');
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium hover:bg-orange-500 hover:text-black transition-all"
                  >
                    Careers
                  </button>
                  <button
                    onClick={() => {
                      router.push('/careers?type=internship');
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium hover:bg-orange-500 hover:text-black transition-all"
                  >
                    Internship
                  </button>
                </div>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pt-10"
              >
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="w-full py-5 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-2 mb-8 active:scale-95 transition-transform"
                >
                  GET IN TOUCH <ArrowUpRight size={24} />
                </button>

                <div className="flex justify-between items-center text-zinc-400">
                  <div className="flex gap-8">
                    <Instagram size={24} className="hover:text-orange-500" />
                    <Linkedin size={24} className="hover:text-orange-500" />
                  </div>
                  <span className="text-[10px] font-mono tracking-tighter opacity-50 uppercase font-bold">
                    CodeWild Tech © 2026
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
