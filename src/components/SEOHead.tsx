import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  titleKey?: string;
  descriptionKey?: string;
  path?: string;
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  ko: 'ko_KR',
  ja: 'ja_JP',
  zh: 'zh_CN',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  vi: 'vi_VN',
  th: 'th_TH',
};

const ALTERNATE_LOCALES = ['en_US', 'ko_KR', 'ja_JP', 'zh_CN', 'es_ES', 'fr_FR', 'de_DE', 'pt_BR', 'vi_VN', 'th_TH'];

const THEME_COLORS: Record<string, string> = {
  '/': '#0f172a',
  '/quiz': '#0f172a',
  '/result': '#0f172a',
};

const CHRONOTYPE_THEME_COLORS: Record<string, string> = {
  lion: '#d97706',
  bear: '#059669',
  wolf: '#7c3aed',
  dolphin: '#0891b2',
};

export default function SEOHead({ titleKey = 'meta.title', descriptionKey = 'meta.description', path = '/' }: Props) {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://sleeptypequiz.com';

  const isResultPage = path === '/result';
  const chronotypeId = isResultPage ? (searchParams.get('type') ?? '') : '';
  const validChronotypes = ['lion', 'bear', 'wolf', 'dolphin'];
  const resolvedType = validChronotypes.includes(chronotypeId) ? chronotypeId : '';

  const buildTitle = (): string => {
    if (isResultPage && resolvedType) {
      const typeName = t(`chronotypes.${resolvedType}.name`);
      return `Your Result: ${typeName} — Sleep Chronotype Quiz`;
    }
    if (path === '/quiz') {
      return 'Take the Quiz — Sleep Chronotype Quiz';
    }
    return 'Sleep Chronotype Quiz — Discover Your Sleep Type';
  };

  const currentLocale = LOCALE_MAP[i18n.language] ?? 'en_US';
  const alternateLocales = ALTERNATE_LOCALES.filter((l) => l !== currentLocale);
  const ogImage = resolvedType
    ? `${siteUrl}/og-${resolvedType}.png`
    : `${siteUrl}/og-image.png`;
  const baseThemeColor = resolvedTheme === 'light' ? '#f0f9ff' : '#0f172a';
  const themeColor = resolvedType
    ? CHRONOTYPE_THEME_COLORS[resolvedType]
    : (THEME_COLORS[path] ? (resolvedTheme === 'light' ? '#f0f9ff' : THEME_COLORS[path]) : baseThemeColor);

  useEffect(() => {
    const title = buildTitle();
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t(descriptionKey));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t(descriptionKey));

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${siteUrl}${path}`);

    document.documentElement.lang = i18n.language;

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', currentLocale);

    const existingAlternates = document.querySelectorAll('meta[property="og:locale:alternate"]');
    existingAlternates.forEach((el) => el.remove());
    alternateLocales.forEach((locale) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale:alternate');
      meta.setAttribute('content', locale);
      document.head.appendChild(meta);
    });

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);
    }
  }, [t, titleKey, descriptionKey, path, i18n.language, siteUrl, location.search, resolvedTheme]);

  return null;
}
