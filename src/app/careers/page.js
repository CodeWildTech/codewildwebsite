'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown, Circle, Globe, Zap, Heart, Shield, Coffee, Monitor, Sparkles, Upload } from 'lucide-react';
import JobApplicationForm from '@/components/forms/JobApplicationForm';

const CareersContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('type') === 'internship' ? 'internship' : 'jobs'
  );
  const [expandedId, setExpandedId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch('/api/admin/jobs').then(r => r.json()).then(data => setJobs(data.filter(j => j.status === 'open'))).catch(() => { });
    fetch('/api/admin/internships').then(r => r.json()).then(data => setInternships(data.filter(i => i.status === 'open'))).catch(() => { });
  }, []);

  const perks = [
    { label: "Remote-First", detail: "Work from anywhere in the world." },
    { label: "Setup Stipend", detail: "$3,000 for your home office gear." },
    { label: "Annual Retreats", detail: "Paid week-long team summits globally." },
    { label: "Health & Wellness", detail: "Comprehensive premium insurance." }
  ];

  const environment = [
    { icon: <Monitor size={20} />, title: "Deep Work Culture", desc: "We protect your focus time. Fewer meetings, more building, and asynchronous communication." },
    { icon: <Sparkles size={20} />, title: "The Sharpest Tools", desc: "We provide the latest M3 Max MacBooks and any software you need to perform at your peak." },
    { icon: <Coffee size={20} />, title: "Balanced Rhythm", desc: "Burnout is the enemy of craft. We respect your weekends and encourage actual time off." }
  ];

  const list = activeTab === 'jobs' ? jobs : internships;

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-200 pt-32 pb-40 font-sans selection:bg-orange-500/30">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* 1. Header Section */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-orange-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">Careers</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-8">
              Work with us.
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed font-normal">
              Join a collective of designers and engineers dedicated to the art of meaningful digital experiences.
              We are remote-first, craft-focused, and currently hiring.
            </p>
          </motion.div>
        </header>

        {/* 2. Environment Section */}
        <section className="mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {environment.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-orange-500/30 transition-colors"
              >
                <div className="text-orange-500 mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. Open Roles Section */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-2">Open Positions</h2>
              <p className="text-zinc-500 text-sm">Explore our current opportunities.</p>
            </div>

            <div className="inline-flex p-1 bg-zinc-900 border border-white/10 rounded-xl">
              {['jobs', 'internship'].map(t => (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTab(t);
                    router.push(`/careers?type=${t}`, { scroll: false });
                  }}
                  className={`px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                  {t === 'jobs' ? 'Full-Time' : 'Interns'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {list.map((item) => (
              <motion.div
                layout
                key={item.id}
                className={`group border border-white/5 rounded-2xl transition-all duration-500 ${expandedId === item.id ? 'bg-zinc-900/40 border-white/10' : 'hover:border-white/10 hover:bg-zinc-900/20'
                  }`}
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-orange-500/80 font-bold">
                      {item.dept}
                    </span>
                    <h2 className="text-xl md:text-3xl font-medium text-white transition-colors">
                      {item.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      <Circle size={6} className="fill-emerald-500 text-emerald-500" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">{item.type}</span>
                    </div>
                    <div className={`p-2 rounded-full bg-zinc-800 transition-transform duration-500 ${expandedId === item.id ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} className="text-zinc-400" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-10 pt-4 border-t border-white/5">
                        <div className="grid lg:grid-cols-3 gap-16 mt-8">
                          <div className="lg:col-span-2 space-y-10">
                            <div>
                              <h4 className="text-xs uppercase tracking-[0.3em] text-white font-bold mb-4">The Role</h4>
                              <p className="text-zinc-400 text-lg leading-relaxed font-normal">{item.about}</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-10">
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.3em] text-white font-bold mb-4">Requirements</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.qualifications}</p>
                              </div>
                              <div>
                                <h4 className="text-xs uppercase tracking-[0.3em] text-white font-bold mb-4">Experience</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.experience}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-10">
                            <div>
                              <h4 className="text-xs uppercase tracking-[0.3em] text-white font-bold mb-5">Tech Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.skills.map((skill, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-zinc-800/50 border border-white/10 rounded-md text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="pt-6 border-t border-white/5">
                              <p className="text-xs text-zinc-500 mb-6 font-medium tracking-wide">Compensation: {item.fee}</p>
                              <button
                                onClick={() => {
                                  setSelectedJob(item.title);
                                  setIsFormOpen(true);
                                }}
                                className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
                              >
                                Apply for this role <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Perks & Hiring Process Section */}
        <section className="mt-40 grid lg:grid-cols-5 gap-20">
          <div className="lg:col-span-3">
            <h3 className="text-3xl font-semibold text-white mb-12">Benefits & Perks</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {perks.map((perk, i) => (
                <div key={i} className="p-8 bg-zinc-900/40 border border-white/5 rounded-2xl hover:border-white/20 transition-colors">
                  <p className="text-white font-semibold text-lg mb-2">{perk.label}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{perk.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-zinc-900/60 p-10 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Shield size={120} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-10">Our Process</h3>
            <div className="space-y-10">
              {[
                { step: "01", title: "Review", desc: "Analysis of your past work and portfolio." },
                { step: "02", title: "Culture Sync", desc: "A conversation about values and vision." },
                { step: "03", title: "Practical", desc: "A brief, paid real-world project task." },
                { step: "04", title: "Finalize", desc: "Founders meet and final offer details." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 relative">
                  {i !== 3 && <div className="absolute left-[7px] top-7 bottom-[-28px] w-[1px] bg-white/10" />}
                  <div className="w-[15px] h-[15px] rounded-full bg-orange-500 mt-1 z-10 border-4 border-[#0d0d0d]" />
                  <div>
                    <p className="text-white font-bold text-sm tracking-wide">{item.title}</p>
                    <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Footer CTA - Spontaneous Application with Resume */}
        <footer className="mt-48 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h3 className="text-3xl font-semibold text-white mb-6">Unsolicited Genius?</h3>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed font-normal">
              If you don't see a role that fits but believe you belong here, send us your story and resume.
              We always make room for exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <button
                onClick={() => {
                  setSelectedJob("Spontaneous Application");
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
              >
                <Upload size={14} /> Spontaneous Application
              </button>
              <a href="mailto:careers@codewild.tech" className="text-orange-500 font-bold text-sm uppercase tracking-widest border-b-2 border-orange-500/20 pb-1 hover:text-white hover:border-white transition-all">
                or email us
              </a>
            </div>
          </div>
          <div className="md:text-right space-y-2 pt-2">
            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">Integrity / Craft / Empathy</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-700">© 2026 CodeWild® Studio. All rights reserved.</p>
          </div>
        </footer>

        <JobApplicationForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          jobTitle={selectedJob}
        />
      </div>
    </div>
  );
};

const CareersPage = () => (
  <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
    <CareersContent />
  </Suspense>
);

export default CareersPage;