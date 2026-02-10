'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Section Imports
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-black">
      {/* ─── FULL-WIDTH HERO GRADIENT BACKGROUND ─── */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        {/* Primary Liquid Orange Mesh */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] left-[10%] w-[100vw] h-[80vh] bg-orange-600/30 blur-[140px] rounded-[100%]"
        />

        {/* Secondary Deep Amber Glow */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] -right-[10%] w-[80vw] h-[70vh] bg-orange-500/20 blur-[160px] rounded-[100%]"
        />

        {/* Global Fade-out to Black at the bottom of the Hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      <section className="relative z-10 pt-40 pb-20 w-full">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* ─── TOP NAVIGATION / STATUS ─── */}
          <div className="flex justify-between items-start mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-orange-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-medium">
                EST. 2024 / Digital Studio
              </span>
            </motion.div>

            <div className="hidden md:block text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2">
                Current Status
              </p>
              <span className="text-[11px] text-orange-500 flex items-center justify-end gap-2 font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]" />
                AVAILABLE FOR PROJECTS
              </span>
            </div>
          </div>

          {/* ─── HERO TYPOGRAPHY ─── */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,12vw,12rem)] font-bold leading-[0.9] tracking-[-0.04em]"
            >
              CODEWILD <br />
              <span className="text-zinc-800 transition-colors duration-700 hover:text-zinc-700">
                TECHNOLOGY
              </span>
            </motion.h1>

            <div className="grid lg:grid-cols-12 gap-12 mt-20 items-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="lg:col-span-5"
              >
                <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                  We craft <span className="text-white">high-performance</span>{' '}
                  digital assets that bridge the gap between complex engineering
                  and intuitive design.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="lg:col-start-9 lg:col-span-4 flex flex-col items-start lg:items-end gap-8"
              >
                <button className="group relative flex items-center gap-4 text-white uppercase text-xs font-bold tracking-[0.3em]">
                  <span className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <ArrowUpRight size={18} />
                  </span>
                  Start the conversation
                </button>
              </motion.div>
            </div>
          </div>

          {/* ─── MINIMAL CAPABILITIES ─── */}
          <div className="mt-40 pt-12 border-t border-zinc-900 grid md:grid-cols-4 gap-12">
            {[
              { id: '01', label: 'Web Architecture' },
              { id: '02', label: 'Mobile Systems' },
              { id: '03', label: 'Cloud Strategy' },
              { id: '04', label: 'UI/UX Research' },
            ].map(item => (
              <div key={item.id} className="group">
                <span className="text-[10px] text-orange-500 font-mono mb-4 block group-hover:translate-x-1 transition-transform">
                  {item.id}
                </span>
                <h3 className="text-zinc-500 group-hover:text-white transition-colors duration-300 text-sm uppercase tracking-widest font-medium">
                  {item.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="bg-white text-black rounded-t-[40px] relative z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.8)]">
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <ContactSection />
      </div>
    </main>
  );
}
