import React, { useState, useEffect } from 'react';
import arrowIcon from '../assets/figma/arrow_bottom_right_bold.svg';
import ScrambledText from './ScrambledText';
import { useThemeLang } from '../context/ThemeLangContext';

const TechTag = ({ name }) => (
  <span 
    style={{ fontFamily: "'Geist Mono', monospace" }}
    className="inline-block px-3 py-1.5 border border-black/30 rounded-full text-[11px] tracking-[0.1em] text-black/70 uppercase transition-transform duration-300 ease-out hover:scale-110 active:scale-110 cursor-pointer select-none"
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
      id: '001', name: 'ENTERPRISE ROUTING', 
      desc: 'COMPLEX NETWORK TOPOLOGY SIMULATION USING CISCO PACKET TRACER', 
      descId: 'SIMULASI TOPOLOGI JARINGAN KOMPLEKS MENGGUNAKAN CISCO PACKET TRACER', 
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Packet Tracer', 'OSPF', 'VLAN'], techId: ['Packet Tracer', 'OSPF', 'VLAN'],
      howIHelpEn: 'Configured complex routing, subnets, and implemented inter-VLAN communications.', 
      howIHelpId: 'Mengonfigurasi perutean kompleks, subnet, dan menerapkan komunikasi antar-VLAN.'
    },
    { 
      id: '002', name: 'SECURE INFRASTRUCTURE', 
      desc: 'IMPLEMENTATION OF FIREWALLS AND VPN FOR CORPORATE SECURITY', 
      descId: 'IMPLEMENTASI FIREWALL DAN VPN UNTUK KEAMANAN PERUSAHAAN', 
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['ASA Firewall', 'VPN Tunneling'], techId: ['ASA Firewall', 'VPN Tunneling'],
      howIHelpEn: 'Implemented corporate security firewall policies and secure remote access connections.', 
      howIHelpId: 'Menerapkan kebijakan firewall keamanan perusahaan dan koneksi akses jarak jauh yang aman.'
    }
  ],
  'DESIGN': [
    { 
      id: '001', name: 'LUMINA UI', 
      desc: 'MODERN AND MINIMALIST DESIGN SYSTEM FOR WEB APPLICATIONS', 
      descId: 'SISTEM DESAIN MODERN DAN MINIMALIS UNTUK APLIKASI WEB', 
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Figma', 'Design System'], techId: ['Figma', 'Sistem Desain'],
      howIHelpEn: 'Created atomic UI components, typography guidelines, and responsive grid layouts.', 
      howIHelpId: 'Membuat komponen UI atomik, pedoman tipografi, dan tata letak kisi yang responsif.'
    },
    { 
      id: '002', name: 'ECHO APP', 
      desc: 'USER INTERFACE DESIGN FOR A SOCIAL AUDIO PLATFORM', 
      descId: 'DESAIN ANTARMUKA PENGGUNA UNTUK PLATFORM AUDIO SOSIAL', 
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
      repo: '#', live: null, 
      techEn: ['Figma', 'Prototyping'], techId: ['Figma', 'Prototyping'],
      howIHelpEn: 'Conducted user research, mapped user flows, and built high-fidelity interactive mockups.', 
      howIHelpId: 'Melakukan riset pengguna, memetakan alur pengguna, dan membangun maket interaktif kesetiaan tinggi.'
    }
  ]
};

const allCertificatesData = {
  'CODE': [
    { id: '001', name: 'FRONTEND MASTERY', desc: 'ADVANCED CERTIFICATION IN REACT AND MODERN JAVASCRIPT', descId: 'SERTIFIKASI LANJUTAN DALAM REACT DAN JAVASCRIPT MODERN', img: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Earned through completing advanced frontend curriculum.', howIHelpId: 'Diperoleh melalui penyelesaian kurikulum lanjutan frontend.' }
  ],
  'NETWORK': [
    { id: '001', name: 'CCNA ROUTING', desc: 'CISCO CERTIFIED NETWORK ASSOCIATE FUNDAMENTALS', descId: 'DASAR-DASAR CISCO CERTIFIED NETWORK ASSOCIATE', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Validated networking core competencies including routing.', howIHelpId: 'Memvalidasi kompetensi inti jaringan termasuk perutean.' }
  ],
  'DESIGN': [
    { id: '001', name: 'UI/UX FUNDAMENTALS', desc: 'CORE PRINCIPLES OF USER INTERFACE AND EXPERIENCE', descId: 'PRINSIP INTI ANTARMUKA DAN PENGALAMAN PENGGUNA', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800', repo: '#', live: null, howIHelpEn: 'Mastered user-centric design paradigms and wireframing.', howIHelpId: 'Menguasai paradigma desain yang berpusat pada pengguna dan wireframing.' }
  ]
};

const ProjectDetailView = ({ onClose, category = 'CODE' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subCategory, setSubCategory] = useState('PROJECT'); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showHowIHelp, setShowHowIHelp] = useState(false); 
  const { lang } = useThemeLang();

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

  // FIX WARNA: Sekarang pakai Krem #EBE6E0
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
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 lg:px-24 animate-fade-in relative overflow-hidden">
      
      {/* DOT BACKGROUND (Samar) */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_right,rgba(227,242,253,0.3)_0%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-20">
          <div style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[12px] tracking-[0.08em] mb-8 text-black/50 uppercase flex items-center gap-3 relative z-10">
            <span className="cursor-pointer hover:text-black transition-colors" onClick={(e) => { e.preventDefault(); if (onClose) onClose(); }}>
              PROJECTS
            </span> 
            <span>&gt;</span> 
            <span className="text-black">{activeCategory}</span>
          </div>
          
          {renderTitle()}

          <div className="flex gap-4 text-[13px] tracking-[0.1em] uppercase relative z-10" style={{ fontFamily: "'Geist Mono', monospace" }}>
            <span onClick={() => setSubCategory('PROJECT')} className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'PROJECT' ? 'bg-black text-white' : 'text-black/50 hover:text-black'}`}>
              [ PROJECT ]
            </span>
            <span onClick={() => setSubCategory('CERTIFICATE')} className={`cursor-pointer transition-colors px-2 py-1 ${subCategory === 'CERTIFICATE' ? 'bg-black text-white' : 'text-black/50 hover:text-black'}`}>
              [ CERTIFICATE ]
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-end relative z-10">
          
          {/* Left: List Item */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {currentData.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={item.id} onClick={() => setActiveIndex(idx)} className="group flex flex-col cursor-pointer">
                  <div style={{ fontFamily: "'Geist Mono', monospace" }} className={`flex items-center gap-6 text-[14px] md:text-[16px] transition-colors duration-300 pb-2 ${isActive ? 'text-black font-medium' : 'text-black/40 hover:text-black/70'}`}>
                    <span>{item.id}</span>
                    <span className="tracking-wide">{item.name}</span>
                  </div>
                  <div className={`h-[2px] transition-all duration-500 ease-out ${isActive ? 'w-full bg-black' : 'w-[55%] bg-black/20'}`}></div>
                </div>
              );
            })}
          </div>

          {/* Right: Card Image (Grayscale hover) */}
          <div className="w-full lg:w-[450px] h-[350px] md:h-[400px] rounded-[24px] relative overflow-hidden flex flex-col justify-end bg-white group border border-black/20 shadow-sm">
            <img 
              src={currentData[activeIndex]?.img} 
              alt={currentData[activeIndex]?.name} 
              className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 ease-out grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
            
            <div className="relative z-20 w-full flex flex-col p-6 md:p-8 bg-white border-t border-black/20">
              <h2 className="text-black text-[18px] md:text-[22px] font-semibold tracking-wide mb-2">{currentData[activeIndex]?.name}</h2>
              <p className="text-black/70 max-w-[90%] text-[12px] md:text-[13px] uppercase tracking-wider mb-6 leading-relaxed line-clamp-2">
                {lang === 'id' ? currentData[activeIndex]?.descId : currentData[activeIndex]?.desc}
              </p>
              
              <div className="w-full flex justify-end">
                <button onClick={(e) => handleOpenModal(e, currentData[activeIndex])} className="group/btn inline-flex items-center gap-2 text-black hover:text-black/70 transition-colors uppercase tracking-[0.15em] text-[11px] md:text-[13px] bg-transparent border-none cursor-pointer">
                  <ScrambledText radius={60} duration={0.6} speed={0.5}>{buttonText}</ScrambledText>
                  <img src={arrowIcon} alt="Arrow" className="w-3 h-3 brightness-0 -rotate-90 transition-all duration-300 ease-out group-hover/btn:rotate-45 group-hover/btn:translate-y-1" draggable={false} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* POP UP MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[550px] bg-white border border-[#E0E0E0] rounded-[24px] p-6 md:p-8 text-black relative shadow-2xl">
            
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors text-[20px] font-light leading-none cursor-pointer" style={{ fontFamily: "'Geist Mono', monospace" }}>
              X
            </button>

            <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[11px] tracking-widest text-black/50 block mb-2">
              // {subCategory} DETAIL
            </span>
            <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight mb-4 uppercase">{selectedProject.name}</h3>
            
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

            {/* FIX WARNA BOX: Sekarang pakai Krem CV #EBE6E0 */}
            {showHowIHelp && (
              <div className="mb-8 p-5 bg-[#EBE6E0] border border-[#EBE6E0] rounded-xl animate-fade-in shadow-md">
                <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-[11px] text-black/60 font-semibold block mb-2">MY CONTRIBUTION:</span>
                <p className="text-[13px] text-black/90 font-medium leading-relaxed uppercase">
                  {lang === 'id' ? selectedProject.howIHelpId : selectedProject.howIHelpEn}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-[13px] uppercase tracking-wider" style={{ fontFamily: "'Geist Mono', monospace" }}>
              {selectedProject.repo && selectedProject.repo !== '#' && (
                <button onClick={() => window.open(selectedProject.repo, '_blank')} className="px-2 py-1 text-black/50 hover:text-black transition-colors cursor-pointer">
                  [ VIEW REPO ]
                </button>
              )}

              {selectedProject.live && (
                <button onClick={() => window.open(selectedProject.live, '_blank')} className="px-2 py-1 text-black/50 hover:text-black transition-colors cursor-pointer">
                  [ VIEW LIVE ]
                </button>
              )}

              {selectedProject.howIHelpEn && (
                <button onClick={() => setShowHowIHelp(!showHowIHelp)} className={`px-2 py-1 transition-colors cursor-pointer ${showHowIHelp ? 'bg-black text-white' : 'text-black/50 hover:text-black'}`}>
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