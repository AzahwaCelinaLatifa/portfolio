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

const SkillItem = ({ name, pct, inView }) => {
  const fillWidth = inView ? pct : '0%';
  const targetNumber = parseInt(pct.replace('%', ''), 10);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCurrentNumber(0);
      return;
    }

    let startTimestamp = null;
    const duration = 1200; 

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetNumber);
      
      setCurrentNumber(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentNumber(targetNumber);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, targetNumber]);

  return (
    <div className="mb-4">
      <div className="text-[11px] tracking-[0.08em] font-normal uppercase mb-1.5 text-black">{name}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[2px] bg-black/10 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#111110] transition-[width] duration-[1200ms] ease-out" 
            style={{ width: fillWidth }} 
          />
        </div>
        <span 
          className="text-[11px] tracking-[0.1em] text-black/50 min-w-[40px] text-right" 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {String(currentNumber).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
};

const techLogos = [
  { node: <SiGithub className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "GitHub" },
  { node: <VscVscode className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "VS Code" },
  { node: <SiSupabase className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "Supabase" },
  { node: <SiFigma className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "Figma" },
  { node: <SiVirtualbox className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "VirtualBox" },
  { node: <SiCanva className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "Canva" },
  { node: <SiCisco className="w-full h-full text-black/40 transition-colors duration-300 hover:text-[#111110]" />, title: "Cisco Packet Tracer" },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { lang } = useThemeLang();

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
      className="relative w-full lg:min-h-screen flex flex-col justify-center py-24 px-6 md:px-10 font-['Geist_Mono'] font-normal overflow-hidden bg-white text-black" 
    >
      
      {/* ================= DOT BACKGROUND (Samar) ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,rgba(227,242,253,0.3)_0%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
      {/* ========================================================== */}

      <div className="max-w-[1100px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-end items-start mb-16 rv">
          {/* Title - Presisi di Sisi Kanan Tanpa Elemen Tambahan */}
          <div className="text-right">
            <h2 className="text-[clamp(32px,5vw,60px)] font-normal tracking-tight leading-[0.95] mb-2 font-['Geist_Mono'] text-black">
              <span className="font-['Inspiration'] font-normal text-[1.15em] text-[#EBE6E0] -mr-1">S</span>
              KI
              <span className="font-['Inspiration'] font-normal text-[1.15em] text-[#EBE6E0] -ml-0.5">LL</span>
              S
            </h2>
            <span className="text-[11px] tracking-[0.25em] uppercase text-black/50 block mt-1" style={{ fontFamily: "'Geist Mono', monospace" }}>
              {lang === 'id' ? 'DI BIDANG APA SAYA UNGGUL' : 'WHAT I EXCEL AT'}
            </span>
          </div>
        </div>

        {/* Grid Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Web Skill Column */}
          <div className="rv-l">
            <h3 className="text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b border-black/15 font-['Geist_Mono'] text-black">WEB</h3>
            <SkillItem name="HTML & CSS" pct="85%" inView={inView} />
            <SkillItem name="JAVASCRIPT" pct="60%" inView={inView} />
            <SkillItem name="REACT.JS" pct="52%" inView={inView} />
            <SkillItem name="BOOTSTRAP / TAILWIND" pct="55%" inView={inView} />
            <SkillItem name="SUPABASE (BAAS)" pct="40%" inView={inView} />
          </div>

          {/* Design Skill Column */}
          <div className="rv">
            <h3 className="text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b border-black/15 font-['Geist_Mono'] text-black">DESIGN</h3>
            <SkillItem name="CANVA" pct="92%" inView={inView} />
            <SkillItem name="FIGMA" pct="45%" inView={inView} />
            <SkillItem name="ADOBE PHOTOSHOP" pct="63%" inView={inView} />
            <SkillItem name="ADOBE PREMIERE" pct="55%" inView={inView} />
          </div>

          {/* Network Skill Column */}
          <div className="rv">
            <h3 className="text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b border-black/15 font-['Geist_Mono'] text-black">NETWORK</h3>
            <SkillItem name="CISCO PACKET TRACER" pct="80%" inView={inView} />
            <SkillItem name="TCP/IP & SUBNETTING" pct="72%" inView={inView} />
            <SkillItem name="ROUTER / SWITCH CONFIG" pct="65%" inView={inView} />
          </div>

          {/* Tools / Logo Loop Column */}
          <div className="rv-r">
            <h3 className="text-[13px] font-normal tracking-[0.1em] uppercase mb-6 pb-2 border-b border-black/15 font-['Geist_Mono'] text-black">TOOLS</h3>
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