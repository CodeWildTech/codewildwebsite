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
  ArrowRight,
  X,
  Mail,
  Briefcase
} from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  // ─── DATA ───
  const team = [
    { name: 'J Pradheesh', role: 'Founder & Lead Architect', img: '/founder.jpg', bio: 'Visionary tech leader with deep expertise in scalable systems and cloud architecture. Passionate about building products that solve real-world problems.', linkedin: '#', email: 'pradheesh@codewild.com', expertise: ['System Architecture', 'Cloud Solutions', 'Team Leadership'] },
    { name: 'ASWIN', role: 'Co-Founder', img: '/aswin.png', bio: 'Strategic thinker driving business growth and technical innovation. Focused on bridging complex engineering with seamless user experiences.', linkedin: '#', email: 'aswin@codewild.com', expertise: ['Business Strategy', 'Product Management', 'Tech Innovation'] },
    { name: 'James Andrew', role: 'Fullstack Dev', img: '/james.png', bio: 'Fullstack engineer specializing in modern web technologies. Crafts clean, performant code with a keen eye for user experience.', linkedin: '#', email: 'james@codewild.com', expertise: ['React / Next.js', 'Node.js', 'Database Design'] },
    { name: 'Praveen Kumar', role: 'Fullstack Dev', img: '/praveen.png', bio: 'Versatile developer with a passion for building robust backend systems and interactive frontend interfaces.', linkedin: '#', email: 'praveen@codewild.com', expertise: ['Frontend Dev', 'API Design', 'DevOps'] },
    { name: 'Amritha', role: 'BDE', img: '/team5.jpg', bio: 'Dynamic business development executive driving client relationships and identifying growth opportunities across markets.', linkedin: '#', email: 'amritha@codewild.com', expertise: ['Client Relations', 'Market Analysis', 'Proposal Strategy'] },
    { name: 'Ashna', role: 'HR', img: '/team6.jpg', bio: 'People-first HR professional focused on building a strong team culture, talent acquisition, and employee engagement.', linkedin: '#', email: 'ashna@codewild.com', expertise: ['Talent Acquisition', 'Team Culture', 'Employee Engagement'] },
  ];

  const processes = [
    { step: '01', title: 'Discovery', desc: 'Understanding vision through deep research and stakeholder alignment.', icon: <Search size={24} /> },
    { step: '02', title: 'Design', desc: 'Crafting intuitive high-end interfaces with a focus on user psychology.', icon: <PenTool size={24} /> },
    { step: '03', title: 'Develop', desc: 'Building scalable systems with clean code and robust architecture.', icon: <Terminal size={24} /> },
    { step: '04', title: 'Deploy', desc: 'Launching high-performance products with continuous monitoring.', icon: <Rocket size={24} /> },
  ];

  const duplicatedTeam = [...team, ...team];

  // ─── ANIMATION LOGIC ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Fixed: Added smoothProgress to resolve the build error
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
                SYSTEMS
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
          {/* Founder */}
          <div className="grid lg:grid-cols-10 gap-8 items-center">
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} onClick={() => setSelectedMember(team[0])} className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl cursor-pointer">
                <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-xl uppercase">J PRADHEESH</p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">Founder</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-3 py-1 text-[10px] text-orange-400 font-medium">View Profile</div>
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

          {/* Co-Founder */}
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
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} onClick={() => setSelectedMember(team[1])} className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl cursor-pointer">
                <img src="/aswin.png" alt="Co-Founder" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-xl uppercase">ASWIN</p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">Co-Founder</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-3 py-1 text-[10px] text-orange-400 font-medium">View Profile</div>
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
                <div key={i} onClick={() => setSelectedMember(member)} className="relative flex-shrink-0 w-[280px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group/card cursor-pointer">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover/card:translate-y-0 transition-all duration-500">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-orange-500 text-[11px] uppercase tracking-widest font-medium mb-4">{member.role}</p>
                    <div className="flex items-center gap-3">
                      <Linkedin size={20} className="text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer" />
                      <span className="text-zinc-600 text-[10px] uppercase tracking-widest">Tap for Profile</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          </div>
        </div>

        {/* ─── THE NEW WORKFLOW (MODERN RE-DESIGN) ─── */}
        <div className="relative pb-32 max-w-7xl mx-auto px-6">
          {/* Header Section - More Compact */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] uppercase tracking-[0.6em] text-orange-500 font-black mb-3"
              >
                The Workflow
              </motion.h3>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                Engineered <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>Precision</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-[280px] font-light text-xs md:text-sm italic border-l border-zinc-800 pl-4 mb-1">
              Every line of code and every pixel is a deliberate step toward excellence.
            </p>
          </div>

          {/* Animated Linear Flow Section */}
          <div className="relative max-w-5xl mx-auto">

            {/* The Scroll-Linked Connector Line - Better Mobile Position */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-900/50 -translate-x-1/2 overflow-hidden">
              <motion.div
                style={{ scaleY: smoothProgress, originY: 0 }}
                className="w-full h-full bg-gradient-to-b from-orange-500 via-orange-400 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.5)]"
              />
            </div>

            <div className="space-y-24 md:space-y-32">
              {processes.map((item, i) => (
                <div key={i} className="relative flex items-center group">

                  <div className={`flex flex-col md:flex-row items-start md:items-center w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* Text Content Area - Responsive Sizing */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-20 md:pl-0`}
                    >
                      <span className="text-orange-500 font-mono text-[10px] tracking-[0.3em] mb-2 block uppercase opacity-80">Phase {item.step}</span>
                      <h4 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-500">
                        {item.title}
                      </h4>
                      <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-sm md:max-w-none ml-0 ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}">
                        {item.desc}
                      </p>
                    </motion.div>

                    {/* The Animated Node (Icon) - Perfectly Aligned */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                      <motion.div
                        whileInView={{ scale: [0.8, 1.1, 1], opacity: [0, 1] }}
                        viewport={{ once: true }}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-500"
                      >
                        <div className="scale-75 md:scale-100 group-hover:text-orange-500 transition-colors">
                          {item.icon}
                        </div>
                        {/* Pulse Effect for Active Step */}
                        <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>

                    {/* Spacer for desktop layout */}
                    <div className="hidden md:block w-[45%]" />
                  </div>

                  {/* Ghost Number - Scaled Down for Classiness */}
                  <div className={`absolute top-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-white/[0.015] pointer-events-none select-none -z-10 transition-all duration-700 group-hover:text-orange-500/[0.03] ${i % 2 === 0 ? 'right-0' : 'left-0'}`}>
                    {item.step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── PROFILE POPUP MODAL ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedMember(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/5"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>

              {/* Header with Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={selectedMember.img}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.4em] font-bold mb-1">{selectedMember.role}</p>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{selectedMember.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Bio */}
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  {selectedMember.bio}
                </p>

                {/* Expertise Tags */}
                {selectedMember.expertise && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-3">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[11px] text-orange-400 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="h-[1px] bg-white/5" />

                {/* Contact Links */}
                <div className="flex items-center gap-4">
                  {selectedMember.linkedin && (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-orange-500 hover:border-orange-500/30 transition-all text-sm">
                      <Linkedin size={16} />
                      <span className="text-xs font-medium">LinkedIn</span>
                    </a>
                  )}
                  {selectedMember.email && (
                    <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-orange-500 hover:border-orange-500/30 transition-all text-sm">
                      <Mail size={16} />
                      <span className="text-xs font-medium">Email</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default AboutSection;