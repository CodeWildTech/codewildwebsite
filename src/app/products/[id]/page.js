'use client';
import React, { use } from 'react';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductDetailsPage = ({ params }) => {
  let id;
  if (params && params.then) {
    id = use(params).id;
  } else {
    id = params?.id;
  }

  const router = useRouter();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            Product Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 pt-32 pb-20 relative overflow-hidden selection:bg-orange-500/30">
      {/* 1. ELITE BACKGROUND MESH */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* BACK NAVIGATION */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors mb-16 group text-sm font-medium uppercase tracking-widest"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Catalog
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* 2. LEFT COLUMN: CONTENT ENGINE */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                <Zap size={12} fill="currentColor" />
                {product.category}
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter text-white">
                {product.name}
              </h1>

              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-10 max-w-2xl">
                {product.details.headline}
              </p>

              <div className="h-[1px] w-20 bg-orange-500 mb-10" />

              <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl">
                {product.details.content}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-5">
                <button className="px-10 py-5 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Start Integration
                  <ArrowRight size={20} />
                </button>
                <button className="px-10 py-5 border border-zinc-800 text-zinc-300 font-medium rounded-xl hover:border-white hover:text-white transition-all">
                  Read Docs
                </button>
              </div>
            </motion.div>

            {/* 3. DYNAMIC STATS SECTION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/5"
            >
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Uptime
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt; 30ms</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Latency
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  Support
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4. RIGHT COLUMN: FEATURE CARD & VISUALS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 sticky top-32"
          >
            <div className="relative group">
              {/* Animated Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-orange-500/20 to-transparent rounded-[32px] pointer-events-none" />

              <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-10 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-orange-500" />
                  Technical Capabilities
                </h3>

                <div className="space-y-4">
                  {product.details.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="group/item flex items-center justify-between p-4 rounded-2xl bg-white/0 hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all"
                    >
                      <span className="text-zinc-300 font-medium">
                        {feature}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Check size={14} className="text-orange-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ABSTRACT DATA VISUAL */}
                <div className="mt-10 rounded-2xl overflow-hidden bg-black/40 border border-white/5 p-6 relative">
                  <div className="flex justify-between items-end gap-1 h-20">
                    {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 1 + i * 0.1 }}
                        className="w-full bg-gradient-to-t from-orange-500/5 to-orange-500/40 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
                    <span>System Load</span>
                    <span className="text-orange-500/50 underline">
                      Optimized
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM BADGE */}
            <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest">
                <Globe size={14} /> GLOBAL EDGE
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="text-xs font-bold tracking-widest">ISO 27001</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
