import React, { useEffect, useRef } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const Skills = () => {
  const { t, isDark } = useThemeLang();
  const canvasRef = useRef(null);

  // Canvas Animation
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let W, H, t_time = 0, animationId;

    const resize = () => {
      W = cvs.width = cvs.offsetWidth;
      H = cvs.height = cvs.offsetHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const gap = 28, clr = isDark ? '240,239,232' : '17,17,16';
      const cols = Math.ceil(W / gap), rows = Math.ceil(H / gap);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap + gap / 2, y = r * gap + gap / 2;
          const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2);
          const wave = Math.sin(dist * .02 - t_time * .8) * .5 + .5;
          const radius = wave * 2.8 + .4;
          const alpha = wave * .35 + .05;
          ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${clr},${alpha})`; ctx.fill();
        }
      }
      t_time += .04;
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
    <section id="skills" className="relative overflow-hidden min-h-screen pt-[52px] bg-bg print:hidden">
      <canvas ref={canvasRef} id="skills-canvas" className={`absolute inset-0 z-0 pointer-events-none ${isDark ? 'opacity-20' : 'opacity-[0.35]'}`}></canvas>
      
      <div className="relative z-[2] max-w-[1080px] mx-auto px-8 pt-28 pb-24">
        
        <div className="flex items-baseline gap-8 mb-16 rv">
          <div className="font-bebas text-[clamp(70px,12vw,140px)] leading-[0.9] text-border tracking-[-2px] transition-colors duration-350 par" data-par="0.3">02</div>
          <div>
            <div className="font-epilogue text-[clamp(22px,4vw,40px)] font-bold leading-[1.1] text-text tracking-[-1px]">{t('skt')}</div>
            <div className="font-dm text-[10px] text-text3 tracking-[.15em] mt-[0.4rem]">{t('sksub')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-16 relative z-[1]">
          
          <div className="rv-l sk-group">
            <div className="mb-12">
              <div className="font-bebas text-[26px] tracking-[2px] text-text3 mb-6 border-l-[3px] border-sv2 pl-3">WEB</div>
              {[
                { n: 'HTML5 & CSS3', p: '85%' },
                { n: 'JavaScript', p: '60%' },
                { n: 'Responsive Design', p: '78%' },
                { n: 'Bootstrap / Tailwind', p: '52%' },
                { n: 'PHP & MySQL', p: '45%' },
              ].map(skill => (
                <div key={skill.n} className="mb-5">
                  <div className="flex justify-between items-baseline mb-[6px]">
                    <span className="text-[13px] text-text font-semibold">{skill.n}</span>
                    <span className="font-dm text-[10px] text-text3">{skill.p}</span>
                  </div>
                  <div className="h-[3px] bg-border rounded-[2px] overflow-visible relative">
                    <div 
                      className="h-full rounded-[2px] bg-[linear-gradient(90deg,var(--sv2),var(--sv3),var(--sv2))] origin-left scale-x-0 transition-transform duration-[1.4s] ease-custom shadow-[0_0_8px_rgba(160,160,150,.4)] relative sk-fill after:content-[''] after:absolute after:-right-[3px] after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-svg-grad2 after:border after:border-sv2 after:shadow-[0_0_6px_rgba(180,180,160,.6)]" 
                      data-w={parseInt(skill.p)/100}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <div className="font-bebas text-[26px] tracking-[2px] text-text3 mb-6 border-l-[3px] border-sv2 pl-3">NETWORK</div>
              {[
                { n: 'Cisco Packet Tracer', p: '80%' },
                { n: 'TCP/IP & Subnetting', p: '72%' },
                { n: 'Router / Switch Config', p: '65%' },
              ].map(skill => (
                <div key={skill.n} className="mb-5">
                  <div className="flex justify-between items-baseline mb-[6px]">
                    <span className="text-[13px] text-text font-semibold">{skill.n}</span>
                    <span className="font-dm text-[10px] text-text3">{skill.p}</span>
                  </div>
                  <div className="h-[3px] bg-border rounded-[2px] overflow-visible relative">
                    <div className="h-full rounded-[2px] bg-[linear-gradient(90deg,var(--sv2),var(--sv3),var(--sv2))] origin-left scale-x-0 transition-transform duration-[1.4s] ease-custom shadow-[0_0_8px_rgba(160,160,150,.4)] relative sk-fill after:content-[''] after:absolute after:-right-[3px] after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-svg-grad2 after:border after:border-sv2 after:shadow-[0_0_6px_rgba(180,180,160,.6)]" data-w={parseInt(skill.p)/100}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv-r sk-group">
            <div className="mb-12">
              <div className="font-bebas text-[26px] tracking-[2px] text-text3 mb-6 border-l-[3px] border-sv2 pl-3">DESIGN</div>
              {[
                { n: 'Canva', p: '92%' },
                { n: 'Adobe Photoshop', p: '63%' },
                { n: 'Figma (Dasar)', p: '45%' },
                { n: 'Adobe Premiere', p: '55%' },
              ].map(skill => (
                <div key={skill.n} className="mb-5">
                  <div className="flex justify-between items-baseline mb-[6px]">
                    <span className="text-[13px] text-text font-semibold">{skill.n}</span>
                    <span className="font-dm text-[10px] text-text3">{skill.p}</span>
                  </div>
                  <div className="h-[3px] bg-border rounded-[2px] overflow-visible relative">
                    <div className="h-full rounded-[2px] bg-[linear-gradient(90deg,var(--sv2),var(--sv3),var(--sv2))] origin-left scale-x-0 transition-transform duration-[1.4s] ease-custom shadow-[0_0_8px_rgba(160,160,150,.4)] relative sk-fill after:content-[''] after:absolute after:-right-[3px] after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-svg-grad2 after:border after:border-sv2 after:shadow-[0_0_6px_rgba(180,180,160,.6)]" data-w={parseInt(skill.p)/100}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <div className="font-bebas text-[26px] tracking-[2px] text-text3 mb-6 border-l-[3px] border-sv2 pl-3">TOOLS</div>
              <div className="flex flex-wrap gap-[7px] mt-3">
                {['Git & GitHub', 'VS Code', 'Linux Ubuntu', 'Microsoft Office', 'WordPress', 'Wireshark', 'VirtualBox', 'XAMPP'].map(tool => (
                  <div key={tool} className="font-dm text-[10px] tracking-[.05em] py-[6px] px-[13px] rounded-[4px] border border-border text-text2 bg-card transition-all duration-200 cursor-default relative overflow-hidden group hover:text-text hover:border-sv2 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,.1)]">
                    <span className="absolute inset-0 bg-svg-grad opacity-0 transition-opacity duration-200 group-hover:opacity-100 before:content-['']"></span>
                    <span className="relative z-[1]">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;
