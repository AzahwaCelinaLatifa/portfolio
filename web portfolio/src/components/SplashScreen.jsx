import React, { useState, useEffect } from 'react';
// Pastikan path import ini sesuai dengan struktur foldermu
import starLogo from '../assets/figma/star_logo.svg';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [blackCurtain, setBlackCurtain] = useState(true);
  
  // Dua state baru untuk memisahkan animasi keluar
  const [isContentExiting, setIsContentExiting] = useState(false);
  const [isBgExiting, setIsBgExiting] = useState(false);

  useEffect(() => {
    // 1. Memicu hilangnya tirai hitam setelah mount (efek masuk)
    const curtainTimer = setTimeout(() => {
      setBlackCurtain(false);
    }, 100);

    // 2. Memicu animasi elemen teks & ornamen setelah tirai mulai terbuka
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 300);

    document.body.style.overflow = 'hidden';

    // Durasi total loading
    const duration = 1300; 
    const intervalTime = 15;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progressRatio = step / totalSteps;
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentProgress = Math.min(Math.round(easeOut * 100), 100);
      
      setProgress(currentProgress);

      if (step >= totalSteps) {
        clearInterval(timer);
        
        // Skenario Animasi Keluar (Exit) yang lebih berkelas:
        setTimeout(() => {
          // Tahap 1: Teks & Logo membesar dan memudar ke kamera
          setIsContentExiting(true);
          
          // Tahap 2: Delay 300ms, lalu background putih ditarik ke atas
          setTimeout(() => {
            setIsBgExiting(true);
            
            // Tahap 3: Hapus komponen setelah background selesai ditarik (700ms)
            setTimeout(() => {
              document.body.style.overflow = 'auto';
              onComplete();
            }, 700);
          }, 300);
        }, 250);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearTimeout(curtainTimer);
      clearTimeout(mountTimer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] pointer-events-none overflow-hidden
        transition-transform duration-[700ms]
      `}
      style={{
        // Ini adalah kunci efeknya: Saat isBgExiting true, SELURUH kontainer putih naik ke atas
        transform: isBgExiting ? 'translateY(-100%)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)'
      }}
    >
      {/* LAPISAN BACKGROUND: Putih dengan grid kotak-kotak */}
      <div 
        className="absolute inset-0 w-full h-full bg-white"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* EFEK MASUK: Tirai Hitam yang menyapu ke atas saat web pertama kali dimuat */}
      <div 
        className={`absolute inset-0 bg-[#121212] z-50 transition-transform duration-[700ms]`}
        style={{
          transform: blackCurtain ? 'translateY(0)' : 'translateY(-101%)',
          transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)'
        }}
      />

      {/* LAPISAN KONTEN: Inilah yang akan membesar (zoom) tanpa menarik background */}
      <div 
        className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-[600ms]
          ${isContentExiting ? 'scale-[3] md:scale-[4] opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}
        `}
        style={{ transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.3, 1)' }}
      >
        {/* Bingkai Garis Tipis Minimalis */}
        <div className={`absolute inset-6 border border-black/[0.015] transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`} />

        {/* Ornamen Tanda Tambah (+) di Tiap Sudut */}
        <div className={`absolute top-10 left-10 text-black/20 text-sm font-mono transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>+</div>
        <div className={`absolute top-10 right-10 text-black/20 text-sm font-mono transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>+</div>
        <div className={`absolute bottom-10 left-10 text-black/20 text-sm font-mono transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>+</div>
        <div className={`absolute bottom-10 right-10 text-black/20 text-sm font-mono transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>+</div>

        {/* Label Atas */}
        <div className={`absolute top-10 text-center font-['Geist_Mono'] text-[10px] tracking-[0.25em] text-black/40 transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          PORTFOLIO / CURRICULUM VITAE
        </div>

        {/* KONTEN UTAMA */}
        <div 
          className={`flex flex-col items-center gap-2 transition-all duration-1000 ease-out
            ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          {/* Kontainer Logo & Nama */}
          <div className="relative flex items-center justify-center pr-5 md:pr-6">
            <div className="flex items-baseline select-none">
              <span className="font-['Geist_Mono'] font-medium text-[42px] md:text-[52px] text-black leading-none">
                A
              </span>
              <span className="font-['Inspiration'] text-[56px] md:text-[66px] text-[#EBE6E0] leading-none -ml-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                CEL
              </span>
            </div>
            
            {/* Logo Bunga (Berputar) */}
            <img 
              src={starLogo} 
              alt="Loading Icon" 
              className="absolute right-0 top-[-2px] md:top-0 w-6 h-6 md:w-7 md:h-7 animate-[spin_3.5s_linear_infinite]"
              draggable={false}
            />
          </div>

          {/* Indikator Persentase */}
          <div className="font-['Geist_Mono'] text-sm md:text-base text-black font-medium tracking-[0.15em] mt-1">
            {String(progress).padStart(3, '0')}%
          </div>
        </div>

        {/* Label Bawah */}
        <div className={`absolute bottom-10 font-['Geist_Mono'] text-[10px] tracking-[0.25em] text-black/40 transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          ©2026 AZAHWA CELINA LATIFA
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;