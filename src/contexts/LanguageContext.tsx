import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, useTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const { t, dir } = useTranslation(language);

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Update font family for RTL languages
    if (dir === 'rtl') {
      document.body.style.fontFamily = "'Noto Sans Arabic', 'Inter', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
