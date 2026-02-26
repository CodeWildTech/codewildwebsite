'use client';
import { useState, useEffect } from 'react';
import { Settings, Save, Check, RefreshCw } from 'lucide-react';

export default function AdminSettings() {
    const [config, setConfig] = useState({
        availableForProjects: true,
        contactEmail: '',
        companyName: '',
        tagline: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch('/api/admin/settings')
            .then((r) => r.json())
            .then((data) => {
                setConfig(data);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/admin/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-zinc-500/30 border-t-zinc-400 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-12 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Settings size={18} className="text-zinc-400" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold">Settings</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Site Configuration</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage global site settings</p>
            </div>

            <div className="space-y-6">
                {/* Status Toggle */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-semibold">Available for Projects</p>
                            <p className="text-zinc-500 text-xs mt-1">Controls the &quot;Available for Projects&quot; badge on the homepage</p>
                        </div>
                        <button
                            onClick={() => setConfig({ ...config, availableForProjects: !config.availableForProjects })}
                            className={`relative w-12 h-7 rounded-full transition-all ${config.availableForProjects ? 'bg-orange-500' : 'bg-zinc-700'
                                }`}
                        >
                            <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${config.availableForProjects ? 'left-6' : 'left-1'
                                }`} />
                        </button>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Company Name</label>
                        <input
                            value={config.companyName}
                            onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                            className="w-full bg-zinc-800/80 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Tagline</label>
                        <input
                            value={config.tagline}
                            onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                            className="w-full bg-zinc-800/80 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Contact Email</label>
                        <input
                            value={config.contactEmail}
                            onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                            type="email"
                            className="w-full bg-zinc-800/80 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-colors"
                        />
                    </div>
                </div>

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg ${saved
                            ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                            : 'bg-orange-500 text-white hover:bg-orange-400 shadow-orange-500/25'
                        } disabled:opacity-50`}
                >
                    {saving ? (
                        <><RefreshCw size={16} className="animate-spin" /> Saving...</>
                    ) : saved ? (
                        <><Check size={16} /> Saved Successfully</>
                    ) : (
                        <><Save size={16} /> Save Changes</>
                    )}
                </button>
            </div>
        </div>
    );
}
