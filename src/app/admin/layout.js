'use client';
import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/AdminSidebar';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }) {
    return (
        <div className={`${inter.className} flex h-screen bg-[#0A0A0A] text-white overflow-hidden`}>
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-[#0D0D0D]">
                {children}
            </main>
        </div>
    );
}
