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
  Globe,
  Smartphone,
  Cloud,
  Layout,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { services as serviceData } from '@/data/services';

const serviceIcons = {
  'website': <Globe size={16} />,
  'web-application': <Smartphone size={16} />,
  'app-development': <Cloud size={16} />,
  'ui-ux-design': <Layout size={16} />,
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Products', id: 'products' },
  ];

  const connectionLinks = [
    { name: 'Instagram', icon: <Instagram size={16} />, url: 'https://instagram.com/codewildtech' },
    { name: 'LinkedIn', icon: <Linkedin size={16} />, url: 'https://linkedin.com/company/codewildtech' },
    { name: 'Twitter', icon: <Twitter size={16} />, url: 'https://twitter.com/codewildtech' },
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen
        ? 'py-3 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
        : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO SECTION */}
        <div
          className="flex items-center gap-3 cursor-pointer group z-[120]"
          onClick={() => {
            if (pathname !== '/') router.push('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="hidden md:flex items-center gap-8">
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

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors group py-2">
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 p-1.5 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                >
                  {serviceData.map(service => (
                    <button
                      key={service.slug}
                      onClick={() => router.push(`/services/${service.slug}`)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item"
                    >
                      <span className="text-zinc-600 group-hover/item:text-orange-500 transition-colors">
                        {serviceIcons[service.slug]}
                      </span>
                      {service.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Join Us Dropdown */}
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
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 p-1.5 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
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

      {/* FULL SCREEN MOBILE OVERLAY */}
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
            className="fixed left-0 right-0 bottom-0 bg-[#080808] z-[90] md:hidden flex flex-col"
            style={{ top: 'var(--navbar-height, 64px)' }}
          >
            <div className="absolute top-[30%] right-[-15%] w-[200px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[15%] left-[-15%] w-[200px] h-[200px] bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col h-full px-6 pt-6 pb-6 overflow-y-auto relative z-20">
              {/* Nav Links */}
              <nav className="flex flex-col">
                <p className="text-orange-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-3">
                  Menu
                </p>
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => handleScrollTo(item.id)}
                    className="text-3xl font-bold text-white text-left py-3 tracking-tight hover:text-orange-500 transition-colors border-b border-white/5"
                  >
                    {item.name}
                  </motion.button>
                ))}

                {/* Services Expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * navItems.length }}
                >
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="w-full text-3xl font-bold text-white text-left py-3 tracking-tight hover:text-orange-500 transition-colors border-b border-white/5 flex items-center justify-between"
                  >
                    Services
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${mobileServicesExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServicesExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 space-y-0.5 border-b border-white/5">
                          {serviceData.map(service => (
                            <button
                              key={service.slug}
                              onClick={() => {
                                router.push(`/services/${service.slug}`);
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-base text-zinc-400 hover:text-orange-500 transition-colors text-left rounded-lg active:bg-white/5"
                            >
                              <span className="text-zinc-600">{serviceIcons[service.slug]}</span>
                              {service.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>

              {/* Collaborate & Connections */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-4"
              >
                {/* Collaborate */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-bold mb-3">
                    Collaborate
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        router.push('/careers?type=jobs');
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm font-medium active:bg-orange-500 active:text-black transition-all"
                    >
                      Careers
                    </button>
                    <button
                      onClick={() => {
                        router.push('/careers?type=internship');
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm font-medium active:bg-orange-500 active:text-black transition-all"
                    >
                      Internship
                    </button>
                  </div>
                </div>

                {/* Connections */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-bold mb-3">
                    Connections
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {connectionLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[80px] py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-medium active:bg-orange-500 active:text-black transition-all flex items-center justify-center gap-1.5"
                      >
                        {link.icon}
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-auto pt-6"
              >
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="w-full py-4 bg-white text-black font-black text-base rounded-2xl flex items-center justify-center gap-2 mb-5 active:scale-[0.97] transition-transform uppercase tracking-wider"
                >
                  Get in Touch <ArrowUpRight size={18} />
                </button>

                <div className="flex justify-between items-center">
                  <div className="flex gap-5">
                    {connectionLinks.map(link => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 hover:text-orange-500 transition-colors"
                      >
                        {React.cloneElement(link.icon, { size: 20 })}
                      </a>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono tracking-tight text-zinc-700 uppercase font-bold">
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