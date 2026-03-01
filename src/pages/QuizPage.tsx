import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { submitQuizResult } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import AnalyzingOverlay from '@/components/AnalyzingOverlay';
import { questions } from '@/data/questions';
import { calculateChronotype } from '@/data/calculateChronotype';
import type { Answer } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function QuizPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [direction, setDirection] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);

  const total = questions.length;
  const question = questions[current];
  const progress = ((current) / total) * 100;
  const isLast = current === total - 1;

  const selected = useMemo(() => {
    const existing = answers.find((a) => a.questionId === question.id);
    return existing?.optionId ?? null;
  }, [answers, question.id]);

  const handleSelect = (optionId: 'a' | 'b' | 'c' | 'd') => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== question.id);
      return [...filtered, { questionId: question.id, optionId }];
    });
  };

  const handleNext = () => {
    if (!selected) return;
    if (isLast) {
      const result = calculateChronotype(answers);
      submitQuizResult({ answers, locale: i18n.language });
      setAnalyzing(true);
      setTimeout(() => navigate(`/result?type=${result.id}`, { state: { result } }), 2000);
      return;
    }
    setDirection(1);
    setCurrent((c) => c + 1);
  };

  const handleBack = () => {
    if (current === 0) {
      navigate('/');
      return;
    }
    setDirection(-1);
    setCurrent((c) => c - 1);
  };

  const progressMessage = () => {
    if (current >= 8) return t('quiz.almostDone');
    if (current >= 5) return t('quiz.goodProgress');
    if (current >= 4) return t('quiz.halfwayThere');
    return `${t('quiz.questionPrefix')} ${current + 1} ${t('quiz.of')} ${total}`;
  };

  const optionIds: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];

  return (
    <>
      <SEOHead titleKey="meta.title" descriptionKey="meta.description" path="/quiz" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase">
              {progressMessage()}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-xs font-bold">
              {current + 1} / {total}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden ring-1 ring-slate-200/60 dark:ring-transparent" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total} aria-label={`${current + 1} / ${total}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-lg dark:shadow-2xl"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-snug">
              {t(`questions.${question.id}.text`)}
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
              role="radiogroup"
              aria-label={t(`questions.${question.id}.text`)}
            >
              {optionIds.map((optId) => {
                const isSelected = selected === optId;
                return (
                  <motion.button
                    key={optId}
                    variants={itemVariants}
                    onClick={() => handleSelect(optId)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`w-full p-4 md:p-5 text-left rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-purple-500/60 bg-purple-500/10 text-slate-900 dark:text-white'
                        : 'border-slate-200/80 dark:border-white/5 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full border text-xs font-black flex items-center justify-center mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-purple-400 bg-purple-500 text-white'
                            : 'border-black/20 dark:border-white/20 text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {optId.toUpperCase()}
                      </span>
                      <span className="text-sm md:text-base font-medium leading-relaxed">
                        {t(`questions.${question.id}.options.${optId}`)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleBack}
            className="px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-bold hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          >
            {t('quiz.back')}
          </button>

          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-7 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              selected
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100'
                : 'bg-black/10 dark:bg-white/10 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            {isLast ? t('quiz.submit') : t('quiz.next')}
          </button>
        </div>
      </div>
    </motion.div>
    <AnimatePresence>
      {analyzing && <AnalyzingOverlay />}
    </AnimatePresence>
    </>
  );
}
