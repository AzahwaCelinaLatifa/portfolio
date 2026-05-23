import React from 'react';
import Folder from './Folder';
import { useThemeLang } from '../context/ThemeLangContext';

const Projects = ({ onProjectClick }) => {
  const { lang, theme } = useThemeLang();
  
  // Deteksi dark mode
  const isDark = theme === 'dark';
  
  // Kita simpan array ini di luar biar gampang dipanggil
  const categoryList = ['DESIGN', 'NETWORK', 'CODE'];
  
  return (
    // FIX: Margin dan padding atas-bawah dikurangi biar lebih pas
    // Menerapkan warna background dan text utama menggunakan state isDark dengan transisi halus
    <section 
      id="projects" 
      className={`relative w-full min-h-screen pt-12 md:pt-16 pb-16 mb-12 md:mb-16 px-6 md:px-10 flex flex-col items-center justify-center font-normal overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#111110] text-white' : 'bg-white text-black'}`}
    >
      
      {/* Background Spotlight Disesuaikan biar ga nabrak di Dark Mode */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)]' : 'bg-[radial-gradient(circle_at_center,rgba(227,242,253,0.05)_0%,transparent_65%)]'}`} />

      <div className="max-w-[1100px] mx-auto w-full flex flex-col items-center justify-center relative z-10">

        {/* Header */}
        <div className="text-center relative">
          <div className={`text-[11px] tracking-[0.2em] uppercase mb-6 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[#808080]'}`}>
            {lang === 'id' ? 'APA YANG TELAH SAYA BANGUN' : 'WHAT I HAVE BUILT'}
          </div>
          <h2 className="text-[clamp(30px,5vw,65px)] font-normal tracking-tighter leading-none">
            <span className="accent-font italic pr-2 text-[#EBE6E0]">PRO</span>JECT<span className="accent-font italic pl-1 text-[#EBE6E0]">S</span>
          </h2>
        </div>

        {/* Center: Folder Interactive Component */}
        {/* Catatan: Jarak folder ke teks atas (mt) tetap dipertahankan agar tidak menabrak */}
        <div className="relative z-10 flex justify-center w-full mt-[120px] md:mt-[160px] font-['Geist_Mono',_monospace]">
          <Folder 
            /* WARNA FOLDER DIKEMBALIKAN KE ASLI DAN TIDAK DIUBAH-UBAH */
            color="#808080" 
            size={2.8} 
            items={categoryList} 
            onPaperClick={(val) => {
              // MENCEGAH ERROR: Memastikan format yang dikirim ke atas PASTI string huruf besar
              let safeCategory = 'CODE'; // default
              if (typeof val === 'number') {
                safeCategory = categoryList[val];
              } else if (typeof val === 'string') {
                safeCategory = val.toUpperCase();
              }
              
              if (onProjectClick) onProjectClick(safeCategory);
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default Projects;