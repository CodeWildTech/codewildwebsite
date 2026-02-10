'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Rocket,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Decorative Element - Moved to Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="text-[15vw] font-black text-white/[0.02] leading-none uppercase tracking-tighter">
          CodeWild
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Grid Content */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          {/* Section 1: Navigation & Expertise (Now first in layout) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 order-2 lg:order-1">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-8">
                Navigation
              </h4>
              <ul className="space-y-4">
                {['About', 'Services', 'Products', 'Contact'].map(item => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-zinc-400 hover:text-white flex items-center gap-2 group transition-colors"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-orange-500 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-8">
                Expertise
              </h4>
              <ul className="space-y-4 text-zinc-400">
                {[
                  'Web Apps',
                  'Mobile Dev',
                  'Cloud Architecture',
                  'UI/UX Design',
                ].map(item => (
                  <li
                    key={item}
                    className="cursor-default hover:text-zinc-200 transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-8">
                Say Hello
              </h4>
              <div className="space-y-6">
                <a href="mailto:hello@codewild.com" className="block group">
                  <span className="text-zinc-500 text-xs block mb-1">
                    Email us at
                  </span>
                  <span className="text-lg font-medium group-hover:text-orange-500 transition-colors flex items-center gap-2">
                    hello@codewild.com <ArrowUpRight size={16} />
                  </span>
                </a>
                <div className="pt-2">
                  <span className="text-zinc-500 text-xs block mb-1">
                    Office
                  </span>
                  <span className="text-zinc-400 italic font-serif">
                    Remote / Global
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Brand & Socials (Moved to right/bottom of grid) */}
          <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-orange-500 p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Rocket className="text-black" size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                CodeWild<span className="text-orange-500">Tech</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-sm font-light">
              Engineering digital experiences that push the boundaries of what's
              possible. From local startups to global systems.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={20} />, href: '#' },
                { icon: <Linkedin size={20} />, href: '#' },
                { icon: <Github size={20} />, href: '#' },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {currentYear} CodeWild Technology Group.
          </div>

          <div className="flex gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
