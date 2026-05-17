import React, { useState, useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import starLogo from '../assets/figma/star_logo.svg';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import ScrambledText from './ScrambledText';

const MobileMenu = ({ isOpen, onClose, onNavClick, scrollProgress }) => {
  const { lang, setLang } = useThemeLang();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const links = [
    { label: lang === 'id' ? 'TENTANG' : 'ABOUT', href: '#about' },
    { label: lang === 'id' ? 'KEAHLIAN' : 'SKILLS', href: '#skills' },
    { label: lang === 'id' ? 'PROYEK' : 'PROJECTS', href: '#projects' },
    { label: 'CV', href: '#cv' },
  ];

  return (
    <div className={`fixed inset-0 bg-black z-[200] flex flex-col px-8 py-6 transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <a href="#home" onClick={onNavClick} className="flex items-center no-underline text-white">
          <span className="text-2xl font-normal tracking-tight" style={{ fontFamily: "'Geist Mono', monospace" }}>
            A<span className="accent-font">CEL</span>
          </span>
          {/* Bintang dinaikkan sedikit ke atas */}
          <img src={starLogo} alt="star" className="w-[18px] h-[18px] ml-1 transform -translate-y-1.5 brightness-0 invert" style={{ animation: 'spin 5s linear infinite' }} />
        </a>
        <button onClick={onClose} className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white text-sm font-normal tracking-[0.1em] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
          CLOSE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-4 flex-1">
        {links.map((item) => (
          <a key={item.label} href={item.href} onClick={onNavClick}
            className="text-white text-[clamp(28px,6vw,36px)] font-normal uppercase tracking-tight no-underline hover:opacity-60 transition-opacity w-fit"
            style={{ fontFamily: "'Geist Mono', monospace" }}>
            <ScrambledText>{item.label}</ScrambledText>
          </a>
        ))}
        {/* Menggunakan w-full dan justify-between agar arrow ke kanan, pr-4 untuk sisa jarak */}
        <a href="#contact" onClick={onNavClick}
          className="flex items-center justify-between w-full pr-4 text-white text-[clamp(28px,6vw,36px)] font-normal uppercase tracking-tight no-underline hover:opacity-60 transition-opacity"
          style={{ fontFamily: "'Geist Mono', monospace" }}>
          <ScrambledText>{lang === 'id' ? 'KONTAK' : 'CONTACT'}</ScrambledText>
          <img src={arrowIcon} alt="arrow" className="w-5 h-5 md:w-6 md:h-6 brightness-0 invert -rotate-90 object-contain" />
        </a>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end pt-5" style={{ fontFamily: "'Geist Mono', monospace" }}>
        <div>
          <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white text-xs font-normal mb-2">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="8" /><ellipse cx="10" cy="10" rx="4" ry="8" /><line x1="2" y1="10" x2="18" y2="10" />
            </svg>
            {lang === 'id' ? 'ID' : 'EN'}
          </button>
          <div className="text-white text-xs tracking-[0.15em] opacity-80">[ {formatTime(time)} ]</div>
        </div>
        <div className="text-white text-xs tracking-[0.15em] opacity-80">
          {Math.round(scrollProgress || 0).toString().padStart(3, '0')}%
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;