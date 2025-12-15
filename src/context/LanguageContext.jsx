import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * LanguageContext : gestion globale de la langue (FR/EN/ES)
 * Persiste le choix en localStorage
 */

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Récupérer langue stockée ou défaut FR
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('appLanguage') || 'fr';
      }
    } catch (_) {
      // ignore
    }
    return 'fr';
  });

  useEffect(() => {
    // Persister choix langue
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('appLanguage', lang);
      }
    } catch (_) {
      // ignore
    }
  }, [lang]);

  const changeLang = (newLang) => {
    if (['fr', 'en', 'es'].includes(newLang)) {
      setLang(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook pour accéder à la langue courante et fonction de changement
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within <LanguageProvider>');
  }
  return ctx;
}
