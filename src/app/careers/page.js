'use client';
import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowRight, Plus, Circle } from 'lucide-react';
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

  const jobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      dept: 'Engineering',
      type: 'Remote',
      fee: '$120k - $160k',
      about:
        'We value clean code and deep thinkers. You will be building user-centric interfaces using Next.js and Go.',
      qualifications: "Bachelor's in CS or equivalent experience.",
      experience: '3+ years in production-level environments.',
      skills: ['Next.js', 'TypeScript', 'Golang', 'PostgreSQL'],
    },
    {
      id: 2,
      title: 'Brand Designer',
      dept: 'Creative',
      type: 'New York',
      fee: '$90k - $130k',
      about:
        'Crafting visual stories that resonate globally. You will lead our brand evolution across all digital touchpoints.',
      qualifications: 'Degree in Design, Fine Arts, or Visual Communication.',
      experience: '2+ years at a creative agency or startup.',
      skills: ['Figma', 'Adobe CC', 'Motion Graphics', 'Typography'],
    },
    {
      id: 3,
      title: 'Product Strategist',
      dept: 'Operations',
      type: 'Hybrid',
      fee: '$110k - $140k',
      about:
        'Bridging the gap between vision and execution. We need someone who loves organization and complex problem solving.',
      qualifications: 'MBA or degree in Business/Product Management.',
      experience: '4+ years in product ownership or strategy.',
      skills: [
        'Market Research',
        'Agile',
        'Stakeholder Management',
        'Data Analytics',
      ],
    },
  ];

  const internships = [
    {
      id: 101,
      title: 'React Intern',
      dept: 'Engineering',
      type: 'Remote',
      fee: 'Paid',
      about:
        'A 6-month journey into production-level React development alongside senior mentors.',
      qualifications:
        'Current student or recent graduate in a technical field.',
      experience: 'Academic projects or personal GitHub portfolio.',
      skills: ['React Basics', 'JavaScript ES6+', 'Tailwind CSS', 'Git'],
    },
    {
      id: 102,
      title: 'Design Intern',
      dept: 'Creative',
      type: 'Remote',
      fee: 'Paid',
      about:
        'Learn the intersection of UI design and brand identity in a fast-paced environment.',
      qualifications:
        'Proficiency in visual design tools and a strong portfolio.',
      experience: 'Passion for UI/UX and self-driven design projects.',
      skills: ['Figma', 'Layout Design', 'Prototyping', 'Color Theory'],
    },
  ];

  const list = activeTab === 'jobs' ? jobs : internships;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] pt-32 pb-40 font-sans selection:bg-orange-500/30">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <h1 className="text-7xl md:text-[110px] font-light leading-[0.85] tracking-tighter mb-10 text-white">
              Build <br />{' '}
              <span className="italic font-serif text-orange-500/90">
                Beyond.
              </span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed font-light">
              We don't follow trends; we set the rhythm. Join a collective
              dedicated to the art of meaningful digital experiences.
            </p>
          </motion.div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex p-1.5 bg-zinc-900/50 backdrop-blur-md rounded-full border border-white/5">
              {['jobs', 'internship'].map(t => (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTab(t);
                    router.push(`/careers?type=${t}`, { scroll: false });
                  }}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeTab === t
                      ? 'bg-white text-black shadow-xl'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {t === 'jobs' ? 'Roles' : 'Interns'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Circle size={8} className="fill-orange-600 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Currently Accepting Applications
              </span>
            </div>
          </div>
        </div>

        {/* 2. Kinetic List Section */}
        <div className="border-t border-white/10">
          {list.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-white/10 overflow-hidden group"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full flex items-center justify-between py-12 text-left transition-all duration-700 ease-in-out"
              >
                <div className="flex items-center gap-6 md:gap-16">
                  <span className="text-xs font-mono text-zinc-700 mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2
                    className={`text-3xl md:text-6xl font-light tracking-tight transition-all duration-500 ${expandedId === item.id ? 'text-orange-500 italic pl-4' : 'text-white group-hover:pl-4 group-hover:text-orange-200'}`}
                  >
                    {item.title}
                  </h2>
                </div>
                <div className="flex items-center gap-8">
                  <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600">
                    {item.dept}
                  </span>
                  <div
                    className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${expandedId === item.id ? 'rotate-45 bg-white text-black' : 'group-hover:scale-110'}`}
                  >
                    <Plus size={20} strokeWidth={1.5} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="pb-16 pt-4 px-6 md:px-32 border-l border-orange-500/30 ml-2 md:ml-20">
                      <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">
                              About the Role
                            </h4>
                            <p className="text-lg text-zinc-400 font-light leading-relaxed">
                              {item.about}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">
                              Qualifications
                            </h4>
                            <p className="text-zinc-400 font-light leading-relaxed">
                              {item.qualifications}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">
                              Experience
                            </h4>
                            <p className="text-zinc-400 font-light leading-relaxed">
                              {item.experience}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">
                              Core Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 rounded-sm border border-white/5 bg-white/[0.02] text-[9px] uppercase tracking-widest text-zinc-500"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-white/5">
                        <div className="flex gap-4">
                          <span className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-zinc-300">
                            {item.type}
                          </span>
                          <span className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-zinc-300">
                            {item.fee}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedJob(item.title);
                            setIsFormOpen(true);
                          }}
                          className="group/btn relative px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            Apply Now <ArrowRight size={16} />
                          </span>
                          <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* 3. Footer CTA */}
        <div className="mt-40 grid md:grid-cols-2 gap-20 py-20 border-t border-white/5">
          <div>
            <p className="text-3xl font-light text-white mb-6 tracking-tight">
              Don’t see your fit?
            </p>
            <p className="text-zinc-500 text-lg font-light leading-relaxed mb-8">
              We are always looking for people who see the world differently.
              Send a spontaneous application and tell us what you're passionate
              about.
            </p>
            <a
              href="mailto:careers@codewild.tech"
              className="text-orange-500 font-medium hover:text-white transition-colors border-b border-orange-500/20 pb-1"
            >
              careers@codewild.tech
            </a>
          </div>
          <div className="flex flex-col justify-between items-start md:items-end opacity-40">
            <div className="text-right">
              <p className="text-[10px] tracking-[0.5em] font-black mb-2 uppercase">
                Integrity / Craft / Empathy
              </p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                Culture Manifesto v.2026
              </p>
            </div>
            <p className="text-[10px] text-zinc-700 mt-10 tracking-widest uppercase">
              CodeWild® 2026 All rights reserved.
            </p>
          </div>
        </div>

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
  <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
    <CareersContent />
  </Suspense>
);

export default CareersPage;
