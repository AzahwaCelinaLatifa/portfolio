import React, { useState, useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import ScrambledText from './ScrambledText';

// Menerima props isVisible dari App.jsx
const Header = ({ onOpenContact, isVisible }) => {
  const { lang, setLang } = useThemeLang();
  const [time, setTime] = useState(new Date());

  // Data menu untuk Desktop
  const menuItems = [
    { label: 'Home', link: '#home' },
    { label: 'About', link: '#about' },
    { label: 'Skills', link: '#skills' },
    { label: 'Projects', link: '#projects' },
    { label: 'CV', link: '#cv' }
  ];

  // Update Jam
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[30] pointer-events-none transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1440px] mx-auto p-6 md:p-8 flex justify-between items-center relative">
        
        {/* Sisi Kiri: Jam & Language Toggle */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Jam Digital */}
          <div className="hidden sm:block font-mono text-sm tracking-widest opacity-70">
            [{formatTime(time)}]
          </div>

          {/* Toggle Bahasa */}
          <button 
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="group relative flex items-center gap-2 overflow-hidden px-3 py-1 border border-current rounded-full hover:bg-black hover:text-white transition-colors duration-300"
          >
            <span className="text-xs font-bold uppercase">
              {lang === 'id' ? 'ID' : 'EN'}
            </span>
            <div className="w-1 h-1 rounded-full bg-current group-hover:scale-[2] transition-transform" />
          </button>
        </div>

        {/* TENGAH: Navigasi Desktop */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 pointer-events-auto font-mono uppercase">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              className="group flex items-center gap-2 text-sm font-medium tracking-widest hover:opacity-60 transition-opacity"
            >
              {/* Ikon Plus terbalik saat disentuh */}
              <span className="text-[12px] font-bold transform transition-transform duration-300 group-hover:rotate-[135deg]">
                +
              </span>
              
              <ScrambledText radius={60} duration={0.6} speed={0.5}>
                {item.label}
              </ScrambledText>
            </a>
          ))}
        </nav>

        {/* Sisi Kanan: Tombol Contact (Desktop) & Spacer (Mobile) */}
        <div className="pointer-events-auto flex items-center">
          {/* Tombol Contact KHUSUS Desktop */}
          <button 
            onClick={onOpenContact}
            className="hidden md:flex group items-center gap-2 text-sm font-mono font-medium tracking-widest hover:opacity-60 transition-opacity uppercase"
          >
            <ScrambledText radius={60} duration={0.6} speed={0.5}>
              Contact
            </ScrambledText>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>

          {/* Spacer - Area ini akan diisi oleh StaggeredMenu di versi Mobile */}
          <div className="w-10 h-10 md:hidden" /> 
        </div>

      </div>
    </header>
  );
};

export default Header;