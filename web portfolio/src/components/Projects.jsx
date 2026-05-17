import React from 'react';
import Folder from './Folder';
import { useThemeLang } from '../context/ThemeLangContext';

const Projects = ({ onProjectClick }) => {
  const { lang } = useThemeLang();
  
  return (
    <section id="projects" className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-10 flex flex-col items-center justify-center bg-white text-black font-normal overflow-hidden">
      
      {/* BACKGROUND BARU: Faint Spotlight Biru Pucat
          Warna Biru Pucat (rgb(227, 242, 253)) dengan opasitas sangat tipis (0.05).
          Ini memberikan kontras segar terhadap warna krem, mencegah putihnya "menguning",
          dan membuat foldernya lebih menonjol ke depan.
      */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(227,242,253,0.05)_0%,transparent_65%)]" />

      <div className="max-w-[1100px] mx-auto w-full flex flex-col items-center justify-center relative z-10">

        {/* Header */}
        <div className="text-center relative">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#808080] mb-6">
            {lang === 'id' ? 'APA YANG TELAH SAYA BANGUN' : 'WHAT I HAVE BUILT'}
          </div>
          <h2 className="text-[clamp(30px,5vw,65px)] font-normal tracking-tighter leading-none">
            {/* Warna disamakan dengan warna krem yang digunakan di Resume/CV (#EBE6E0) */}
            <span className="accent-font italic pr-2 text-[#EBE6E0]">PRO</span>JECT<span className="accent-font italic pl-1 text-[#EBE6E0]">S</span>
          </h2>
        </div>

        {/* Center: Folder Interactive Component */}
        {/* Geist Mono nurun dari pembungkus div ini */}
        <div className="relative z-10 flex justify-center w-full mt-[120px] md:mt-[160px] font-['Geist_Mono',_monospace]">
          <Folder 
            color="#808080" 
            size={2.8} 
            items={['DESIGN', 'NETWORK', 'CODE']} 
            onPaperClick={(index) => {
              if (onProjectClick) onProjectClick(index);
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default Projects;