'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  Globe,
  Cpu,
  Sparkles,
  Zap,
  Award,
  MoveRight,
} from 'lucide-react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth Parallax Effects
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.95]), {
    stiffness: 100,
    damping: 30,
  });

  const stats = [
    {
      label: 'Success Rate',
      value: '98%',
      desc: 'Client satisfaction across 4 continents.',
      icon: <Globe className="w-5 h-5 text-orange-500" />,
    },
    {
      label: 'Active Projects',
      value: '12+',
      desc: 'Bespoke digital solutions in development.',
      icon: <Code2 className="w-5 h-5 text-blue-500" />,
    },
    {
      label: 'Expert Team',
      value: '20+',
      desc: 'World-class engineers and designers.',
      icon: <Cpu className="w-5 h-5 text-purple-500" />,
    },
  ];

  const team = [
    {
      name: 'James',
      role: 'CEO',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    },
    {
      name: 'Stark',
      role: 'FullStack',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600',
    },
    {
      name: 'Anitha',
      role: 'Mobile Lead',
      image:
        'https://images.unsplash.com/photo-1494790778202-cad84cf45f1d?w=600',
    },
    {
      name: 'Vikram',
      role: 'DevOps',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505] text-white selection:bg-orange-500 font-sans overflow-hidden"
    >
      {/* --- MINIMALIST BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div
          style={{ scale, opacity: opacityTransform }}
          className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                The New Era of Design
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              DIGITAL <br />
              <span className="text-orange-500 italic">ARCHITECTURE.</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-md font-light leading-relaxed mb-10">
              We don't just build websites. We engineer immersive digital
              experiences that define the next decade of the web.
            </p>

            <div className="flex gap-6">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                Start Building <MoveRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editorial Image Stack */}
          <div className="relative h-[500px] hidden lg:block">
            <motion.div
              style={{ y: yTransform }}
              className="absolute right-0 top-0 w-2/3 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800"
                className="w-full h-full object-cover"
                alt="Studio"
              />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute left-0 bottom-0 w-1/2 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 z-10"
            >
              <div className="p-8 h-full flex flex-col justify-end">
                <Zap className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold">
                  Ultra-Fast <br /> Delivery
                </h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- BENTO STATS SECTION --- */}
      <section className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 transition-colors"
            >
              <div className="mb-6">{stat.icon}</div>
              <h2 className="text-5xl font-bold mb-2">{stat.value}</h2>
              <h4 className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              THE <span className="text-zinc-600 italic">CORE</span>
            </h2>
            <p className="max-w-xs text-zinc-400 text-sm">
              A hand-picked team of specialists dedicated to pushing technical
              boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/5"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    alt={member.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 p-6 w-full">
                  <p className="text-orange-500 font-mono text-[10px] tracking-widest uppercase mb-1">
                    {member.role}
                  </p>
                  <h4 className="text-xl font-bold">{member.name}</h4>
                  <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-zinc-400">
                      VIEW PROFILE
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-orange-500 p-16 md:p-24 rounded-[3rem] text-black relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-20">
              <Zap size={200} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 relative z-10">
              HAVE AN IDEA? <br /> LET'S EXECUTE.
            </h2>
            <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform relative z-10">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
