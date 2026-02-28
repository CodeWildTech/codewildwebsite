'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Rocket, Twitter, Linkedin, Github, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      if (mapInstance.current) return;

      const location = [8.0883, 77.5385]; 

      mapInstance.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
        zoomControl: false, // Cleaner look
      }).setView(location, 13);

      // Using a Dark Mode Tile Layer to match your UI
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(mapInstance.current);

      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
      
      L.marker(location, { icon: DefaultIcon }).addTo(mapInstance.current);
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Watermark */}
   {/* Background Watermark - Centered */}
<div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.03] pointer-events-none select-none whitespace-nowrap z-0">
  CODE WILD
</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* LEFT: Map & Location */}
          <div className="lg:col-span-4 space-y-6">
             <div className="flex items-center gap-2 text-orange-500 mb-4">
                <MapPin size={18} />
                <span className="text-xs font-bold tracking-widest uppercase">Base of Operations</span>
             </div>
             <div 
               ref={mapContainerRef} 
               className="h-48 w-full rounded-2xl grayscale contrast-125 opacity-70 hover:opacity-100 transition-opacity duration-500 overflow-hidden border border-white/10"
             />
             <p className="text-zinc-500 text-sm">
                Nagercoil, Kanyakumari <br /> 
                Tamil Nadu, India
             </p>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-8 opacity-50">Studio</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-orange-500 transition-colors">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-8 opacity-50">Socials</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Twitter size={14}/> Twitter</a></li>
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={14}/> LinkedIn</a></li>
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={14}/> GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Newsletter & Branding */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-black tracking-tighter italic">CODE<span className="text-orange-500 uppercase">WILD</span></span>
              <div className="bg-orange-500/10 p-2 rounded-lg">
                <Rocket className="text-orange-500" size={20} />
              </div>
            </div>
            
            <p className="text-zinc-500 text-sm mb-8 max-w-[240px]">
              Ready to build the future? Subscribe to our technical insights.
            </p>

            <div className="w-full relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-orange-500 transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors">
                <ArrowUpRight size={16} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
             <p>© {currentYear} CODEWILD GROUP</p>
             <p className="hidden md:block">Built with precision in Nagercoil</p>
          </div>
          
          <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase">
            <Link href="/privacy" className="text-zinc-600 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-600 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;