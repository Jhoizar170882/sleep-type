import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const chronotypes = [
  {
    id: 'lion',
    emoji: '🦁',
    gradient: 'from-amber-400 to-orange-600',
    name: 'Lion',
    pct: '~15%',
    desc: 'Early risers who peak before noon. Highly disciplined with strong morning willpower.',
  },
  {
    id: 'bear',
    emoji: '🐻',
    gradient: 'from-emerald-400 to-green-600',
    name: 'Bear',
    pct: '~55%',
    desc: 'The most common type. Follows the solar cycle with peak focus from mid-morning to noon.',
  },
  {
    id: 'wolf',
    emoji: '🐺',
    gradient: 'from-violet-400 to-indigo-600',
    name: 'Wolf',
    pct: '~15%',
    desc: 'Night owls who come alive after sunset. Creative, deep-focus thinkers after 6 PM.',
  },
  {
    id: 'dolphin',
    emoji: '🐬',
    gradient: 'from-cyan-400 to-teal-600',
    name: 'Dolphin',
    pct: '~10%',
    desc: 'Light, restless sleepers with unpredictable focus bursts and high environmental sensitivity.',
  },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead titleKey="about.title" descriptionKey="about.description" path="/about" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen text-slate-900 dark:text-slate-50"
      >
        <div className="max-w-3xl mx-auto px-4 py-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase mb-6">
              About
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
          >
            {t('about.title')}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-12"
          >
            Sleep Type Quiz is a free, science-based chronotype assessment tool helping people around the world understand their natural biological clock — and live in sync with it.
          </motion.p>

          <div className="space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                Our Mission
              </h2>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Most productivity advice is built around a single assumption: that everyone operates on the same schedule. But biology tells a different story. Each person has a unique internal clock — a chronotype — that governs when they feel alert, creative, or tired.
                </p>
                <p className="mt-3">
                  Our mission is to make chronobiology accessible to everyone. By understanding your natural rhythm, you can stop fighting your biology and start optimizing your life around it — improving sleep quality, focus, and overall well-being.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                The Science Behind It
              </h2>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Our quiz is based on the research of <strong className="text-slate-800 dark:text-slate-100">Dr. Michael Breus</strong>, a board-certified sleep specialist and clinical psychologist known as "The Sleep Doctor." In his work, Dr. Breus identified four chronotype archetypes — Lion, Bear, Wolf, and Dolphin — each corresponding to distinct patterns in sleep timing, energy peaks, and biological rhythms.
                </p>
                <p className="mt-3">
                  Chronotypes are shaped by genetics, age, hormones, and the nervous system. Research published in peer-reviewed journals has demonstrated that living in alignment with your chronotype can significantly improve sleep quality, metabolic health, cognitive performance, and mood.
                </p>
                <p className="mt-3">
                  Our 10-question algorithm analyzes your natural wake/sleep tendencies, energy patterns, meal timing, and peak performance windows to produce a reliable chronotype classification.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                The 4 Chronotypes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chronotypes.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-5"
                  >
                    <div className="text-3xl mb-2">{c.emoji}</div>
                    <p className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${c.gradient} mb-0.5`}>
                      {c.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{c.pct} of population</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                Global Reach
              </h2>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Sleep Type Quiz is available in <strong className="text-slate-800 dark:text-slate-100">10 languages</strong>: English, Korean, Japanese, Chinese, Spanish, French, German, Portuguese, Vietnamese, and Thai. We believe everyone deserves access to sleep science in their native language.
                </p>
                <p className="mt-3">
                  The quiz takes approximately 3 minutes to complete and has been taken by hundreds of thousands of people worldwide.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
                Contact
              </h2>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  Questions, feedback, or partnership inquiries? We'd love to hear from you.
                </p>
                <p className="mt-2">
                  <strong className="text-slate-800 dark:text-slate-100">Email:</strong> sleeptypequiz@quizlab.me
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </>
  );
}
