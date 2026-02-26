'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Briefcase, Search, Check } from 'lucide-react';

const emptyJob = {
    title: '', dept: '', type: 'Remote', fee: '', about: '',
    qualifications: '', experience: '', skills: [], status: 'open',
};

export default function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [form, setForm] = useState(emptyJob);
    const [skillInput, setSkillInput] = useState('');
    const [search, setSearch] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchJobs = async () => {
        const res = await fetch('/api/admin/jobs');
        const data = await res.json();
        setJobs(data);
        setLoading(false);
    };

    useEffect(() => { fetchJobs(); }, []);

    const openCreate = () => {
        setEditingJob(null);
        setForm(emptyJob);
        setSkillInput('');
        setModalOpen(true);
    };

    const openEdit = (job) => {
        setEditingJob(job);
        setForm({ ...job });
        setSkillInput('');
        setModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        if (editingJob) {
            await fetch(`/api/admin/jobs/${editingJob.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        } else {
            await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        }
        setModalOpen(false);
        setSaving(false);
        fetchJobs();
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
        setDeleteConfirm(null);
        fetchJobs();
    };

    const addSkill = () => {
        if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
            setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
    };

    const filtered = jobs.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.dept.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Briefcase size={18} className="text-orange-500" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">Jobs</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Job Postings</h1>
                    <p className="text-zinc-500 text-sm mt-1">{jobs.length} total positions</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/25"
                >
                    <Plus size={16} /> Add Job
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                    type="text"
                    placeholder="Search by title or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-colors"
                />
            </div>

            {/* Table */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Title</th>
                                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Department</th>
                                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Type</th>
                                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Salary</th>
                                <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Status</th>
                                <th className="text-right px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((job) => (
                                <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-white">{job.title}</p>
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {job.skills?.slice(0, 3).map((s, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-zinc-800 border border-white/5 rounded text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{s}</span>
                                            ))}
                                            {job.skills?.length > 3 && (
                                                <span className="px-2 py-0.5 text-[9px] text-zinc-600">+{job.skills.length - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-400">{job.dept}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-zinc-800 border border-white/5 rounded-full text-[10px] text-zinc-300 font-bold uppercase tracking-wider">{job.type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-400">{job.fee}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.status === 'open'
                                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-zinc-800 text-zinc-500 border border-white/5'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'open' ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(job)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
                                                <Pencil size={14} />
                                            </button>
                                            {deleteConfirm === job.id ? (
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => handleDelete(job.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                                                        <Check size={14} />
                                                    </button>
                                                    <button onClick={() => setDeleteConfirm(null)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 transition-all">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setDeleteConfirm(job.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="px-6 py-16 text-center">
                        <Briefcase size={32} className="text-zinc-800 mx-auto mb-3" />
                        <p className="text-zinc-600 text-sm">{search ? 'No matching jobs' : 'No jobs yet'}</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#111] z-10 rounded-t-3xl">
                            <h2 className="text-lg font-bold text-white">{editingJob ? 'Edit Job' : 'Create New Job'}</h2>
                            <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Job Title *</label>
                                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40" placeholder="e.g. Senior Developer" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Department</label>
                                    <input value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40" placeholder="e.g. Engineering" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Work Type</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/40 appearance-none">
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Salary / Fee</label>
                                    <input value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40" placeholder="e.g. $120k - $160k" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Status</label>
                                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/40 appearance-none">
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">About the Role</label>
                                <textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={3}
                                    className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none" placeholder="Describe the role..." />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Qualifications</label>
                                    <textarea value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} rows={2}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none" placeholder="Required qualifications..." />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Experience</label>
                                    <textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} rows={2}
                                        className="w-full bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none" placeholder="Required experience..." />
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Skills / Tech Stack</label>
                                <div className="flex gap-2 mb-3">
                                    <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                        className="flex-1 bg-zinc-900 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40" placeholder="Type a skill and press Enter" />
                                    <button onClick={addSkill} className="px-4 py-2.5 bg-zinc-800 border border-white/8 rounded-xl text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {form.skills.map((skill, i) => (
                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg text-xs text-orange-400 font-medium">
                                            {skill}
                                            <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5 flex items-center justify-end gap-3 sticky bottom-0 bg-[#111] rounded-b-3xl">
                            <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!form.title || saving}
                                className="px-6 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/25"
                            >
                                {saving ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
