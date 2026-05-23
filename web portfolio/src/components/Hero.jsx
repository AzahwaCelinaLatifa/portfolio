import React, { useEffect, useState } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import Lanyard from './Lanyard';
import ScrambledText from './ScrambledText';

const Hero = () => {
  const { lang, setLang, theme, toggleTheme } = useThemeLang(); 
  const [time, setTime] = useState(new Date());
  const [typedText, setTypedText] = useState('');

  // State baru untuk mengatur muncul & animasinya Splash Screen
  const [showSplash, setShowSplash] = useState(false);
  const [splashActive, setSplashActive] = useState(false);

  const consoleText = 'console.log("HELLO WORLD!");';

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(consoleText.slice(0, index + 1));
      index++;
      if (index >= consoleText.length) {
        clearInterval(interval);
      }
    }, 100); 
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const handleLangToggle = () => {
    if (setLang) {
      setLang(lang === 'id' ? 'en' : 'id');
    }
  };

  // LOGIKA TRIGGER EFEK SPLASH SCREEN
  const handleThemeChange = () => {
    // 1. Munculkan element Splash Screen
    setShowSplash(true);
    setSplashActive(true);

    // 2. Tunggu sebentar (saat layar tertutup), lalu ganti temanya secara instan
    setTimeout(() => {
      if (toggleTheme) toggleTheme();

      // 3. Mulai pudarkan Splash Screen-nya (Fade Out)
      setSplashActive(false);

      // 4. Setelah memudar selesai, hapus dari DOM
      setTimeout(() => {
        setShowSplash(false);
      }, 500); 

    }, 400); 
  };

  return (
    <>
      {/* ===== SPLASH SCREEN OVERLAY EFFECT ===== */}
      {showSplash && (
        <div 
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none select-none transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: theme === 'dark' ? '#ffffff' : '#0a0a0a',
            color: theme === 'dark' ? '#111110' : '#f0efe8',
            opacity: splashActive ? 1 : 0,
            transform: splashActive ? 'scale(1)' : 'scale(1.05)'
          }}
        >
          <div className="text-[11px] tracking-[0.3em] uppercase font-sans animate-pulse">
            {theme === 'dark' ? 'SWITCHING TO LIGHT MODE' : 'SWITCHING TO DARK MODE'}
          </div>
          <div className="w-12 h-[1px] bg-current opacity-30 mt-4 animate-[scale_1s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Latar belakang diatur melalui inline style var(--bg) */}
      <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-between pt-32 pb-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg)' }}>
        
        <style>{`
          @keyframes blink-cursor {
            50% { opacity: 0; }
          }
          .typewriter-cursor {
            animation: blink-cursor 0.8s step-end infinite;
          }
        `}</style>

        {/* Grid background dinamis mengikuti CSS variable --grid-line */}
        <div className="absolute inset-0 z-0 pointer-events-none transition-colors duration-500" style={{
          backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 30%,transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 30%,transparent 100%)'
        }} />

        <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full flex-1">
            
            {/* CONTAINER LANYARD */}
            <div className="flex flex-col items-center select-none relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
              <Lanyard />
            </div>

            <div className="flex flex-col gap-5 md:gap-6 pt-4 lg:pt-0">
              {/* Menggunakan text-text digabung dengan opacity-* agar otomatis berganti warna */}
              <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[10px] md:text-[12px] tracking-[0.15em] uppercase text-text opacity-40 transition-colors duration-300">
                {lang === 'id' ? 'TERBUKA UNTUK PELUANG BARU' : 'OPEN TO NEW OPPORTUNITIES'}
              </span>
              
              <div style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[14px] md:text-[18px] font-normal text-text opacity-90 flex items-center min-h-[28px] transition-colors duration-300">
                <span>{typedText}</span>
                <span className="inline-block w-[2px] h-[15px] md:h-[18px] bg-text ml-1 typewriter-cursor transition-colors duration-300" />
              </div>
              
              <h1 className="text-[clamp(32px,4vw,48px)] font-normal leading-[1.1] tracking-tight text-text transition-colors duration-300">
                <span className="opacity-30 font-normal transition-colors duration-300">I'M</span> AZAHWA <span className="accent-font italic opacity-50">CEL</span>INA LATIFA
              </h1>
              
              <p style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[11px] md:text-[13px] tracking-[0.12em] leading-[2] uppercase max-w-[500px] text-text opacity-80 transition-colors duration-300">
                {lang === 'id' ? (
                  <>PENGEMBANG FULLSTACK & PENGGEMAR TI.<br />MENCIPTAKAN PENGALAMAN DIGITAL YANG MULUS.</>
                ) : (
                  <>FULLSTACK DEVELOPER & IT ENTHUSIAST.<br />CRAFTING SEAMLESS DIGITAL EXPERIENCES.</>
                )}
              </p>
              
              <div style={{ fontFamily: "'Geist Mono', monospace" }} className="flex gap-4 flex-wrap mt-2 text-text opacity-60 transition-colors duration-300">
                <span className="text-[10px] md:text-[12px] tracking-[0.1em] uppercase">[ #FULLSTACKDEV ]</span>
                <span className="text-[10px] md:text-[12px] tracking-[0.1em] uppercase">[ #UI/UX ]</span>
                <span className="text-[10px] md:text-[12px] tracking-[0.1em] uppercase">[ #NETWORKING ]</span>
              </div>
              
              <div style={{ fontFamily: "'Geist Mono', monospace" }} className="flex gap-8 items-center mt-6">
                <a href="#projects" className="group flex items-center gap-2 text-[14px] md:text-[16px] font-medium tracking-[0.08em] uppercase no-underline text-text hover:opacity-60 transition-all duration-300">
                  <ScrambledText radius={60} duration={0.6} speed={0.5}>{lang === 'id' ? 'LIHAT KARYA' : 'VIEW WORK'}</ScrambledText>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </a>
                <a href="#cv" className="group flex items-center gap-2 text-[14px] md:text-[16px] font-medium tracking-[0.08em] uppercase no-underline text-text hover:opacity-60 transition-all duration-300">
                  <ScrambledText radius={60} duration={0.6} speed={0.5}>DOWNLOAD CV</ScrambledText>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-1 group-hover:translate-x-1"><line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div style={{ fontFamily: "'Geist Mono', monospace" }} className="w-full max-w-[750px] mt-20 md:mt-32 text-[12px] md:text-[15px] tracking-[0.08em] leading-[2] uppercase font-normal text-text opacity-90 transition-colors duration-300">
            {lang === 'id' 
              ? 'SANGAT BERSEMANGAT DALAM MEMBANGUN APLIKASI WEB DARI AWAL HINGGA AKHIR. TERUS MENGEKSPLORASI ESTETIKA FRONTEND DAN LOGIKA BACKEND UNTUK MENJADI PENGEMBANG FULLSTACK YANG HANDAL.'
              : 'PASSIONATE ABOUT BUILDING END-TO-END WEB APPLICATIONS. CONSTANTLY EXPLORING BOTH FRONTEND AESTHETICS AND BACKEND LOGIC TO BECOME A RELIABLE FULLSTACK DEVELOPER.'
            }
          </div>
        </div>

        <div style={{ fontFamily: "'Geist Mono', monospace", borderColor: 'var(--border-color)' }} className="relative z-[2] flex justify-between items-center px-6 md:px-12 py-6 border-t mt-12 md:mt-20 transition-colors duration-500">
          
          {/* Kontainer Tombol */}
          <div className="flex flex-col gap-2 items-start text-[11px] md:text-[13px] tracking-[0.15em] text-text transition-colors duration-300">
            
            <div className="flex items-center gap-4">
              {/* Tombol Bahasa (ID/EN) */}
              <button 
                onClick={handleLangToggle}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-inherit font-medium hover:opacity-60 transition-opacity p-0"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="8" /><ellipse cx="10" cy="10" rx="4" ry="8" /><line x1="2" y1="10" x2="18" y2="10" /></svg>
                {lang === 'id' ? 'ID' : 'EN'}
              </button>

              {/* Pemisah Kecil */}
              <span className="opacity-30">|</span>

              {/* Tombol Dark/Light Mode dengan Event handleThemeChange */}
              <button 
                onClick={handleThemeChange}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-inherit font-medium hover:opacity-60 transition-opacity p-0"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    DARK
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    LIGHT
                  </>
                )}
              </button>
            </div>

            <span className="opacity-60">[ {formatTime(time)} ]</span>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
};

export default Hero;