import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = (lang: string) => {
    if (lang !== current) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
      <button
        onClick={() => toggle('ko')}
        className={`text-sm font-bold transition-colors px-1 cursor-pointer ${
          current === 'ko' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        KO
      </button>
      <span className="text-slate-600 text-xs">|</span>
      <button
        onClick={() => toggle('en')}
        className={`text-sm font-bold transition-colors px-1 cursor-pointer ${
          current === 'en' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
