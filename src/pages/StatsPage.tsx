import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { fetchStats } from '@/lib/api';

const CHRONOTYPE_ORDER = ['lion', 'bear', 'wolf', 'dolphin'] as const;

const chronotypeConfig: Record<string, { emoji: string; gradient: string }> = {
  lion: { emoji: '🦁', gradient: 'from-amber-400 to-orange-600' },
  bear: { emoji: '🐻', gradient: 'from-emerald-400 to-green-600' },
  wolf: { emoji: '🐺', gradient: 'from-violet-400 to-indigo-600' },
  dolphin: { emoji: '🐬', gradient: 'from-cyan-400 to-teal-600' },
};

const FALLBACK_DISTRIBUTION: Record<string, number> = {
  lion: 15,
  bear: 55,
  wolf: 20,
  dolphin: 10,
};

const FALLBACK_TOTAL = 0;

export default function StatsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [totalTests, setTotalTests] = useState<number>(FALLBACK_TOTAL);
  const [distribution, setDistribution] = useState<Record<string, number>>(FALLBACK_DISTRIBUTION);

  useEffect(() => {
    fetchStats().then((data) => {
      if (data) {
        setTotalTests(data.totalTests);
        setDistribution(data.distribution);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SEOHead titleKey="stats.title" descriptionKey="stats.subtitle" path="/stats" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen px-4 py-20 flex flex-col items-center"
      >
        <div className="w-full max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200">
              {t('stats.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed max-w-md mx-auto">
              {t('stats.subtitle')}
            </p>
          </motion.div>

          {/* Total Participants Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-8 mb-5 text-center"
          >
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-40 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
                <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              </div>
            ) : (
              <>
                <p className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  {totalTests.toLocaleString()}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium uppercase tracking-widest">
                  {t('stats.totalParticipants')}
                </p>
              </>
            )}
          </motion.div>

          {/* Distribution Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 mb-5"
          >
            <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">
              {t('stats.distributionTitle')}
            </h2>
            {loading ? (
              <div className="space-y-6">
                {CHRONOTYPE_ORDER.map((id) => (
                  <div key={id} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                      <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {CHRONOTYPE_ORDER.map((id, i) => {
                  const config = chronotypeConfig[id];
                  const pct = distribution[id] ?? 0;
                  return (
                    <div key={id} className="flex items-center gap-4">
                      <span className="text-3xl w-10 text-center flex-shrink-0">{config.emoji}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${config.gradient}`}
                          >
                            {t(`chronotypes.${id}.name`)}
                          </span>
                          <span className="text-lg font-black text-slate-700 dark:text-slate-300">{pct}%</span>
                        </div>
                        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1.0, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.section>

          {/* Chronotype Cards Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {CHRONOTYPE_ORDER.map((id, i) => {
                const config = chronotypeConfig[id];
                const pct = distribution[id] ?? 0;
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-center"
                  >
                    <div className="text-5xl mb-3">{config.emoji}</div>
                    <p
                      className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${config.gradient} mb-1`}
                    >
                      {t(`chronotypes.${id}.name`)}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{pct}%</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-snug">
                      {t(`chronotypes.${id}.shortDesc`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={() => navigate('/quiz')}
              className="px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-base cursor-pointer hover:opacity-90 transition-opacity"
            >
              {t('stats.takeQuizButton')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            >
              {t('stats.backToHome')}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
