import React from 'react';
import Folder from './Folder';
import { useThemeLang } from '../context/ThemeLangContext';

const Projects = ({ onProjectClick, splashFinished = true }) => {
  const { lang, theme } = useThemeLang();
  
  // Deteksi dark mode
  const isDark = theme === 'dark';
  
  // Kita simpan array ini di luar biar gampang dipanggil
  const categoryList = ['DESIGN', 'NETWORK', 'CODE'];
  
  return (
    <section 
      id="projects" 
      className={`relative w-full min-h-screen pt-12 md:pt-16 pb-16 mb-12 md:mb-16 px-6 md:px-10 flex flex-col items-center justify-center font-normal overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#111110] text-white' : 'bg-white text-black'}`}
    >
      
      {/* Background Spotlight */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)]' : 'bg-[radial-gradient(circle_at_center,rgba(227,242,253,0.05)_0%,transparent_65%)]'}`} />

      {/* FIX: Menambahkan 'gap-12 md:gap-20' untuk memaksa jarak antara Header dan Folder tanpa perlu margin yang error */}
      <div className="max-w-[1100px] mx-auto w-full flex flex-col items-center justify-center relative z-10 gap-12 md:gap-20">

        {/* Header - Tetap aman di layer atas */}
        <div className="text-center relative z-20 pointer-events-none">
          <div className={`text-[11px] tracking-[0.2em] uppercase mb-6 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[#808080]'}`}>
            {lang === 'id' ? 'APA YANG TELAH SAYA BANGUN' : 'WHAT I HAVE BUILT'}
          </div>
          <h2 className="text-[clamp(30px,5vw,65px)] font-normal tracking-tighter leading-none">
            <span className="accent-font italic pr-2 text-[#EBE6E0]">PRO</span>JECT<span className="accent-font italic pl-1 text-[#EBE6E0]">S</span>
          </h2>
        </div>

        {/* Center: Folder Interactive Component */}
        {/* FIX: Margin dihilangkan karena sudah diurus oleh 'gap' di kontainer atasnya. min-h diperbaiki agar pas tidak terlalu kosong */}
        <div className="relative z-10 flex items-center justify-center w-full min-h-[300px] md:min-h-[400px]">
          {splashFinished && (
            <Folder 
              color="#808080" 
              size={2.8} 
              items={categoryList} 
              onPaperClick={(val) => {
                let safeCategory = 'CODE'; // default
                if (typeof val === 'number') {
                  safeCategory = categoryList[val];
                } else if (typeof val === 'string') {
                  safeCategory = val.toUpperCase();
                }
                
                if (onProjectClick) onProjectClick(safeCategory);
              }}
            />
          )}
        </div>

      </div>
    </section>
  );
};

export default Projects;