import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-8 text-center border-t border-black/5 dark:border-white/5">
      <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
        {t('footer.tagline')}
      </p>
      <p className="text-slate-300 dark:text-slate-600 text-xs mt-2">
        {t('footer.copyright')}
      </p>
      <div className="flex items-center justify-center gap-4 mt-3">
        <Link
          to="/about"
          className="text-slate-400 dark:text-slate-500 text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t('footer.about')}
        </Link>
        <span className="text-slate-200 dark:text-slate-700 text-xs">·</span>
        <Link
          to="/privacy"
          className="text-slate-400 dark:text-slate-500 text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t('footer.privacy')}
        </Link>
        <span className="text-slate-200 dark:text-slate-700 text-xs">·</span>
        <Link
          to="/terms"
          className="text-slate-400 dark:text-slate-500 text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t('footer.terms')}
        </Link>
      </div>
    </footer>
  );
}
