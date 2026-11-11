import { Leaf, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { DAILY_INTENTIONS } from '../data/practices';

export const DailyIntentionBanner: React.FC = () => {
  const [index, setIndex] = useState<number>(() =>
    Math.floor(Math.random() * DAILY_INTENTIONS.length),
  );

  const handleNextIntention = () => {
    let next: number;
    do {
      next = Math.floor(Math.random() * DAILY_INTENTIONS.length);
    } while (next === index && DAILY_INTENTIONS.length > 1);
    setIndex(next);
  };

  return (
    <div className="bg-[#060706] border-b border-stone-200/60 py-3 px-4 pt-20 lg:pt-22">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-col sm:flex-row text-center sm:text-left">
        <div className="flex items-center gap-3">
          <Leaf className="w-4 h-4 text-sage-600 hidden sm:block shrink-0" />
          <p className="text-xs sm:text-sm font-light text-stone-700 tracking-wide">
            <span className="font-medium text-sage-700 mr-2 uppercase text-[10px] tracking-widest hidden sm:inline-block">
              Daily Intention
            </span>
            {DAILY_INTENTIONS[index]}
          </p>
        </div>

        <button
          onClick={handleNextIntention}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 hover:text-sage-700 hover:bg-stone-200 transition-colors text-xs font-medium cursor-pointer shrink-0 border border-stone-200"
        >
          <RefreshCw className="w-3 h-3" />
          <span>New Intention</span>
        </button>
      </div>
    </div>
  );
};
