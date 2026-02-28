'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
  Globe,
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

  const progress = (step / 3) * 100;

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Required';
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phone) newErrors.phone = 'Required';
    } else if (currentStep === 2) {
      if (!formData.resumeUrl) newErrors.resumeUrl = 'Link required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) setStep(prev => prev + 1); };
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-white rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto md:min-h-[600px]"
        >
          {/* ─── SIDEBAR / HEADER (Mobile: Top, Desktop: Left) ─── */}
          <div className="w-full md:w-72 bg-orange-600 p-6 md:p-10 text-white shrink-0 relative overflow-hidden">
            <div className="relative z-10 flex md:flex-col justify-between h-full">
              <div>
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">Apply Now</h2>
                <p className="text-orange-200 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mt-1 opacity-80">{jobTitle}</p>
              </div>

              {/* Progress Tracker - Horizontal on Mobile, Vertical on Desktop */}
              <div className="flex md:flex-col gap-3 md:gap-6 mt-2 md:mt-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                      step >= i ? 'bg-white text-orange-600 border-white' : 'border-white/30 text-white/30'
                    }`}>
                      {step > i ? <CheckCircle2 size={12} /> : i}
                    </div>
                    <div className={`hidden md:block text-[10px] uppercase tracking-widest font-bold ${step >= i ? 'text-white' : 'text-white/30'}`}>
                      Step {i}
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion % (Desktop only) */}
              <div className="hidden md:block mt-auto pt-10">
                <div className="text-[10px] uppercase tracking-widest text-orange-200/50 font-bold mb-1">Progress</div>
                <div className="text-3xl font-black">{Math.round(progress)}%</div>
              </div>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-700 md:hidden">
                <motion.div className="h-full bg-white" animate={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* ─── FORM CONTENT AREA ─── */}
          <div className="flex-1 bg-white p-6 md:p-12 relative flex flex-col overflow-y-auto custom-scrollbar">
            <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-zinc-300 hover:text-orange-500 transition-colors z-20">
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <div className="mb-8">
                    <h3 className="text-zinc-900 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Portfolio'}
                      {step === 3 && 'The Pitch'}
                    </h3>
                  </div>

                  <div className="space-y-4 md:space-y-6 flex-1">
                    {step === 1 && (
                      <div className="grid grid-cols-1 gap-4">
                        <CustomInput label="Name" name="fullName" icon={<User size={18} />} value={formData.fullName} onChange={handleChange} error={errors.fullName} placeholder="Your name" />
                        <CustomInput label="Email" name="email" type="email" icon={<Mail size={18} />} value={formData.email} onChange={handleChange} error={errors.email} placeholder="email@example.com" />
                        <CustomInput label="Phone" name="phone" type="tel" icon={<Phone size={18} />} value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="+91..." />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid grid-cols-1 gap-4">
                        <CustomInput label="Portfolio Link" name="portfolio" icon={<Globe size={18} />} value={formData.portfolio} onChange={handleChange} error={errors.portfolio} placeholder="https://..." />
                        <CustomInput label="Resume Link" name="resumeUrl" icon={<LinkIcon size={18} />} value={formData.resumeUrl} onChange={handleChange} error={errors.resumeUrl} placeholder="Drive/Dropbox link" />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-black ml-1">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={window?.innerWidth < 768 ? 6 : 4}
                          className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl p-4 text-sm focus:outline-none focus:border-orange-500 transition-all resize-none shadow-sm"
                          placeholder="Why you?"
                        />
                      </div>
                    )}
                  </div>

                  {/* NAV BUTTONS (Sticky at bottom on mobile) */}
                  <div className="mt-8 pt-4 border-t border-zinc-50 flex items-center justify-between">
                    {step > 1 ? (
                      <button onClick={prevStep} className="text-zinc-400 hover:text-zinc-900 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-2">
                        <ChevronLeft size={16} /> Back
                      </button>
                    ) : <div />}

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={step < 3 ? nextStep : handleSubmit}
                      disabled={status === 'loading'}
                      className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${
                        step === 3 ? 'bg-orange-500 text-white' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : (step === 3 ? 'Submit' : 'Next')}
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f4f4f5; border-radius: 10px; }
      `}</style>
    </AnimatePresence>
  );
};

const CustomInput = ({ label, icon, error, ...props }) => (
  <div className="space-y-1.5 md:space-y-2 group">
    <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400 font-black ml-1 group-focus-within:text-orange-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-zinc-300 group-focus-within:text-orange-500'}`}>
        {icon}
      </div>
      <input
        {...props}
        className={`w-full bg-zinc-50 border-2 rounded-xl md:rounded-2xl pl-12 pr-4 py-3 md:py-4 text-sm text-zinc-900 placeholder:text-zinc-300 focus:outline-none transition-all ${
          error ? 'border-red-100 bg-red-50/30' : 'border-zinc-100 focus:border-orange-500'
        }`}
      />
    </div>
    {error && <p className="text-[9px] text-red-500 font-bold ml-1 flex items-center gap-1"><AlertCircle size={10} /> {error}</p>}
  </div>
);

const SuccessState = () => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
    <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-orange-500/20"><Sparkles size={36} /></div>
    <h4 className="text-2xl font-black text-zinc-900 mb-2 uppercase tracking-tighter">Sent!</h4>
    <p className="text-zinc-500 text-sm max-w-[200px] font-medium">We'll get back to you soon.</p>
  </motion.div>
);

export default JobApplicationForm;