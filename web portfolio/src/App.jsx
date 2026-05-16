import React, { useEffect, useState } from 'react';
import { ThemeLangProvider } from './context/ThemeLangContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CV from './components/CV';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { StaggeredMenu } from './components/StaggeredMenu'; 

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // STATE: Kontrol visibilitas Navbar & Mobile Menu
  const [isNavVisible, setIsNavVisible] = useState(true);

  // LOGIKA SCROLL
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsNavVisible(false); // Scroll turun -> Sembunyikan
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);  // Scroll naik -> Munculkan
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsContactOpen(true);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems = [
    { label: 'Home', link: '#home' },
    { label: 'About', link: '#about' },
    { label: 'Skills', link: '#skills' },
    { label: 'Work', link: '#portfolio' },
    { label: 'CV', link: '#cv' },
    { label: 'Contact', link: '#contact' } 
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  // Efek Parallax & Observers
  useEffect(() => {
    const rvObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: .07 });
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el) => rvObs.observe(el));

    const sbObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.sk-fill').forEach((f) => {
            f.style.transform = `scaleX(${f.dataset.w || .5})`;
            f.classList.add('on');
          });
        }
      });
    }, { threshold: .2 });
    document.querySelectorAll('.sk-group').forEach((g) => sbObs.observe(g));

    const onScroll = () => {
      const sy = window.scrollY;
      document.querySelectorAll('[data-par]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const spd = parseFloat(el.dataset.par) || .2;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * spd;
        el.style.transform = `translateY(${offset}px)`;
      });

      const homePaper = document.querySelector('.home-paper');
      if (homePaper) homePaper.style.transform = `translateY(${sy * .3}px)`;

      const aboutSheets = document.querySelectorAll('.paper-fold');
      aboutSheets.forEach((s, i) => {
        const baseTrans = s.style.transform.replace(/translateY\([^)]*\)/, '');
        s.style.transform = `${baseTrans} translateY(${sy * .08 * (i % 2 === 0 ? 1 : -1)}px)`.trim();
      });

      const skNum = document.querySelector('.sk-num');
      if (skNum) {
        const rect = skNum.closest('section').getBoundingClientRect();
        skNum.style.transform = `translateY(${rect.top * .08}px)`;
      }

      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((t, i) => {
        const rect = t.getBoundingClientRect();
        const pct = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const dir = i % 2 === 0 ? 1 : -1;
        const ph = t.querySelector('.t-ph');
        if (ph) ph.style.transform = `translateY(${pct * 18 * dir}px)`;
      });

      const cvEl = document.getElementById('cv-svg-bg');
      if (cvEl) {
        const sec = cvEl.closest('section');
        if(sec) {
          const r = sec.getBoundingClientRect();
          cvEl.style.transform = `translateY(${r.top * .12}px)`;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      rvObs.disconnect();
      sbObs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ThemeLangProvider>
      
      {/* PERBAIKAN FINAL MENU MOBILE: 
        Kita gunakan trik Opacity & Pointer-Events. 
        Ini akan menyembunyikan tombol secara mulus tanpa merusak layout StaggeredMenu!
      */}
      <div 
        className={`md:hidden z-[40] transition-opacity duration-200 ease-out ${
          isNavVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000000" 
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#e5e7eb', '#f3f4f6']} 
          logoUrl="" 
          accentColor="#5227FF" 
          isFixed={true}
        />
      </div>

      <Header 
        isVisible={isNavVisible} 
        onOpenContact={() => setIsContactOpen(true)} 
      />

      <main>
        <Hero id="home" />
        <About id="about" />
        <Skills id="skills" />
        <Projects id="portfolio" />
        <CV id="cv" />
      </main>
      
      <Footer />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      <style>{`
        .progress-bar, .scroll-line, #scroll-progress { display: none !important; }
      `}</style>
    </ThemeLangProvider>
  );
}

export default App;