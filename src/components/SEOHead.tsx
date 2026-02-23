import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  titleKey?: string;
  descriptionKey?: string;
  path?: string;
}

export default function SEOHead({ titleKey = 'meta.title', descriptionKey = 'meta.description', path = '/' }: Props) {
  const { t, i18n } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://sleeptypequiz.com';

  useEffect(() => {
    document.title = t(titleKey);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t(descriptionKey));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t(titleKey));

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t(descriptionKey));

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${siteUrl}${path}`);

    document.documentElement.lang = i18n.language;

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', i18n.language === 'ko' ? 'ko_KR' : 'en_US');
  }, [t, titleKey, descriptionKey, path, i18n.language, siteUrl]);

  return null;
}
