'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Web Development',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800',
  },
  {
    id: 2,
    title: 'UI/UX Designing',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800',
  },
  {
    id: 3,
    title: 'App Development',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
  },
  {
    id: 5,
    title: 'Graphic Designing',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const duplicatedServices = [...services, ...services];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="services"
      className="relative bg-[#E5E5E5] min-h-screen flex flex-col py-10 md:py-16 overflow-hidden font-sans"
    >
      {/* Background Dots */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Header */}
      <div className="relative z-20 px-6 md:px-16 lg:px-24 mb-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
          (Services)
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-8">
          What we do
        </h2>

        <div className="flex flex-wrap items-center border-t border-black/5 pt-6 gap-8">
          {['Web Design', 'Brand Design', 'Logo Design'].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400"
            >
              {item === 'Brand Design' && (
                <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full" />
              )}
              <span className={item === 'Brand Design' ? 'text-black' : ''}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <motion.div
            animate={{ x: '-50%' }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32"
          >
            {duplicatedServices.map((service, index) => (
              <div key={index} className="flex items-center gap-16 md:gap-32">
                <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black uppercase tracking-tighter text-[#FF4D00]">
                  {service.title}
                </h1>
                <span className="text-2xl md:text-5xl text-[#FF4D00] opacity-20">
                  ×
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fixed Image Box - Simple & Clean */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
          <div className="relative w-full max-w-[300px] md:max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-zinc-200">
            <AnimatePresence mode="sync">
              <motion.div
                key={services[activeIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }} // Slow smooth cross-fade
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={services[activeIndex].img}
                  alt={services[activeIndex].title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-8 text-white">
                  <p className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-70 mb-1">
                    0{services[activeIndex].id}
                  </p>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight">
                    {services[activeIndex].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
