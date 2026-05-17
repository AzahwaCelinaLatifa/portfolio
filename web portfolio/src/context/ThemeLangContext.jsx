import React, { createContext, useContext, useState } from 'react';

const ThemeLangContext = createContext();

export const useThemeLang = () => useContext(ThemeLangContext);

export const ThemeLangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  return (
    <ThemeLangContext.Provider value={{ lang, setLang }}>
      {children}
    </ThemeLangContext.Provider>
  );
};