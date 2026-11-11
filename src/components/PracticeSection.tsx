import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Heart,
  Leaf,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PRACTICE_STAGES } from '../data/practices';
import type { NewJournalEntry } from '../types';
import { soundscape } from '../utils/soundscape';

interface PracticeSectionProps {
  onSaveJournalEntry: (entry: NewJournalEntry) => void;
  onOpenGrounding: () => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  onSaveJournalEntry,
  onOpenGrounding,
}) => {
  const [stageIdx, setStageIdx] = useState<number>(0);
  const [promptIdx, setPromptIdx] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(PRACTICE_STAGES[0].durationMinutes * 60);
  const [droneEnabled, setDroneEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.18);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [savedBanner, setSavedBanner] = useState<boolean>(false);

  const stage = PRACTICE_STAGES[stageIdx];

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(stage.durationMinutes * 60);
    setPromptIdx(0);
    setReflectionText('');
    setSavedBanner(false);
    if (droneEnabled) {
      soundscape.updateFreq(stage.ambientFreqHz);
    }
  }, [stageIdx, stage.durationMinutes, stage.ambientFreqHz, droneEnabled]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      soundscape.playGentleChime(528);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, secondsLeft]);

  const handleToggleRun = () => {
    if (isRunning) {
      setIsRunning(false);
      soundscape.stopSoundscape();
    } else {
      setIsRunning(true);
      if (droneEnabled) {
        soundscape.setVolume(volume);
        soundscape.startSoundscape('root_drone', stage.ambientFreqHz);
      }
    }
  };

  const handleToggleDrone = () => {
    if (droneEnabled) {
      setDroneEnabled(false);
      soundscape.stopSoundscape();
    } else {
      setDroneEnabled(true);
      if (isRunning) {
        soundscape.setVolume(volume);
        soundscape.startSoundscape('root_drone', stage.ambientFreqHz);
      }
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSaveReflection = () => {
    if (!reflectionText.trim()) return;
    onSaveJournalEntry({
      stageTitle: stage.title,
      state: 'Curiously Aware',
      notes: reflectionText,
      insights: `Completed ${stage.title}`,
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <section
      id="practice"
      className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-stone-100/70 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            <span>Interactive Guided Session</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium text-stone-900 mb-4 sm:mb-6">
            Enter the Space
          </h2>
          <p className="text-stone-700 text-sm sm:text-lg font-light leading-relaxed">
            Follow Dr. Daniel P. Brown’s gradual Mahamudra map at your own natural pace. Each stage
            offers invitational guidance, gentle ambient frequencies, and non-judgmental inquiry.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-6 sm:mb-10 scrollbar-none justify-start lg:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
          {PRACTICE_STAGES.map((item, idx) => {
            const isSelected = stageIdx === idx;
            return (
              <button
                key={item.id}
                onClick={() => setStageIdx(idx)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-sage-700 text-white shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-200/70 border border-stone-200/60'
                }`}
              >
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isSelected ? 'bg-sage-800 text-sage-100' : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {item.stageNumber}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 bg-stone-50 rounded-[1.75rem] sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border border-stone-200/80 shadow-2xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-stone-200/60">
              <div>
                <span className="text-[11px] sm:text-xs font-mono text-sage-700 uppercase tracking-widest block mb-1">
                  Stage {stage.stageNumber} of 5
                </span>
                <h3 className="font-display text-xl sm:text-3xl font-medium text-stone-900">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                  {stage.subtitle}
                </p>
              </div>
              <div className="bg-stone-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-stone-200/60 flex items-center gap-2 self-start sm:self-auto">
                <span className="text-lg sm:text-xl font-display font-medium text-stone-800">
                  {formatTimer(secondsLeft)}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">Remaining</span>
              </div>
            </div>

            <div className="relative py-6 sm:py-12 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[320px]">
              <div
                className={`absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full blur-2xl transition-all duration-1000 ${
                  isRunning ? 'bg-sage-100/80 scale-110' : 'bg-stone-200/50 scale-95'
                }`}
              />
              <div
                className={`w-[190px] h-[190px] sm:w-[270px] sm:h-[270px] bg-gradient-to-br from-sage-100 via-stone-100 to-sage-200/70 border border-sage-200/50 flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-inner relative z-10 transition-all ${
                  isRunning ? 'animate-breathe' : 'organic-blob-1'
                }`}
              >
                {isRunning && (
                  <span className="text-[11px] sm:text-xs font-display text-sage-800 font-medium mb-1.5 sm:mb-2 leading-tight">
                    Resting in Awareness
                  </span>
                )}
                <p className="text-xs sm:text-sm text-stone-700 font-light italic max-w-[150px] sm:max-w-[210px] leading-relaxed">
                  &ldquo;{stage.guidanceText[promptIdx]}&rdquo;
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center gap-3 relative z-10">
                <button
                  onClick={() => setPromptIdx(Math.max(0, promptIdx - 1))}
                  disabled={promptIdx === 0}
                  className="p-2 rounded-full bg-stone-100 text-stone-600 disabled:opacity-30 cursor-pointer hover:bg-stone-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-600 font-light flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                  <span>meditation</span>
                </span>
                <button
                  onClick={() =>
                    setPromptIdx(Math.min(stage.guidanceText.length - 1, promptIdx + 1))
                  }
                  disabled={promptIdx === stage.guidanceText.length - 1}
                  className="p-2 rounded-full bg-stone-100 text-stone-600 disabled:opacity-30 cursor-pointer hover:bg-stone-200 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
                <button
                  onClick={handleToggleRun}
                  className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-sage-700 hover:bg-sage-600 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                  <span>{isRunning ? 'Pause Practice' : 'Begin Practice'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsRunning(false);
                    setSecondsLeft(stage.durationMinutes * 60);
                    soundscape.stopSoundscape();
                  }}
                  className="p-2.5 sm:p-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer shrink-0"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-stone-100 border border-stone-200/60 shrink-0">
                  <button
                    onClick={handleToggleDrone}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      droneEnabled
                        ? 'text-sage-700 hover:bg-sage-200/50'
                        : 'text-stone-400 hover:bg-stone-200'
                    }`}
                    title={droneEnabled ? 'Mute ambient drone' : 'Enable ambient drone'}
                  >
                    {droneEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </button>
                  {droneEnabled && (
                    <input
                      id="practice-drone-volume"
                      name="practice-drone-volume"
                      aria-label="Practice ambient drone volume"
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.01"
                      value={volume}
                      onChange={(e) => {
                        const nextVol = parseFloat(e.target.value);
                        setVolume(nextVol);
                        soundscape.setVolume(nextVol);
                      }}
                      className="w-16 sm:w-20 accent-sage-600 h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer mr-2"
                      title="Adjust ambient volume"
                    />
                  )}
                </div>
              </div>

              <button
                onClick={onOpenGrounding}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-sage-600" />
                <span>Pause &amp; Ground</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="bg-stone-50 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 border border-stone-200/80 shadow-2xs">
              <div className="p-4 rounded-xl sm:rounded-2xl bg-sage-50 border border-sage-200/60 text-xs text-sage-800 font-light leading-relaxed space-y-2.5">
                <p className="text-stone-700">{stage.description}</p>
                <p className="pt-2 border-t border-sage-200/40 text-sage-700">{stage.invitation}</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 border border-stone-200/80 shadow-2xs">
              <h4 className="font-display font-medium text-stone-900 text-base mb-1.5 sm:mb-2">
                Reflection
              </h4>
              <p className="text-xs text-stone-600 font-light mb-3">
                Your body might feel a quiet sense of support or grounding now. You can save your
                observation or insight to reflective notes.
              </p>
              <textarea
                id="practice-reflection-notes"
                name="practice-reflection-notes"
                aria-label="Practice reflection notes"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Optionally write your non-judgmental observation or insight..."
                rows={3}
                className="w-full p-3 sm:p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-sage-600 resize-none font-sans"
              />
              <button
                onClick={handleSaveReflection}
                disabled={!reflectionText.trim()}
                className="mt-3 w-full py-2.5 rounded-full bg-stone-800 hover:bg-stone-900 disabled:opacity-40 text-stone-50 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {savedBanner ? (
                  <>
                    <CircleCheckBig className="w-3.5 h-3.5 text-sage-600" />
                    <span>Saved to Reflective Journal</span>
                  </>
                ) : (
                  <span>Save to Reflective Notes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
