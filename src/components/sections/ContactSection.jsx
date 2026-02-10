'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Send,
  Code2,
  Cpu,
  Globe,
  Layout,
} from 'lucide-react';

const TechContactSection = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  });

  const totalSteps = 4;

  const handleNext = e => {
    e?.preventDefault();
    if (step < totalSteps) setStep(step + 1);
    else setIsSubmitted(true);
  };

  const techServices = [
    { id: 'dev', label: 'Software Dev', icon: <Code2 size={16} /> },
    { id: 'ai', label: 'AI & Data', icon: <Cpu size={16} /> },
    { id: 'cloud', label: 'Cloud Systems', icon: <Globe size={16} /> },
    { id: 'ux', label: 'Product Design', icon: <Layout size={16} /> },
  ];

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT SIDE: TECH STACK INFO */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="h-1 w-20 bg-orange-600" />
            <h2 className="text-7xl font-bold text-zinc-900 tracking-tighter leading-none">
              Deploy your <br />{' '}
              <span className="text-zinc-400">next big idea.</span>
            </h2>
            <p className="text-zinc-500 text-xl font-light max-w-md">
              Expert-led engineering for companies that demand high-performance
              digital infrastructure.
            </p>
          </div>

          {/* SERVICE TAGS */}
          <div className="flex flex-wrap gap-3">
            {techServices.map(s => (
              <div
                key={s.id}
                className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-xs font-bold text-zinc-400 uppercase tracking-widest"
              >
                {s.icon} {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: MODERN FORM CARD */}
        <div className="relative group">
          <motion.div
            layout
            className="bg-[#0a0a0a] rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* PROGRESS HEADER */}
            <div className="flex justify-between items-center mb-16">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(num => (
                  <div
                    key={num}
                    className={`h-1 transition-all duration-500 ${step >= num ? 'w-8 bg-orange-600' : 'w-4 bg-zinc-800'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Section 0{step}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="min-h-[280px] flex flex-col justify-center"
                >
                  <h3 className="text-4xl font-bold text-white tracking-tight mb-8">
                    {step === 1 && 'Which service do you need?'}
                    {step === 2 && "What's your name?"}
                    {step === 3 && 'Where can we reach you?'}
                    {step === 4 && 'Tell us about the project'}
                  </h3>

                  <div className="relative">
                    {step === 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {techServices.map(s => (
                          <button
                            key={s.id}
                            onClick={() =>
                              setFormData({ ...formData, service: s.label })
                            }
                            className={`p-4 rounded-xl border text-left transition-all ${formData.service === s.label ? 'bg-orange-600 border-orange-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                          >
                            <span className="text-xs font-bold uppercase tracking-tight">
                              {s.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    {step === 2 && (
                      <input
                        autoFocus
                        type="text"
                        placeholder="Full name"
                        className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
                      />
                    )}
                    {step === 3 && (
                      <input
                        autoFocus
                        type="email"
                        placeholder="email@address.com"
                        className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
                      />
                    )}
                    {step === 4 && (
                      <textarea
                        autoFocus
                        rows="3"
                        placeholder="Briefly describe your requirements..."
                        className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl text-white outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700 resize-none"
                      />
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[280px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                    <Check size={32} className="text-white" strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    Project Received
                  </h3>
                  <p className="text-zinc-500 mt-2">
                    Engineering team will review and contact you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT/NEXT BUTTON */}
            {!isSubmitted && (
              <div className="absolute bottom-10 right-10">
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group"
                >
                  {step === totalSteps ? (
                    <Send
                      size={24}
                      className="text-orange-600 group-hover:rotate-12 transition-transform"
                    />
                  ) : (
                    <ArrowUpRight
                      size={24}
                      className="text-orange-600 group-hover:rotate-45 transition-transform"
                    />
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechContactSection;
