'use client';
import { useState, useEffect } from 'react';
import { FileText, Search, Clock, User, Mail, Briefcase } from 'lucide-react';

export default function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((r) => r.json())
            .then((data) => {
                // The stats endpoint returns recentApplications; for full list we load directly
                loadApplications();
            });
    }, []);

    const loadApplications = async () => {
        try {
            const res = await fetch('/api/admin/applications');
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (e) {
            // fallback
        }
        setLoading(false);
    };

    const filtered = applications.filter((a) =>
        (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.position || '').toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <FileText size={18} className="text-blue-500" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold">Applications</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Job Applications</h1>
                <p className="text-zinc-500 text-sm mt-1">{applications.length} total submissions</p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                    type="text"
                    placeholder="Search by name, email, or position..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-colors"
                />
            </div>

            {/* Table */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
                {applications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Applicant</th>
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Email</th>
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Position</th>
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Date</th>
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtered.map((app, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => setSelectedApp(app)}
                                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                                                    {app.name?.charAt(0)?.toUpperCase() || '?'}
                                                </div>
                                                <span className="text-sm font-medium text-white">{app.name || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-400">{app.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-zinc-800 border border-white/5 rounded-full text-[10px] text-zinc-300 font-bold uppercase tracking-wider">
                                                {app.position || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500">
                                            {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {app.status || 'new'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="px-6 py-20 text-center">
                        <FileText size={40} className="text-zinc-800 mx-auto mb-4" />
                        <p className="text-zinc-500 text-base font-medium">No applications received yet</p>
                        <p className="text-zinc-700 text-xs mt-2 max-w-sm mx-auto">
                            Applications submitted through the careers page will appear here automatically.
                        </p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setSelectedApp(null)}>
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-lg font-bold text-white">Application Details</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-400">
                                    {selectedApp.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{selectedApp.name}</p>
                                    <p className="text-zinc-500 text-sm">{selectedApp.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Position</p>
                                    <p className="text-sm text-white">{selectedApp.position || 'General'}</p>
                                </div>
                                <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Submitted</p>
                                    <p className="text-sm text-white">{selectedApp.submittedAt ? new Date(selectedApp.submittedAt).toLocaleString() : 'N/A'}</p>
                                </div>
                            </div>
                            {selectedApp.phone && (
                                <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Phone</p>
                                    <p className="text-sm text-white">{selectedApp.phone}</p>
                                </div>
                            )}
                            {selectedApp.message && (
                                <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">Cover Letter / Message</p>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{selectedApp.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-white/5">
                            <button onClick={() => setSelectedApp(null)} className="w-full py-3 bg-zinc-800 border border-white/8 text-sm text-zinc-400 rounded-xl hover:text-white hover:bg-zinc-700 transition-all">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
