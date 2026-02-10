'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Cloud, Layout } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Web Platforms',
    desc: 'Architecting high-performance, SEO-optimized web applications using Next.js and React. Built for speed and global scalability.',
    icon: <Globe size={32} />,
    tags: ['SaaS', 'E-Commerce', 'Admin Suites'],
  },
  {
    id: '02',
    title: 'Mobile Ecosystems',
    desc: 'Native and cross-platform mobile solutions that provide seamless user experiences across iOS and Android devices.',
    icon: <Smartphone size={32} />,
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    id: '03',
    title: 'Cloud Infrastructure',
    desc: 'Secure, auto-scaling cloud architecture designed to handle millions of requests without breaking a sweat.',
    icon: <Cloud size={32} />,
    tags: ['AWS', 'Vercel', 'Serverless'],
  },
  {
    id: '04',
    title: 'UI/UX Engineering',
    desc: 'Where logic meets aesthetics. We design interfaces that are not only beautiful but conversion-optimized and accessible.',
    icon: <Layout size={32} />,
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#050505] text-white overflow-hidden py-24 md:py-0"
    >
      {/* Background Blurred Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-orange-900/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Container Fluid Style: Using max-w-none and fluid padding */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32 gap-8 w-full">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                Expertise
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
              Our{' '}
              <span className="text-orange-500 transition-colors duration-700">
                Core
              </span>{' '}
              <br /> Capabilities
            </h2>
          </div>
          <p className="text-zinc-400 text-lg font-light max-w-sm border-l border-orange-500/30 pl-8 leading-relaxed">
            We don't do everything. We do these four things better than anyone
            else in the industry.
          </p>
        </div>

        {/* Services List - Full Width */}
        <div className="border-t border-zinc-900 w-full">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-b border-zinc-900 py-10 cursor-pointer w-full"
            >
              {/* Animated Row Highlight */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent z-0 transition-opacity"
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                {/* ID & Title */}
                <div className="flex items-center gap-12 lg:gap-24">
                  <span className="text-xs font-mono text-zinc-700 group-hover:text-orange-500 transition-colors">
                    {service.id}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                    {service.title}
                  </h3>
                </div>

                {/* Tags (Desktop) */}
                <div className="hidden lg:flex gap-4">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full group-hover:border-orange-500/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Icon/Arrow */}
                <div className="flex items-center gap-6">
                  <div
                    className={`transition-all duration-500 ${hoveredIndex === index ? 'text-orange-500 scale-110' : 'text-zinc-700'}`}
                  >
                    {service.icon}
                  </div>
                  <ArrowUpRight
                    className={`transition-all duration-500 ${hoveredIndex === index ? 'rotate-0 text-white opacity-100' : 'rotate-45 text-zinc-800 opacity-0'}`}
                    size={32}
                  />
                </div>
              </div>

              {/* Revealable Description */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'circOut' }}
                    className="relative z-10 md:pl-[145px] lg:pl-[185px] mt-6 max-w-2xl"
                  >
                    <p className="text-zinc-400 text-lg leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex justify-center w-full">
          <button className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-4 group">
            Explore Full Portfolio{' '}
            <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-orange-500 transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
