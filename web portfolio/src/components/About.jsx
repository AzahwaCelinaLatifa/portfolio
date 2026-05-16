import React, { useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const About = () => {
  const {} = useThemeLang();

  useEffect(() => {
    const bg = document.getElementById('about-bg');
    if (!bg) return;

    bg.innerHTML = '';

    const sheets = [];
    const n = 7;
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div');
      d.className = 'paper-fold';
      const w = Math.random() * 180 + 80, h = Math.random() * 240 + 100;
      const x = Math.random() * 110 - 10, y = Math.random() * 110 - 10;
      const rot = Math.random() * 40 - 20;
      d.style.cssText = `position:absolute;border-radius:2px;opacity:0.06;pointer-events:none;width:${w}px;height:${h}px;left:${x}%;top:${y}%;transform:rotate(${rot}deg);border:1px solid var(--text);background:var(--bg3)`;
      bg.appendChild(d);
      sheets.push({ el: d, x, y, rot, spd: Math.random() * .15 + .05, amp: Math.random() * 3 + 1, t: Math.random() * Math.PI * 2 });
    }

    const liner = document.createElement('div');
    liner.style.cssText = `position:absolute;inset:0;background-image:repeating-linear-gradient(transparent,transparent 27px,var(--border) 28px);opacity:.15;pointer-events:none`;
    bg.appendChild(liner);

    let animationId;
    const animate = () => {
      sheets.forEach(s => {
        s.t += s.spd * .01;
        const dy = Math.sin(s.t) * s.amp;
        const dr = Math.cos(s.t * .7) * .5;
        s.el.style.transform = `rotate(${s.rot + dr}deg) translateY(${dy}px)`;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden min-h-screen pt-[52px] bg-bg2 print:hidden">
      <div id="about-bg" className="absolute inset-0 z-0 pointer-events-none overflow-hidden [data-theme='dark']_&>.paper-fold:opacity-4"></div>

      <div className="relative z-[2] max-w-[1080px] mx-auto px-8 pt-28 pb-24">

        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-12 mb-20 border-b border-border pb-8 rv">
          <div className="font-dm text-[9px] tracking-[.2em] text-text3 uppercase md:[writing-mode:vertical-rl] md:rotate-180 shrink-0">
            MENGENAL LEBIH DEKAT
          </div>
          <div className="font-playfair text-[clamp(36px,7vw,76px)] font-bold leading-[0.95] tracking-[-2px] text-text flex-1">
            Tentang Saya
          </div>
          <div className="font-fraunces italic font-extralight text-[17px] text-text3 max-w-[240px] leading-[1.5] shrink-0">
            Sekilas tentang latar belakang dan hal yang memicu semangat saya di dunia IT.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 rv">
          {/* KOLOM KIRI: Latar Belakang & Pendidikan */}
          <div>
            <div className="font-dm text-[9px] tracking-[.2em] uppercase text-text3 mb-5 pb-3 border-b border-border2">LATAR BELAKANG KELUARGA</div>
            {/* UPDATE TEKS: Nambahin Lahir & Tinggal di Semarang */}
            <p className="font-mono uppercase tracking-widest text-[11px] font-medium text-text2 leading-[1.8] mb-4">
              LAHIR DAN TINGGAL DI SEMARANG, JAWA TENGAH. ANAK KEDUA DARI DUA BERSAUDARA. MENETAP BERSAMA AYAH, IBU, DAN KAKAK YANG SELALU MENJADI SUPPORT SYSTEM UTAMA DALAM MENGEJAR MIMPI DI DUNIA TEKNOLOGI.
            </p>

            <div className="font-dm text-[9px] tracking-[.2em] uppercase text-text3 mt-8 mb-5 pb-3 border-b border-border2">RIWAYAT PENDIDIKAN</div>
            <div className="py-3 border-b border-border2">
              <div className="text-[13px] font-bold text-text">SMK Negeri 7 Semarang</div>
              <div className="font-dm text-[10px] text-text3 mt-[2px]">Sistem Informasi Jaringan & Aplikasi · 2022–Kini</div>
            </div>
            <div className="py-3 border-b border-border2">
              <div className="text-[13px] font-bold text-text">SMP Negeri 5 Semarang</div>
              <div className="font-dm text-[10px] text-text3 mt-[2px]">2019–2022</div>
            </div>
            <div className="py-3 border-b border-border2">
              <div className="text-[13px] font-bold text-text">SD Negeri Sukorejo 1</div>
              <div className="font-dm text-[10px] text-text3 mt-[2px]">2013–2019</div>
            </div>
            <div className="py-3">
              <div className="text-[13px] font-bold text-text">TK Turus Kamulyan</div>
              <div className="font-dm text-[10px] text-text3 mt-[2px]">2011–2013</div>
            </div>
          </div>

          {/* KOLOM TENGAH: Hobi & Visi */}
          <div>
            <div className="font-dm text-[9px] tracking-[.2em] uppercase text-text3 mb-5 pb-3 border-b border-border2">HOBI & MINAT</div>
            <div className="font-mono uppercase tracking-widest text-[11px] font-medium text-text2 flex flex-col gap-3">
              <div className="flex items-start gap-2"><span className="sv-dot mt-1.5"></span>MEMBACA BUKU & ARTIKEL IT</div>
              <div className="flex items-start gap-2"><span className="sv-dot mt-1.5"></span>EKSPLORASI LOGIKA CODING</div>
              <div className="flex items-start gap-2"><span className="sv-dot mt-1.5"></span>DESAIN ANTARMUKA (UI/UX)</div>
              <div className="flex items-start gap-2"><span className="sv-dot mt-1.5"></span>PROBLEM SOLVING</div>
              <div className="flex items-start gap-2"><span className="sv-dot mt-1.5"></span>KONFIGURASI JARINGAN DASAR</div>
            </div>

            <div className="font-dm text-[9px] tracking-[.2em] uppercase text-text3 mt-8 mb-5 pb-3 border-b border-border2">VISI KE DEPAN</div>
            <p className="font-mono uppercase tracking-widest text-[11px] font-medium text-text2 leading-[1.8]">
              BERKOMITMEN MENGASAH KEMAMPUAN FRONTEND DAN BACKEND. KONSISTENSI SERTA RASA INGIN TAHU ADALAH KUNCI SAYA UNTUK MENJADI FULLSTACK DEVELOPER YANG ANDAL.
            </p>
          </div>

          {/* KOLOM KANAN: Keterampilan */}
          <div>
            <div className="font-dm text-[9px] tracking-[.2em] uppercase text-text3 mb-5 pb-3 border-b border-border2">KETERAMPILAN</div>
            <div className="mb-4">
              <div className="font-dm text-[9px] tracking-[.12em] text-text3 mb-3">SOFT SKILLS</div>
              <div className="flex flex-wrap gap-[6px]">
                <span className="sv-tag">Berpikir Kritis</span>
                <span className="sv-tag">Pemecahan Masalah</span>
                <span className="sv-tag">Adaptasi Cepat</span>
                <span className="sv-tag">Manajemen Waktu</span>
                <span className="sv-tag">Kerja Sama Tim</span>
                <span className="sv-tag">Kemauan Belajar</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="font-dm text-[9px] tracking-[.12em] text-text3 mb-3">HARD SKILLS</div>
              <div className="flex flex-wrap gap-[6px]">
                <span className="sv-tag">HTML & CSS</span>
                <span className="sv-tag">JavaScript</span>
                <span className="sv-tag">PHP & MySQL</span>
                <span className="sv-tag">UI/UX Design</span>
                <span className="sv-tag">Cisco Packet Tracer</span>
                <span className="sv-tag">Canva & Photoshop</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;