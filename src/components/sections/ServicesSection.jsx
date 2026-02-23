'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Cloud, Layout, Zap } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Web Platforms',
    desc: 'Architecting high-performance, SEO-optimized web applications using Next.js.',
    icon: <Globe size={40} />,
    color: 'from-orange-500/20 to-orange-600/5',
    tags: ['SaaS', 'Next.js']
  },
  {
    id: '02',
    title: 'Mobile Ecosystems',
    desc: 'Native and cross-platform mobile solutions for seamless experiences.',
    icon: <Smartphone size={40} />,
    color: 'from-blue-500/20 to-blue-600/5',
    tags: ['React Native', 'iOS']
  },
  {
    id: '03',
    title: 'Cloud Systems',
    desc: 'Secure, auto-scaling cloud architecture designed to handle millions.',
    icon: <Cloud size={40} />,
    color: 'from-purple-500/20 to-purple-600/5',
    tags: ['AWS', 'Serverless']
  },
  {
    id: '04',
    title: 'UI/UX Design',
    desc: 'Beautiful interfaces that are conversion-optimized and accessible.',
    icon: <Layout size={40} />,
    color: 'from-emerald-500/20 to-emerald-600/5',
    tags: ['Figma', 'UX']
  }
];

const HorizontalServices = () => {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mobile-la cards konjam chinathaa irukkum, so range adjust panrom
  // Desktop: move -70%, Mobile: move -82% (to accommodate CTA card)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-82%" : "-70%"]
  );

  return (
    <section id="services" ref={targetRef} className="relative h-[400vh] bg-[#050505]">
      {/* Sticky Container - Intha container thaan screen-la lock aagi nikkum */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Background Watermark */}
        <div className="absolute top-20 left-10 opacity-[0.02] select-none pointer-events-none">
          <h2 className="text-[25vw] font-black leading-none uppercase">Expertise</h2>
        </div>

        {/* Title Section */}
        <div className="flex flex-col px-8 md:px-12 absolute top-16 md:top-24 z-30">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 md:w-12 h-[2px] bg-orange-500" />
            <span className="text-orange-500 font-mono tracking-widest text-[10px] md:text-sm uppercase">Our Expertise</span>
          </motion.div>
          <h3 className="text-4xl md:text-7xl font-black text-white mt-2 md:mt-4 tracking-tighter">
            WHAT WE <span className="text-zinc-800 outline-text">DO.</span>
          </h3>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-8 md:px-12 mt-16 md:mt-24">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} isMobile={isMobile} />
          ))}

          {/* Last CTA Card */}
          <div className="flex-shrink-0 w-[300px] md:w-[450px] h-[450px] md:h-[550px] flex flex-col justify-center items-center bg-orange-500 rounded-[2.5rem] p-10 text-black text-center group cursor-pointer shadow-2xl">
            <Zap size={60} className="mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8 uppercase italic">Ready to <br /> scale?</h2>
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 group-hover:scale-110 transition-transform">
              Let's Talk <ArrowUpRight size={22} />
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #27272a;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

const ServiceCard = ({ service, isMobile }) => {
  return (
    <div className={`relative flex-shrink-0 ${isMobile ? 'w-[300px] h-[450px]' : 'w-[450px] h-[550px]'} overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br ${service.color} p-8 md:p-12 flex flex-col justify-between group hover:border-zinc-500 transition-all duration-500`}>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="p-3 md:p-4 bg-zinc-900/80 rounded-2xl text-orange-500 border border-white/5 backdrop-blur-sm">
            {service.icon}
          </div>
          <span className="font-mono text-zinc-700 text-xl md:text-2xl font-bold">{service.id}</span>
        </div>

        <h3 className="text-3xl md:text-5xl font-extrabold text-white mt-8 md:mt-12 tracking-tight leading-none">{service.title}</h3>
        <p className="text-zinc-400 mt-4 md:mt-6 text-base md:text-xl font-light leading-relaxed">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {service.tags.map(tag => (
          <span key={tag} className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] bg-white/5 text-zinc-300 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Background Icon Detail */}
      <div className="absolute -bottom-6 -right-6 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 rotate-[-15deg]">
        {React.cloneElement(service.icon, { size: 200 })}
      </div>
    </div>
  );
};

export default HorizontalServices;