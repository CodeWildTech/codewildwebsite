'use client';
import React, { useState, useEffect } from 'react';
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
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Link as LinkIcon,
  Sparkles,
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

  const validateStep = currentStep => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Name is required';
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = 'Invalid email address';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    } else if (currentStep === 2) {
      // Portfolio/LinkedIn is now optional, so we only validate format if text exists
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
    setTimeout(() => setStatus('success'), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Added p-4 to ensure it doesn't touch screen edges on mobile */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          /* Responsive Height: max-h-[90dvh] ensures padding around the modal on mobile */
          className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90dvh] md:max-h-none"
        >
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-orange-600 p-6 md:p-10 text-white shrink-0">
            <div className="flex flex-row md:flex-col justify-between items-center md:items-start h-full">
              <div>
                <h2 className="text-xl md:text-3xl font-bold leading-tight">
                  Apply
                </h2>
                <p className="text-orange-100 text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1">
                  {jobTitle}
                </p>
              </div>

              {/* Mobile Step Indicator (Dots) */}
              <div className="flex md:flex-col gap-2 md:gap-4 md:mt-10">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all ${step >= i ? 'bg-white scale-125' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 p-6 md:p-12 bg-zinc-950 overflow-y-auto custom-scrollbar relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <header>
                    <h3 className="text-white text-xl font-semibold">
                      {step === 1 && 'Personal Details'}
                      {step === 2 && 'Work & Portfolio'}
                      {step === 3 && 'Final Message'}
                    </h3>
                  </header>

                  <form className="space-y-5">
                    {step === 1 && (
                      <>
                        <CustomInput
                          label="Full Name"
                          name="fullName"
                          icon={<User size={16} />}
                          placeholder="Jane Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          error={errors.fullName}
                        />
                        <CustomInput
                          label="Email"
                          name="email"
                          type="email"
                          icon={<Mail size={16} />}
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                        <CustomInput
                          label="Phone"
                          name="phone"
                          type="tel"
                          icon={<Phone size={16} />}
                          placeholder="+1..."
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                        />
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <CustomInput
                          label="Portfolio / LinkedIn (Optional)"
                          name="portfolio"
                          icon={<Globe size={16} />}
                          placeholder="https://..."
                          value={formData.portfolio}
                          onChange={handleChange}
                          error={errors.portfolio}
                        />
                        <CustomInput
                          label="Resume URL (G-Drive/Link)"
                          name="resumeUrl"
                          type="file"
                          icon={<LinkIcon size={16} />}
                          placeholder="Public share link"
                          value={formData.resumeUrl}
                          onChange={handleChange}
                          error={errors.resumeUrl}
                        />
                      </>
                    )}

                    {step === 3 && (
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
                          Cover Note
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all resize-none"
                          placeholder="Tell us why you're a great fit..."
                        />
                      </div>
                    )}
                  </form>

                  <div className="pt-6 flex items-center justify-between gap-4">
                    {step > 1 ? (
                      <button
                        onClick={prevStep}
                        className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                      >
                        <ChevronLeft size={14} /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        onClick={nextStep}
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                      >
                        Next <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                        className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {status === 'loading' ? 'Sending...' : 'Submit'}
                        <Send size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CustomInput = ({ label, icon, error, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1 group-focus-within:text-orange-500 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-zinc-600 group-focus-within:text-orange-500'}`}
      >
        {icon}
      </div>
      <input
        {...props}
        className={`w-full bg-white/[0.03] border rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none transition-all ${
          error
            ? 'border-red-500/50'
            : 'border-white/10 focus:border-orange-500/50'
        }`}
      />
    </div>
    {error && (
      <p className="text-[10px] text-red-400 font-medium ml-1 flex items-center gap-1">
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

const SuccessState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="py-12 flex flex-col items-center text-center"
  >
    <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
      <Sparkles size={32} className="text-orange-500" />
    </div>
    <h4 className="text-2xl font-bold text-white mb-2">Success!</h4>
    <p className="text-zinc-500 text-sm max-w-[240px]">
      Application sent. We'll be in touch soon.
    </p>
  </motion.div>
);

export default JobApplicationForm;
