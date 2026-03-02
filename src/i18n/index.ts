import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './ko.json';
import en from './en.json';
import ja from './ja.json';
import zh from './zh.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import pt from './pt.json';
import vi from './vi.json';
import th from './th.json';

const supportedLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'vi', 'th'];

function detectLanguage(): string {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang && supportedLanguages.includes(urlLang)) {
    return urlLang;
  }
  const saved = localStorage.getItem('sleep-quiz-lang');
  if (saved && supportedLanguages.includes(saved)) {
    return saved;
  }
  const browserLang = navigator.language.split('-')[0];
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    ja: { translation: ja },
    zh: { translation: zh },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    pt: { translation: pt },
    vi: { translation: vi },
    th: { translation: th },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('sleep-quiz-lang', lng);
  document.documentElement.lang = lng;
});

export default i18n;
