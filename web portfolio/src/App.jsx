import React, { useEffect, useState } from 'react';
import { ThemeLangProvider } from './context/ThemeLangContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectDetailView from './components/ProjectDetailView';
import CV from './components/CV';
import Contact from './components/Contact';
import MobileMenu from './components/MobileMenu';
import SplashScreen from './components/SplashScreen'; // Import komponen SplashScreen

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const pct = (currentScrollY / scrollHeight) * 100;
            setScrollProgress(Math.max(0, Math.min(pct, 100)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 text-[12px] tracking-[0.08em] text-white z-50 pointer-events-none mix-blend-difference" style={{
      opacity: scrollY > (typeof window !== 'undefined' ? window.innerHeight * 0.9 : 500) ? 1 : 0,
      transition: 'opacity 0.3s'
    }}>
      {Math.round(scrollProgress).toString().padStart(3, '0')}%
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true); // State untuk mengontrol kemunculan Splash Screen
  const [splashFinished, setSplashFinished] = useState(false); // State untuk menunda komponen berat
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('main'); // 'main' | 'project-detail'
  const [selectedCategory, setSelectedCategory] = useState('CODE'); 

  // PERBAIKAN BUG SKILLS HILANG: Observer sekarang memantau [activeView, splashFinished]
  useEffect(() => {
    // Jangan jalankan intersection observer kalau splash belum selesai,
    // karena konten masih deferred
    if (!splashFinished) return;

    const rvObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          e.target.dataset.in = 'true';
        }
      });
    }, { threshold: 0.07 });

    let timeoutId;
    if (activeView === 'main') {
      timeoutId = setTimeout(() => {
        document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el) => rvObs.observe(el));
      }, 100);
    }

    return () => {
      rvObs.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeView, splashFinished]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Tunda sedikit rendering konten berat agar App sempat bernapas setelah unmount splash
    setTimeout(() => {
      setSplashFinished(true);
    }, 50);
  };

  return (
    <ThemeLangProvider>
      {/* Splash Screen overlay */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
      />

      {activeView === 'main' ? (
        <main>
          {/* Kirim status splashFinished ke komponen yang memiliki elemen dinamis/berat */}
          <Hero splashFinished={splashFinished} />
          
          {/* DEFER SEMUA KONTEN BERAT DI BAWAH HERO SAMPAI SPLASH SELESAI */}
          {splashFinished && (
            <>
              <About />
              <Skills />
              <Projects splashFinished={splashFinished} onProjectClick={(categoryName) => {
                setSelectedCategory(categoryName);
                window.scrollTo({ top: 0, behavior: 'auto' });
                setActiveView('project-detail');
              }} />
              <CV />
              <Contact />
            </>
          )}
        </main>
      ) : (
        <ProjectDetailView 
          category={selectedCategory} 
          onClose={() => {
            setActiveView('main');
            // PERBAIKAN BREADCRUMB: Balik langsung ke elemen id="projects"
            setTimeout(() => {
              const projectsEl = document.getElementById('projects');
              if (projectsEl) {
                projectsEl.scrollIntoView({ behavior: 'auto' });
              }
            }, 50);
          }} 
        />
      )}

      {/* Scroll Percentage - Fixed */}
      <ScrollIndicator />
    </ThemeLangProvider>
  );
}

export default App;