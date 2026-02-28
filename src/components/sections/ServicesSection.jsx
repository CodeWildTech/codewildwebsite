'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, Cloud, Layout, Zap, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { services as serviceData } from '@/data/services';

const iconMap = {
  '01': <Globe size={28} />,
  '02': <Smartphone size={28} />,
  '03': <Cloud size={28} />,
  '04': <Layout size={28} />,
};

const colorMap = {
  '01': 'hover:border-orange-500/30',
  '02': 'hover:border-blue-500/30',
  '03': 'hover:border-purple-500/30',
  '04': 'hover:border-emerald-500/30',
};

const services = serviceData.map(s => ({
  ...s,
  icon: iconMap[s.id],
  color: colorMap[s.id],
}));

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

  // FIXED: Increased the negative translation for mobile so all cards pass through
  const xTranslate = useTransform(
    scrollYProgress,
    [0.3, 1], 
    ["0%", isMobile ? "-180%" : "-75%"] 
  );
  const x = useSpring(xTranslate, { stiffness: 50, damping: 20 });

  return (
    <section id="services" ref={targetRef} className="relative h-[600vh] bg-[#020202]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        
        {/* --- HEADER --- */}
        <div className="container mx-auto px-8 md:px-16 mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-orange-500" />
            <span className="text-orange-500 font-mono tracking-[0.3em] text-[10px] uppercase font-bold">
              Expertise
            </span>
          </motion.div>

          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
            <span className="block">Precision</span>
            <span className="block opacity-60 font-medium">Solutions</span>
          </h3>
        </div>

        {/* --- HORIZONTAL TRACK --- */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-8 md:px-16 items-center">
          {services.map((service, index) => (
            <ServiceCard 
                key={service.id} 
                service={service} 
                isMobile={isMobile} 
                index={index} 
                total={services.length}
                scrollYProgress={scrollYProgress} 
            />
          ))}

          <CTACard scrollYProgress={scrollYProgress} isMobile={isMobile} />
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, isMobile, index, total, scrollYProgress }) => {
  const router = useRouter();
  
  const entranceStart = (index * 0.05); 
  const entranceEnd = entranceStart + 0.15;

  const cardX = useTransform(scrollYProgress, [0, entranceStart, entranceEnd], [isMobile ? 300 : 600, isMobile ? 300 : 600, 0]);
  const scale = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [entranceStart, entranceEnd], [0, 1]);

  return (
    <motion.div
      onClick={() => router.push(`/services/${service.slug}`)}
      style={{ scale, opacity, x: cardX }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className={`relative flex-shrink-0 ${isMobile ? 'w-[280px] h-[360px]' : 'w-[340px] h-[400px]'} 
      overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-xl 
      p-8 md:p-10 flex flex-col justify-between group cursor-pointer ${service.color}`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 flex items-center justify-center bg-zinc-950/50 rounded-2xl text-white border border-white/5 group-hover:text-orange-500 group-hover:border-orange-500/30 transition-all duration-500">
            {service.icon}
          </div>
          <span className="font-mono text-zinc-800 text-2xl font-black transition-colors group-hover:text-orange-500/10">
            {service.id}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed line-clamp-3 group-hover:text-zinc-300 transition-colors">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between">
        <div className="flex flex-wrap gap-2">
          {service.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-zinc-600 border border-white/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-600 group-hover:border-orange-500 transition-all duration-500">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

const CTACard = ({ scrollYProgress, isMobile }) => {
    const cardX = useTransform(scrollYProgress, [0.2, 0.35], [isMobile ? 300 : 600, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.35], [0.7, 1]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

    return (
        <motion.div 
            style={{ scale, opacity, x: cardX }}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 w-[280px] md:w-[340px] h-[360px] md:h-[400px] flex flex-col justify-between bg-orange-500 rounded-[2.5rem] p-8 md:p-12 group cursor-pointer"
        >
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Zap size={24} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-6 text-black tracking-tighter uppercase">
                READY TO <br /> SCALE?
              </h2>
              <button className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2">
                Let's Talk <ArrowUpRight size={18} />
              </button>
            </div>
        </motion.div>
    );
}

export default HorizontalServices;