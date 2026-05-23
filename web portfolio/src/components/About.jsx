import React from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import starIcon from '../assets/figma/star_logo.svg'; 

// Komponen Card - Menggunakan state theme langsung biar anti-gagal
const AboutCard = ({ num, dots, title, isJustify, children }) => {
  const { theme } = useThemeLang();
  const isDark = theme === 'dark';

  return (
    <div className={`group w-full flex flex-col mb-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl cursor-default border
      ${isDark 
        ? 'bg-[#111110] border-[rgba(255,255,255,0.15)] hover:bg-white hover:border-white' 
        : 'bg-white border-[rgba(17,17,16,.15)] hover:bg-[#111110] hover:border-[#111110]'
      }`}
    >
      <div className={`p-2.5 flex gap-1.5 px-4 transition-colors duration-500 border-b
        ${isDark 
          ? 'border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(17,17,16,.15)]' 
          : 'border-[rgba(17,17,16,.15)] group-hover:border-[rgba(255,255,255,0.15)]'
        }`}
      >
        {Array.from({ length: dots }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[6px] h-[6px] rounded-full transition-colors duration-500 
              ${isDark ? 'bg-white/40 group-hover:bg-[#111110]' : 'bg-black/40 group-hover:bg-white'}`} 
          />
        ))}
      </div>
      <div className="p-6 md:p-8 flex flex-col">
        <span 
          className={`text-[11px] font-normal tracking-[0.1em] mb-8 transition-colors duration-500 
            ${isDark ? 'text-white group-hover:text-[#111110]' : 'text-[#111110] group-hover:text-white'}`} 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {num}
        </span>
        <span 
          className={`text-[11px] font-normal tracking-[0.1em] uppercase mb-6 transition-colors duration-500 
            ${isDark ? 'text-white group-hover:text-[#111110]' : 'text-[#111110] group-hover:text-white'}`} 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {title}
        </span>
        <div 
          className={`text-[10px] tracking-[0.08em] leading-[2.2] uppercase font-normal transition-colors duration-500 
            ${isDark ? 'text-white/80 group-hover:text-[#111110]' : 'text-black/80 group-hover:text-white'} 
            ${isJustify ? 'text-justify' : 'text-left'}`} 
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Komponen Tags - Menggunakan state theme langsung biar anti-gagal
const SkillTag = ({ text }) => {
  const { theme } = useThemeLang();
  const isDark = theme === 'dark';

  return (
    <div 
      className={`group flex items-center justify-center px-4 py-1.5 border rounded-full transition-all duration-300 ease-out hover:scale-110 cursor-default whitespace-nowrap
        ${isDark 
          ? 'bg-[#111110] border-[rgba(255,255,255,0.25)] hover:bg-white hover:border-white' 
          : 'bg-white border-[rgba(17,17,16,.25)] hover:bg-[#111110] hover:border-[#111110]'
        }`}
    >
      <span 
        className={`text-[10px] tracking-[0.1em] uppercase font-normal transition-colors duration-300 
          ${isDark ? 'text-white/80 group-hover:text-[#111110]' : 'text-black/70 group-hover:text-white'}`} 
        style={{ fontFamily: "'Geist Mono', monospace" }}
      >
        {text}
      </span>
    </div>
  );
};

const About = () => {
  const { lang } = useThemeLang();
  const tickerItems = Array(6).fill("WELCOME TO MY PORTFOLIO");

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen pt-40 pb-24 px-10 md:px-16 lg:px-24 overflow-hidden flex flex-col justify-center" 
      style={{ 
        backgroundColor: '#D4D4D4',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px'
      }}
    >
      
      {/* ================= CORNER DECORATIONS (+) ================= */}
      <div className="absolute top-8 left-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute top-8 right-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute bottom-8 left-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute bottom-8 right-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>

      {/* ================= BACKGROUND ELEMENTS ================= */}
      <img 
        src={starIcon} 
        alt="star decoration" 
        className="absolute top-32 right-12 w-16 h-16 opacity-20 animate-[spin_10s_linear_infinite] pointer-events-none select-none z-0" 
      />

      <div className="absolute bottom-20 left-12 z-0 pointer-events-none select-none flex flex-col items-start gap-1 opacity-15 text-black font-['Geist_Mono'] text-[9px] tracking-[0.15em]">
        <div>[ SRC // SECTIONS_ABOUT.JSX ]</div>
        <div>[ STATUS // CORE_LOADED ]</div>
        <svg className="w-32 h-5 mt-1" viewBox="0 0 120 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M0 10 H40 L44 4 L48 16 L52 2 L56 18 L60 8 L64 12 L68 10 H120" strokeDasharray="1.5 1.5" />
        </svg>
      </div>

      <style>
        {`
          @keyframes tickerTape {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-ticker {
            animation: tickerTape 20s linear infinite;
            display: inline-flex;
            white-space: nowrap;
          }
        `}
      </style>

      {/* RUNNING TEXT TICKER TAPE */}
      <div className="absolute top-0 left-0 w-full bg-[#111110] border-b border-black/10 py-2.5 z-30 flex overflow-hidden select-none pointer-events-none shadow-md">
        <div className="animate-ticker w-max">
          <div className="flex items-center">
            {tickerItems.map((text, i) => (
              <React.Fragment key={`set1-${i}`}>
                <span className="text-[#EBE6E0] text-[11px] tracking-[0.25em] font-['Geist_Mono'] px-6">
                  {text}
                </span>
                <span className="text-[#EBE6E0] opacity-50 text-[14px]">✦</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center">
            {tickerItems.map((text, i) => (
              <React.Fragment key={`set2-${i}`}>
                <span className="text-[#EBE6E0] text-[11px] tracking-[0.25em] font-['Geist_Mono'] px-6">
                  {text}
                </span>
                <span className="text-[#EBE6E0] opacity-50 text-[14px]">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER TITLE (Mobile) */}
      <div className="block lg:hidden mt-4 mb-10 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.2em] text-black/50 uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
            {lang === 'id' ? 'MENGENAL SAYA' : 'GETTING TO KNOW ME'}
          </span>
          <div className="text-[40px] font-normal tracking-tight leading-none text-black flex items-baseline">
            {lang === 'id' ? (
              <>
                <span className="font-['Inspiration'] text-[#EBE6E0] text-[55px] -mr-1.5">T</span>ENTAN
                <span className="font-['Inspiration'] text-[#EBE6E0] text-[55px] -ml-1">G SA</span>YA
              </>
            ) : (
              <>
                <span className="font-['Inspiration'] text-[#EBE6E0] text-[55px] -mr-1.5">A</span>BOU
                <span className="font-['Inspiration'] text-[#EBE6E0] text-[55px] -ml-0.5">T M</span>E
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-8 lg:gap-14 mt-4 relative z-10">

        {/* Kolom 1: 001 & 002 */}
        <div className="flex flex-col">
          <AboutCard num="001" dots={1} title={lang === 'id' ? 'LATAR BELAKANG KELUARGA' : 'FAMILY BACKGROUND'} isJustify={true}>
            {lang === 'id' 
              ? 'LAHIR DAN BESAR DI SEMARANG, JAWA TENGAH. SAYA ANAK KEDUA DARI DUA BERSAUDARA, TINGGAL BERSAMA KELUARGA YANG MENDUKUNG YANG MENJADI MOTIVASI UTAMA SAYA DALAM MENITI KARIR DI INDUSTRI TEKNOLOGI.'
              : 'BORN AND RAISED IN SEMARANG, CENTRAL JAVA. I AM THE SECOND OF TWO SIBLINGS, LIVING WITH A SUPPORTIVE FAMILY WHO HAS BEEN MY MAIN MOTIVATION IN PURSUING A CAREER IN THE TECH INDUSTRY.'}
          </AboutCard>

          <AboutCard num="002" dots={2} title={lang === 'id' ? 'VISI MASA DEPAN' : 'FUTURE VISION'} isJustify={true}>
            {lang === 'id'
              ? 'KOMITMEN SAYA TERLETAK PADA MENGASAH KEMAMPUAN FRONTEND DAN BACKEND SAYA. SAYA PERCAYA BAHWA KONSISTENSI DAN RASA HAUS AKAN PENGETAHUAN ADALAH HAL PENTING UNTUK MENJADI PENGEMBANG FULLSTACK PROFESIONAL.'
              : 'MY COMMITMENT LIES IN SHARPENING MY FRONTEND AND BACKEND CAPABILITIES. I BELIEVE THAT CONSISTENCY AND AN ENDLESS THIRST FOR KNOWLEDGE ARE ESSENTIAL TO BECOMING A PROFESSIONAL FULLSTACK DEVELOPER.'}
          </AboutCard>
        </div>

        {/* Kolom 2: 003 & 004 */}
        <div className="flex flex-col">
          <AboutCard num="003" dots={3} title={lang === 'id' ? 'HOBI & MINAT' : 'HOBBIES & INTERESTS'} isJustify={false}>
            <div className="flex flex-col gap-1">
              <span>• {lang === 'id' ? 'MEMBACA BUKU & ARTIKEL TI' : 'READING BOOKS & IT ARTICLES'}</span>
              <span>• {lang === 'id' ? 'MENGEKSPLORASI LOGIKA KODING' : 'EXPLORING CODING LOGIC'}</span>
              <span>• {lang === 'id' ? 'DESAIN VISUAL & ANTARMUKA' : 'VISUAL & INTERFACE DESIGN'}</span>
              <span>• {lang === 'id' ? 'MENDENGARKAN MUSIK' : 'LISTENING TO MUSIC'}</span>
              <span>• {lang === 'id' ? 'MENONTON FILM' : 'WATCHING MOVIES'}</span>
            </div>
          </AboutCard>

          <AboutCard num="004" dots={4} title={lang === 'id' ? 'PERJALANAN PENDIDIKAN' : 'EDUCATIONAL JOURNEY'} isJustify={false}>
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-normal text-inherit">• SMK NEGERI 7 SEMARANG</span><br />
                <span className="opacity-70">INFORMATION SYSTEMS, NETWORKS & APPLICATIONS<br />2024 - 2028</span>
              </div>
              <div>
                <span className="font-normal text-inherit">• SMP NEGERI 5 SEMARANG</span><br />
                <span className="opacity-80">2021 - 2024</span>
              </div>
              <div>
                <span className="font-normal text-inherit">• SD NEGERI SUKOREJO 1</span><br />
                <span className="opacity-80">2015 - 2021</span>
              </div>
              <div>
                <span className="font-normal text-inherit">• TK TURUS KAMULYAN</span><br />
                <span className="opacity-80">2014 - 2015</span>
              </div>
            </div>
          </AboutCard>
        </div>

        {/* Kolom 3: Skills & Vertical Title */}
        <div className="flex flex-col justify-between h-full pt-2 lg:ml-4">
          <div className="flex flex-col">
            <div className="mb-10">
              <div className="text-[11px] font-normal tracking-[0.12em] uppercase mb-4 text-[#111110]" style={{ fontFamily: "'Geist Mono', monospace" }}>SOFT SKILLS</div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3"><SkillTag text="CRITICAL THINKING" /></div>
                <div className="flex flex-wrap gap-3"><SkillTag text="TEAMWORK" /><SkillTag text="TIME MANAGEMENT" /></div>
                <div className="flex flex-wrap gap-3"><SkillTag text="PROBLEM SOLVING" /><SkillTag text="FAST LEARNER" /></div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-normal tracking-[0.12em] uppercase mb-4 text-[#111110]" style={{ fontFamily: "'Geist Mono', monospace" }}>HARD SKILLS</div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-3"><SkillTag text="HTML & CSS" /><SkillTag text="JAVASCRIPT" /></div>
                <div className="flex flex-wrap gap-3"><SkillTag text="BOOTSTRAP TAILWIND" /><SkillTag text="FIGMA" /></div>
                <div className="flex flex-wrap gap-3"><SkillTag text="CISCO PACKET TRACER" /></div>
                <div className="flex flex-wrap gap-3"><SkillTag text="SUPABASE (BAAS)" /></div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-end mt-24 pb-8">
            <div className="flex gap-4 items-end">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.2em] text-black/50 uppercase pb-2" style={{ fontFamily: "'Geist Mono', monospace" }}>
                {lang === 'id' ? 'MENGENAL SAYA' : 'GETTING TO KNOW ME'}
              </span>
              <div className="[writing-mode:vertical-rl] text-[clamp(40px,5vw,70px)] font-normal tracking-tight leading-[0.9] text-black flex items-center">
                {lang === 'id' ? (
                  <>
                    <span className="font-['Inspiration'] text-[#EBE6E0] text-[1.2em] mb-1">T</span>ENTAN
                    <span className="font-['Inspiration'] text-[#EBE6E0] text-[1.2em] my-1">G SA</span>YA
                  </>
                ) : (
                  <>
                    <span className="font-['Inspiration'] text-[#EBE6E0] text-[1.2em] mb-1">A</span>BOU
                    <span className="font-['Inspiration'] text-[#EBE6E0] text-[1.2em] mt-1">T M</span>E
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;