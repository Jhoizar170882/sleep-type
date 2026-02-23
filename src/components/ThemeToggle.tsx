import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';

type ThemeMode = 'light' | 'dark' | 'auto';

const modes: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'light', icon: <Sun size={14} />, label: 'light' },
  { mode: 'auto', icon: <Monitor size={14} />, label: 'auto' },
  { mode: 'dark', icon: <Moon size={14} />, label: 'dark' },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const cycle = () => {
    const idx = modes.findIndex((m) => m.mode === theme);
    const next = modes[(idx + 1) % modes.length];
    setTheme(next.mode);
  };

  const current = modes.find((m) => m.mode === theme) ?? modes[1];

  return (
    <button
      onClick={cycle}
      title={t(`theme.${current.label}`)}
      aria-label={t(`theme.${current.label}`)}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer relative"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.mode}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {current.icon}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
