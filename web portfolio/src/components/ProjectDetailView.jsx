import React, { useState, useEffect } from 'react';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import ScrambledText from './ScrambledText';
import { useThemeLang } from '../context/ThemeLangContext';

// Komponen tag tech stack dengan gaya melengkung, efek hover (PC), dan active (Mobile)
const TechTag = ({ name }) => (
  <span 
    style={{ fontFamily: "'Geist Mono', monospace" }}
    className="inline-block px-3 py-1.5 border border-[#808080]/30 rounded-full text-[11px] tracking-[0.1em] text-[#111110]/70 uppercase transition-transform duration-300 ease-out hover:scale-110 active:scale-110 cursor-pointer select-none"
  >
    {name}
  </span>
);

// Master Data dengan Tech Stack yang sudah direvisi sesuai analisis repositori
const allProjectsData = {
  'CODE': [
    { 
      id: '001', 
      name: 'SMART CAT FEEDER', 
      desc: 'WEB-POWERED AUTOMATED CAT FEEDER FOR INSTANT REMOTE CONTROL AND MONITORING', 
      descId: 'PENGUMPAN KUCING OTOMATIS BERBASIS WEB UNTUK KENDALI DAN PEMANTAUAN JARAK JAUH', 
      img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800',
      repo: 'https://github.com/AzahwaCelinaLatifa/smart-cat-feederX.github.io.git',
      live: null,
      techEn: ['HTML', 'CSS', 'JavaScript'],
      techId: ['HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Developed the entire static web interface for the IoT control panel using native web technologies.',
      howIHelpId: 'Mengembangkan seluruh antarmuka web statis untuk panel kontrol IoT menggunakan teknologi web native.'
    },
    { 
      id: '002', 
      name: 'ABYSS', 
      desc: 'STATIC WEBSITE SHOWCASING THE BEAUTY AND MARINE BIODIVERSITY OF THE BANDA SEA', 
      descId: 'WEBSITE STATIS YANG MENAMPILKAN KEINDAHAN DAN KEANEKARAGAMAN HAYATI BIOTA LAUT BANDA', 
      img: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=800',
      repo: 'https://github.com/AzahwaCelinaLatifa/ABYSS-Menjelajah-Keindahan-Laut-Banda.git',
      live: 'https://abyss-banda.vercel.app',
      techEn: ['HTML', 'CSS', 'JavaScript'],
      techId: ['HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Built a responsive static website from scratch and deployed it using Vercel hosting.',
      howIHelpId: 'Membangun website statis yang responsif dari awal dan mendeploy-nya menggunakan hosting Vercel.'
    },
    { 
      id: '003', 
      name: 'SMART IRIGATION', 
      desc: 'IOT SYSTEM FOR AUTOMATED PLANT WATERING AND SOIL MOISTURE MONITORING', 
      descId: 'SISTEM IOT UNTUK PENYIRAMAN TANAMAN OTOMATIS DAN PEMANTAUAN KELEMBABAN TANAH', 
      img: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=800', 
      repo: 'https://github.com/B-Sandyawan/Smart-Irigation.git',
      live: null,
      techEn: ['C++', 'Arduino', 'HTML', 'CSS', 'JavaScript'],
      techId: ['C++', 'Arduino', 'HTML', 'CSS', 'JavaScript'],
      howIHelpEn: 'Programmed the microcontroller logic and developed the companion web interface for monitoring.',
      howIHelpId: 'Memprogram logika mikrokontroler dan mengembangkan antarmuka web pendamping untuk pemantauan.'
    }
  ],
  'NETWORK': [
    { 
      id: '001', 
      name: 'ENTERPRISE ROUTING', 
      desc: 'COMPLEX NETWORK TOPOLOGY SIMULATION USING CISCO PACKET TRACER', 
      descId: 'SIMULASI TOPOLOGI JARINGAN KOMPLEKS MENGGUNAKAN CISCO PACKET TRACER', 
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Cisco Packet Tracer'], techId: ['Cisco Packet Tracer'],
      howIHelpEn: 'Configured complex routing and subnets.', howIHelpId: 'Mengonfigurasi perutean kompleks dan subnet.'
    },
    { 
      id: '002', 
      name: 'SECURE INFRASTRUCTURE', 
      desc: 'IMPLEMENTATION OF FIREWALLS AND VPN FOR CORPORATE SECURITY', 
      descId: 'IMPLEMENTASI FIREWALL DAN VPN UNTUK KEAMANAN PERUSAHAAN', 
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Firewall', 'VPN'], techId: ['Firewall', 'VPN'],
      howIHelpEn: 'Implemented corporate security firewall policies.', howIHelpId: 'Menerapkan kebijakan firewall keamanan perusahaan.'
    }
  ],
  'DESIGN': [
    { 
      id: '001', 
      name: 'LUMINA UI', 
      desc: 'MODERN AND MINIMALIST DESIGN SYSTEM FOR WEB APPLICATIONS', 
      descId: 'SISTEM DESAIN MODERN DAN MINIMALIS UNTUK APLIKASI WEB', 
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Figma', 'UI/UX'], techId: ['Figma', 'UI/UX'],
      howIHelpEn: 'Created atomic UI components.', howIHelpId: 'Membuat komponen UI atomik.'
    },
    { 
      id: '002', 
      name: 'ECHO APP', 
      desc: 'USER INTERFACE DESIGN FOR A SOCIAL AUDIO PLATFORM', 
      descId: 'DESAIN ANTARMUKA PENGGUNA UNTUK PLATFORM AUDIO SOSIAL', 
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Figma', 'Prototyping'], techId: ['Figma', 'Prototyping'],
      howIHelpEn: 'Conducted user research and high-fidelity mockups.', howIHelpId: 'Melakukan riset pengguna dan maket kesetiaan tinggi.'
    }
  ]
};

const allCertificatesData = {
  'CODE': [
    { id: '001', name: 'FRONTEND MASTERY', desc: 'ADVANCED CERTIFICATION IN REACT AND MODERN JAVASCRIPT', descId: 'SERTIFIKASI LANJUTAN DALAM REACT DAN JAVASCRIPT MODERN', img: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Earned through completing advanced curriculum.', howIHelpId: 'Diperoleh melalui penyelesaian kurikulum lanjutan.' },
    { id: '002', name: 'FULLSTACK DEV', desc: 'COMPLETE FULLSTACK DEVELOPMENT BOOTCAMP', descId: 'BOOTCAMP PENGEMBANGAN FULLSTACK LENGKAP', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Built capstone fullstack projects.', howIHelpId: 'Membangun proyek fullstack capstone.' }
  ],
  'NETWORK': [
    { id: '001', name: 'CCNA ROUTING', desc: 'CISCO CERTIFIED NETWORK ASSOCIATE FUNDAMENTALS', descId: 'DASAR-DASAR CISCO CERTIFIED NETWORK ASSOCIATE', img: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Validated networking core competencies.', howIHelpId: 'Memvalidasi kompetensi inti jaringan.' }
  ],
  'DESIGN': [
    { id: '001', name: 'UI/UX FUNDAMENTALS', desc: 'CORE PRINCIPLES OF USER INTERFACE AND EXPERIENCE', descId: 'PRINSIP INTI ANTARMUKA DAN PENGALAMAN PENGGUNA', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Mastered wireframing and user testing.', howIHelpId: 'Menguasai pembuatan wireframe dan pengujian pengguna.' }
  ]
};

const ProjectDetailView = ({ onClose, category = 'CODE' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subCategory, setSubCategory] = useState('PROJECT'); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showHowIHelp, setShowHowIHelp] = useState(false); 
  const { lang } = useThemeLang();

  let activeCategory = 'CODE';
  if (category === 0 || category === '0' || category?.toUpperCase() === 'DESIGN') activeCategory = 'DESIGN';
  else if (category === 1 || category === '1' || category?.toUpperCase() === 'NETWORK') activeCategory = 'NETWORK';
  else if (category === 2 || category === '2' || category?.toUpperCase() === 'CODE') activeCategory = 'CODE';

  const currentData = subCategory === 'PROJECT' 
    ? (allProjectsData[activeCategory] || allProjectsData['CODE'])
    : (allCertificatesData[activeCategory] || allCertificatesData['CODE']);

  useEffect(() => {
    setActiveIndex(0); 
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % currentData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeCategory, subCategory, currentData.length]);

  const renderTitle = () => {
    const titleClass = "text-[clamp(32px,5vw,60px)] font-normal tracking-tight leading-[0.95] mb-6";
    if (activeCategory === 'NETWORK') return <h2 className={titleClass}><span className="pr-1 font-normal">NET</span><span className="accent-font italic">WORK</span></h2>;
    if (activeCategory === 'DESIGN') return <h2 className={titleClass}><span className="pr-1 font-normal">DES</span><span className="accent-font italic">IGN</span></h2>;
    return <h2 className={titleClass}><span className="pr-1 font-normal">CO</span><span className="accent-font italic">DE</span></h2>;
  };

  const buttonText = subCategory === 'CERTIFICATE' 
    ? (lang === 'id' ? 'LIHAT DETAIL' : 'VIEW DETAIL') 
    : (lang === 'id' ? 'LIHAT PROYEK' : 'VIEW PROJECT');

  // Trigger buka pop-up modal
  const handleOpenModal = (e, item) => {
    e.preventDefault();
    setShowHowIHelp(false);
    setSelectedProject(item);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 lg:px-24 animate-fade-in relative">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col mb-20">
          <div 
            style={{ fontFamily: "'Geist Mono', monospace" }} 
            className="text-[12px] tracking-[0.08em] mb-8 text-[#808080] uppercase flex items-center gap-3"
          >
            <span 
              className="cursor-pointer hover:text-black transition-colors" 
              onClick={(e) => {
                e.preventDefault(); 
                if (onClose) onClose();
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) projectsSection.scrollIntoView({ behavior: 'instant' });
                }, 50);
              }}
            >
              PROJECTS
            </span> 
            <span>&gt;</span> 
            <span className="text-black">{activeCategory}</span>
          </div>
          
          {renderTitle()}

          {/* Tab Sub-Kategori */}
          <div className="flex gap-4 text-[13px] tracking-[0.1em] uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
            <span 
              onClick={() => setSubCategory('PROJECT')}
              className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'PROJECT' ? 'bg-black text-white' : 'text-[#808080] hover:text-black'}`}
            >
              [ PROJECT ]
            </span>
            <span 
              onClick={() => setSubCategory('CERTIFICATE')}
              className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'CERTIFICATE' ? 'bg-black text-white' : 'text-[#808080] hover:text-black'}`}
            >
              [ CERTIFICATE ]
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-end">
          
          {/* Left: List Item */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {currentData.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="group flex flex-col cursor-pointer"
                >
                  <div style={{ fontFamily: "'Geist Mono', monospace" }} className={`flex items-center gap-6 text-[14px] md:text-[16px] transition-colors duration-300 pb-2 ${isActive ? 'text-black font-medium' : 'text-black/50 hover:text-black/70'}`}>
                    <span>{item.id}</span>
                    <span className="tracking-wide">{item.name}</span>
                  </div>
                  <div className={`h-[2px] transition-all duration-500 ease-out ${isActive ? 'w-full bg-black' : 'w-[55%] bg-black/20'}`}></div>
                </div>
              );
            })}
          </div>

          {/* Right: Card Image (TANPA BLUR, BORDER HITAM KOTAK) */}
          <div className="w-full lg:w-[450px] h-[350px] md:h-[400px] rounded-[24px] relative overflow-hidden flex flex-col justify-end bg-white group border border-black">
            <img 
              src={currentData[activeIndex]?.img} 
              alt={currentData[activeIndex]?.name} 
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Panel Teks Solid Putih dengan Top Border Hitam */}
            <div className="relative z-20 w-full flex flex-col p-6 md:p-8 bg-white border-t border-black">
              <h2 className="text-black text-[18px] md:text-[22px] font-semibold tracking-wide mb-2">{currentData[activeIndex]?.name}</h2>
              <p className="text-black/80 max-w-[90%] text-[12px] md:text-[13px] uppercase tracking-wider mb-6 leading-relaxed line-clamp-2">
                {lang === 'id' ? currentData[activeIndex]?.descId : currentData[activeIndex]?.desc}
              </p>
              
              <div className="w-full flex justify-end">
                <button 
                  onClick={(e) => handleOpenModal(e, currentData[activeIndex])}
                  className="group/btn inline-flex items-center gap-2 text-black hover:text-black/70 transition-colors uppercase tracking-[0.15em] text-[11px] md:text-[13px] bg-transparent border-none cursor-pointer"
                >
                  <ScrambledText radius={60} duration={0.6} speed={0.5}>
                    {buttonText}
                  </ScrambledText>
                  {/* Efek panah dikembalikan warnanya menjadi hitam menggunakan brightness-0 */}
                  <img 
                    src={arrowIcon} 
                    alt="Arrow" 
                    className="w-3 h-3 brightness-0 -rotate-90 transition-all duration-300 ease-out group-hover/btn:rotate-45 group-hover/btn:translate-y-1" 
                    draggable={false} 
                  />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* POP UP MODAL DETAIL PROJECT */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          
          <div className="w-full max-w-[550px] bg-white border border-[#E0E0E0] rounded-[24px] p-6 md:p-8 text-black relative shadow-2xl">
            
            {/* Tombol Close Huruf X Tipis Biasa (Menghapus font-bold menjadi font-light) */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors text-[20px] font-light leading-none cursor-pointer"
              style={{ fontFamily: "'Geist Mono', monospace" }}
              aria-label="Close"
            >
              X
            </button>

            <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[11px] tracking-widest text-[#808080] block mb-2">
              // {subCategory} DETAIL
            </span>
            <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight mb-4 uppercase">{selectedProject.name}</h3>
            
            {/* TECH STACK AREA (Hilang kalau tombol HOW I HELP diklik) */}
            {!showHowIHelp && selectedProject.techEn && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {(lang === 'id' ? selectedProject.techId : selectedProject.techEn).map((tech, index) => (
                  <TechTag key={index} name={tech} />
                ))}
              </div>
            )}

            <p className="text-[13px] text-black/70 leading-relaxed mb-8 uppercase tracking-wide">
              {lang === 'id' ? selectedProject.descId : selectedProject.desc}
            </p>

            {/* Area Khusus deskripsi kontribusi 'HOW I HELP' (KOTAK HITAM TEKS PUTIH) */}
            {showHowIHelp && (
              <div className="mb-8 p-5 bg-black border border-black rounded-xl animate-fade-in shadow-md">
                <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[11px] text-white/50 block mb-2">MY CONTRIBUTION:</span>
                <p className="text-[13px] text-white/95 leading-relaxed uppercase">
                  {lang === 'id' ? selectedProject.howIHelpId : selectedProject.howIHelpEn}
                </p>
              </div>
            )}

            {/* Grid Navigasi / Aksi Tombol (STYLE HIGHLIGHT BRACKET) */}
            <div className="flex flex-wrap gap-4 text-[13px] uppercase tracking-wider" style={{ fontFamily: "'Geist Mono', monospace" }}>
              
              {/* Tombol View Repo */}
              {selectedProject.repo && selectedProject.repo !== '#' && (
                <button 
                  onClick={() => window.open(selectedProject.repo, '_blank')}
                  className="px-2 py-1 text-[#808080] hover:text-black transition-colors cursor-pointer"
                >
                  [ VIEW REPO ]
                </button>
              )}

              {/* Tombol khusus Live Web */}
              {selectedProject.live && (
                <button 
                  onClick={() => window.open(selectedProject.live, '_blank')}
                  className="px-2 py-1 text-[#808080] hover:text-black transition-colors cursor-pointer"
                >
                  [ VIEW LIVE ]
                </button>
              )}

              {/* Tombol How I Help (Berubah hitam kalau aktif) */}
              {selectedProject.howIHelpEn && (
                <button 
                  onClick={() => setShowHowIHelp(!showHowIHelp)}
                  className={`px-2 py-1 transition-colors cursor-pointer ${showHowIHelp ? 'bg-black text-white' : 'text-[#808080] hover:text-black'}`}
                >
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