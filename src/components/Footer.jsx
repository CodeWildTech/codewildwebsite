'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Rocket, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';
// Leaflet CSS-ah marakkama import pannanum
import 'leaflet/dist/leaflet.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Client-side-la mattum run aahura maathiri dynamic import
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Map already initialize aagi irundha, thirumba panna koodathu
      if (mapInstance.current) return;

      const location = [8.0883, 77.5385]; // Kanyakumari/Nagercoil area

      mapInstance.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: false, // Page scroll panna map zoom aaga koodathu
      }).setView(location, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Custom Marker (Optional)
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
      
      L.marker(location, { icon: DefaultIcon })
        .addTo(mapInstance.current)
        .bindPopup('CodeWild Tech Studio')
        .openPopup();
    };

    initMap();

    // Cleanup function: Component unmount aahumpothu map-ah remove pannanum
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase mb-8">Navigation</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase mb-8">Expertise</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li>Web Platforms</li>
                <li>Cloud Ecosystems</li>
                <li>UI/UX Design</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase mb-8">Connect</h4>
              <a href="mailto:hello@codewild.com" className="text-zinc-400 flex items-center gap-1 group">
                hello@codewild.com <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Rocket className="text-black" size={20} />
              </div>
              <span className="text-2xl font-black">CodeWild<span className="text-orange-500">Tech</span></span>
            </div>
            <p className="text-zinc-500 text-sm lg:text-right max-w-xs">
              Engineering digital clarity through scalable code and precision design.
            </p>
          </div>
        </div>

        {/* MAP CONTAINER */}
        <div className="mb-20">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-orange-500 mb-6 uppercase">Our Studio Location</h3>
          <div 
            ref={mapContainerRef}
            className="w-full h-[350px] rounded-2xl overflow-hidden border border-zinc-800 z-0 grayscale contrast-125"
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:row justify-between items-center gap-4 text-zinc-600 text-[10px] tracking-widest uppercase">
          <p>© {currentYear} CodeWild Technology Group</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;