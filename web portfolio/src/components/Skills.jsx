import React, { useEffect, useRef, useState } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import LogoLoop from './LogoLoop'; 
import { VscVscode } from 'react-icons/vsc'; 
import { 
  SiGithub, 
  SiSupabase, 
  SiFigma, 
  SiVirtualbox, 
  SiCanva, 
  SiCisco 
} from 'react-icons/si';

const SkillItem = ({ name, pct, inView, isDark }) => {
  const fillWidth = inView ? pct : '0%';
  const targetNumber = parseInt(pct.replace('%', ''), 10);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCurrentNumber(0);
      return;
    }

    let frameId;
    let startTimestamp = null;
    const duration = 1200; 

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNumber);
      
      setCurrentNumber(current);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCurrentNumber(targetNumber);
      }
    };

    frameId = window.requestAnimationFrame(step);
    
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [inView, targetNumber]);

  return (
    <div className="mb-4">
      <div className={`text-[11px] tracking-[0.08em] font-normal uppercase mb-1.5 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
        {name}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Menggunakan rgba murni untuk background track agar netral tanpa biru */}
        <div className={`flex-1 h-[2px] relative transition-colors duration-500 overflow-hidden ${isDark ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[rgba(0,0,0,0.1)]'}`}>
          <div 
            className={`absolute top-0 left-0 h-full w-full origin-left transition-transform duration-[1200ms] ease-out ${isDark ? 'bg-white' : 'bg-[#111110]'}`} 
            style={{ transform: `scaleX(${inView ? (parseInt(pct, 10) / 100) : 0})` }} 
          />
        </div>
        
        {/* Menggunakan rgba murni untuk persentase agar netral tanpa biru */}
        <span 
          className={`text-[11px] tracking-[0.1em] min-w-[40px] text-right transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(0,0,0,0.5)]'}`} 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {String(currentNumber).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { lang, theme } = useThemeLang();
  
  // Deteksi dark mode
  const isDark = theme === 'dark';

  // Tech Logos menggunakan rgba murni (hitam/putih transparan)
  const techLogos = [
    { node: <SiGithub className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "GitHub" },
    { node: <VscVscode className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "VS Code" },
    { node: <SiSupabase className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "Supabase" },
    { node: <SiFigma className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "Figma" },
    { node: <SiVirtualbox className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "VirtualBox" },
    { node: <SiCanva className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "Canva" },
    { node: <SiCisco className={`w-full h-full transition-colors duration-300 ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-[#111110]'}`} />, title: "Cisco Packet Tracer" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className={`relative w-full lg:min-h-screen flex flex-col justify-center py-24 px-6 md:px-10 font-['Geist_Mono'] font-normal overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#111110] text-white' : 'bg-white text-black'}`} 
    >
      
      {/* ================= DOT BACKGROUND ================= */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_top_right,rgba(227,242,253,0.3)_0%,transparent_60%)]'}`} />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5 transition-all duration-500" style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#ffffff' : '#000000'} 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
      {/* ========================================================== */}

      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-end items-start mb-16 rv">
          <div className="text-right">
            <h2 className="text-[clamp(32px,5vw,60px)] font-normal tracking-tight leading-[0.95] mb-2 font-['Geist_Mono']">
              <span className="font-['Inspiration'] font-normal text-[1.15em] text-[#EBE6E0] -mr-1">S</span>
              KI
              <span className="font-['Inspiration'] font-normal text-[1.15em] text-[#EBE6E0] -ml-0.5">LL</span>
              S
            </h2>
            <span className={`text-[11px] tracking-[0.25em] uppercase block mt-1 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(0,0,0,0.5)]'}`} style={{ fontFamily: "'Geist Mono', monospace" }}>
              {lang === 'id' ? 'DI BIDANG APA SAYA UNGGUL' : 'WHAT I EXCEL AT'}
            </span>
          </div>
        </div>

        {/* Grid Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Web Skill Column */}
          <div className="rv-l">
            <h3 className={`text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b font-['Geist_Mono'] transition-colors duration-500 ${isDark ? 'text-white border-[rgba(255,255,255,0.15)]' : 'text-black border-[rgba(0,0,0,0.15)]'}`}>WEB</h3>
            <SkillItem name="HTML & CSS" pct="85%" inView={inView} isDark={isDark} />
            <SkillItem name="JAVASCRIPT" pct="60%" inView={inView} isDark={isDark} />
            <SkillItem name="REACT.JS" pct="52%" inView={inView} isDark={isDark} />
            <SkillItem name="BOOTSTRAP / TAILWIND" pct="55%" inView={inView} isDark={isDark} />
            <SkillItem name="SUPABASE (BAAS)" pct="40%" inView={inView} isDark={isDark} />
          </div>

          {/* Design Skill Column */}
          <div className="rv">
            <h3 className={`text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b font-['Geist_Mono'] transition-colors duration-500 ${isDark ? 'text-white border-[rgba(255,255,255,0.15)]' : 'text-black border-[rgba(0,0,0,0.15)]'}`}>DESIGN</h3>
            <SkillItem name="CANVA" pct="92%" inView={inView} isDark={isDark} />
            <SkillItem name="FIGMA" pct="45%" inView={inView} isDark={isDark} />
            <SkillItem name="ADOBE PHOTOSHOP" pct="63%" inView={inView} isDark={isDark} />
            <SkillItem name="ADOBE PREMIERE" pct="55%" inView={inView} isDark={isDark} />
          </div>

          {/* Network Skill Column */}
          <div className="rv">
            <h3 className={`text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b font-['Geist_Mono'] transition-colors duration-500 ${isDark ? 'text-white border-[rgba(255,255,255,0.15)]' : 'text-black border-[rgba(0,0,0,0.15)]'}`}>NETWORK</h3>
            <SkillItem name="CISCO PACKET TRACER" pct="80%" inView={inView} isDark={isDark} />
            <SkillItem name="TCP/IP & SUBNETTING" pct="72%" inView={inView} isDark={isDark} />
            <SkillItem name="ROUTER / SWITCH CONFIG" pct="65%" inView={inView} isDark={isDark} />
          </div>

          {/* Tools / Logo Loop Column */}
          <div className="rv-r">
            <h3 className={`text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b font-['Geist_Mono'] transition-colors duration-500 ${isDark ? 'text-white border-[rgba(255,255,255,0.15)]' : 'text-black border-[rgba(0,0,0,0.15)]'}`}>TOOLS</h3>
            <div className="w-full relative mt-4 pt-2 overflow-hidden h-[60px]">
              <LogoLoop
                logos={techLogos}
                speed={40}
                direction="left"
                logoHeight={28}
                gap={36}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={false}
                ariaLabel="Technology stack tools"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;