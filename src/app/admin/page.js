'use client';
import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, FileText, TrendingUp, Clock, ArrowUpRight, Zap } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((r) => r.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
        );
    }

    const cards = [
        {
            label: 'Open Jobs',
            value: stats?.openJobs ?? 0,
            total: stats?.totalJobs ?? 0,
            icon: Briefcase,
            color: 'orange',
            href: '/admin/jobs',
        },
        {
            label: 'Internships',
            value: stats?.openInternships ?? 0,
            total: stats?.totalInternships ?? 0,
            icon: GraduationCap,
            color: 'emerald',
            href: '/admin/internships',
        },
        {
            label: 'Total Applications',
            value: stats?.totalApplications ?? 0,
            total: null,
            icon: FileText,
            color: 'blue',
            href: '/admin/applications',
        },
        {
            label: 'Today\'s Applications',
            value: stats?.applicationsToday ?? 0,
            total: null,
            icon: TrendingUp,
            color: 'purple',
            href: '/admin/applications',
        },
    ];

    const colorMap = {
        orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: 'text-orange-500' },
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-500' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'text-blue-500' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: 'text-purple-500' },
    };

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Zap size={20} className="text-orange-500" fill="currentColor" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">Dashboard</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Welcome back</h1>
                <p className="text-zinc-500 mt-2 text-sm">Here&apos;s an overview of your website activity.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {cards.map((card) => {
                    const colors = colorMap[card.color];
                    return (
                        <a
                            key={card.label}
                            href={card.href}
                            className={`group relative p-6 rounded-2xl border ${colors.border} ${colors.bg} hover:scale-[1.02] transition-all duration-300`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                                    <card.icon size={18} className={colors.icon} />
                                </div>
                                <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                            <p className="text-xs text-zinc-500 font-medium tracking-wide">
                                {card.label}
                                {card.total !== null && <span className="text-zinc-700"> / {card.total} total</span>}
                            </p>
                        </a>
                    );
                })}
            </div>

            {/* Recent Applications */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
                        <p className="text-zinc-600 text-xs mt-0.5">Latest candidate submissions</p>
                    </div>
                    <a
                        href="/admin/applications"
                        className="text-xs text-orange-500 hover:text-orange-400 font-bold uppercase tracking-widest transition-colors"
                    >
                        View All →
                    </a>
                </div>

                {stats?.recentApplications?.length > 0 ? (
                    <div className="divide-y divide-white/5">
                        {stats.recentApplications.map((app, i) => (
                            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400">
                                        {app.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{app.name || 'Unknown'}</p>
                                        <p className="text-xs text-zinc-600">{app.email || 'No email'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-400 font-medium">{app.position || 'General'}</p>
                                    <p className="text-[10px] text-zinc-600 flex items-center gap-1 justify-end mt-0.5">
                                        <Clock size={10} />
                                        {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center">
                        <FileText size={32} className="text-zinc-800 mx-auto mb-3" />
                        <p className="text-zinc-600 text-sm">No applications yet</p>
                        <p className="text-zinc-700 text-xs mt-1">They&apos;ll appear here once candidates apply</p>
                    </div>
                )}
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                    { href: '/admin/jobs', label: 'Manage Jobs', desc: 'Add, edit or remove postings' },
                    { href: '/admin/internships', label: 'Manage Internships', desc: 'Update intern positions' },
                    { href: '/admin/settings', label: 'Site Settings', desc: 'Update site configuration' },
                ].map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="p-5 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all group"
                    >
                        <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">{link.label}</p>
                        <p className="text-xs text-zinc-600 mt-1">{link.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
