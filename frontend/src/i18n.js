import i18n from 'i18n';
import { initReactI18next } from 'react-i18next';
import translationTR from './locales/tr/translation.json';
import translationFR from './locales/fr/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  tr: { translation: translationTR },
  fr: { translation: translationFR },
  ar: { translation: translationAR }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Çad'ın resmi dillerinden biri olduğu için varsayılan Fransızca 
    fallbackLng: 'tr', // Dil bulunamazsa Türkçe'ye dönecek
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;