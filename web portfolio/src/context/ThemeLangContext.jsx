import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/i18n';

const ThemeLangContext = createContext();

export const useThemeLang = () => useContext(ThemeLangContext);

export const ThemeLangProvider = ({ children }) => {
  const [lang, setLang] = useState('id');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const t = (key) => {
    // Membaca terjemahan berdasarkan bahasa saat ini (lang). 
    // Fallback ke key jika terjemahan belum ada.
    const text = translations[lang]?.[key] || key;
    
    // Split by \n to render <br> elements, returning an array of React nodes
    return text.split('\n').map((str, index, array) => (
      <React.Fragment key={index}>
        {str}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <ThemeLangContext.Provider value={{ lang, setLang, isDark, setIsDark, t }}>
      {children}
    </ThemeLangContext.Provider>
  );
};