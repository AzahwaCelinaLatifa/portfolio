import React, { useState, useEffect } from 'react';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import ScrambledText from './ScrambledText';
import { useThemeLang } from '../context/ThemeLangContext';

// Tambahkan isDark sebagai prop agar tag bisa beradaptasi
const TechTag = ({ name, isDark }) => (
  <span 
    style={{ fontFamily: "'Geist Mono', monospace" }}
    className={`inline-block px-3 py-1.5 border rounded-full text-[11px] tracking-[0.1em] uppercase transition-all duration-300 ease-out hover:scale-110 active:scale-110 cursor-pointer select-none ${
      isDark 
        ? 'border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.7)]' 
        : 'border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.7)]'
    }`}
  >
    {name}
  </span>
);

const allProjectsData = {
  'CODE': [
    { 
      id: '001', name: 'SMART CAT FEEDER', 
      desc: 'WEB-POWERED AUTOMATED CAT FEEDER FOR INSTANT REMOTE CONTROL AND MONITORING', 
      descId: 'PENGUMPAN KUCING OTOMATIS BERBASIS WEB UNTUK KENDALI DAN PEMANTAUAN JARAK JAUH', 
      img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800',
      repo: 'https://github.com/AzahwaCelinaLatifa/smart-cat-feederX.github.io.git', live: null,
      techEn: ['HTML', 'CSS', 'JavaScript'], techId: ['HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Developed the entire static web interface for the IoT control panel using native web technologies.',
      howIHelpId: 'Mengembangkan seluruh antarmuka web statis untuk panel kontrol IoT menggunakan teknologi web native.'
    },
    { 
      id: '002', name: 'ABYSS', 
      desc: 'STATIC WEBSITE SHOWCASING THE BEAUTY AND MARINE BIODIVERSITY OF THE BANDA SEA', 
      descId: 'WEBSITE STATIS YANG MENAMPILKAN KEINDAHAN DAN KEANEKARAGAMAN HAYATI BIOTA LAUT BANDA', 
      img: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800',
      repo: 'https://github.com/AzahwaCelinaLatifa/ABYSS-Menjelajah-Keindahan-Laut-Banda.git', live: 'https://abyss-banda.vercel.app',
      techEn: ['HTML', 'CSS', 'JavaScript'], techId: ['HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Built a responsive static website from scratch and deployed it using Vercel hosting.',
      howIHelpId: 'Membangun website statis yang responsif dari awal dan mendeploy-nya menggunakan hosting Vercel.'
    },
    { 
      id: '003', name: 'SMART IRIGATION', 
      desc: 'IOT SYSTEM FOR AUTOMATED PLANT WATERING AND SOIL MOISTURE MONITORING', 
      descId: 'SISTEM IOT UNTUK PENYIRAMAN TANAMAN OTOMATIS DAN PEMANTAUAN KELEMBABAN TANAH', 
      img: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=800', 
      repo: 'https://github.com/B-Sandyawan/Smart-Irigation.git', live: null,
      techEn: ['C++', 'Arduino', 'HTML', 'CSS', 'JavaScript'], techId: ['C++', 'Arduino', 'HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Programmed the microcontroller logic and developed the companion web interface for monitoring.',
      howIHelpId: 'Memprogram logika mikrokontroler dan mengembangkan antarmuka web pendamping untuk pemantauan.'
    }
  ],
  'NETWORK': [
    { 
      id: '001', name: 'ROUTING DYNAMIC RIP', 
      desc: 'IMPLEMENTATION OF DYNAMIC RIP ROUTING PROTOCOL', 
      descId: 'IMPLEMENTASI PROTOKOL PERUTEAN DINAMIS RIP', 
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://drive.google.com/file/d/1GAs3OFZ1Q-Mg29nyrUHH7YFXE3YKbb5X/view?usp=sharing', 
      techEn: ['Packet Tracer', 'RIP', 'Routing'], techId: ['Packet Tracer', 'RIP', 'Routing'],
      howIHelpEn: 'Configured and tested dynamic routing using RIP protocol across multiple routers.', 
      howIHelpId: 'Mengonfigurasi dan menguji perutean dinamis menggunakan protokol RIP pada beberapa router.'
    },
    { 
      id: '002', name: 'OSPF MIKROTIK', 
      desc: 'DYNAMIC OSPF ROUTING CONFIGURATION ON MIKROTIK ROUTERS', 
      descId: 'KONFIGURASI PERUTEAN DINAMIS OSPF PADA ROUTER MIKROTIK', 
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://drive.google.com/file/d/1s40UzcWlWDPdGQK_uGhmPKK4Jft45rNL/view?usp=sharing', 
      techEn: ['Mikrotik', 'OSPF', 'Networking'], techId: ['Mikrotik', 'OSPF', 'Jaringan'],
      howIHelpEn: 'Implemented OSPF for automated and efficient path selection in a Mikrotik network environment.', 
      howIHelpId: 'Mengimplementasikan OSPF untuk pemilihan jalur yang efisien dan otomatis di lingkungan jaringan Mikrotik.'
    },
    { 
      id: '003', name: 'DYNAMIC BGP', 
      desc: 'BORDER GATEWAY PROTOCOL DYNAMIC ROUTING CONFIGURATION', 
      descId: 'KONFIGURASI PERUTEAN DINAMIS PROTOKOL BORDER GATEWAY', 
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://docs.google.com/document/d/1kU_A2Khf5LeBRLfM2NeayQk1svwYNkbA/edit?usp=sharing&ouid=100691377553012188621&rtpof=true&sd=true', 
      techEn: ['BGP', 'Routing', 'WAN'], techId: ['BGP', 'Routing', 'WAN'],
      howIHelpEn: 'Set up advanced BGP routing to handle external gateway communications between autonomous systems.', 
      howIHelpId: 'Mengatur perutean BGP tingkat lanjut untuk menangani komunikasi gateway eksternal antar sistem otonom.'
    },
    { 
      id: '004', name: 'STATIC ROUTING (3 ROUTERS)', 
      desc: 'NETWORK IMPLEMENTATION USING STATIC ROUTING ACROSS 3 DIFFERENT ROUTERS', 
      descId: 'IMPLEMENTASI JARINGAN MENGGUNAKAN PERUTEAN STATIS PADA 3 ROUTER BERBEDA', 
      img: 'https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&q=80&w=800', 
      repo: '#', live: 'https://drive.google.com/file/d/1sys04H4NSClWH_FxXDJEFz0nL17BB980/view?usp=sharing', 
      techEn: ['Packet Tracer', 'Static Routing'], techId: ['Packet Tracer', 'Routing Statis'],
      howIHelpEn: 'Manually mapped and configured IP routes across a 3-router topology for exact traffic control.', 
      howIHelpId: 'Memetakan dan mengonfigurasi rute IP secara manual di topologi 3-router untuk kendali lalu lintas yang pasti.'
    }
  ],
  'DESIGN': [
    { 
      id: '001', name: 'BRIEF LOGO FOR CATERING', 
      desc: 'LOGO DESIGN AND VISUAL BRAND IDENTITY FOR A PROFESSIONAL CATERING SERVICE', 
      descId: 'DESAIN LOGO DAN IDENTITAS BRANDING VISUAL UNTUK LAYANAN KATERING PROFESIONAL', 
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://drive.google.com/file/d/10_rE0_82bVj-FIERu6ePrKRmI-pYBNkD/view?usp=sharing', 
      techEn: ['Figma', 'Logo Design', 'Branding'], techId: ['Figma', 'Desain Logo', 'Branding'],
      howIHelpEn: 'Created a unique logo concept and comprehensive visual guidelines based on the client brief.', 
      howIHelpId: 'Membuat konsep logo unik dan panduan visual komprehensif berdasarkan brief klien.'
    },
    { 
      id: '002', name: 'UI UX WEB PORTFOLIO', 
      desc: 'HIGH-FIDELITY INTERACTIVE WEB DESIGN FOR A PERSONAL PORTFOLIO WEBSITE', 
      descId: 'DESAIN WEB INTERAKTIF TINGKAT TINGGI UNTUK WEBSITE PORTOFOLIO PRIBADI', 
      img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://www.figma.com/design/1p4zTXts82egWXp91HNcXI/portfolio?node-id=0-1&t=JQ3AWVLjNanSOEau-1', 
      techEn: ['Figma', 'UI/UX Design', 'Wireframing'], techId: ['Figma', 'Desain UI/UX', 'Wireframing'],
      howIHelpEn: 'Crafted the typography structure, grid layouts, and fully interactive high-fidelity user interface.', 
      howIHelpId: 'Menyusun struktur tipografi, tata letak grid, dan antarmuka pengguna interaktif kesetiaan tinggi.'
    },
    { 
      id: '003', name: 'UI UX WEB SMART CAT FEEDER', 
      desc: 'USER INTERFACE DESIGN FOR WEB-POWERED AUTOMATED CAT FEEDER WITH REMOTE CONTROL AND MONITORING INTERFACE', 
      descId: 'DESAIN ANTARMUKA PENGGUNA UNTUK PANEL KONTROL PENGUMPAN KUCING OTOMATIS BERBASIS WEB DAN PEMANTAUAN JARAK JAUH', 
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: 'https://www.figma.com/design/i3PqW6QspZjO5S9c3zHvtD/MyPet---UX-UI-Design-Pet-supplies-store--Community-?t=JQ3AWVLjNanSOEau-1', 
      techEn: ['Figma', 'UI/UX Design', 'IoT Interface'], techId: ['Figma', 'Desain UI/UX', 'Antarmuka IoT'],
      howIHelpEn: 'Designed the intuitive user experience and responsive UI screens for the IoT smart cat feeder control panel.', 
      howIHelpId: 'Mendesain pengalaman pengguna yang intuitif dan layar UI responsif untuk panel kontrol IoT pengumpan kucing otomatis.'
    }
  ]
};

const allCertificatesData = {
  'CODE': [
    { id: '001', name: 'JAVASCRIPT COMPETENCY', desc: 'ADVANCED CERTIFICATION IN MODERN JAVASCRIPT PRINCIPLES AND APPLICATIONS', descId: 'SERTIFIKASI LANJUTAN DALAM PRINSIP DAN APLIKASI JAVASCRIPT MODERN', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', repo: '#', live: null, howIHelpEn: 'Earned through completing advanced JavaScript competency curriculum.', howIHelpId: 'Diperoleh melalui penyelesaian kurikulum kompetensi JavaScript lanjutan.' }
  ],
  'NETWORK': [
    { 
      id: '001', name: 'INTRODUCTION TO CYBERSECURITY', 
      desc: 'OFFERED BY IDCAMP THROUGH THE CISCO NETWORKING ACADEMY PROGRAM', 
      descId: 'DITAWARKAN OLEH IDCAMP MELALUI PROGRAM CISCO NETWORKING ACADEMY', 
      img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800', 
      repo: '#', live: 'https://drive.google.com/file/d/1KdceDma8k4TQ6GZ1EjRErIwZg6DTwFfQ/view?usp=sharing', 
      howIHelpEn: 'Completed foundational training in cybersecurity concepts and network protection strategies.', 
      howIHelpId: 'Menyelesaikan pelatihan dasar tentang konsep keamanan siber dan strategi perlindungan jaringan.' 
    }
  ],
  'DESIGN': []
};

const ProjectDetailView = ({ onClose, category = 'CODE' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subCategory, setSubCategory] = useState('PROJECT'); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showHowIHelp, setShowHowIHelp] = useState(false); 
  const { lang, theme } = useThemeLang();

  // Deteksi Dark Mode
  const isDark = theme === 'dark';

  let activeCategory = 'CODE';
  if (category) {
    const cleanCategory = String(category).toUpperCase().trim();
    if (cleanCategory.includes('DESIGN') || cleanCategory === '0') activeCategory = 'DESIGN';
    else if (cleanCategory.includes('NETWORK') || cleanCategory === '1') activeCategory = 'NETWORK';
  }

  const currentData = subCategory === 'PROJECT' 
    ? (allProjectsData[activeCategory] || allProjectsData['CODE'])
    : (allCertificatesData[activeCategory] || allCertificatesData['CODE']);

  useEffect(() => {
    setActiveIndex(0); 
    const interval = setInterval(() => {
      if (currentData.length > 0) {
        setActiveIndex((current) => (current + 1) % currentData.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeCategory, subCategory, currentData.length]);

  const renderTitle = () => {
    const titleClass = "text-[clamp(32px,5vw,60px)] font-normal tracking-tight leading-[0.95] mb-6 relative z-10";
    if (activeCategory === 'NETWORK') return <h2 className={titleClass}><span className="pr-1 font-normal">NET</span><span className="accent-font italic text-[#EBE6E0]">WORK</span></h2>;
    if (activeCategory === 'DESIGN') return <h2 className={titleClass}><span className="pr-1 font-normal">DES</span><span className="accent-font italic text-[#EBE6E0]">IGN</span></h2>;
    return <h2 className={titleClass}><span className="pr-1 font-normal">CO</span><span className="accent-font italic text-[#EBE6E0]">DE</span></h2>;
  };

  const buttonText = subCategory === 'CERTIFICATE' 
    ? (lang === 'id' ? 'LIHAT DETAIL' : 'VIEW DETAIL') 
    : (lang === 'id' ? 'LIHAT PROYEK' : 'VIEW PROJECT');

  const handleOpenModal = (e, item) => {
    e.preventDefault();
    setShowHowIHelp(false);
    setSelectedProject(item);
  };

  return (
    // Mengganti background utama menggunakan isDark
    <div className={`min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 animate-fade-in relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#111110] text-white' : 'bg-white text-black'}`}>
      
      {/* Latar belakang efek dot dan gradient disesuaikan */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_top_right,rgba(227,242,253,0.3)_0%,transparent_60%)]'}`} />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5 transition-all duration-500" style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#fff' : '#000'} 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        <div className="flex flex-col mb-20">
          {/* Breadcrumb text aman dengan rgba */}
          <div style={{ fontFamily: "'Geist Mono', monospace" }} className={`text-[12px] tracking-[0.08em] mb-8 uppercase flex items-center gap-3 relative z-10 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(0,0,0,0.5)]'}`}>
            <span className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`} onClick={(e) => { e.preventDefault(); if (onClose) onClose(); }}>
              PROJECTS
            </span> 
            <span>&gt;</span> 
            <span className={`${isDark ? 'text-white' : 'text-black'} transition-colors duration-500`}>{activeCategory}</span>
          </div>
          
          {renderTitle()}

          <div className="flex gap-4 text-[13px] tracking-[0.1em] uppercase relative z-10" style={{ fontFamily: "'Geist Mono', monospace" }}>
            <span onClick={() => setSubCategory('PROJECT')} className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'PROJECT' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'text-[rgba(255,255,255,0.5)] hover:text-white' : 'text-[rgba(0,0,0,0.5)] hover:text-black')}`}>
              [ PROJECT ]
            </span>
            <span onClick={() => setSubCategory('CERTIFICATE')} className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'CERTIFICATE' ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'text-[rgba(255,255,255,0.5)] hover:text-white' : 'text-[rgba(0,0,0,0.5)] hover:text-black')}`}>
              [ CERTIFICATE ]
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-end relative z-10">
          
          {/* List Kiri */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {currentData.length > 0 ? (
              currentData.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div key={item.id} onClick={() => setActiveIndex(idx)} className="group flex flex-col cursor-pointer">
                    <div style={{ fontFamily: "'Geist Mono', monospace" }} className={`flex items-center gap-6 text-[14px] md:text-[16px] transition-colors duration-300 pb-2 ${isActive ? (isDark ? 'text-white font-medium' : 'text-black font-medium') : (isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.7)]')}`}>
                      <span>{item.id}</span>
                      <span className="tracking-wide">{item.name}</span>
                    </div>
                    <div className={`h-[2px] transition-all duration-500 ease-out ${isActive ? (isDark ? 'w-full bg-white' : 'w-full bg-black') : (isDark ? 'w-[55%] bg-[rgba(255,255,255,0.2)]' : 'w-[55%] bg-[rgba(0,0,0,0.2)]')}`}></div>
                  </div>
                );
              })
            ) : (
              <div style={{ fontFamily: "'Geist Mono', monospace" }} className={`uppercase tracking-widest text-[13px] py-4 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(0,0,0,0.4)]'}`}>
                {lang === 'id' ? '[ Tidak Ada Sertifikat Kategori Ini ]' : '[ No Certificates For This Category ]'}
              </div>
            )}
          </div>

          {/* Image Card Kanan */}
          {currentData.length > 0 && (
            <div className={`w-full lg:w-[450px] h-[350px] md:h-[400px] rounded-[24px] relative overflow-hidden flex flex-col justify-end group border shadow-sm transition-colors duration-500 ${isDark ? 'bg-[#111110] border-[rgba(255,255,255,0.2)]' : 'bg-white border-[rgba(0,0,0,0.2)]'}`}>
              <img 
                src={currentData[activeIndex]?.img} 
                alt={currentData[activeIndex]?.name} 
                className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 ease-out grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
              
              <div className={`relative z-20 w-full flex flex-col p-6 md:p-8 border-t transition-colors duration-500 ${isDark ? 'bg-[#111110] border-[rgba(255,255,255,0.2)]' : 'bg-white border-[rgba(0,0,0,0.2)]'}`}>
                <h2 className={`text-[18px] md:text-[22px] font-semibold tracking-wide mb-2 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>{currentData[activeIndex]?.name}</h2>
                <p className={`max-w-[90%] text-[12px] md:text-[13px] uppercase tracking-wider mb-6 leading-relaxed line-clamp-2 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'}`}>
                  {lang === 'id' ? currentData[activeIndex]?.descId : currentData[activeIndex]?.desc}
                </p>
                
                <div className="w-full flex justify-end">
                  <button onClick={(e) => handleOpenModal(e, currentData[activeIndex])} className={`group/btn inline-flex items-center gap-2 transition-colors uppercase tracking-[0.15em] text-[11px] md:text-[13px] bg-transparent border-none cursor-pointer ${isDark ? 'text-white hover:text-[rgba(255,255,255,0.7)]' : 'text-black hover:text-[rgba(0,0,0,0.7)]'}`}>
                    <ScrambledText radius={60} duration={0.6} speed={0.5}>{buttonText}</ScrambledText>
                    {/* Icon panah di-invert kalau Dark Mode */}
                    <img src={arrowIcon} alt="Arrow" className={`w-3 h-3 transition-all duration-300 ease-out group-hover/btn:rotate-45 group-hover/btn:translate-y-1 -rotate-90 ${isDark ? 'invert' : 'brightness-0'}`} draggable={false} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal Popup Detail */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-[550px] border rounded-[24px] p-6 md:p-8 relative shadow-2xl transition-colors duration-500 ${isDark ? 'bg-[#111110] border-[rgba(255,255,255,0.2)] text-white' : 'bg-white border-[#E0E0E0] text-black'}`}>
            
            <button onClick={() => setSelectedProject(null)} className={`absolute top-6 right-6 transition-colors text-[20px] font-light leading-none cursor-pointer ${isDark ? 'text-[rgba(255,255,255,0.4)] hover:text-white' : 'text-[rgba(0,0,0,0.4)] hover:text-black'}`} style={{ fontFamily: "'Geist Mono', monospace" }}>
              X
            </button>

            <span style={{ fontFamily: "'Geist Mono', monospace" }} className={`text-[11px] tracking-widest block mb-2 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(0,0,0,0.5)]'}`}>
              // {subCategory} DETAIL
            </span>
            <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight mb-4 uppercase">{selectedProject.name}</h3>
            
            {!showHowIHelp && selectedProject.techEn && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {(lang === 'id' ? selectedProject.techId : selectedProject.techEn).map((tech, index) => (
                  <TechTag key={index} name={tech} isDark={isDark} />
                ))}
              </div>
            )}

            <p className={`text-[13px] leading-relaxed mb-8 uppercase tracking-wide transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'}`}>
              {lang === 'id' ? selectedProject.descId : selectedProject.desc}
            </p>

            {showHowIHelp && (
              <div className={`mb-8 p-5 border rounded-xl animate-fade-in shadow-md transition-colors duration-500 ${isDark ? 'bg-[#1a1a19] border-[rgba(255,255,255,0.1)]' : 'bg-[#EBE6E0] border-[#EBE6E0]'}`}>
                <span style={{ fontFamily: "'Geist Mono', monospace" }} className={`text-[11px] font-semibold block mb-2 transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'}`}>MY CONTRIBUTION:</span>
                <p className={`text-[13px] font-medium leading-relaxed uppercase transition-colors duration-500 ${isDark ? 'text-[rgba(255,255,255,0.9)]' : 'text-[rgba(0,0,0,0.9)]'}`}>
                  {lang === 'id' ? selectedProject.howIHelpId : selectedProject.howIHelpEn}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-[13px] uppercase tracking-wider" style={{ fontFamily: "'Geist Mono', monospace" }}>
              {selectedProject.repo && selectedProject.repo !== '#' && (
                <button onClick={() => window.open(selectedProject.repo, '_blank')} className={`px-2 py-1 transition-colors cursor-pointer ${isDark ? 'text-[rgba(255,255,255,0.5)] hover:text-white' : 'text-[rgba(0,0,0,0.5)] hover:text-black'}`}>
                  [ VIEW REPO ]
                </button>
              )}

              {selectedProject.live && (
                <button onClick={() => window.open(selectedProject.live, '_blank')} className={`px-2 py-1 transition-colors cursor-pointer ${isDark ? 'text-[rgba(255,255,255,0.5)] hover:text-white' : 'text-[rgba(0,0,0,0.5)] hover:text-black'}`}>
                  [ VIEW LIVE ]
                </button>
              )}

              {selectedProject.howIHelpEn && (
                <button onClick={() => setShowHowIHelp(!showHowIHelp)} className={`px-2 py-1 transition-colors cursor-pointer ${showHowIHelp ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'text-[rgba(255,255,255,0.5)] hover:text-white' : 'text-[rgba(0,0,0,0.5)] hover:text-black')}`}>
                  [ HOW I HELP ]
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailView;