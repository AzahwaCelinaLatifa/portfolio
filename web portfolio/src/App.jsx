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

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState('main'); // 'main' | 'project-detail'

  // Scroll-based navbar hide/show
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
      }
      lastScrollY = currentScrollY;

      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = (currentScrollY / scrollHeight) * 100;
        setScrollProgress(Math.max(0, Math.min(pct, 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal-on-scroll observer
  useEffect(() => {
    const rvObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.07 });
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el) => rvObs.observe(el));

    return () => rvObs.disconnect();
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <ThemeLangProvider>
      <Header
        isVisible={isNavVisible}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        scrollProgress={scrollProgress}
      />

      {activeView === 'main' ? (
        <main>
          <Hero scrollProgress={scrollProgress} />
          <About />
          <Skills />
          <Projects onProjectClick={() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            setActiveView('project-detail');
          }} />
          <CV />
          <Contact scrollProgress={scrollProgress} />
        </main>
      ) : (
        <ProjectDetailView onClose={() => setActiveView('main')} />
      )}

      {/* Scroll Percentage - Fixed */}
      <div className="fixed bottom-8 right-8 text-[12px] tracking-[0.08em] text-white z-50 pointer-events-none mix-blend-difference" style={{
        opacity: scrollY > (typeof window !== 'undefined' ? window.innerHeight * 0.9 : 500) ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        {Math.round(scrollProgress).toString().padStart(3, '0')}%
      </div>
    </ThemeLangProvider>
  );
}

export default App;