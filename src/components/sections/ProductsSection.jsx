'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Plus,
  Clock,
  Hammer,
  Construction,
  Loader2,
} from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Standard UI Kit',
    status: 'Available Now',
    price: '500',
    description:
      'Our flagship design system is ready for deployment. High-fidelity assets for rapid scaling and consistent branding.',
    features: [
      '600+ Components',
      'Auto-Layout 5.0',
      'Dark Mode Ready',
      'Lifetime Updates',
    ],
    bgColor: 'bg-white',
    textColor: 'text-zinc-900',
    accent: 'bg-zinc-100',
    icon: <Sparkles className="w-5 h-5 text-zinc-500" />,
    isLive: true,
  },
  {
    id: 2,
    title: 'Premium Dash',
    status: 'Processing',
    progress: 65,
    price: '1000',
    description:
      'An advanced analytics dashboard engine currently undergoing final backend integration and UI polishing.',
    features: [
      'SaaS Boilerplate',
      'Chart.js Integration',
      'User Auth Flows',
      'Admin Panel',
    ],
    bgColor: 'bg-zinc-950',
    textColor: 'text-white',
    accent: 'bg-orange-500/20',
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    isPremium: true,
    isLive: false,
  },
  {
    id: 3,
    title: 'AI Design Bot',
    status: 'Coming Soon',
    progress: 25,
    price: 'Custom',
    description:
      'Our experimental neural network designed to automate wireframing. Currently in the architectural design phase.',
    features: [
      'Prompt-to-UI',
      'Style Injection',
      'SVG Generation',
      'API Access',
    ],
    bgColor: 'bg-zinc-900',
    textColor: 'text-white',
    accent: 'bg-blue-500/20',
    icon: <Shield className="w-5 h-5 text-blue-400" />,
    isLive: false,
  },
];

function Card({ plan, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });
  const scale = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    [0.85, 1, 1, 0.9]
  );
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -10]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen flex items-center justify-center py-2 md:py-10 perspective-1000 px-3 sm:px-4"
    >
      <motion.div
        style={{ scale, rotateX, opacity, transformPerspective: 1200 }}
        className={`relative w-full max-w-5xl h-auto md:h-[540px] max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden 
          ${plan.bgColor} ${plan.textColor} border border-white/10 shadow-2xl flex flex-col md:flex-row mx-auto 
          ${!plan.isLive ? 'ring-1 ring-white/5' : ''}`}
      >
        {/* LEFT: Identity */}
        <div className="md:w-[35%] p-5 sm:p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-current/5 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div
                className={`${plan.accent} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ring-1 ring-inset ring-white/10`}
              >
                {plan.icon}
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-current/20 
                ${plan.isLive ? 'bg-green-500 text-white border-transparent' : 'bg-current/10 opacity-60'}`}
              >
                {plan.status}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-2 md:mb-3 uppercase leading-none">
              {plan.title}
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm opacity-60 font-medium leading-relaxed">
              {plan.description}
            </p>
          </div>

          {!plan.isLive && (
            <div className="mt-4 md:mt-8 p-3 md:p-4 bg-current/5 rounded-2xl border border-current/5">
              <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase mb-1.5">
                <span className="opacity-40 flex items-center gap-1">
                  <Loader2 className="w-2.5 h-2.5 md:w-3 md:h-3 animate-spin" /> Progress
                </span>
                <span>{plan.progress}%</span>
              </div>
              <div className="w-full h-1 md:h-1.5 bg-current/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${plan.progress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className={`h-full ${plan.isPremium ? 'bg-orange-500' : 'bg-current'}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Bento Content */}
        <div className="md:w-[65%] p-4 sm:p-6 md:p-8 flex flex-col gap-3 md:gap-4 bg-current/[0.01] overflow-hidden">
          <div className="flex flex-row md:flex-row gap-3 md:gap-4 h-auto md:h-full">
            <div
              className={`flex-1 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-center border border-current/5 bg-current/[0.03]`}
            >
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-0.5 md:mb-1">
                {plan.isLive ? 'Access' : 'Projected'}
              </span>
              <div className="flex items-baseline gap-0.5">
                {plan.price !== 'Custom' && (
                  <span className="text-lg md:text-2xl font-bold opacity-30">$</span>
                )}
                <span className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter">
                  {plan.price}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-full rounded-2xl md:rounded-3xl flex flex-col items-center justify-center gap-1 transition-all duration-300 font-black text-[9px] md:text-xs uppercase tracking-widest border py-4
                  ${plan.isLive
                    ? plan.isPremium
                      ? 'bg-orange-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                      : 'bg-zinc-900 text-white border-transparent'
                    : 'bg-transparent border-current/20 text-current hover:bg-current/10'
                  }`}
              >
                {plan.isLive ? (
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
                ) : (
                  <Clock className="w-4 h-4 md:w-6 md:h-6" />
                )}
                <span className="mt-1">{plan.isLive ? 'Buy' : 'Waitlist'}</span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {plan.features.map((feature, i) => (
              <div
                key={i}
                className="bg-current/[0.03] border border-current/5 p-2.5 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${plan.isLive ? 'bg-green-500' : 'bg-zinc-500 opacity-30'}`}
                />
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-tight opacity-80 truncate">
                  {feature}
                </span>
              </div>
            ))}
            <div className="col-span-2 bg-current/[0.03] border border-current/5 p-2 md:p-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 opacity-40">
              <Construction className="w-3 h-3" />
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                Engineered for Excellence
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductScrollStack() {
  return (
    <div id="products" className="bg-[#050505] text-white selection:bg-orange-500/30 font-sans">
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <header className="min-h-[60vh] md:h-[80vh] flex flex-col items-center justify-center px-6 text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-orange-500 mb-4 md:mb-6 block">
            Product Ecosystem
          </span>
          <h1 className="text-5xl md:text-[130px] font-black tracking-tighter leading-[0.8] mb-6 md:mb-8 uppercase">
            Our
            <br />
            Products.
          </h1>
          <p className="text-zinc-400 text-sm md:text-xl font-medium leading-relaxed px-4">
            Explore our suite of high-performance design tools built for your next big idea.
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8 md:mt-12 opacity-20"
          >
            <div className="w-px h-10 md:h-12 bg-white mx-auto" />
          </motion.div>
        </motion.div>
      </header>

      <section className="relative h-[300vh] md:h-[350vh] max-w-7xl mx-auto">
        {products.map((plan, index) => (
          <Card key={plan.id} plan={plan} index={index} />
        ))}
      </section>
    </div>
  );
}