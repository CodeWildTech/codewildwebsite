'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Standard Plan',
    price: '500$',
    description:
      'Ideal for lean teams or startups needing clean, fast design delivery for websites or branding assets.',
    features: [
      'You provide the wireframe',
      'Visual design using Figma & Framer',
      'Focused on website or branding only',
      'Weekday turnaround (Mon-Fri)',
    ],
    bgColor: 'bg-[#F3F3F3]',
    textColor: 'text-black',
    accent: 'bg-zinc-200',
    icon: <Sparkles className="w-5 h-5 text-zinc-500" />,
  },
  {
    id: 2,
    title: 'Premium Plan',
    price: '$1000',
    description:
      'A complete design experience — tailored strategy, polished visuals, and flexible collaboration throughout the process.',
    features: [
      'Help shaping your wireframe or brief',
      'Custom design for website, brand, or logo',
      'High-fidelity mockups using Figma & Framer',
      'Dedicated weekday focus & deeper involvement',
    ],
    bgColor: 'bg-black',
    textColor: 'text-white',
    accent: 'bg-zinc-800',
    icon: <Zap className="w-5 h-5 text-[#FF4D00]" />,
    isPremium: true,
  },
  {
    id: 3,
    title: 'Enterprise Plan',
    price: 'Custom',
    description:
      'For established businesses looking for a long-term design partner to handle complex systems and high-volume needs.',
    features: [
      'Unlimited design requests',
      'Dedicated Art Director',
      'Priority Slack support',
      'Design system management',
    ],
    bgColor: 'bg-zinc-900',
    textColor: 'text-white',
    accent: 'bg-zinc-800',
    icon: <Shield className="w-5 h-5 text-blue-400" />,
  },
];

function Card({ plan, index, totalCards }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Scale down the card as next card comes in
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0.95 - index * 0.02]
  );

  // Move up slightly as next card overlays
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, -20 * (index + 1)]
  );

  // Slight rotation for depth
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -2]);

  // Calculate the top position - each card sits slightly higher
  const topOffset = 80 + index * 20;

  return (
    <div
      ref={cardRef}
      className="sticky h-screen flex items-start justify-center pt-20"
      style={{
        top: `${topOffset}px`,
        zIndex: totalCards - index,
      }}
    >
      <motion.div
        style={{
          scale,
          y,
          rotateX,
          transformPerspective: 1200,
        }}
        className={`relative w-full max-w-5xl h-[550px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ${plan.bgColor} ${plan.textColor} border border-black/5 p-8 md:p-14 flex flex-col md:flex-row gap-10 mx-4`}
      >
        {/* Premium Gradient Overlay */}
        {plan.isPremium && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(circle at bottom right, #FF4D00 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Animated corner decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className={`absolute top-8 right-8 w-16 h-16 rounded-full ${plan.isPremium ? 'bg-[#FF4D00]/10' : 'bg-black/5'} blur-xl`}
        />

        {/* Left Side Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`${plan.accent} w-12 h-12 rounded-xl flex items-center justify-center mb-8 shadow-lg`}
            >
              {plan.icon}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              {plan.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm leading-relaxed max-w-[320px]"
            >
              {plan.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-t border-current/10 pt-6"
          >
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">
              Estimated Start
            </p>
            <p className="text-sm font-medium">Within 1-2 business days</p>
          </motion.div>
        </div>

        {/* Right Side Pricing & Features */}
        <div className="relative z-10 flex-1 flex flex-col justify-between md:border-l md:border-current/10 md:pl-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-xs opacity-60 mb-1">Starting at</p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                  className={`text-6xl md:text-7xl font-black tracking-tighter ${plan.isPremium ? 'text-[#FF4D00]' : ''}`}
                >
                  {plan.price}
                </motion.span>
                {plan.price !== 'Custom' && (
                  <span className="text-sm opacity-40">/project</span>
                )}
              </div>
            </motion.div>

            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.isPremium ? 'text-[#FF4D00]' : 'opacity-60'}`}
                  />
                  <span className="text-sm font-medium opacity-80">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.6 }}
            className={`mt-12 w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold text-sm ${
              plan.isPremium
                ? 'bg-[#FF4D00] text-white shadow-[0_10px_20px_-5px_rgba(255,77,0,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(255,77,0,0.5)]'
                : 'bg-zinc-800 text-white hover:bg-zinc-700 shadow-lg'
            }`}
          >
            Choose {plan.title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductScrollStack() {
  return (
    <div className="bg-[#E5E5E5] min-h-screen">
      {/* --- HEADER SECTION --- */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#FF4D00] font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Pricing & Plans
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-black"
          >
            Our Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Choose the perfect plan for your business. Scroll down to explore
            our specialized design solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 0.8 },
              y: {
                delay: 0.8,
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="mt-10"
          >
            <p className="text-[10px] uppercase tracking-widest font-bold">
              Scroll to explore
            </p>
            <motion.div
              className="w-px h-16 bg-black/20 mx-auto mt-4"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* --- STACKING CARDS CONTAINER --- */}
      <section className="relative pb-[200vh]">
        {products.map((plan, index) => (
          <Card
            key={plan.id}
            plan={plan}
            index={index}
            totalCards={products.length}
          />
        ))}
      </section>

      {/* Spacer for bottom padding */}
      <div className="h-screen bg-gradient-to-b from-transparent to-white/50" />
    </div>
  );
}
