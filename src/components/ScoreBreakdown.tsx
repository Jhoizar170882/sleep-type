import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { ScoreBreakdown as ScoreBreakdownType } from '@/types';
import type { ChronotypeId } from '@/types';

const chronotypeConfig: Record<
  ChronotypeId,
  { emoji: string; gradient: string }
> = {
  lion: { emoji: '🦁', gradient: 'from-amber-400 to-orange-600' },
  bear: { emoji: '🐻', gradient: 'from-emerald-400 to-green-600' },
  wolf: { emoji: '🐺', gradient: 'from-violet-400 to-indigo-600' },
  dolphin: { emoji: '🐬', gradient: 'from-cyan-400 to-teal-600' },
};

const ORDER: ChronotypeId[] = ['lion', 'bear', 'wolf', 'dolphin'];

interface Props {
  percentages: ScoreBreakdownType;
}

export default function ScoreBreakdown({ percentages }: Props) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {ORDER.map((id, i) => {
        const config = chronotypeConfig[id];
        const pct = percentages[id];
        return (
          <div key={id} className="flex items-center gap-3">
            <span className="text-xl w-8 text-center">{config.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t(`chronotypes.${id}.name`)}
                </span>
                <span className="text-xs font-black text-slate-300">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
