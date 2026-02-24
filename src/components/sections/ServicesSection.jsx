'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Cloud, Layout, Zap, Plus } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Web Platforms',
    desc: 'Architecting high-performance, SEO-optimized web applications using Next.js.',
    icon: <Globe size={32} />,
    color: 'hover:border-orange-500/50',
    tags: ['SaaS', 'Next.js']
  },
  {
    id: '02',
    title: 'Mobile Ecosystems',
    desc: 'Native and cross-platform mobile solutions for seamless experiences.',
    icon: <Smartphone size={32} />,
    color: 'hover:border-blue-500/50',
    tags: ['React Native', 'iOS']
  },
  {
    id: '03',
    title: 'Cloud Systems',
    desc: 'Secure, auto-scaling cloud architecture designed to handle millions.',
    icon: <Cloud size={32} />,
    color: 'hover:border-purple-500/50',
    tags: ['AWS', 'Serverless']
  },
  {
    id: '04',
    title: 'UI/UX Design',
    desc: 'Beautiful interfaces that are conversion-optimized and accessible.',
    icon: <Layout size={32} />,
    color: 'hover:border-emerald-500/50',
    tags: ['Figma', 'UX']
  }
];

const HorizontalServices = () => {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smoother scroll transition
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-85%" : "-65%"]
  );
  
  const x = useSpring(xTranslate, { stiffness: 100, damping: 20 });

  return (
    <section id="services" ref={targetRef} className="relative h-[400vh] bg-[#020202]">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">

        {/* --- HEADER SECTION --- */}
        {/* Increased top padding and clear separation from the cards */}
        <div className="container mx-auto px-8 md:px-16 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <Plus size={14} className="text-orange-500" />
            <span className="text-orange-500 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
              Engineering Expertise
            </span>
          </motion.div>
          
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            PRECISION <br />
            <span className="text-zinc-900 outline-text">SERVICES.</span>
          </h3>
        </div>

        {/* --- HORIZONTAL TRACK --- */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-8 md:px-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} isMobile={isMobile} />
          ))}

          {/* Last CTA Card - Minimalist Version */}
          <div className="flex-shrink-0 w-[300px] md:w-[450px] h-[400px] md:h-[500px] flex flex-col justify-between bg-orange-500 rounded-3xl p-10 md:p-14 group cursor-pointer shadow-2xl transition-transform duration-500 hover:scale-[0.98]">
            <Zap size={40} className="text-black" />
            <div>
              <h2 className="text-4xl md:text-6xl font-black leading-none mb-6 text-black tracking-tighter uppercase">
                READY TO <br /> SCALE?
              </h2>
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:gap-4">
                Let's Talk <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

const ServiceCard = ({ service, isMobile }) => {
  return (
    <div className={`relative flex-shrink-0 ${isMobile ? 'w-[320px] h-[400px]' : 'w-[450px] h-[500px]'} 
      overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-3xl 
      p-10 md:p-14 flex flex-col justify-between group transition-all duration-700 ${service.color}`}>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="w-16 h-16 flex items-center justify-center bg-zinc-950 rounded-2xl text-white border border-white/10 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-500">
            {service.icon}
          </div>
          <span className="font-mono text-zinc-800 text-3xl font-black transition-colors group-hover:text-orange-500/20">
            {service.id}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-sm md:text-lg font-light leading-relaxed max-w-[90%] group-hover:text-zinc-300 transition-colors">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {service.tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 border border-white/5 px-3 py-1 rounded-md group-hover:border-orange-500/20 group-hover:text-zinc-400 transition-all">
            {tag}
          </span>
        ))}
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default HorizontalServices;