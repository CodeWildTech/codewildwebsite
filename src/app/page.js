'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Section Imports
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import Advertise from '@/components/sections/Advertise';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values: image grows from 40% width to 100%, and scales up
  const imageWidth = useTransform(scrollYProgress, [0, 0.8], ["40%", "100%"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.8], ["60vh", "100vh"]);
  const imageRadius = useTransform(scrollYProgress, [0, 0.8], ["40px", "0px"]);
  const imageY = useTransform(scrollYProgress, [0, 0.8], ["0%", "0%"]);
  // Optional: fade out the text as image grows
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main
      id="home"
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#050505] text-white selection:bg-orange-500 selection:text-black"
    >
      {/* ─── FULL-WIDTH HERO GRADIENT BACKGROUND ─── */}
      <div className="absolute inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] left-[10%] w-[100vw] h-[80vh] bg-orange-600/30 blur-[140px] rounded-[100%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      <section className="relative z-10 pt-40 w-full h-screen sticky top-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 h-full flex flex-col justify-between pb-20">
          
          {/* Status Bar */}
          <div className="flex justify-between items-start">
            <div />
            <div className="hidden md:block text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-2">Current Status</p>
              <span className="text-[11px] text-orange-500 flex items-center justify-end gap-2 font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]" />
                AVAILABLE FOR PROJECTS
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            {/* Left Side: Typography */}
            <motion.div style={{ opacity: textOpacity }} className="lg:w-3/5 z-20">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,8vw,10rem)] font-bold leading-[0.9] tracking-[-0.04em]"
              >
                CODEWILD <br />
                <span className="text-zinc-800 transition-colors duration-700 hover:text-zinc-700">
                  TECHNOLOGY
                </span>
              </motion.h1>
              
              <div className="mt-10 max-w-md">
                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                  We craft <span className="text-white">high-performance</span> digital assets that bridge engineering and design.
                </p>
                <button className="mt-8 group flex items-center gap-4 text-white uppercase text-xs font-bold tracking-[0.3em]">
                  <span className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={18} />
                  </span>
                  Start the conversation
                </button>
              </div>
            </motion.div>

            {/* Right Side: Expanding Image */}
            
             
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="bg-white text-black rounded-t-[40px] relative z-20 shadow-[0_-40px_80px_rgba(0,0,0,0.8)]">
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <Advertise />
        <ContactSection />
      </div>
    </main>
  );
}