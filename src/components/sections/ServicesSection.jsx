'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Cloud, Layout } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Web Platforms',
    desc: 'Architecting high-performance, SEO-optimized web applications using Next.js and React. Built for speed and global scalability.',
    icon: <Globe size={28} />, // Adjusted base icon size for better mobile fit
    tags: ['SaaS', 'E-Commerce', 'Admin Suites'],
  },
  {
    id: '02',
    title: 'Mobile Ecosystems',
    desc: 'Native and cross-platform mobile solutions that provide seamless user experiences across iOS and Android devices.',
    icon: <Smartphone size={28} />,
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    id: '03',
    title: 'Cloud Infrastructure',
    desc: 'Secure, auto-scaling cloud architecture designed to handle millions of requests without breaking a sweat.',
    icon: <Cloud size={28} />,
    tags: ['AWS', 'Vercel', 'Serverless'],
  },
  {
    id: '04',
    title: 'UI/UX Engineering',
    desc: 'Where logic meets aesthetics. We design interfaces that are not only beautiful but conversion-optimized and accessible.',
    icon: <Layout size={28} />,
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#050505] text-white overflow-hidden py-20 md:py-32"
    >
      {/* Background Blurred Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[10%] -left-[10%] w-[70%] md:w-[50%] h-[50%] bg-orange-600/10 blur-[80px] md:blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[10%] -right-[10%] w-[80%] md:w-[60%] h-[60%] bg-orange-900/10 blur-[100px] md:blur-[150px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-10">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-500 font-bold">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9] md:leading-[0.85]">
              Our <span className="text-zinc-500 hover:text-orange-500 transition-colors duration-500 cursor-default">Core</span> <br /> Capabilities
            </h2>
          </div>
          <p className="text-zinc-400 text-base md:text-lg lg:text-xl font-light max-w-sm border-l border-orange-500/30 pl-6 md:pl-8 leading-relaxed">
            We don't do everything. We do these four things better than anyone
            else in the industry.
          </p>
        </div>

        {/* Services List */}
        <div className="border-t border-zinc-900/50">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-b border-zinc-900/50 py-8 md:py-14 cursor-pointer overflow-hidden transition-all duration-500"
            >
              {/* White-Based Hover Background */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  x: hoveredIndex === index ? 0 : -20,
                }}
                className="absolute inset-0 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent z-0"
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                {/* ID & Title Group */}
                <div className="flex items-center gap-6 md:gap-10 lg:gap-20">
                  <span className={`text-xs md:text-sm font-mono transition-all duration-500 ${hoveredIndex === index ? 'text-white translate-x-1 md:translate-x-2' : 'text-zinc-700'}`}>
                    {service.id}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-500 ease-out ${hoveredIndex === index ? 'text-white translate-x-2 md:translate-x-4' : 'text-zinc-400'}`}>
                    {service.title}
                  </h3>
                </div>

                {/* Interaction Group (Tags & Icons) */}
                <div className="flex items-center justify-between md:justify-end flex-1 gap-4 md:gap-12">
                  {/* Tags - Hidden on small mobile, shown from 'sm' up */}
                  <div className="hidden sm:flex gap-2 md:gap-3">
                    {service.tags.slice(0, 2).map(tag => ( // Show fewer tags on smaller screens
                      <span
                        key={tag}
                        className="text-[8px] md:text-[9px] uppercase tracking-widest text-zinc-600 border border-zinc-900 px-3 md:px-4 py-1 md:py-1.5 rounded-full group-hover:border-white/20 group-hover:text-zinc-200 transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Icon & Arrow */}
                  <div className="flex items-center gap-4 md:gap-8 min-w-[80px] md:min-w-[120px] justify-end">
                    <div
                      className={`transition-all duration-700 ${
                        hoveredIndex === index 
                        ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                        : 'text-zinc-800'
                      }`}
                    >
                      {service.icon}
                    </div>
                    <div className="overflow-hidden w-6 h-6 md:w-8 md:h-8">
                      <ArrowUpRight
                        className={`transition-all duration-500 ease-out ${
                          hoveredIndex === index 
                          ? 'translate-y-0 translate-x-0 opacity-100 text-white' 
                          : 'translate-y-4 -translate-x-4 opacity-0 text-zinc-800'
                        }`}
                        size={28}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revealable Description */}
              <AnimatePresence mode="wait">
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: 10 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 pl-10 md:pl-[85px] lg:pl-[165px] mt-4 md:mt-8 max-w-2xl"
                  >
                    <p className="text-zinc-400 text-sm md:text-lg lg:text-xl leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;