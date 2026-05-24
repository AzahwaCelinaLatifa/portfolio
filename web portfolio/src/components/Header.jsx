import React, { useState, useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import ScrambledText from './ScrambledText';
import starLogo from '../assets/figma/star_logo.svg';
import plusIcon from '../assets/figma/mdi-light_plus.svg';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';

const Header = ({ onOpenMobileMenu }) => {
  const { lang, theme, toggleTheme } = useThemeLang();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: lang === 'id' ? 'BERANDA' : 'HOME', link: '#home' },
    { label: lang === 'id' ? 'TENTANG' : 'ABOUT', link: '#about' },
    { label: lang === 'id' ? 'KEAHLIAN' : 'SKILLS', link: '#skills' },
    { label: lang === 'id' ? 'PROYEK' : 'PROJECTS', link: '#projects' },
    { label: 'CV', link: '#cv' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex justify-between items-center">
        
        {/* Left: ACEL* Logo */}
        <a href="#home" className={`flex items-center no-underline pointer-events-auto transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <span className="text-2xl font-normal tracking-tight" style={{ fontFamily: "'Geist Mono', monospace" }}>
            A<span className="accent-font" style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>CEL</span>
          </span>
          {/* Bintang dinaikkan sedikit ke atas */}
          <img 
            src={starLogo} 
            alt="star" 
            className={`w-[18px] h-[18px] ml-1 transform -translate-y-1.5 object-contain ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
            style={{ animation: 'spin 5s linear infinite' }} 
          />
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`group flex items-center gap-2 text-xs font-normal tracking-[0.12em] uppercase no-underline hover:opacity-50 transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              <img 
                src={plusIcon} 
                alt="+" 
                className={`w-3.5 h-3.5 object-contain transition-transform duration-300 group-hover:rotate-[135deg] ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
              />
              <ScrambledText radius={60} duration={0.6} speed={0.5}>
                {item.label}
              </ScrambledText>
            </a>
          ))}
        </nav>

        {/* Right: Contact + Mobile Menu */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Desktop Contact dengan interaksi putar panah ke bawah */}
          <a
            href="#contact"
            className={`group hidden md:flex items-center gap-2 text-xs font-normal tracking-[0.12em] uppercase no-underline hover:opacity-50 transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <ScrambledText radius={60} duration={0.6} speed={0.5}>
              {lang === 'id' ? 'KONTAK' : 'CONTACT'}
            </ScrambledText>
            {/* Animasi group-hover:rotate-45 biar muter arah bawah */}
            <img 
              src={arrowIcon} 
              alt="arrow" 
              className={`w-2.5 h-2.5 object-contain -rotate-90 transition-transform duration-300 group-hover:rotate-45 ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
            />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className={`md:hidden flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm font-normal tracking-[0.1em] uppercase transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            MENU
            <img 
              src={plusIcon} 
              alt="+" 
              className={`w-4 h-4 object-contain ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`} 
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;