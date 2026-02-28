'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Link as LinkIcon,
  Sparkles,
  Loader2,
} from 'lucide-react';

const JobApplicationForm = ({
  isOpen,
  onClose,
  jobTitle = 'Senior Developer',
}) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    resumeUrl: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Animation Variants for fields
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const validateStep = currentStep => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Name is required';
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = 'Invalid email address';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    } else if (currentStep === 2) {
      if (formData.portfolio && !/^https?:\/\/.+/.test(formData.portfolio))
        newErrors.portfolio = 'Must be a valid URL (https://...)';
      if (!formData.resumeUrl) newErrors.resumeUrl = 'Resume link is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
  };

  if (!isOpen) return null;

  const progress = (step / 3) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop with stronger blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-white border border-white/20 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row min-h-[500px]"
        >
          {/* ─── LEFT SIDEBAR (Premium Orange) ─── */}
          <div className="w-full md:w-80 bg-orange-600 p-8 md:p-12 text-white shrink-0 relative overflow-hidden flex flex-col justify-between">
            {/* Animated Background Gradients */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/20 blur-[60px] rounded-full" 
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12"
              >
                <div className="h-1 w-12 bg-white/40 mb-6 rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black leading-tight uppercase tracking-tighter">
                  Join The <br /> Squad
                </h2>
                <p className="text-orange-100 text-[10px] uppercase tracking-[0.3em] font-bold opacity-70 mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {jobTitle}
                </p>
              </motion.div>

              {/* Progress Tracker */}
              <div className="space-y-8">
                {[
                  { id: 1, label: 'Identify' },
                  { id: 2, label: 'Showcase' },
                  { id: 3, label: 'Connect' }
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-4 group">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                      step >= s.id ? 'bg-white text-orange-600 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/20 text-white/40'
                    }`}>
                      {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${step >= s.id ? 'text-white' : 'text-white/30'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] uppercase tracking-widest text-orange-200/50 font-bold mb-2">Completion</div>
              <div className="text-4xl font-black">{Math.round(progress)}%</div>
            </div>
          </div>

          {/* ─── RIGHT FORM AREA (Clean White) ─── */}
          <div className="flex-1 p-8 md:p-14 bg-white relative flex flex-col overflow-y-auto max-h-[80vh] md:max-h-[650px] custom-scrollbar">
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-zinc-300 hover:text-orange-500 hover:rotate-90 transition-all duration-300 z-10 p-2"
            >
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <motion.div
                  key={step}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="flex flex-col h-full"
                >
                  <header className="mb-10">
                    <motion.span variants={itemVariants} className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                      Step 0{step}
                    </motion.span>
                    <motion.h3 variants={itemVariants} className="text-zinc-900 text-3xl font-black uppercase tracking-tighter">
                      {step === 1 && 'Who are you?'}
                      {step === 2 && 'Your Proof of work'}
                      {step === 3 && 'The Final Pitch'}
                    </motion.h3>
                  </header>

                  <div className="space-y-6 flex-1">
                    {step === 1 && (
                      <>
                        <motion.div variants={itemVariants}>
                          <CustomInput
                            label="Full Name"
                            name="fullName"
                            icon={<User size={18} />}
                            placeholder="e.g. Alex Carter"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <CustomInput
                            label="Email Address"
                            name="email"
                            type="email"
                            icon={<Mail size={18} />}
                            placeholder="alex@codewild.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <CustomInput
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            icon={<Phone size={18} />}
                            placeholder="+91..."
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                          />
                        </motion.div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <motion.div variants={itemVariants}>
                          <CustomInput
                            label="Portfolio / Website"
                            name="portfolio"
                            icon={<Globe size={18} />}
                            placeholder="https://yourwork.com"
                            value={formData.portfolio}
                            onChange={handleChange}
                            error={errors.portfolio}
                          />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <CustomInput
                            label="Resume Share Link"
                            name="resumeUrl"
                            icon={<LinkIcon size={18} />}
                            placeholder="Google Drive / Dropbox link"
                            value={formData.resumeUrl}
                            onChange={handleChange}
                            error={errors.resumeUrl}
                          />
                        </motion.div>
                      </>
                    )}

                    {step === 3 && (
                      <motion.div variants={itemVariants} className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-black ml-1">
                          Brief Introduction
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-[1.5rem] p-5 text-sm text-zinc-900 focus:outline-none focus:border-orange-500 transition-all resize-none placeholder:text-zinc-300 shadow-sm"
                          placeholder="What makes you a CodeWild engineer?"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-12 flex items-center justify-between">
                    {step > 1 ? (
                      <motion.button
                        whileHover={{ x: -5 }}
                        onClick={prevStep}
                        className="text-zinc-400 hover:text-zinc-900 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-3 px-2 py-2"
                      >
                        <ChevronLeft size={16} /> Previous
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={step < 3 ? nextStep : handleSubmit}
                      disabled={status === 'loading'}
                      className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-lg ${
                        step === 3 ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === 'loading' ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : step === 3 ? (
                          <>Send Application <Send size={16} /></>
                        ) : (
                          <>Continue <ChevronRight size={16} /></>
                        )}
                      </span>
                      {/* Button Hover Shine */}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shine {
          from { left: -100%; }
          to { left: 200%; }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f4f4f5;
          border-radius: 10px;
        }
      `}</style>
    </AnimatePresence>
  );
};

const CustomInput = ({ label, icon, error, ...props }) => (
  <div className="space-y-3 group">
    <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-black ml-1 group-focus-within:text-orange-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          error ? 'text-red-500' : 'text-zinc-300 group-focus-within:text-orange-500 group-focus-within:scale-110'
        }`}
      >
        {icon}
      </div>
      <input
        {...props}
        className={`w-full bg-zinc-50 border-2 rounded-2xl pl-14 pr-6 py-4 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-all shadow-sm ${
          error
            ? 'border-red-100 bg-red-50/30'
            : 'border-zinc-100 focus:border-orange-500 focus:bg-white focus:shadow-orange-500/5'
        }`}
      />
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -5 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1.5"
      >
        <AlertCircle size={12} /> {error}
      </motion.p>
    )}
  </div>
);

const SuccessState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full flex flex-col items-center justify-center text-center py-10"
  >
    <div className="relative mb-8">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 relative z-10"
      >
        <Sparkles size={40} />
      </motion.div>
      {/* Decorative rings */}
      <div className="absolute inset-0 border-2 border-orange-500/20 rounded-3xl animate-ping scale-150 opacity-20" />
    </div>
    
    <h4 className="text-3xl font-black text-zinc-900 mb-4 uppercase tracking-tighter">Application Received</h4>
    <p className="text-zinc-500 text-sm max-w-[280px] font-medium leading-relaxed">
      You've taken the first step toward building the future. Our team will review your profile and reach out within 48 hours.
    </p>
  </motion.div>
);

export default JobApplicationForm;