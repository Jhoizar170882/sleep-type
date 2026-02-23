import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'lucide-react';

interface Props {
  shareText: string;
  url?: string;
}

export default function ShareButtons({ shareText, url }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const buttons = [
    {
      label: 'X / Twitter',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank', 'noopener,noreferrer'),
      color: 'hover:bg-sky-500/20 hover:border-sky-500/40',
    },
    {
      label: 'Facebook',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'noopener,noreferrer'),
      color: 'hover:bg-blue-600/20 hover:border-blue-600/40',
    },
    {
      label: 'KakaoTalk',
      icon: <span className="text-base font-black">K</span>,
      onClick: () => window.open(`https://story.kakao.com/share?url=${encodedUrl}`, '_blank', 'noopener,noreferrer'),
      color: 'hover:bg-yellow-400/20 hover:border-yellow-400/40',
    },
    {
      label: copied ? t('result.copySuccess') : t('result.copyLink'),
      icon: <Link size={20} />,
      onClick: handleCopy,
      color: copied
        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
        : 'hover:bg-white/10 hover:border-white/20',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.onClick}
          title={btn.label}
          aria-label={btn.label}
          className={`aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 text-slate-400 transition-all duration-200 ${btn.color} min-h-[56px]`}
        >
          {btn.icon}
          <span className="text-[10px] font-bold leading-none hidden sm:block truncate w-full text-center px-1">
            {btn.label}
          </span>
        </button>
      ))}
    </div>
  );
}
