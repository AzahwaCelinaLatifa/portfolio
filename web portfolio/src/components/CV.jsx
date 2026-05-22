import React from 'react';
import ScrambledText from './ScrambledText';
import { useThemeLang } from '../context/ThemeLangContext';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
// Import foto dari folder assets
import fotoCV from '../assets/fotocv.png';

const CV = () => {
  const { lang } = useThemeLang();

  return (
    // FIX: py-12 md:py-24 diubah dan dipecah menjadi padding atas/bawah & margin bawah agar jaraknya pas
    <section 
      id="cv" 
      className="relative flex flex-col justify-center items-center min-h-screen pt-12 md:pt-16 pb-16 md:pb-20 mb-12 md:mb-16 px-4 md:px-8 font-['Geist_Mono'] font-normal overflow-hidden" 
      style={{ 
        backgroundColor: '#D4D4D4',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px'
      }}
    >
      
      {/* DEKORASI BGB: CROSSHAIRS (Tanda + di 4 Sudut - Diperbesar) */}
      <div className="absolute top-8 left-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute top-8 right-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute bottom-8 left-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>
      <div className="absolute bottom-8 right-8 text-black/15 text-3xl pointer-events-none hidden md:block select-none">+</div>

      {/* DEKORASI BGB: ROTATED SIDE TEXT (Teks Vertikal Kiri - Breakpoint diturunkan ke lg) */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-black/20 text-[10px] tracking-[0.4em] pointer-events-none uppercase whitespace-nowrap select-none">
        PORTFOLIO V.1.0 — ©2026 AZAHWA
      </div>

      {/* HEADER HALAMAN */}
      <div className="w-full max-w-[1100px] mx-auto flex flex-col items-start mb-10 md:mb-14 px-2 lg:px-0 z-10 relative">
        
        {/* TITLE (MIX FONT): RESU (Inspiration) + ME (Geist Mono) */}
        <h1 className="flex items-baseline uppercase mb-1 md:mb-2">
          <span className="font-['Inspiration'] font-normal text-[55px] md:text-[75px] leading-none -mr-1.5 md:-mr-2 text-[#EBE6E0]">R</span>
          <span className="font-['Inspiration'] font-normal text-[55px] md:text-[75px] leading-none -mr-1.5 md:-mr-2 text-[#EBE6E0]">E</span>
          <span className="font-['Inspiration'] font-normal text-[55px] md:text-[75px] leading-none -mr-1.5 md:-mr-2 text-[#EBE6E0]">S</span>
          <span className="font-['Inspiration'] font-normal text-[55px] md:text-[75px] leading-none mr-1.5 md:mr-2 text-[#EBE6E0]">U</span>
          <span className="font-['Geist_Mono'] font-normal text-[45px] md:text-[65px] tracking-normal uppercase leading-none text-black">ME</span>
        </h1>

        {/* SUBTITLE & BARCODE DECORATION */}
        <div className="flex flex-col items-start ml-2 md:ml-4">
          <p className="font-['Geist_Mono'] text-[9px] md:text-[11px] tracking-[0.25em] uppercase text-black/50 mb-2">
            {lang === 'id' ? 'LATAR BELAKANG SAYA' : 'MY PROFESSIONAL JOURNEY'}
          </p>
          {/* Aksen Barcode Mini */}
          <div className="flex gap-0.5 opacity-30 mix-blend-multiply select-none pointer-events-none">
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-0.5 h-3 bg-black"></div>
            <div className="w-2 h-3 bg-black"></div>
            <div className="w-0.5 h-3 bg-black"></div>
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-3 h-3 bg-black"></div>
            <div className="w-0.5 h-3 bg-black"></div>
            <div className="w-1.5 h-3 bg-black"></div>
          </div>
        </div>

      </div>

      {/* WRAPPER TUMPUKAN KERTAS - Lebar A4 (700px) */}
      <div className="relative w-full max-w-[700px] mx-auto z-10">
        
        {/* KERTAS BELAKANG (Efek Tumpukan) */}
        <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3 w-full h-full bg-white border border-black/20 shadow-sm z-0 rounded-none"></div>

        {/* KERTAS DEPAN (Konten Utama) - Dihapus overflow-hidden biar ngga kepotong */}
        <div className="relative bg-white border border-black/20 shadow-md p-6 sm:p-8 md:p-10 z-10 rounded-none">

          {/* Download CV top-right */}
          <div className="flex justify-end mb-4 md:mb-6">
            <a href="#" onClick={(e) => { e.preventDefault(); window.print(); }}
              className="inline-flex items-center gap-1.5 bg-transparent border-0 border-b border-black/80 text-black text-[9px] md:text-[10px] font-normal tracking-[0.08em] uppercase pb-0.5 cursor-pointer w-fit transition-all group hover:border-black/40 z-10">
              <span className="group-hover:opacity-70 transition-opacity font-['Geist_Mono']">
                <ScrambledText radius={60} duration={0.6} speed={0.5}>{lang === 'id' ? 'UNDUH CV' : 'DOWNLOAD CV'}</ScrambledText>
              </span>
              <img 
                src={arrowIcon} 
                alt="Arrow" 
                className="w-[8px] h-[8px] md:w-[9px] md:h-[9px] brightness-0 transform transition-transform duration-300 group-hover:-rotate-90 opacity-90 group-hover:opacity-60" 
                draggable={false} 
              />
            </a>
          </div>

          {/* Header: Name + label */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-5 md:mb-7 text-black border-b border-black/10 pb-4 md:pb-5">
            <div>
              <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-normal tracking-tight leading-none mb-1 font-['Geist_Mono']">AZAHWA CELINA LATIFA</h2>
              <p className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase text-black/50 font-normal font-['Geist_Mono']">{lang === 'id' ? 'PENGEMBANG FULLSTACK & PENGGEMAR TI' : 'FULLSTACK DEVELOPER & IT ENTHUSIAST'}</p>
            </div>
            <span className="text-[8px] md:text-[9px] tracking-[0.12em] uppercase text-black/50 mt-3 md:mt-0 font-normal font-['Geist_Mono']">{lang === 'id' ? 'DAFTAR RIWAYAT HIDUP' : 'CURRICULUM VITAE'}</span>
          </div>

          {/* Two-column CV body */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-8 text-black relative">

            {/* LEFT COLUMN */}
            <div>
              <div className="flex flex-row md:flex-col gap-4 md:gap-0 mb-5 md:mb-7">
                
                {/* Photo CV */}
                <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-[120px] shrink-0 bg-white flex flex-col items-center justify-center md:mb-7 border border-black/50 shadow-sm p-1">
                  <img 
                    src={fotoCV} 
                    alt="Azahwa Celina Latifa" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" 
                    draggable={false} 
                  />
                </div>

                {/* Personal Data */}
                <div className="flex-1">
                  <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase mb-2 md:mb-3 text-black font-['Geist_Mono']">{lang === 'id' ? 'DATA PRIBADI' : 'PERSONAL DATA'}</h3>
                  <div className="grid grid-cols-1 gap-1.5 md:gap-3">
                    {[
                      [lang === 'id' ? 'LAHIR' : 'DOB', lang === 'id' ? 'SEMARANG, 2 DES 2008' : 'SEMARANG, DEC 2, 2008'],
                      [lang === 'id' ? 'GENDER' : 'GENDER', lang === 'id' ? 'PEREMPUAN' : 'FEMALE'],
                      [lang === 'id' ? 'AGAMA' : 'RELIGION', 'ISLAM'],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-[7px] md:text-[8px] tracking-[0.1em] uppercase text-black/50 mb-0.5 font-['Geist_Mono']">{label}</div>
                        <div className="text-[9px] md:text-[10px] tracking-[0.05em] font-['Geist_Mono']">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-5 md:mb-7">
                <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase mb-2 md:mb-3 text-black font-['Geist_Mono']">{lang === 'id' ? 'KONTAK' : 'CONTACT'}</h3>
                <div className="text-[9px] md:text-[10px] tracking-[0.05em] flex flex-col gap-2.5 md:gap-4 font-['Geist_Mono']">
                  <div className="flex items-start gap-2">
                    <svg className="shrink-0 text-black/50 w-2.5 h-2.5 md:w-3 md:h-3 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span className="break-all">AZAHWACELINALATIFA@GMAIL.COM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="shrink-0 text-black/50 w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>SEMARANG, IDN</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="shrink-0 text-black/50 w-2.5 h-2.5 md:w-3 md:h-3 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    <span className="break-all">github.com/AzahwaCelina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="shrink-0 text-black/50 w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span>+62 812-2519-4448</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              {/* About Me */}
              <div className="mb-5 md:mb-7">
                <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase mb-1.5 md:mb-2 text-black font-['Geist_Mono']">{lang === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}</h3>
                <p className="text-[9px] md:text-[10px] tracking-[0.04em] leading-[1.6] md:leading-[1.7] text-black/80 font-['Geist_Mono']">
                  {lang === 'id' 
                    ? 'Siswa SIJA di SMKN 7 Semarang yang berfokus pada pengembangan Fullstack, UI/UX, dan Jaringan Komputer. Antusias dalam membangun solusi digital dan menguasai teknologi modern.'
                    : 'SIJA student at SMKN 7 Semarang focusing on Fullstack development, UI/UX, and Computer Networking. Enthusiastic about building digital solutions and mastering modern tech stacks.'}
                </p>
              </div>

              {/* Education */}
              <div className="mb-5 md:mb-7">
                <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase mb-2 md:mb-3 text-black font-['Geist_Mono']">{lang === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    { school: 'SMKN 7 SEMARANG', detail: 'SIJA | 2024 – 2028' },
                    { school: 'SMPN 5 SEMARANG', detail: '2021 - 2024' },
                    { school: 'SDN SUKOREJO 1', detail: '2015 - 2021' },
                  ].map(e => (
                    <div key={e.school}>
                      <div className="text-[9px] md:text-[10px] tracking-[0.05em] font-['Geist_Mono']">{e.school}</div>
                      <div className="text-[7px] md:text-[8px] tracking-[0.1em] uppercase text-black/50 mt-1 font-['Geist_Mono']">{e.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5 md:mb-7">
                <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase mb-2 md:mb-3 text-black font-['Geist_Mono']">{lang === 'id' ? 'KEAHLIAN' : 'SKILLS'}</h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2.5">
                  {['HTML & CSS', 'JAVASCRIPT', 'REACT', 'CISCO NETWORKING', 'UI/UX DESIGN'].map(skill => (
                    <span key={skill} className="border border-black/50 rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-[8px] md:text-[9px] tracking-[0.05em] text-black/50 bg-transparent transition-colors hover:bg-black/5 font-['Geist_Mono']">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                  <h3 className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] uppercase text-black font-['Geist_Mono']">{lang === 'id' ? 'FOKUS SAAT INI' : 'CURRENT FOCUS'}</h3>
                  <span className="text-[7px] md:text-[8px] tracking-[0.1em] uppercase text-black border border-black/20 px-1.5 py-0.5 md:px-2 font-['Geist_Mono']">{lang === 'id' ? 'SEKARANG' : 'PRESENT'}</span>
                </div>
                <p className="text-[9px] md:text-[10px] tracking-[0.04em] leading-[1.6] md:leading-[1.7] text-black/80 mt-1 font-['Geist_Mono']">
                  {lang === 'id'
                    ? 'Fokus menyelesaikan tugas akademik sambil aktif membuat proyek kecil: merancang UI/UX web, mengasah backend, dan simulasi jaringan menggunakan Cisco Packet Tracer.'
                    : 'Focusing on academic tasks while actively building small projects: designing web UI/UX, sharpening backend skills, and simulating networks using Cisco Packet Tracer.'}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* CIRCULAR TEXT DECORATION (Dipindah ke luar Kertas Utama biar utuh) */}
        <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-20 pointer-events-none text-black/40 select-none">
          <svg className="w-28 h-28 md:w-36 md:h-36 animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
            <path id="circle-path-outer" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text className="font-['Geist_Mono'] text-[9px] md:text-[9.5px] tracking-[0.15em] uppercase" fill="currentColor">
              <textPath href="#circle-path-outer" startOffset="0%" textLength="220" lengthAdjust="spacing">
                ✦ CURRICULUM VITAE ✦ HIRE ME
              </textPath>
            </text>
          </svg>
        </div>

      </div>
    </section>
  );
};

export default CV;