import React, { useEffect } from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const CV = () => {
  const { t, isDark } = useThemeLang();

  useEffect(() => {
    const svgEl = document.getElementById('cv-svg-bg');
    if (!svgEl) return;
    const W = svgEl.clientWidth || 1080, H = svgEl.clientHeight || 900;
    const clr = isDark ? 'rgba(240,239,232,0.06)' : 'rgba(17,17,16,0.05)';
    let d = '';
    for (let i = 0; i < 12; i++) {
      const y0 = H * .1 + i * (H * .08);
      const freq = .004 + i * .0003, amp = 30 + i * 8;
      let path = `M0 ${y0}`;
      for (let x = 0; x <= W; x += 8) {
        const y = y0 + Math.sin(x * freq + i * 1.5) * amp + Math.sin(x * .008 + i) * 15;
        path += ` L${x} ${y}`;
      }
      d += `<path d="${path}" fill="none" stroke="${clr}" stroke-width="1.2"/>`;
    }
    svgEl.innerHTML = d;
  }, [isDark]);

  return (
    <section id="cv" className="relative overflow-hidden min-h-screen pt-[52px] bg-bg">
      <svg id="cv-svg-bg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="absolute inset-0 z-0 pointer-events-none overflow-hidden"></svg>
      <div className="relative z-[1] max-w-[1080px] mx-auto px-8 pt-28 pb-24 cv-sec-inner text-antialiased">
        
        <div className="flex justify-end mb-6 cv-pr">
          <button className="sv-btn font-dm uppercase tracking-widest text-[10px]" onClick={() => window.print()}>Cetak CV</button>
        </div>

        <div className="border-t-[4px] border-text border-b border-border py-6 mb-12 flex items-baseline justify-between flex-wrap gap-2 transition-colors duration-350 rv">
          <div>
            <div className="font-playfair text-[clamp(26px,5vw,52px)] font-bold tracking-[-1px] text-text">Azahwa Celina Latifa</div>
            <div className="font-dm text-[10px] tracking-[.15em] text-text3 mt-1">FULLSTACK DEVELOPER & IT ENTHUSIAST</div>
          </div>
          <div className="font-dm text-[9px] text-text3 tracking-[.08em]">CURRICULUM VITAE</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-12 rv cv-body">
          {/* KOLOM KIRI */}
          <div>
            <div className="w-full aspect-[3/4] bg-bg3 rounded-[3px] flex flex-col items-center justify-center gap-2 text-text3 text-[10px] mb-6 border border-dashed border-border font-dm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
              <span>FOTO PROFESIONAL</span>
            </div>

            <div className="mb-8">
              <div className="font-bebas text-[17px] tracking-[2px] text-text mb-3 border-b border-border pb-2">KONTAK</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>azahwacelinalatifa@gmail.com</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>+62 812-2519-4448</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>Semarang, Indonesia</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>github.com/AzahwaCelina</div>
            </div>

            <div className="mb-8">
              <div className="font-bebas text-[17px] tracking-[2px] text-text mb-3 border-b border-border pb-2">DATA DIRI</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>Semarang, 03 Mei 200X</div>
              <div className="text-[12px] text-text2 py-1 flex items-start gap-[6px] font-epilogue"><span className="sv-dot mt-[5px]"></span>Perempuan</div>
            </div>

            <div className="mb-8">
              <div className="font-bebas text-[17px] tracking-[2px] text-text mb-3 border-b border-border pb-2">KEAHLIAN</div>
              {[
                { n: 'HTML & CSS', v: 4 },
                { n: 'JavaScript', v: 3 },
                { n: 'Cisco Networking', v: 4 },
                { n: 'UI/UX Design', v: 5 },
                { n: 'PHP & MySQL', v: 3 },
              ].map(s => (
                <div key={s.n} className="mb-3">
                  <div className="font-dm text-[10px] text-text2 mb-1 uppercase tracking-wider">{s.n}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-300 ${i < s.v ? 'bg-svg-grad2 border border-sv2' : 'bg-border'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div>
            <div className="mb-10">
              <div className="font-bebas text-[21px] tracking-[2px] text-text mb-4 pb-2 border-b-2 border-text3">PROFIL SAYA</div>
              {/* TEKS DESKRIPSI: KAPITAL MANUAL + FONT MONO + TRACKING WIDEST */}
              <p className="font-mono text-[11px] tracking-[0.18em] leading-[1.8] text-text2 text-justify">
                SEORANG PELAJAR JURUSAN SISTEM INFORMASI JARINGAN DAN APLIKASI (SIJA) YANG MEMILIKI KETERTARIKAN BESAR TERHADAP DUNIA TEKNOLOGI INFORMASI. MEMILIKI SEMANGAT TINGGI UNTUK MENDALAMI PENGEMBANGAN APLIKASI WEB DARI HULU KE HILIR (FULLSTACK DEVELOPMENT), DESAIN ANTARMUKA PENGGUNA (UI/UX), HINGGA ARSITEKTUR JARINGAN KOMPUTER. SELALU PROAKTIF DALAM MEMPELAJARI INOVASI TEKNOLOGI TERBARU DAN BERDEDIKASI UNTUK TERUS MENGASAH LOGIKA PEMROGRAMAN GUNA MENJADI SEORANG PROFESIONAL IT YANG ANDAL DAN SOLUTIF.
              </p>
            </div>

            <div className="mb-10">
              <div className="font-bebas text-[21px] tracking-[2px] text-text mb-4 pb-2 border-b-2 border-text3">RIWAYAT PENDIDIKAN</div>
              <div className="py-3 border-b border-border2">
                <div className="flex items-start gap-4 justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-text font-epilogue">SMK Negeri 7 Semarang</div>
                    <div className="font-dm text-[10px] text-text3 mt-[2px] uppercase tracking-wider">Sistem Informasi Jaringan dan Aplikasi</div>
                  </div>
                  <div className="font-dm text-[10px] text-text3 shrink-0 pt-[2px]">2022–KINI</div>
                </div>
              </div>
              <div className="py-3 border-b border-border2">
                <div className="flex items-start gap-4 justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-text font-epilogue">SMP Negeri 5 Semarang</div>
                  </div>
                  <div className="font-dm text-[10px] text-text3 shrink-0 pt-[2px]">2019–2022</div>
                </div>
              </div>
              <div className="py-3 border-b border-border2">
                <div className="flex items-start gap-4 justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-text font-epilogue">SD Negeri Sukorejo 1</div>
                  </div>
                  <div className="font-dm text-[10px] text-text3 shrink-0 pt-[2px]">2013–2019</div>
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-start gap-4 justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-text font-epilogue">TK Turus Kamulyan</div>
                  </div>
                  <div className="font-dm text-[10px] text-text3 shrink-0 pt-[2px]">2011–2013</div>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="font-bebas text-[21px] tracking-[2px] text-text mb-4 pb-2 border-b-2 border-text3">PENGALAMAN & KEGIATAN</div>
              <div className="py-3 border-b border-border2">
                <div className="flex items-start gap-4 justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-text font-epilogue uppercase">Fokus Studi & Eksplorasi Mandiri</div>
                    <div className="font-dm text-[10px] text-text3 mt-[2px] uppercase tracking-wider">Pengembangan Fullstack & Topologi Jaringan</div>
                  </div>
                  <div className="font-dm text-[10px] text-text3 shrink-0 pt-[2px] uppercase">Sekarang</div>
                </div>
                {/* TEKS PENGALAMAN: KAPITAL MANUAL + FONT MONO + TRACKING WIDEST */}
                <div className="font-mono text-[11px] tracking-[0.18em] leading-[1.8] text-text2 mt-4 text-justify">
                  SAAT INI BERFOKUS PADA PENYELESAIAN TUGAS AKADEMIK KEJURUAN SEKALIGUS AKTIF MELAKUKAN PEMBELAJARAN MANDIRI DI LUAR JAM SEKOLAH. KEGIATAN BERFOKUS PADA PEMBUATAN PROYEK-PROYEK SKALA KECIL SEPERTI MERANCANG UI/UX WEB, MENGASAH KEMAMPUAN CODING LOGIKA BACKEND, SERTA MEMPRAKTIKKAN SIMULASI JARINGAN KOMPUTER MENGGUNAKAN CISCO PACKET TRACER.
                </div>
              </div>
            </div>

            <div className="bg-bg2 border border-sv2 rounded-[2px] p-6 mt-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-svg-grad opacity-[0.04] pointer-events-none"></div>
              <div className="font-fraunces italic font-extralight text-[17px] text-text leading-[1.7] relative">
                "Setiap ahli IT profesional dulunya adalah seorang pemula. Hal terpenting adalah kemauan untuk terus belajar, mencoba, dan tidak takut menghadapi error."
              </div>
              <div className="font-dm text-[9px] text-text3 tracking-[.12em] mt-3 relative">— Azahwa Celina Latifa</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;