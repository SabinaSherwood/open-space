import { Eye, Hand, Heart, Shield, Sparkles, Volume2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { soundscape } from '../utils/soundscape';

interface GroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GROUNDING_STEPS: Array<{
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}> = [
  {
    title: '5 Things You Can See',
    icon: Eye,
    text: 'Slowly look around your space. Let your gaze rest softly on 5 distinct objects, colors, or shapes nearby. No need to evaluate them—just acknowledge their presence.',
  },
  {
    title: '4 Points of Body Contact',
    icon: Hand,
    text: 'Bring attention to where your body meets the physical world: your feet resting on the floor, your back against the chair, hands resting on your lap.',
  },
  {
    title: '3 Ambient Sounds',
    icon: Volume2,
    text: 'Listen gently to the quiet backdrop around you. Can you hear a distant hum, a breeze, or your own soft breathing?',
  },
  {
    title: '2 Physical Textures',
    icon: Hand,
    text: 'Notice the sensation of your clothing against your skin, or the temperature of the air on your hands or face.',
  },
  {
    title: '1 Soft Breath',
    icon: Heart,
    text: 'Take one unhurried, natural breath. Feel the gentle rise and fall of your belly or chest.',
  },
];

export const GroundingModal: React.FC<GroundingModalProps> = ({ isOpen, onClose }) => {
  const [stepIdx, setStepIdx] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setStepIdx(0);
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStep = GROUNDING_STEPS[stepIdx];
  const StepIcon = currentStep.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grounding-modal-title"
      onClick={onClose}
    >
      <div
        className="glass-card border border-stone-200/80 rounded-[2.5rem] p-6 sm:p-10 max-w-lg w-full shadow-xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-200/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-sage-100 text-sage-700">
              <Shield className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h3
                id="grounding-modal-title"
                className="font-display font-medium text-stone-900 text-lg"
              >
                Grounding &amp; Orientation Pause
              </h3>
              <span className="text-[10px] text-stone-500 font-light">
                5-4-3-2-1 Sensory Orientation
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close grounding modal"
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-stone-100/90 p-6 rounded-2xl border border-stone-200/70 mb-6 text-center">
          <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4 text-sage-700">
            <StepIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-sage-800 uppercase tracking-widest block mb-1">
            Step {stepIdx + 1} of 5
          </span>
          <h4 className="font-display font-medium text-stone-900 text-xl mb-3">
            {currentStep.title}
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
            {currentStep.text}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => soundscape.playGentleChime(432)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-stone-200/70 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            <span>Play Soft Chime</span>
          </button>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            {stepIdx > 0 && (
              <button
                onClick={() => setStepIdx(stepIdx - 1)}
                className="px-4 py-2.5 rounded-full bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
              >
                Previous
              </button>
            )}
            {stepIdx < GROUNDING_STEPS.length - 1 ? (
              <button
                onClick={() => setStepIdx(stepIdx + 1)}
                className="px-5 py-2.5 rounded-full bg-sage-700 text-white text-xs font-medium hover:bg-sage-600 cursor-pointer"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-sage-800 text-stone-50 text-xs font-medium hover:bg-sage-700 cursor-pointer"
              >
                I Feel Grounded
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
