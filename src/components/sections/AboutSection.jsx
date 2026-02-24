'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Search,
  PenTool,
  Terminal,
  Rocket,
  Plus,
  Quote,
  Linkedin,
  ArrowRight
} from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // ─── DATA ───
  const team = [
    { name: 'J Pradheesh', role: 'Founder & Lead Architect', img: '/team1.jpg' },
    { name: 'SARAN KUMAR', role: 'Co-Founder', img: '/team2.jpg' },
    { name: 'James Andrew', role: 'Fullstack Dev', img: '/team3.jpg' },
    { name: 'Praveen Kumar', role: 'Fullstack Dev', img: '/team4.jpg' },
    { name: 'Amritha', role: 'BDE', img: '/team5.jpg' },
    { name: 'Ashna', role: 'HR', img: '/team6.jpg' },
  ];

  const processes = [
    { step: '01', title: 'Discovery', desc: 'Understanding vision through deep research and stakeholder alignment.', icon: <Search size={24} />, color: '#f97316' },
    { step: '02', title: 'Design', desc: 'Crafting intuitive high-end interfaces with a focus on user psychology.', icon: <PenTool size={24} />, color: '#3b82f6' },
    { step: '03', title: 'Develop', desc: 'Building scalable systems with clean code and robust architecture.', icon: <Terminal size={24} />, color: '#a855f7' },
    { step: '04', title: 'Deploy', desc: 'Launching high-performance products with continuous monitoring.', icon: <Rocket size={24} />, color: '#10b981' },
  ];

  const duplicatedTeam = [...team, ...team];

  // ─── ANIMATION LOGIC ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section id="about" ref={containerRef} className="bg-[#050505] text-white overflow-hidden relative">
      
      {/* ─── BACKGROUND GRADIENTS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[80%] bg-orange-950/15 blur-[120px] rounded-full" />
      </div>

      {/* ─── DECORATIVE MARQUEE TEXT ─── */}
      <motion.div style={{ x: xMove }} className="absolute top-20 left-0 whitespace-nowrap pointer-events-none select-none z-0">
        <span className="text-[20vw] font-black text-orange-500/[0.03] uppercase leading-none">
          Innovation • Purpose • Execution •
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40">
        {/* ─── THE STORY BLOCK ─── */}
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-40">
          <div className="lg:w-2/3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 text-orange-500 mb-8">
                <Plus size={16} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">About CodeWild</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                WE TRANSFORM <br />
                <span className="text-zinc-800 transition-colors duration-500 hover:text-orange-500 cursor-default">IDEAS INTO</span> <br />
                SYSTEMS.
              </h2>
            </motion.div>
          </div>
          <div className="lg:w-1/3">
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed border-l border-orange-500/30 pl-8">
              CodeWild Tech is a specialized engineering studio. We don't follow trends; we set the architectural standards for the next generation of digital products.
            </p>
          </div>
        </div>

        {/* ─── LEADERSHIP MESSAGES ─── */}
        <div className="space-y-40 mb-60 max-w-6xl mx-auto">
          {/* Founder - Image Left, Content Right */}
          <div className="grid lg:grid-cols-10 gap-8 items-center">
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl">
                <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-xl uppercase">J PRADHEESH</p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">Founder</p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-6 lg:pl-10">
              <Quote className="text-orange-500/10 mb-4" size={48} strokeWidth={1} />
              <h3 className="text-2xl md:text-4xl font-medium text-zinc-300 mb-6">
                "Digital complexity requires <span className="text-white font-bold">technical clarity</span>. We build products that solve problems today while remaining <span className="text-orange-500">scalable</span>."
              </h3>
            </div>
          </div>

          {/* Co-Founder - Content Left, Image Right */}
          <div className="grid lg:grid-cols-10 gap-8 items-center">
             <div className="lg:col-span-6 lg:pr-10 order-2 lg:order-1">
                <div className="flex justify-start lg:justify-end">
                  <Quote className="text-orange-500/10 mb-4 rotate-180" size={48} strokeWidth={1} />
                </div>
                <h3 className="text-2xl md:text-4xl font-medium text-zinc-300 mb-6 lg:text-right">
                  "Our mission is to bridge the gap between <span className="text-white font-bold">complex engineering</span> and <span className="text-orange-500">seamless user experience</span>."
                </h3>
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl">
                <img src="/team2.jpg" alt="Co-Founder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-xl uppercase">SARAN KUMAR</p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">Co-Founder</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── TEAM MARQUEE ─── */}
        <div className="mb-60">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter">THE <span className="text-zinc-800 transition-colors hover:text-orange-500">CWT</span> SQUAD</h2>
            <p className="text-zinc-500 text-sm font-mono">[ 06 Core Members ]</p>
          </div>
          <div className="relative flex overflow-hidden">
            <motion.div className="flex gap-6 pr-6" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, ease: "linear", repeat: Infinity }}>
              {duplicatedTeam.map((member, i) => (
                <div key={i} className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group/card">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover/card:translate-y-0 transition-all duration-500">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-orange-500 text-[11px] uppercase tracking-widest font-medium mb-4">{member.role}</p>
                    <Linkedin size={20} className="text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer" />
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          </div>
        </div>

        {/* ─── THE NEW WORKFLOW (MODERN RE-DESIGN) ─── */}
        <div className="relative pb-60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.8em] text-orange-500 font-black mb-4">The Workflow</h3>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                Engineered <br /> <span className="text-zinc-900 outline-text-white">Precision</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-xs font-light text-sm italic border-l border-zinc-800 pl-4">
              Every line of code and every pixel is a deliberate step toward excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {processes.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                className="group relative p-10 rounded-[2rem] bg-zinc-900/30 border border-white/5 overflow-hidden transition-all duration-500 hover:bg-zinc-900/50 hover:border-orange-500/30 cursor-crosshair"
              >
                {/* Step Number Background */}
                <div className="absolute -top-4 -right-4 text-8xl font-black text-white/[0.02] group-hover:text-orange-500/[0.05] transition-colors">
                  {item.step}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center text-orange-500 border border-white/10 mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.desc}
                  </p>

                  <div className="mt-8 overflow-hidden h-1 w-0 group-hover:w-full bg-orange-500 transition-all duration-700" />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Bottom Connectivity Line (Desktop Only) */}
          <div className="hidden md:flex justify-between px-20 mt-10 opacity-20">
             {[1, 2, 3].map(dot => (
               <div key={dot} className="flex-1 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500 to-transparent mx-4" />
               </div>
             ))}
             <div className="w-2 h-2 rounded-full bg-orange-500" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text-white { -webkit-text-stroke: 1px rgba(255,255,255,0.1); color: transparent; }
      `}</style> 
    </section>
  );
};

export default AboutSection;