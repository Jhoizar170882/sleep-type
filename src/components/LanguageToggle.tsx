import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
  { code: 'th', flag: '🇹🇭', label: 'ภาษาไทย' },
];

export default memo(function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5">
      <select
        value={current}
        onChange={handleChange}
        className="appearance-none bg-transparent text-sm font-medium text-slate-900 dark:text-white cursor-pointer focus:outline-none pr-4"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 w-3 h-3 text-slate-500 dark:text-slate-400"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
