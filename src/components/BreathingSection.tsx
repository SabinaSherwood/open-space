import { Heart, Pause, Play, RotateCcw, Sparkles, Wind } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BREATH_PATTERNS } from '../data/practices';
import type { BreathPattern } from '../types';
import { soundscape } from '../utils/soundscape';

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Pause';

export const BreathingSection: React.FC = () => {
  const [pattern, setPattern] = useState<BreathPattern>(BREATH_PATTERNS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState<number>(0);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (isActive) {
      intervalId = setInterval(() => {
        setPhaseSeconds((prev) => {
          const next = prev + 1;
          if (phase === 'Inhale' && next >= pattern.inhaleSec) {
            if (pattern.holdInSec > 0) {
              setPhase('Hold');
            } else {
              setPhase('Exhale');
            }
            soundscape.playGentleChime(432);
            return 0;
          }
          if (phase === 'Hold' && next >= pattern.holdInSec) {
            setPhase('Exhale');
            soundscape.playGentleChime(396);
            return 0;
          }
          if (phase === 'Exhale' && next >= pattern.exhaleSec) {
            if (pattern.holdOutSec > 0) {
              setPhase('Pause');
            } else {
              setPhase('Inhale');
              setCompletedCycles((c) => c + 1);
            }
            soundscape.playGentleChime(528);
            return 0;
          }
          if (phase === 'Pause' && next >= pattern.holdOutSec) {
            setPhase('Inhale');
            setCompletedCycles((c) => c + 1);
            soundscape.playGentleChime(432);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, phase, pattern]);

  const handleToggleStart = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
      setPhase('Inhale');
      setPhaseSeconds(0);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setPhaseSeconds(0);
    setCompletedCycles(0);
  };

  const getPhaseTotalSeconds = () => {
    if (phase === 'Inhale') return pattern.inhaleSec;
    if (phase === 'Hold') return pattern.holdInSec;
    if (phase === 'Exhale') return pattern.exhaleSec;
    return pattern.holdOutSec || 1;
  };

  const getCircleScale = () => {
    if (!isActive) return 1;
    const total = getPhaseTotalSeconds();
    const progress = phaseSeconds / Math.max(1, total);
    if (phase === 'Inhale') return 1 + progress * 0.45;
    if (phase === 'Hold') return 1.45;
    if (phase === 'Exhale') return 1.45 - progress * 0.45;
    return 1;
  };

  const getCircleGradient = () => {
    if (!isActive) {
      return 'from-sage-100 via-stone-100 to-sage-200/80 border-sage-300/60';
    }
    if (phase === 'Inhale') {
      return 'from-sage-200 via-emerald-100 to-slate-200 border-sage-300 shadow-sage-200/50';
    }
    if (phase === 'Hold') {
      return 'from-slate-200 via-sage-100 to-stone-200 border-slate-400 shadow-slate-300/50';
    }
    if (phase === 'Exhale') {
      return 'from-stone-200 via-amber-50 to-sage-100 border-stone-300 shadow-stone-200/50';
    }
    return 'from-stone-100 via-sage-50 to-stone-200 border-stone-300';
  };

  return (
    <section id="breathing" className="py-24 px-6 lg:px-12 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sage-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100/90 border border-stone-200/60 text-stone-700 text-xs font-medium mb-4">
            <Wind className="w-3.5 h-3.5 text-sage-600" />
            <span>Somatic Vagal Co-Regulation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 mb-4">
            Restorative Breath &amp; Soundscape
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            Feat. <strong>4-7-8 Restorative Unwinding</strong>: 4 seconds gentle inhale, 7 seconds
            stillness hold in open awareness, and 8 seconds soft releasing exhale. Accompanied by
            continuous ambient soundscapes to anchor your nervous system.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {BREATH_PATTERNS.map((item) => {
            const isSelected = pattern.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPattern(item);
                  handleReset();
                }}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-sage-100/90 border-sage-600/70 shadow-2xs ring-1 ring-sage-600/30'
                    : 'bg-stone-100/70 border-stone-200/60 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`font-display text-sm font-medium ${
                      isSelected ? 'text-sage-800' : 'text-stone-800'
                    }`}
                  >
                    {item.name}
                  </h3>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-sage-600" />}
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="glass-card rounded-[3rem] p-8 sm:p-14 border border-stone-200/80 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xs">
          <div className="mb-6 z-10">
            <span className="text-xs font-mono text-sage-800 uppercase tracking-widest block mb-1 font-medium">
              {isActive ? `Completed Cycles: ${completedCycles}` : 'Somatic Practice'}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-medium text-stone-900 mb-1">
              {isActive ? phase : 'Press Start to Begin Rhythm'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md mx-auto">
              {isActive
                ? phase === 'Inhale'
                  ? `Gentle expansion through nose (${pattern.inhaleSec}s)`
                  : phase === 'Hold'
                    ? `Rest in spacious stillness, without forcing (${pattern.holdInSec}s)`
                    : phase === 'Exhale'
                      ? `Soft, unhurried release through open lips (${pattern.exhaleSec}s)`
                      : `Pause before next breath (${pattern.holdOutSec}s)`
                : 'Find an easy posture. No rigid commands—allow your body to breathe naturally.'}
            </p>
          </div>

          <div className="relative my-6 flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] z-10">
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
                isActive && phase === 'Hold'
                  ? 'opacity-90 scale-110 bg-sage-200/80'
                  : 'opacity-40 bg-stone-200/50'
              }`}
            />
            <div
              className={`w-full h-full bg-gradient-to-br rounded-full border shadow-inner flex items-center justify-center transition-transform duration-1000 ease-in-out ${getCircleGradient()}`}
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-stone-50/90 shadow-2xs flex flex-col items-center justify-center p-3 text-center border border-stone-200/60 backdrop-blur-md">
                <span className="text-3xl sm:text-4xl font-display font-medium text-stone-900">
                  {isActive ? phaseSeconds + 1 : '0'}
                </span>
                <span className="text-[10px] text-sage-800 font-medium uppercase tracking-wider mt-0.5">
                  / {getPhaseTotalSeconds()} SEC
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 z-10">
            <button
              onClick={handleToggleStart}
              className="px-8 py-4 rounded-full bg-sage-700 hover:bg-sage-600 text-white font-medium text-sm transition-all duration-300 shadow-xs cursor-pointer flex items-center gap-2.5"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isActive ? 'Pause Practice' : `Begin ${pattern.name.split(' (')[0]}`}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-3.5 rounded-full bg-stone-200/80 hover:bg-stone-200 text-stone-700 cursor-pointer transition-colors"
              title="Reset session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200/50 text-xs text-stone-500 font-light max-w-lg z-10 flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5 text-sage-600 shrink-0" />
            <span>
              Invitational practice: You are free to pause, open your eyes, or adjust your breath
              whenever you wish.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
