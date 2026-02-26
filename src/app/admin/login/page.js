'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Incorrect password. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/8 blur-[160px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-5 shadow-2xl shadow-orange-500/30">
                        <Zap size={26} className="text-white" fill="white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
                    <p className="text-zinc-500 text-sm mt-1 tracking-wide">CodeWild Technology</p>
                </div>

                {/* Card */}
                <div className="bg-zinc-900/60 border border-white/8 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
                    <p className="text-zinc-400 text-sm mb-8 text-center">Enter your admin password to continue</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin password"
                                required
                                className="w-full bg-zinc-800/80 border border-white/8 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full py-3.5 bg-orange-500 text-white font-bold text-sm rounded-xl hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/25 tracking-wide"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-700 mt-6">
                    © 2026 CodeWild Technology · Admin Access Only
                </p>
            </div>
        </div>
    );
}
