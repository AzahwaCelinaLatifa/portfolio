import React, { useState, useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import starLogo from '../assets/figma/star_logo.svg';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import ScrambledText from './ScrambledText';

const MobileMenu = ({ isOpen, onClose, onNavClick }) => {
  const { lang, setLang, theme, toggleTheme } = useThemeLang();
  const [time, setTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(pct, 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className={`fixed inset-0 z-[200] flex flex-col px-8 py-6 transition-[transform,background-color,color] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <a href="#home" onClick={onNavClick} className={`flex items-center no-underline ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <span className="text-2xl font-normal tracking-tight" style={{ fontFamily: "'Geist Mono', monospace" }}>
            A<span className="accent-font">CEL</span>
          </span>
          {/* Bintang dinaikkan sedikit ke atas */}
          <img 
            src={starLogo} 
            alt="star" 
            className={`w-[18px] h-[18px] ml-1 transform -translate-y-1.5 object-contain ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
            style={{ animation: 'spin 5s linear infinite' }} 
          />
        </a>
        <button 
          onClick={onClose} 
          className={`flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-normal tracking-[0.1em] uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
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
            className={`text-[clamp(28px,6vw,36px)] font-normal uppercase tracking-tight no-underline hover:opacity-60 transition-opacity w-fit ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Geist Mono', monospace" }}>
            <ScrambledText>{item.label}</ScrambledText>
          </a>
        ))}
        {/* Menggunakan w-full dan justify-between agar arrow ke kanan, pr-4 untuk sisa jarak */}
        <a href="#contact" onClick={onNavClick}
          className={`flex items-center justify-between w-full pr-4 text-[clamp(28px,6vw,36px)] font-normal uppercase tracking-tight no-underline hover:opacity-60 transition-opacity ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          style={{ fontFamily: "'Geist Mono', monospace" }}>
          <ScrambledText>{lang === 'id' ? 'KONTAK' : 'CONTACT'}</ScrambledText>
          <img 
            src={arrowIcon} 
            alt="arrow" 
            className={`w-5 h-5 md:w-6 md:h-6 -rotate-90 object-contain ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
          />
        </a>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end pt-5" style={{ fontFamily: "'Geist Mono', monospace" }}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className={`flex items-center gap-2 bg-transparent border-none cursor-pointer text-xs font-normal transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8" /><ellipse cx="10" cy="10" rx="4" ry="8" /><line x1="2" y1="10" x2="18" y2="10" />
              </svg>
              {lang === 'id' ? 'ID' : 'EN'}
            </button>

            {/* Separator */}
            <span className={`opacity-40 select-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}>|</span>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`flex items-center gap-2 bg-transparent border-none cursor-pointer text-xs font-normal transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              {theme === 'dark' ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  LIGHT
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  DARK
                </>
              )}
            </button>
          </div>
          <div className={`text-xs tracking-[0.15em] opacity-80 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>[ {formatTime(time)} ]</div>
        </div>
        <div className={`text-xs tracking-[0.15em] opacity-80 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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