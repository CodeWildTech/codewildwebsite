'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Search,
  PenTool,
  Terminal,
  Rocket,
  Plus,
  Quote,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const team = [
    {
      name: 'J Pradheesh',
      role: 'Founder & Lead Architect',
      img: '/team1.jpg',
      code: 'CWT-01',
    },
    {
      name: 'Saran Kumar',
      role: 'Systems Engineer',
      img: '/team2.jpg',
      code: 'CWT-02',
    },
    {
      name: 'Dinesh Raj',
      role: 'UI/UX Strategist',
      img: '/team3.jpg',
      code: 'CWT-03',
    },
    {
      name: 'Ananya Rao',
      role: 'Fullstack Dev',
      img: '/team4.jpg',
      code: 'CWT-04',
    },
  ];

  const duplicatedTeam = [...team, ...team];

  const processes = [
    {
      step: '01',
      title: 'Discovery',
      desc: 'Understanding vision through deep research.',
      icon: <Search size={24} />,
    },
    {
      step: '02',
      title: 'Design',
      desc: 'Crafting intuitive high-end interfaces.',
      icon: <PenTool size={24} />,
    },
    {
      step: '03',
      title: 'Develop',
      desc: 'Building scalable systems with clean code.',
      icon: <Terminal size={24} />,
    },
    {
      step: '04',
      title: 'Deploy',
      desc: 'Launching high-performance products.',
      icon: <Rocket size={24} />,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-40 bg-[#050505] text-white overflow-hidden relative"
    >
      {/* ─── ENHANCED ORANGE MIXED GRADIENT BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[80%] bg-orange-950/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.03)_0%,_transparent_70%)]" />
      </div>

      {/* ─── LARGE DECORATIVE TEXT ─── */}
      <motion.div
        style={{ x: xMove }}
        className="absolute top-20 left-0 whitespace-nowrap pointer-events-none select-none z-0"
      >
        <span className="text-[20vw] font-black text-orange-500/[0.03] uppercase leading-none">
          Innovation • Purpose • Execution •
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ─── THE STORY BLOCK ─── */}
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-40">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-orange-500">
                <Plus size={16} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
                  About CodeWild
                </span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                WE TRANSFORM <br />
                <span className="text-zinc-800 transition-colors duration-500 hover:text-orange-500 cursor-default">
                  IDEAS INTO
                </span>{' '}
                <br />
                SYSTEMS.
              </h2>
            </motion.div>
          </div>
          <div className="lg:w-1/3">
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed border-l border-orange-500/30 pl-8">
              CodeWild Tech is a specialized engineering studio. We don't follow
              trends; we set the architectural standards for the next generation
              of digital products.
            </p>
          </div>
        </div>

        {/* ─── LEADERSHIP MESSAGES (RESIZED) ─── */}
        <div className="space-y-28 mb-40 max-w-6xl mx-auto">
          {/* FOUNDER BLOCK */}
          <div className="grid lg:grid-cols-10 gap-8 items-center">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl"
              >
                <img
                  src="/founder.jpg"
                  alt="Founder"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold tracking-tight text-xl uppercase">
                    J PRADHEESH
                  </p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">
                    Founder{' '}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-6 lg:pl-10">
              <Quote
                className="text-orange-500/10 mb-4"
                size={48}
                strokeWidth={1}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.2] text-zinc-300 mb-6">
                  "Digital complexity requires{' '}
                  <span className="text-white font-bold">
                    technical clarity
                  </span>
                  . We build products that solve problems today while remaining{' '}
                  <span className="text-orange-500">scalable</span>."
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed font-light max-w-lg">
                  Our philosophy is rooted in engineering excellence. We believe
                  that a product's beauty is found in its logic and its ability
                  to withstand rapid growth.
                </p>
                <div className="h-px w-16 bg-orange-600/50 mt-6" />
              </motion.div>
            </div>
          </div>

          {/* CO-FOUNDER BLOCK (Reverse Layout) */}
          <div className="grid lg:grid-cols-10 gap-8 items-center">
            <div className="lg:col-span-6 lg:pr-10 order-2 lg:order-1">
              <div className="flex justify-end lg:block">
                <Quote
                  className="text-orange-500/10 mb-4 rotate-180"
                  size={48}
                  strokeWidth={1}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-right lg:text-left"
              >
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.2] text-zinc-300 mb-6">
                  "Architecture is about{' '}
                  <span className="text-white font-bold">resilience</span>. Our
                  systems are designed to be invisible—performing perfectly
                  under pressure."
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed font-light max-w-lg ml-auto lg:ml-0">
                  We bridge the gap between systems engineering and user
                  interaction. We ensure that every line of code serves a
                  purpose and every architecture serves the future.
                </p>
                <div className="flex justify-end lg:block">
                  <div className="h-px w-16 bg-orange-600/50 mt-6" />
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[5/6] rounded-xl overflow-hidden border border-white/5 group shadow-2xl"
              >
                <img
                  src="/team2.jpg"
                  alt="Co-Founder"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 lg:left-auto lg:right-6 text-left lg:text-right">
                  <p className="text-white font-bold tracking-tight text-xl uppercase">
                    SARAN KUMAR
                  </p>
                  <p className="text-orange-500 text-[9px] uppercase tracking-[0.3em] font-bold">
                    Co-Founder{' '}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── MODERN REDESIGNED TEAM SHOWCASE ─── */}
        <div className="mb-60">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <h3 className="text-orange-500 text-[10px] uppercase tracking-[0.5em] font-bold mb-4">
                Our Collective
              </h3>
              <h2 className="text-6xl md:text-7xl font-bold tracking-tighter">
                THE <span className="text-zinc-800">CWT</span> SQUAD
              </h2>
            </div>
            <div className="h-[1px] hidden md:block flex-1 bg-zinc-900 mx-12 mb-4" />
            <p className="text-zinc-500 text-sm italic font-serif">
              Engineering excellence in motion.
            </p>
          </div>

          <div className="relative flex overflow-hidden group">
            <motion.div
              className="flex gap-16 pr-16"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
              whileHover={{ animationPlayState: 'paused' }}
            >
              {duplicatedTeam.map((member, i) => (
                <div
                  key={i}
                  className="relative w-[320px] md:w-[380px] group/card shrink-0"
                >
                  <span className="absolute -left-8 top-10 -rotate-90 text-[10px] font-mono text-zinc-700 tracking-[0.3em] uppercase group-hover/card:text-orange-500 transition-colors">
                    {member.code}
                  </span>
                  <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 border border-white/5 transition-all duration-700 group-hover/card:rounded-none group-hover/card:border-orange-500/50 group-hover/card:shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover aspect-[4/5] grayscale transition-all duration-1000 group-hover/card:grayscale-0 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-700">
                        <h4 className="text-2xl font-bold tracking-tighter uppercase">
                          {member.name}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-orange-500 text-[10px] uppercase tracking-widest font-mono">
                            {member.role}
                          </p>
                          <div className="flex gap-3">
                            <Linkedin
                              size={14}
                              className="hover:text-orange-500 cursor-pointer"
                            />
                            <Github
                              size={14}
                              className="hover:text-orange-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500/0 group-hover/card:border-orange-500/100 transition-all duration-700 delay-100 rounded-tr-[2rem] group-hover/card:rounded-none" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── THE PROCESS (Clean Line Layout) ─── */}
        <div className="relative pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-orange-500/50 font-bold">
              The Process
            </h3>
            <div className="hidden md:block h-[1px] flex-1 bg-white/5 mx-10" />
            <p className="text-zinc-500 text-xs italic font-serif opacity-40">
              A systematic approach to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/5">
            {processes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="relative p-10 group border-b border-white/5 lg:border-b-0 lg:border-r last:border-r-0 hover:bg-orange-500/[0.02] transition-colors duration-500"
              >
                <div className="flex justify-between items-start mb-20">
                  <span className="text-xs font-mono text-zinc-700 group-hover:text-orange-500 transition-colors">
                    {item.step}
                  </span>
                  <div className="text-zinc-600 group-hover:text-orange-500 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold tracking-tight uppercase group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── MINIMAL CAPABILITIES LIST ─── */}
        <div className="mt-40 flex flex-wrap gap-x-20 gap-y-10">
          {['Modern Architecture', 'Scalable Systems', 'Custom UI/UX'].map(
            (feat, idx) => (
              <div key={idx} className="flex items-baseline gap-4 group">
                <span className="text-orange-500 text-lg group-hover:scale-150 transition-transform">
                  /
                </span>
                <span className="text-2xl font-medium tracking-tight text-zinc-500 group-hover:text-white transition-colors cursor-default">
                  {feat}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
