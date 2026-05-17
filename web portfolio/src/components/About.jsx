import React from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const AboutCard = ({ num, dots, title, isJustify, children }) => (
  <div className="group w-full border border-[rgba(17,17,16,.2)] bg-transparent flex flex-col mb-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-[#111110] hover:border-[#111110] hover:shadow-2xl cursor-default">
    <div className="border-b border-[rgba(17,17,16,.2)] p-2.5 flex gap-1.5 px-4 transition-colors duration-500 group-hover:border-[rgba(255,255,255,0.15)]">
      {Array.from({ length: dots }).map((_, i) => (
        <div key={i} className="w-[6px] h-[6px] rounded-full bg-[#888880] transition-colors duration-500 group-hover:bg-white" />
      ))}
    </div>
    <div className="p-6 md:p-8 flex flex-col">
      <span className="text-[11px] font-normal tracking-[0.1em] mb-8 text-[#111110] transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "'Geist Mono', monospace" }}>
        {num}
      </span>
      <span className="text-[11px] font-normal tracking-[0.1em] uppercase mb-6 text-[#111110] transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "'Geist Mono', monospace" }}>
        {title}
      </span>
      <div className={`text-[10px] tracking-[0.08em] leading-[2.2] uppercase text-[#666] font-normal transition-colors duration-500 group-hover:text-gray-300 ${isJustify ? 'text-justify' : 'text-left'}`} style={{ fontFamily: "'Geist Mono', monospace" }}>
        {children}
      </div>
    </div>
  </div>
);

const SkillTag = ({ text }) => (
  <div 
    className="group flex items-center justify-center px-4 py-1.5 border border-[rgba(17,17,16,.3)] rounded-full transition-all duration-300 ease-out hover:scale-110 hover:bg-black hover:border-black cursor-default whitespace-nowrap bg-transparent"
  >
    <span 
      className="text-black/50 text-[10px] tracking-[0.1em] uppercase font-normal transition-colors duration-300 group-hover:text-white" 
      style={{ fontFamily: "'Geist Mono', monospace" }}
    >
      {text}
    </span>
  </div>
);

const About = () => {
  const { lang } = useThemeLang();

  return (
    <section id="about" className="relative w-full min-h-screen py-24 px-10 md:px-16 lg:px-24" style={{ background: 'var(--bg)' }}>
      
      {/* HEADER TITLE (Mobile & Desktop) */}
      <div className="block lg:hidden mb-12">
        <div className="flex flex-col gap-2">
           {/* GETTING TO KNOW ME di mobile (Horizontal) */}
          <span className="text-[10px] tracking-[0.2em] text-[#888880] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
            {lang === 'id' ? 'MENGENAL SAYA' : 'GETTING TO KNOW ME'}
          </span>
          <div className="text-[40px] font-normal tracking-tight leading-none">
            {lang === 'id' ? <><span className="accent-font">T</span>ENTAN<span className="accent-font">G SA</span>YA</> : <><span className="accent-font">A</span>BOU<span className="accent-font">T M</span>E</>}
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr_300px] gap-8 lg:gap-14">

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

          {/* Vertical Title (Desktop Only) */}
          <div className="hidden lg:flex justify-end mt-24 pb-8">
            <div className="flex gap-4 items-end">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.2em] text-[#888880] uppercase pb-2" style={{ fontFamily: "'Geist Mono', monospace" }}>
                {lang === 'id' ? 'MENGENAL SAYA' : 'GETTING TO KNOW ME'}
              </span>
              <div className="[writing-mode:vertical-rl] text-[clamp(40px,5vw,70px)] font-normal tracking-tight leading-[0.9]">
                {lang === 'id' ? <><span className="accent-font">T</span>ENTAN<span className="accent-font">G SA</span>YA</> : <><span className="accent-font">A</span>BOU<span className="accent-font">T M</span>E</>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;