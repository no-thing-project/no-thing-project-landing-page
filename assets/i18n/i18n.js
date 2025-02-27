// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Автоматично визначає мову користувача
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          header: { title: "Welcome" },
          // інші ключі перекладів для англійської
        }
      },
      uk: {
        translation: {
          header: { title: "Ласкаво просимо" },
          // інші ключі перекладів для української
        }
      }
      // додайте інші мови за потребою
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'subdomain'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
