import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { getChronotypeById } from '@/data/chronotypes';
import type { ChronotypeId, ChronotypeResult } from '@/types';
import Timeline from '@/components/Timeline';
import ShareButtons from '@/components/ShareButtons';
import ScoreBreakdown from '@/components/ScoreBreakdown';

const VALID_TYPES: ChronotypeId[] = ['lion', 'bear', 'wolf', 'dolphin'];

const gradientMap: Record<string, string> = {
  lion: 'from-amber-400 to-orange-600',
  bear: 'from-emerald-400 to-green-600',
  wolf: 'from-violet-400 to-indigo-600',
  dolphin: 'from-cyan-400 to-teal-600',
};

const glowMap: Record<string, string> = {
  lion: 'rgba(245,158,11,0.4)',
  bear: 'rgba(16,185,129,0.4)',
  wolf: 'rgba(139,92,246,0.4)',
  dolphin: 'rgba(6,182,212,0.4)',
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const result = useMemo<ChronotypeResult | undefined>(() => {
    if (location.state?.result) {
      return location.state.result as ChronotypeResult;
    }
    const typeParam = searchParams.get('type');
    if (typeParam && (VALID_TYPES as string[]).includes(typeParam)) {
      const id = typeParam as ChronotypeId;
      return {
        id,
        scoreBreakdown: { lion: 0, bear: 0, wolf: 0, dolphin: 0 },
        percentages: { lion: 0, bear: 0, wolf: 0, dolphin: 0 },
      };
    }
    return undefined;
  }, [location.state, searchParams]);

  useEffect(() => {
    if (!result) {
      navigate('/', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const data = getChronotypeById(result.id);
  if (!data) return null;

  const gradient = gradientMap[result.id];
  const glow = glowMap[result.id];
  const typeName = t(`chronotypes.${result.id}.name`);
  const shareText = t('result.shareText', { type: typeName });

  return (
    <>
      <SEOHead titleKey="meta.ogTitle" descriptionKey="meta.ogDescription" path="/result" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen px-4 py-20 flex flex-col items-center"
      >
      <div className="w-full max-w-2xl">
        {/* Hero reveal */}
        <div className="text-center mb-10">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-widest uppercase mb-4">
            {t('result.yourTypeIs')}
          </p>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="text-8xl md:text-9xl mb-4"
            style={{ filter: `drop-shadow(0 0 30px ${glow})` }}
          >
            {data.emoji}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`text-4xl md:text-5xl font-black mt-2 mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
          >
            {t(`chronotypes.${result.id}.fullName`)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-slate-600 dark:text-slate-300 text-center mb-5 font-medium leading-relaxed max-w-md mx-auto"
          >
            {t(`chronotypes.${result.id}.description`)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
          >
            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              {t('result.populationText', { percentage: data.percentage })}
            </span>
          </motion.div>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-2 mt-5"
          >
            {(t(`chronotypes.${result.id}.traits`, { returnObjects: true }) as string[]).map(
              (trait) => (
                <span
                  key={trait}
                  className={`text-xs font-bold px-3 py-1 rounded-full text-transparent bg-clip-text bg-gradient-to-r ${gradient} border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5`}
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  {trait}
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* Score Breakdown */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 mb-5"
        >
          <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5">
            {t('result.scoreBreakdownTitle')}
          </h2>
          <ScoreBreakdown percentages={result.percentages} />
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 mb-5"
        >
          <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
            {t('result.timelineTitle')}
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-5 font-medium">
            {t('result.timelineSubtitle')}
          </p>
          <Timeline entries={data.timeline} primaryColor={data.color.primary} />
        </motion.section>

        {/* Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 mb-5"
        >
          <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
            {t('result.tipsTitle', { type: typeName })}
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-5 font-medium">
            {t('result.tipsSubtitle')}
          </p>
          <div className="flex flex-col gap-3">
            {data.tips.map((tipKey, i) => (
              <div
                key={tipKey}
                className="flex gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4"
              >
                <span
                  className={`text-xs font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} flex-shrink-0 mt-0.5`}
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                  {t(tipKey)}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Share */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 mb-6"
        >
          <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-5">
            {t('result.shareTitle')}
          </h2>
          <ShareButtons shareText={shareText} />
        </motion.section>

        {/* Retake */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/quiz')}
            className="px-8 py-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            {t('result.retakeButton')}
          </button>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
}
