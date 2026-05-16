import React, { useEffect, useRef, useState } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const Hero = () => {
  const { t, isDark } = useThemeLang();
  const cardRef = useRef(null);
  const ropeRef = useRef(null);

  const [drag, setDrag] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const dragState = useRef({ sy: 0, posY: 0, velY: 0, rot: 0, lastY: 0, swT: 0, isDragging: false });

  // 1. Kalkulasi Scroll Progress (Hanya untuk rasi bintang di pojok)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const percentage = (currentScrollY / scrollHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(percentage, 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll); 
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // 2. Physics ID Card (Tetap dipertahankan karena ini fitur interaktif)
  useEffect(() => {
    const card = cardRef.current;
    const rope = ropeRef.current;
    if (!card || !rope) return;

    let stepId, idleId;
    const maxS = 20, damp = .87, stiff = .11;
    const lerp = (a, b, t) => a + (b - a) * t;

    const step = () => {
      if (!dragState.current.isDragging) {
        dragState.current.velY += (-dragState.current.posY) * stiff;
        dragState.current.velY *= damp;
        dragState.current.posY += dragState.current.velY;
        dragState.current.rot = lerp(dragState.current.rot, 0, .07) + dragState.current.velY * .35;
        dragState.current.rot = Math.max(-maxS, Math.min(maxS, dragState.current.rot));
      }
      card.style.transform = `translateY(${dragState.current.posY}px) rotate(${dragState.current.rot}deg)`;
      rope.style.transform = `rotate(${dragState.current.rot * .28}deg)`;
      stepId = requestAnimationFrame(step);
    };

    const idle = () => {
      dragState.current.swT += .012;
      if (!dragState.current.isDragging && Math.abs(dragState.current.posY) < 2 && Math.abs(dragState.current.velY) < .2) {
        card.style.transform = `translateY(${Math.sin(dragState.current.swT) * 1.4}px) rotate(${Math.sin(dragState.current.swT) * .7}deg)`;
        rope.style.transform = `rotate(${Math.sin(dragState.current.swT) * .18}deg)`;
      }
      idleId = requestAnimationFrame(idle);
    };

    stepId = requestAnimationFrame(step);
    idleId = requestAnimationFrame(idle);

    const down = (e) => {
      dragState.current.isDragging = true;
      setDrag(true);
      dragState.current.sy = e.touches ? e.touches[0].clientY : e.clientY;
      dragState.current.lastY = dragState.current.sy;
    };

    const move = (e) => {
      if (!dragState.current.isDragging) return;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      dragState.current.velY = cy - dragState.current.lastY;
      dragState.current.lastY = cy;
      dragState.current.posY = Math.max(-60, Math.min(130, cy - dragState.current.sy));
      dragState.current.rot = dragState.current.posY * .14;
    };

    const up = () => {
      dragState.current.isDragging = false;
      setDrag(false);
    };

    card.addEventListener('mousedown', down);
    card.addEventListener('touchstart', down, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    return () => {
      cancelAnimationFrame(stepId);
      cancelAnimationFrame(idleId);
      card.removeEventListener('mousedown', down);
      card.removeEventListener('touchstart', down);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, []);

  const sagittariusPath = `M 50 50 L 62 42 L 76 50 L 68 64 L 56 58 Z M 76 50 L 86 46 M 62 42 L 70 34 M 68 64 L 74 74 M 50 50 L 30 52 M 30 52 L 42 38 L 38 24 M 30 52 L 26 72 L 38 76 L 34 88`;
  const starCoords = [[62, 42], [76, 50], [68, 64], [56, 58], [86, 46], [70, 34], [74, 74], [30, 52], [42, 38], [38, 24], [26, 72], [38, 76], [34, 88]];

  return (
    <>
      {/* PERUBAHAN DISINI: sticky dihapus, h-screen jadi min-h-screen supaya scroll normal */}
      <section id="home" className="relative min-h-screen overflow-hidden pt-[100px] pb-[150px] bg-bg z-[1] print:hidden flex flex-col items-center justify-center">

        <style>{`
          @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-scroll { animation: scroll-left 25s linear infinite; }
        `}</style>

        {/* Paper Background */}
        <div className="home-paper absolute inset-0 z-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(240,239,232,.04)' : 'rgba(17,17,16,.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(240,239,232,.04)' : 'rgba(17,17,16,.04)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 30%,transparent 100%)',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,#000 30%,transparent 100%)'
          }}></div>

        {/* Hero Content Grid - Sekarang statis (tidak ada transform: translateY) */}
        <div className="relative z-[10] max-w-[1200px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-20 text-center md:text-left">
          
          <div className="md:text-right flex flex-col md:items-end">
            <div className="font-dm text-[10px] tracking-[.2em] text-text3 uppercase mb-3">{t('havl')}</div>
            <div className="flex flex-col text-[clamp(40px,6.5vw,80px)] leading-[1.1] text-text">
              <span className="font-bebas font-bold tracking-[1px]">Azahwa</span>
              <span className="font-fraunces italic font-extralight py-1">Celina</span>
              <span className="font-bebas font-bold tracking-[1px]">Latifa</span>
            </div>
            <div className="mt-5 w-full flex justify-center md:justify-end">
              <p className="font-mono uppercase tracking-widest text-[11px] md:text-[12px] font-medium text-text3 leading-[1.8] max-w-full md:max-w-[260px]">
                FULLSTACK DEVELOPER & IT ENTHUSIAST. CRAFTING SEAMLESS DIGITAL EXPERIENCES.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center relative select-none w-[190px] mx-auto">
            <div className="w-[18px] h-[22px] mx-auto">
              <svg viewBox="0 0 20 24" fill="none" className="w-full h-full">
                <path d="M10 2C10 2 4 2 4 8C4 11 6 13 10 13C14 13 16 11 16 8C16 2 10 2 10 2Z" stroke="#b8b8b0" strokeWidth="1.5" fill="none" />
                <rect x="9" y="12" width="2" height="6" rx="1" fill="#b8b8b0" />
              </svg>
            </div>
            <div ref={ropeRef} className="w-[2.5px] h-[72px] mx-auto rounded-[2px] origin-top" style={{ background: 'linear-gradient(180deg,var(--sv2) 0%,var(--sv1) 40%,var(--sv3) 60%,var(--sv2) 100%)' }}></div>
            <div className="w-[13px] h-[20px] mx-auto bg-svg-grad2 rounded-t-[3px] rounded-b-[5px] border border-sv2 shadow-[0_2px_6px_rgba(0,0,0,.2)] relative before:content-[''] before:absolute before:top-[3px] before:left-1/2 before:-translate-x-1/2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-bg before:border before:border-sv2"></div>
            <div ref={cardRef} className={`w-[155px] rounded-[11px] overflow-hidden border-2 border-sv2 shadow-[0_8px_32px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.2)] bg-card origin-top ${drag ? 'cursor-grabbing' : 'cursor-grab'}`}>
              <div className="h-[26px] bg-svg-grad2 border-b border-sv2 flex items-center px-[10px] gap-[6px]">
                <span className="font-dm text-[8px] tracking-[.15em] text-text3">STUDENT ID · SIJA</span>
                <div className="flex gap-[3px] ml-auto">
                  <div className="w-[5px] h-[5px] rounded-full bg-sv3 border border-sv2"></div>
                  <div className="w-[5px] h-[5px] rounded-full bg-sv3 border border-sv2"></div>
                  <div className="w-[5px] h-[5px] rounded-full bg-sv3 border border-sv2"></div>
                </div>
              </div>
              <div className="w-full aspect-[3/4] bg-bg3 flex flex-col items-center justify-center gap-2 text-text3 text-[10px] font-dm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                <span>FOTO KAMU</span>
              </div>
              <div className="p-[9px] bg-bg3 border-t border-border flex items-center gap-2">
                <div>
                  <div className="font-bebas text-[13px] tracking-[1px] text-text leading-[1]">Azahwa Celina Latifa</div>
                  <div className="font-dm text-[8px] text-text3 tracking-[.08em]">FULLSTACK DEVELOPER</div>
                </div>
                <div className="ml-auto w-[24px] h-[18px] bg-svg-grad2 rounded-[3px] border border-sv2 grid grid-cols-3 grid-rows-3 gap-[2px] p-[3px]">
                  {Array.from({ length: 9 }).map((_, i) => <div key={i} className="bg-black/10 rounded-[1px]"></div>)}
                </div>
              </div>
            </div>
            <div className="mt-3 text-center"><span className="sv-tag text-[8px]">{t('drag')}</span></div>
          </div>

          <div className="text-center md:text-left flex flex-col gap-6 md:items-start items-center">
            <p className="font-mono uppercase tracking-widest text-[11px] md:text-[12px] font-medium text-text2 leading-[1.8] max-w-full md:max-w-[340px]">
              PASSIONATE ABOUT BUILDING END-TO-END WEB APPLICATIONS. CONSTANTLY EXPLORING BOTH FRONTEND AESTHETICS AND BACKEND LOGIC TO BECOME A RELIABLE FULLSTACK DEVELOPER.
            </p>
            <div className="flex flex-wrap gap-[6px] justify-center md:justify-start mt-2">
              <span className="sv-tag">Fullstack Dev</span>
              <span className="sv-tag">UI/UX</span>
              <span className="sv-tag">Networking</span>
            </div>
            <div className="flex flex-col gap-3 items-center md:items-start mt-2">
              <a href="#portfolio" className="sv-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>{t('bw')}</span>
              </a>
              <a href="#cv" className="sv-btn !bg-transparent !border-border !text-text">
                <span>{t('bc')}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Ticker - Ikut ke-scroll ke atas secara normal */}
        <div className="absolute bottom-12 left-0 w-full overflow-hidden bg-text text-bg py-2 opacity-95">
          <div className="flex w-[200%] animate-scroll whitespace-nowrap items-center">
            <span className="font-dm uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-medium px-4">
              WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦
            </span>
            <span className="font-dm uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-medium px-4">
              WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦ WELCOME TO MY PORTFOLIO ✦
            </span>
          </div>
        </div>

      </section>

      {/* Rasi Bintang Widget (Tetap Fixed sebagai tracker) */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-8 z-[100] flex flex-col items-center justify-center pointer-events-none drop-shadow-md transition-all duration-300"
        style={{ opacity: scrollProgress > 1 ? 1 : 0, transform: scrollProgress > 1 ? 'translateY(0)' : 'translateY(15px)' }}>
        <span className="font-dm text-[11px] tracking-[.25em] font-medium text-text mb-2 drop-shadow-sm ml-[3px]">
          {Math.round(scrollProgress).toString().padStart(3, '0')}%
        </span>
        <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px]">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
            <path d={sagittariusPath} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-border opacity-20" strokeLinecap="round" strokeLinejoin="round" />
            {starCoords.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2.5" className="fill-text opacity-90" />)}
            <circle cx="50" cy="50" r="4" className="fill-text" />
          </svg>
          <svg className="absolute inset-0 w-full h-full overflow-visible text-text" viewBox="0 0 100 100">
            <path d={sagittariusPath} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - scrollProgress} className="transition-all duration-100 ease-out" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Hero;