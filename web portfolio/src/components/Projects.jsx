import React, { useEffect, useRef, useState } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const Tile = ({ num, icon, tags, titleKey, descKey }) => {
  const { t } = useThemeLang();
  const [spot, setSpot] = useState({ left: 0, top: 0 });
  const tileRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tileRef.current) return;
    const r = tileRef.current.getBoundingClientRect();
    setSpot({ left: e.clientX - r.left, top: e.clientY - r.top });
  };

  return (
    <div 
      ref={tileRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden cursor-pointer bg-bg3 tile group
        ${num === '01' ? 'min-h-[420px] md:min-h-[420px] max-md:min-h-[220px] max-md:aspect-[16/9]' : ''}
        ${num === '02' || num === '03' ? 'aspect-[4/3] max-md:min-h-[220px] max-md:aspect-[16/9]' : ''}
        ${num === '04' ? 'md:col-span-2 aspect-[21/6] max-md:min-h-[220px] max-md:aspect-[16/9]' : ''}
      `}
    >
      <div 
        className="absolute pointer-events-none rounded-full w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 z-[1] group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,.08) 0%, transparent 70%)',
          left: spot.left,
          top: spot.top
        }}
      ></div>
      <div className="absolute top-4 left-4 font-bebas text-[12px] tracking-[2px] text-text3 bg-bg py-[3px] px-2 rounded-[3px] transition-opacity duration-300 group-hover:opacity-0">{num}</div>
      
      <div className="w-full h-full min-h-inherit flex items-center justify-center flex-col gap-[10px] text-text3 text-[11px] font-dm transition-all duration-400 group-hover:brightness-50 group-hover:contrast-110 group-hover:scale-105 t-ph">
        {icon}
        <span>Screenshot</span>
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(0,0,0,.9)_100%)] opacity-0 transition-opacity duration-400 flex flex-col justify-end p-6 group-hover:opacity-100">
        <div className="flex gap-[5px] flex-wrap mb-2">
          {tags.map(tag => (
            <span key={tag} className="text-[8px] tracking-[.08em] py-[2px] px-[7px] rounded-[2px] bg-[rgba(240,239,232,.12)] text-[rgba(240,239,232,.6)] border border-[rgba(240,239,232,.15)] font-dm">{tag}</span>
          ))}
        </div>
        <div className="font-bebas text-[22px] tracking-[2px] text-[#f0efe9] mb-1">{t(titleKey)}</div>
        <div className="text-[11px] text-[rgba(240,239,232,.7)] leading-[1.6] mb-3 font-epilogue">{t(descKey)}</div>
        <a href="#" className="font-dm text-[9px] tracking-[.1em] text-[#f0efe9] no-underline border-b border-[rgba(240,239,232,.3)] pb-[2px] w-max transition-colors duration-200 hover:border-[#f0efe9]">
          {t('vp')}
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, isDark } = useThemeLang();
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let W, H, t_time = 0, animationId;

    const resize = () => {
      W = cvs.width = cvs.offsetWidth;
      H = cvs.height = cvs.offsetHeight;
    };

    const orbs = [
      { x: .2, y: .3, r: .3, spd: .0007 },
      { x: .8, y: .6, r: .35, spd: .0009 },
      { x: .5, y: .8, r: .28, spd: .0006 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach((o, i) => {
        o.x += Math.sin(t_time * o.spd + i) * 0.0003;
        o.y += Math.cos(t_time * o.spd * 1.3 + i) * 0.0002;
      });
      const alpha = isDark ? .06 : .04;
      orbs.forEach(o => {
        const grd = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r * Math.min(W, H));
        grd.addColorStop(0, `rgba(${isDark ? '200,200,190' : '80,80,70'},${alpha})`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
      });
      t_time++;
      animationId = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize, true);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize, true);
    };
  }, [isDark]);

  return (
    <section id="portfolio" className="relative overflow-hidden min-h-screen pt-[52px] bg-bg2 print:hidden">
      <canvas ref={canvasRef} id="portfolio-canvas" className="absolute inset-0 z-0 pointer-events-none w-full h-full"></canvas>
      <div className="relative z-[2] max-w-[1080px] mx-auto px-8 pt-28 pb-24">
        
        <div className="flex justify-between items-end mb-16 flex-wrap gap-4 relative z-[1] rv">
          <div>
            <div className="font-playfair text-[clamp(36px,6vw,64px)] font-normal leading-[1] tracking-[-1px] text-text">
              {t('pttl').map((node, i) => React.isValidElement(node) && node.type === 'br' ? <br key={`br-${i}`}/> : (i === 0 ? <React.Fragment key={i}>{node}</React.Fragment> : <em key={i} className="italic text-text3">{node}</em>))}
            </div>
          </div>
          <div className="font-dm text-[10px] text-text3 tracking-[.15em] text-right">
            <div>{t('ptm1')}</div>
            <div>{t('ptm2')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] relative z-[1] rv">
          <Tile 
            num="01" 
            icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>}
            tags={['HTML', 'CSS', 'JS']}
            titleKey="p1t" descKey="p1d"
          />
          <Tile 
            num="02" 
            icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l4 4"/></svg>}
            tags={['Cisco', 'Packet Tracer']}
            titleKey="p2t" descKey="p2d"
          />
          <Tile 
            num="03" 
            icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
            tags={['Canva', 'Branding']}
            titleKey="p3t" descKey="p3d"
          />
          <Tile 
            num="04" 
            icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 4h16v16H4zM4 9h16M9 9v11"/></svg>}
            tags={['PHP', 'MySQL', 'Bootstrap']}
            titleKey="p4t" descKey="p4d"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
