'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    FileText,
    Settings,
    LogOut,
    Zap,
    ChevronRight,
    Menu,
    X,
} from 'lucide-react';

const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { href: '/admin/jobs', icon: Briefcase, label: 'Job Postings' },
    { href: '/admin/internships', icon: GraduationCap, label: 'Internships' },
    { href: '/admin/applications', icon: FileText, label: 'Applications' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (item) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin/login');
    };

    return (
        <>
            <aside
                className={`flex flex-col h-full transition-all duration-300 border-r border-white/5 bg-[#0A0A0A] ${collapsed ? 'w-[72px]' : 'w-64'
                    }`}
            >
                {/* Logo */}
                <div className={`flex items-center gap-3 p-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <Zap size={16} className="text-white" fill="white" />
                    </div>
                    {!collapsed && (
                        <div>
                            <p className="text-white font-bold text-sm leading-tight">CodeWild</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Admin Panel</p>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`ml-auto p-1 rounded-md text-zinc-600 hover:text-white hover:bg-white/5 transition-all ${collapsed ? 'hidden' : ''
                            }`}
                    >
                        <Menu size={16} />
                    </button>
                </div>

                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="p-4 flex justify-center text-zinc-600 hover:text-white transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                )}

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${active
                                        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                                        : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={18} className={active ? 'text-orange-400' : 'text-zinc-500 group-hover:text-white'} />
                                {!collapsed && (
                                    <span className="text-sm font-medium truncate">{item.label}</span>
                                )}
                                {active && !collapsed && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                                )}
                                {collapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all group ${collapsed ? 'justify-center' : ''
                            }`}
                        title={collapsed ? 'Logout' : undefined}
                    >
                        <LogOut size={18} />
                        {!collapsed && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
