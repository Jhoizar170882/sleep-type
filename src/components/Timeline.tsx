import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { TimelineEntry } from '@/types';

interface Props {
  entries: TimelineEntry[];
  primaryColor: string;
}

export default function Timeline({ entries, primaryColor }: Props) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative">
        {/* Mobile: vertical */}
        <div className="flex flex-col gap-3 md:hidden">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-3"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                {i < entries.length - 1 && (
                  <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: entry.color + '40', minHeight: '24px' }} />
                )}
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-3 flex-1 min-w-0">
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-widest mb-0.5">{entry.time}</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{t(entry.activity)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center gap-2 w-32"
              >
                <div
                  className="w-full rounded-xl p-3 border text-center"
                  style={{ backgroundColor: entry.color + '20', borderColor: entry.color + '40' }}
                >
                  <p
                    className="text-xs font-black tracking-widest mb-1"
                    style={{ color: entry.color }}
                  >
                    {entry.time}
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                    {t(entry.activity)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Connecting line */}
          <div
            className="h-0.5 mt-2 rounded-full opacity-20"
            style={{ background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)` }}
          />
        </div>
      </div>
    </div>
  );
}
