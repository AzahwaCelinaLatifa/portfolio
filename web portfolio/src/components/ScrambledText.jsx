import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Kita tidak perlu ScrambleTextPlugin lagi!
gsap.registerPlugin(SplitText);

const ScrambledText = ({
  radius = 60,
  duration = 0.8,
  speed = 0.5,
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('.scramble-target'), {
      type: 'chars',
      charsClass: 'inline-block will-change-transform'
    });

    // Simpan konten asli dan buat objek dummy untuk ditween oleh GSAP
    split.chars.forEach(c => {
      gsap.set(c, { attr: { 'data-content': c.innerHTML } });
      c._proxy = { val: 0 };
    });

    // Kumpulan simbol acak yang tersedia
    const symbols = ['#', '%', '$', '&', '!', '?', '@', '*', '+', '=', '~', '-', '>', '<', '^'];

    const handleMove = e => {
      split.chars.forEach(c => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const tweenDuration = duration * (1 - dist / radius);

          // Animasi custom untuk memanipulasi teks per frame
          gsap.to(c._proxy, {
            val: 1,
            duration: tweenDuration,
            overwrite: true,
            onUpdate: () => {
              // Mengatur kecepatan pergantian simbol
              if (Math.random() > speed) return;

              // Ambil semua karakter/simbol yang SAAT INI sedang tampil di kata ini
              const currentlyUsed = split.chars.map(el => el.innerText);

              // Saring: Cari simbol dari daftar yang BELUM dipakai di kata ini
              let available = symbols.filter(sym => !currentlyUsed.includes(sym));
              
              // Fallback: Jika kata sangat panjang dan simbol habis, reset array
              if (available.length === 0) available = symbols; 

              // Pilih simbol acak dari daftar yang masih "bebas"
              const randomChar = available[Math.floor(Math.random() * available.length)];
              c.innerText = randomChar;
            },
            onComplete: () => {
              // Kembalikan ke teks aslinya saat animasi selesai
              c.innerText = c.dataset.content;
            }
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed]);

  return (
    <div ref={rootRef} className={`inline-block ${className}`} style={style}>
      <span className="scramble-target">{children}</span>
    </div>
  );
};

export default ScrambledText;