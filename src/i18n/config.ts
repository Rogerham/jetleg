
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import nlTranslations from './locales/nl.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';

const resources = {
  nl: { translation: nlTranslations },
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  es: { translation: esTranslations },
  it: { translation: itTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nl', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
