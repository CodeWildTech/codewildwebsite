'use client';
import React, { use } from 'react';
import { services } from '@/data/services';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Globe,
    Smartphone,
    Cloud,
    Layout,
    Zap,
    Layers,
    ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const iconMap = {
    'website': <Globe size={32} />,
    'web-application': <Smartphone size={32} />,
    'app-development': <Cloud size={32} />,
    'ui-ux-design': <Layout size={32} />,
};

const ServiceDetailPage = ({ params }) => {
    let slug;
    if (params && params.then) {
        slug = use(params).slug;
    } else {
        slug = params?.slug;
    }

    const router = useRouter();
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 tracking-tighter">
                        Service Not Found
                    </h1>
                    <p className="text-zinc-500 mb-8">The service you're looking for doesn't exist.</p>
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

    const { details } = service;

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 pt-32 pb-20 relative overflow-hidden selection:bg-orange-500/30">
            {/* BACKGROUND EFFECTS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
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
                    Back
                </motion.button>

                {/* HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Service Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                                <Zap size={12} fill="currentColor" />
                                Service — {service.id}
                            </div>

                            {/* Title */}
                            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter text-white">
                                {service.title}
                            </h1>

                            {/* Headline */}
                            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-10 max-w-2xl">
                                {details.headline}
                            </p>

                            <div className="h-[1px] w-20 bg-orange-500 mb-10" />

                            {/* Content */}
                            <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl">
                                {details.content}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-5">
                                <button
                                    onClick={() => router.push('/#contact')}
                                    className="px-10 py-5 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    Start a Project
                                    <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => router.push('/#services')}
                                    className="px-10 py-5 border border-zinc-800 text-zinc-300 font-medium rounded-xl hover:border-white hover:text-white transition-all"
                                >
                                    All Services
                                </button>
                            </div>
                        </motion.div>

                        {/* TAGS */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-3 mt-16 pt-10 border-t border-white/5"
                        >
                            {service.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 border border-white/10 px-4 py-2 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN — FEATURES CARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 sticky top-32"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-[1px] bg-gradient-to-b from-orange-500/20 to-transparent rounded-[32px] pointer-events-none" />

                            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-10 flex items-center gap-2">
                                    <Layers size={14} className="text-orange-500" />
                                    What's Included
                                </h3>

                                <div className="space-y-3">
                                    {details.features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + i * 0.08 }}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-white/0 hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all"
                                        >
                                            <span className="text-zinc-300 font-medium text-sm">
                                                {feature}
                                            </span>
                                            <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 ml-3">
                                                <Check size={14} className="text-orange-500" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Tech Stack */}
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 mb-4">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {details.techStack.map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1 + i * 0.05 }}
                                                className="text-[10px] font-bold uppercase tracking-wider text-orange-500/80 bg-orange-500/5 border border-orange-500/10 px-3 py-1.5 rounded-lg"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* PROCESS SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-32"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Zap size={14} className="text-orange-500" />
                        <span className="text-orange-500 font-mono tracking-[0.3em] text-[10px] uppercase font-bold">
                            Our Process
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
                        How we <span className="text-zinc-700">deliver.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {details.process.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group p-6 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/20 hover:border-orange-500/20 transition-all duration-500"
                            >
                                <div className="text-orange-500/20 font-mono text-5xl font-black mb-4 group-hover:text-orange-500/40 transition-colors">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2 tracking-tight">
                                    {item.step}
                                </h4>
                                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {item.desc}
                                </p>
                                {i < details.process.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-zinc-800">
                                        <ChevronRight size={16} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* BOTTOM CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                            Ready to get started?
                        </h3>
                        <p className="text-zinc-500 text-lg mb-10">
                            Let's discuss how our {service.title.toLowerCase()} services can help your business grow.
                        </p>
                        <button
                            onClick={() => router.push('/#contact')}
                            className="px-12 py-5 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-all duration-300 text-sm uppercase tracking-widest flex items-center gap-3 mx-auto"
                        >
                            Get in Touch <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
