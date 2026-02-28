'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

const COLUMN_1 = [
  { src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070', title: 'Neural Interface' },
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564', title: 'Liquid Abstract' },
  { src: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232', title: 'Crypto System' },
];

const COLUMN_2 = [
  { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070', title: 'Retro Hardware' },
  { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026', title: 'Server Mesh' },
  { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072', title: 'Global Node' },
];

function ImageCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative w-[240px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden 
                   bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.5)]
                   cursor-pointer border-none"
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 2 }}
              exit={{ opacity: 0, x: -20, rotate: -5 }}
              className="absolute bottom-4 left-4 z-50 pointer-events-none"
            >
              <div className="relative bg-white text-black text-[11px] font-black tracking-tighter uppercase px-3 py-2 rounded-sm shadow-2xl flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                {item.title}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </div>
  );
}

function ScrollingColumn({ items, yTransform }) {
  return (
    <motion.div style={{ y: yTransform }} className="flex flex-col gap-6 md:gap-10">
      {[...items, ...items].map((item, i) => (
        <ImageCard key={i} item={item} />
      ))}
    </motion.div>
  );
}

export default function Advertise() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const yColumn1 = useTransform(smoothProgress, [0, 1], [100, -300]);
  const yColumn2 = useTransform(smoothProgress, [0, 1], [-300, 100]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#050505] py-20 md:py-32 px-6">
      
      {/* ─── BRAND GRADIENT BACKGROUND ─── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-2 gap-12 md:gap-24 items-center z-10">
        
        {/* ─── LEFT CONTENT WITH PATTERN ─── */}
        <div className="relative space-y-12 text-center lg:text-left py-20">
          
          {/* Subtle Background Pattern (Grid) */}
          <div className="absolute -inset-y-20 -inset-x-10 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-orange-500"
            >
              <Plus size={14} />
              <span className="text-[10px] uppercase tracking-[0.6em] font-black">Community Events</span>
            </motion.div>

            <h1 className="text-6xl md:text-[9rem] font-black leading-[0.8] tracking-[-0.06em] text-white uppercase">
              UNITE <br />
              <span className="text-zinc-900 transition-colors duration-700 hover:text-orange-500" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                WILDLY
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-lg leading-relaxed mx-auto lg:mx-0 border-l border-zinc-800 pl-6">
            Beyond the technical architecture, we celebrate the <span className="text-white font-semibold">human energy</span> and fests that fuel our innovation.
          </p>

          <div className="flex justify-center lg:justify-start pt-4">
            <button className="flex items-center gap-6 text-white text-[11px] font-bold uppercase tracking-[0.5em] group">
              <span className="relative w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500 shadow-2xl">
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                {/* Subtle Ripple Effect */}
                <span className="absolute inset-0 rounded-full border border-orange-500/30 scale-110 animate-pulse group-hover:hidden" />
              </span>
              <span className="group-hover:text-orange-500 transition-colors">Explore Moments</span>
            </button>
          </div>

          {/* Large Ghost Text Background */}
          <div className="absolute -bottom-10 -left-10 text-[12rem] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter">
            Fests
          </div>
        </div>

        {/* ─── RIGHT SIDE IMAGE GRID ─── */}
        <div className="relative h-[600px] md:h-[800px] w-full flex gap-4 md:gap-10 justify-center lg:justify-end items-center overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />

          <div className="flex gap-4 md:gap-10 rotate-0">
            <ScrollingColumn items={COLUMN_1} yTransform={yColumn1} />
            <ScrollingColumn items={COLUMN_2} yTransform={yColumn2} />
          </div>
        </div>

      </div>
    </section>
  );
}