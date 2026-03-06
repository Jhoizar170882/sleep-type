import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { fetchStats } from '@/lib/api';

const chronotypeCards = [
  {
    id: 'lion',
    emoji: '🦁',
    gradient: 'from-amber-400 to-orange-600',
    pct: '15%',
  },
  {
    id: 'bear',
    emoji: '🐻',
    gradient: 'from-emerald-400 to-green-600',
    pct: '55%',
  },
  {
    id: 'wolf',
    emoji: '🐺',
    gradient: 'from-violet-400 to-indigo-600',
    pct: '15%',
  },
  {
    id: 'dolphin',
    emoji: '🐬',
    gradient: 'from-cyan-400 to-teal-600',
    pct: '10%',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [liveStats, setLiveStats] = useState<{ totalTests: number } | null>(null);

  useEffect(() => {
    fetchStats().then(data => {
      if (data) setLiveStats(data);
    });
  }, []);

  const displayTotal = liveStats
    ? liveStats.totalTests >= 1000
      ? `${(liveStats.totalTests / 1000).toFixed(0)}K+`
      : `${liveStats.totalTests}`
    : t('landing.statsValue1');

  return (
    <>
      <SEOHead />
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-slate-900 dark:text-slate-50"
    >
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">
            {t('landing.badge')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          style={{ whiteSpace: 'pre-line' }}
        >
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200"
            style={{ filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.3))' }}
          >
            {t('landing.title')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-md mb-12 font-medium leading-relaxed"
        >
          {t('landing.subtitle')}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate('/quiz')}
            animate={{
              boxShadow: [
                '0 0 20px rgba(99,102,241,0.25), 0 4px 20px rgba(168,85,247,0.15)',
                '0 0 40px rgba(99,102,241,0.4), 0 4px 30px rgba(168,85,247,0.25)',
                '0 0 20px rgba(99,102,241,0.25), 0 4px 20px rgba(168,85,247,0.15)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-lg cursor-pointer"
          >
            {t('landing.startButton')}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => navigate('/stats')}
              className="text-center cursor-pointer hover:opacity-70 transition-opacity"
            >
              <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{displayTotal}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{t('landing.statsLabel1')}</p>
            </button>
            {[
              { label: t('landing.statsLabel2'), value: t('landing.statsValue2') },
              { label: t('landing.statsLabel3'), value: t('landing.statsValue3') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{stat.value}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/stats')}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer underline underline-offset-2"
          >
            {t('landing.viewStats')}
          </button>
        </motion.div>
      </section>

      {/* Chronotype Cards */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-3">
            {t('landing.typesTitle')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            {t('landing.typesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chronotypeCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-center hover:bg-black/8 dark:hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-5xl mb-3">{card.emoji}</div>
              <p
                className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} mb-1`}
              >
                {t(`chronotypes.${card.id}.name`)}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{card.pct}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-snug">
                {t(`chronotypes.${card.id}.shortDesc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-24 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
            {t('landing.howItWorksTitle')}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {(t('landing.howItWorksSteps', { returnObjects: true }) as string[]).map(
            (step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-2xl p-5"
              >
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-blue-300 dark:to-purple-300 flex-shrink-0 leading-none mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </section>

    </motion.div>
    </>
  );
}
