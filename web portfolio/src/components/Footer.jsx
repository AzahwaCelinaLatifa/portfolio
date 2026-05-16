import React from 'react';
import { useThemeLang } from '../context/ThemeLangContext';

const Footer = () => {
  const { t } = useThemeLang();

  return (
    <footer className="border-t border-border2 p-8 text-center font-dm text-[10px] text-text3 tracking-[.08em] bg-bg print:hidden">
      <span>{t('ft')}</span>
    </footer>
  );
};

export default Footer;
