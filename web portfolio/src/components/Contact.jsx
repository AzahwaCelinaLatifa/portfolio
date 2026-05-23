import React, { useState, useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';
import heartIcon from '../assets/figma/heart.svg';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import starIcon from '../assets/figma/star_logo.svg';
import ScrambledText from './ScrambledText';

const Contact = ({ scrollProgress = 0 }) => {
  const { lang, setLang, theme, toggleTheme, setTheme } = useThemeLang();
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  
  // State baru untuk mengatur muncul & animasinya Splash Screen
  const [showSplash, setShowSplash] = useState(false);
  const [splashActive, setSplashActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // LOGIKA TRIGGER EFEK SPLASH SCREEN
  const handleThemeChange = () => {
    // 1. Munculkan element Splash Screen di DOM dan buat dia full hitam/krem langsung
    setShowSplash(true);
    setSplashActive(true);

    // 2. Tunggu sebentar (saat layar tertutup penuh), lalu ganti temanya secara instan
    setTimeout(() => {
      if (toggleTheme) {
        toggleTheme();
      } else if (setTheme) {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }

      // 3. Mulai pudarkan Splash Screen-nya (Fade Out)
      setSplashActive(false);

      // 4. Setelah animasi memudar selesai, hapus element Splash dari DOM sepenuhnya
      setTimeout(() => {
        setShowSplash(false);
      }, 500); // durasi transisi keluar (500ms)

    }, 400); // durasi tirai menutup penuh sebelum tema berubah (400ms)
  };

  return (
    <>
      {/* ===== SPLASH SCREEN OVERLAY EFFECT ===== */}
      {showSplash && (
        <div 
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none select-none transition-all duration-500 ease-in-out"
          style={{
            // Warna splash screen menyesuaikan target tema barunya agar terasa kontras dan seimbang
            backgroundColor: theme === 'dark' ? '#ffffff' : '#0a0a0a',
            color: theme === 'dark' ? '#111110' : '#f0efe8',
            opacity: splashActive ? 1 : 0,
            transform: splashActive ? 'scale(1)' : 'scale(1.05)'
          }}
        >
          {/* Teks Animasi Minimalis di Tengah Splash Screen */}
          <div className="text-[11px] tracking-[0.3em] uppercase font-sans animate-pulse">
            {theme === 'dark' ? 'SWITCHING TO LIGHT MODE' : 'SWITCHING TO DARK MODE'}
          </div>
          <div className="w-12 h-[1px] bg-current opacity-30 mt-4 animate-scale" />
        </div>
      )}

      <section id="contact" className="bg-[#0a0a0a] text-white relative overflow-hidden font-normal">
        
        {/* DEKORASI BGB CONTACT: Grid Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />

        {/* DEKORASI BGB CONTACT: Rotating Star Logo */}
        <img 
          src={starIcon} 
          alt="Star Background" 
          className="absolute top-1/4 -right-32 w-96 h-96 opacity-5 animate-[spin_40s_linear_infinite] pointer-events-none brightness-0 invert z-0" 
          draggable={false} 
        />

        <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-16 relative z-10">
          
          {/* LET'S TALK Header */}
          <div className="flex justify-between items-start mb-16 md:mb-20">
            <h2 className="text-[clamp(30px,5vw,65px)] font-normal tracking-tighter leading-none">
              <span className="accent-font italic pr-2 text-[#EBE6E0]">LE</span>T'S <span className="accent-font italic pr-2 text-[#EBE6E0]">TA</span>LK
            </h2>
            <img src={arrowIcon} alt="Arrow" className="w-8 h-8 md:w-12 md:h-12 mt-1 md:mt-2 shrink-0 brightness-0 invert opacity-90" draggable={false} />
          </div>

          {/* 2-column body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Left: Contact Info */}
            <div className="text-[12px] tracking-[0.06em] leading-[2.2] text-[rgba(255,255,255,.9)]">
              <p className="hover:text-white transition-colors cursor-pointer w-fit">AZAHWACELINALATIFA@GMAIL.COM</p>
              <p className="mt-4 hover:text-white transition-colors cursor-pointer w-fit">+62 812-2519-4448</p>
              <p className="mt-4 w-fit">SEMARANG, INDONESIA</p>
            </div>

            {/* Right: Contact Form */}
            <div>
              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                
                {/* Name Row */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] tracking-[0.08em] text-[rgba(255,255,255,.5)] uppercase">
                    {lang === 'id' ? 'Nama (wajib)' : 'Name (required)'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-1">
                    <input type="text" placeholder={lang === 'id' ? 'Nama Depan' : 'First Name'} value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-transparent border-0 border-b-[1px] border-[rgba(255,255,255,.2)] focus:border-white text-white text-[12px] tracking-[0.06em] py-2 outline-none transition-colors placeholder:text-[rgba(255,255,255,.3)] font-normal"
                      required />
                    <input type="text" placeholder={lang === 'id' ? 'Nama Belakang' : 'Last Name'} value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-transparent border-0 border-b-[1px] border-[rgba(255,255,255,.2)] focus:border-white text-white text-[12px] tracking-[0.06em] py-2 outline-none transition-colors placeholder:text-[rgba(255,255,255,.3)] font-normal" />
                  </div>
                </div>

                {/* Email Row */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] tracking-[0.08em] text-[rgba(255,255,255,.5)] uppercase">
                    {lang === 'id' ? 'Email (wajib)' : 'Email (required)'}
                  </div>
                  <input type="email" placeholder={lang === 'id' ? 'Alamat Email' : 'Email Address'} value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-[1px] border-[rgba(255,255,255,.2)] focus:border-white text-white text-[12px] tracking-[0.06em] py-2 mt-1 outline-none transition-colors placeholder:text-[rgba(255,255,255,.3)] font-normal"
                    required />
                </div>

                {/* Message Row */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] tracking-[0.08em] text-[rgba(255,255,255,.5)] uppercase">
                    {lang === 'id' ? 'Pesan' : 'Message'}
                  </div>
                  <textarea placeholder={lang === 'id' ? 'Tulis pesanmu di sini...' : 'Write your message here...'} value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-[1px] border-[rgba(255,255,255,.2)] focus:border-white text-white text-[12px] tracking-[0.06em] py-2 mt-1 outline-none transition-colors min-h-[80px] resize-y placeholder:text-[rgba(255,255,255,.3)] font-normal"
                    required />
                </div>

                {/* Submit Button */}
                <button type="submit"
                  className="inline-flex items-center gap-3 bg-transparent border-0 border-b border-white text-white text-[12px] font-normal tracking-[0.08em] uppercase pb-1 cursor-pointer w-fit transition-all mt-4 group hover:border-[rgba(255,255,255,.6)]">
                  <span className="group-hover:text-[rgba(255,255,255,.8)] transition-colors">
                    <ScrambledText radius={60} duration={0.6} speed={0.5}>{lang === 'id' ? 'KIRIM PESAN' : 'SEND MESSAGE'}</ScrambledText>
                  </span>
                  <img src={arrowIcon} alt="Arrow" className="w-[11px] h-[11px] brightness-0 invert transform transition-transform duration-300 group-hover:-rotate-90 opacity-90 group-hover:opacity-60" draggable={false} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer 
          className="relative text-white px-6 md:px-10 pt-16 pb-0 overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 50% 120%, rgba(235, 230, 224, 0.08) 0%, #050505 60%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
            `
          }}
        >
          <div className="absolute top-10 left-10 text-white/10 text-2xl pointer-events-none hidden md:block font-sans select-none">+</div>
          <div className="absolute top-10 right-10 text-white/10 text-2xl pointer-events-none hidden md:block font-sans select-none">+</div>

          <div className="max-w-[1100px] mx-auto relative z-10">
            <div className="w-full h-[1px] bg-[rgba(255,255,255,.1)] mb-12" />

            {/* Footer Links */}
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
              <div>
                <h4 className="text-[11px] font-normal tracking-[0.1em] uppercase mb-6 text-[rgba(255,255,255,.4)]">{lang === 'id' ? 'SITUS' : 'SITE'}</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { key: 'HOME', idLabel: 'BERANDA' },
                    { key: 'ABOUT', idLabel: 'TENTANG' },
                    { key: 'SKILLS', idLabel: 'KEAHLIAN' },
                    { key: 'PROJECTS', idLabel: 'PROYEK' },
                    { key: 'CV', idLabel: 'CV' },
                    { key: 'CONTACT', idLabel: 'KONTAK' }
                  ].map((item, idx) => (
                    <a key={item.key} href={`#${item.key.toLowerCase()}`}
                      className="block text-[12px] tracking-[0.08em] text-[rgba(255,255,255,.7)] no-underline hover:text-[#EBE6E0] transition-colors w-fit font-normal">
                      <ScrambledText radius={60} duration={0.6} speed={0.5}>&gt; 00{idx + 1}_{lang === 'id' ? item.idLabel : item.key}</ScrambledText>
                    </a>
                  ))}
                </div>
              </div>

              <div className="md:text-right">
                <h4 className="text-[11px] font-normal tracking-[0.1em] uppercase mb-6 text-[rgba(255,255,255,.4)]">{lang === 'id' ? 'SOSIAL' : 'SOCIAL'}</h4>
                <div className="flex flex-col md:items-end gap-2">
                  {[
                    { name: 'GITHUB', url: 'https://github.com/AzahwaCelinaLatifa' },
                    { name: 'INSTAGRAM', url: 'https://www.instagram.com/zhwcel?igsh=MnIxMnd2cXV5eTR4' },
                    { name: 'TWITTER/X', url: 'https://twitter.com/mikueischt' },
                  ].map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="block text-[12px] tracking-[0.08em] text-[rgba(255,255,255,.7)] no-underline hover:text-[#EBE6E0] transition-colors w-fit font-normal">
                      <ScrambledText radius={60} duration={0.6} speed={0.5}>&gt; {s.name}</ScrambledText>
                    </a>
                  ))}
                  <span className="block text-[11px] font-normal tracking-[0.06em] text-[rgba(255,255,255,.3)] mt-4">©2026</span>
                </div>
              </div>
            </div>

            {/* Footer Bottom (Toggle & Credits) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-4 gap-6 relative z-20">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  {/* Language Toggle */}
                  <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-[rgba(255,255,255,.6)] hover:text-white transition-colors text-[11px] font-normal group">
                    <svg className="transform group-hover:rotate-180 transition-transform duration-500" width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="8" /><ellipse cx="10" cy="10" rx="4" ry="8" /><line x1="2" y1="10" x2="18" y2="10" />
                    </svg>
                    {lang === 'id' ? 'ID' : 'EN'}
                  </button>

                  {/* Mode Toggle (Theme) */}
                  <button onClick={handleThemeChange}
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-[rgba(255,255,255,.6)] hover:text-white transition-colors text-[11px] font-normal group">
                    {theme === 'dark' ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-[spin_20s_linear_infinite]">
                          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                        <span>LIGHT</span>
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        <span>DARK</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-[rgba(255,255,255,.4)] text-[11px] font-normal tracking-[0.15em]">[ {formatTime(time)} ]</div>
              </div>
              
              <div className="text-[10px] font-normal tracking-[0.1em] text-[rgba(255,255,255,.4)] flex items-center gap-2 uppercase">
                {lang === 'id' ? 'DIBUAT DENGAN' : 'MADE WITH'} 
                <img src={heartIcon} alt="heart" className="w-3 h-3 opacity-60 hover:opacity-100 hover:scale-110 transition-all cursor-pointer" draggable={false} /> 
                {lang === 'id' ? 'OLEH CELINA' : 'BY CELINA'}
              </div>
            </div>

            {/* Massive cropped name at very bottom */}
            <div className="w-full overflow-hidden flex justify-center items-start h-[clamp(18px,3.5vw,48px)] mt-6 relative z-10">
              <div className="text-[clamp(24px,5.5vw,90px)] font-normal tracking-tighter leading-[0.8] text-white whitespace-nowrap opacity-90 select-none">
                AZAHWA <span className="accent-font italic pr-1 text-[#EBE6E0]">CEL</span>INA LATIFA
              </div>
            </div>

          </div>
        </footer>
      </section>
    </>
  );
};

export default Contact;