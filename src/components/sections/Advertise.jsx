'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
      {/* --- MESSAGE BOX CAPTION --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="relative bg-orange-500 text-black text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
              {item.title}
              {/* Message Box Tail */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative w-[240px] md:w-[350px] aspect-[4/3] rounded-xl overflow-hidden 
                   border border-zinc-800 bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.5)]
                   cursor-pointer"
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
      
      {/* BRAND GRADIENT BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-2 gap-12 md:gap-24 items-center z-10">
        
        {/* LEFT CONTENT */}
        <div className="space-y-8 md:space-y-12 text-center lg:text-left">
          <div className="space-y-6">
            <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} className="h-[1px] bg-orange-500 mx-auto lg:mx-0" />
            <h1 className="text-6xl md:text-9xl font-bold leading-[0.85] tracking-tighter text-white">
              CRAFT <br />
              <span className="text-zinc-800 hover:text-orange-500 transition-colors duration-500 uppercase">Wildly.</span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-lg leading-relaxed italic mx-auto lg:mx-0">
            "Transforming complex logic into <span className="text-white font-normal">stunning visual experiences</span>."
          </p>

          <div className="flex justify-center lg:justify-start pt-6">
            <button className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-[0.4em] group">
              <span className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              View our Work
            </button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE GRID */}
        <div className="relative h-[600px] md:h-[800px] w-full flex gap-4 md:gap-10 justify-center lg:justify-end items-center overflow-hidden">
          
          {/* TOP FADE MASK (Optimized for Mobile) */}
          <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
          
          {/* BOTTOM FADE MASK (Optimized for Mobile) */}
          <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />

          {/* GRID */}
          <div className="flex gap-4 md:gap-10 rotate-0">
            <ScrollingColumn items={COLUMN_1} yTransform={yColumn1} />
            <ScrollingColumn items={COLUMN_2} yTransform={yColumn2} />
          </div>
        </div>

      </div>
    </section>
  );
}