import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeLangContext = createContext();

export const useThemeLang = () => useContext(ThemeLangContext);

export const ThemeLangProvider = ({ children }) => {
  // --- STATE BAHASA ---
  const [lang, setLang] = useState('en');

  // --- STATE TEMA ---
  // Cek localStorage dulu, kalau kosong cek preferensi sistem user
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // --- EFEK PERUBAHAN TEMA ---
  // Menambahkan atau menghapus class 'dark' di tag <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Simpan pilihan user agar tidak hilang saat di-refresh
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- FUNGSI TOGGLE ---
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeLangContext.Provider value={{ lang, setLang, theme, toggleTheme }}>
      {children}
    </ThemeLangContext.Provider>
  );
};