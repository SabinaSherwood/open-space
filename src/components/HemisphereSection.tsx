import { Focus, Info, ShieldCheck, SlidersVertical, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export const HemisphereSection: React.FC = () => {
  const [mode, setMode] = useState<'focused' | 'open'>('open');
  const [fieldWidth, setFieldWidth] = useState<number>(80);
  const [somaticGrounding, setSomaticGrounding] = useState<number>(75);

  return (
    <section id="hemisphere" className="py-24 px-6 lg:px-12 bg-stone-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200/60 text-stone-700 text-xs font-medium mb-4">
            <SlidersVertical className="w-3.5 h-3.5 text-sage-600" />
            <span>Interactive Perception Experiment</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 mb-6">
            The Right-Hemisphere Shift
          </h2>
          <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed">
            In Dr. Iain McGilchrist’s research, the two cerebral hemispheres pay attention in
            fundamentally different ways. Toggle between these modes below to feel how changing the
            quality of your attention transforms your perception.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-stone-200/70 border border-stone-300/50 flex items-center gap-2 max-w-md w-full">
            <button
              onClick={() => setMode('focused')}
              className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'focused'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Focus className="w-4 h-4" />
              <span>Left Mode (Focused)</span>
            </button>
            <button
              onClick={() => setMode('open')}
              className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'open'
                  ? 'bg-sage-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sage-200" />
              <span>Right Mode (Open Space)</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-stone-100/90 rounded-[2.5rem] p-6 sm:p-10 border border-stone-200/70 flex flex-col justify-between relative overflow-hidden min-h-[420px]">
            <div className="relative w-full h-[280px] rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-700 bg-stone-50 border border-stone-200/50">
              {mode === 'focused' ? (
                <div className="w-full h-full p-6 grid grid-cols-3 gap-4 items-center">
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #101</span>
                    [Thought: Worry]
                    <span className="block mt-2 text-[10px] text-stone-500">Status: To Fix</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #102</span>
                    [Sensation: Tight]
                    <span className="block mt-2 text-[10px] text-stone-500">Status: Labelled</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #103</span>
                    [Noise: External]
                    <span className="block mt-2 text-[10px] text-stone-500">
                      Status: Distraction
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <div
                    className="absolute bg-gradient-to-tr from-sage-100 via-stone-100 to-sage-200 rounded-full blur-xl opacity-80 transition-all duration-700"
                    style={{
                      width: `${fieldWidth * 3.5}px`,
                      height: `${fieldWidth * 2.8}px`,
                    }}
                  />
                  <div className="relative z-10 text-center max-w-md">
                    <span className="inline-block text-xs font-display font-medium text-sage-800 bg-sage-100/80 px-4 py-1.5 rounded-full mb-3">
                      Boundless Presence
                    </span>
                    <p className="text-stone-800 font-light text-sm sm:text-base leading-relaxed">
                      All experiences—thoughts, sensations, ambient sounds—float effortlessly as
                      part of one continuous living tapestry.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-stone-500 font-mono uppercase tracking-wider block mb-1">
                  Current Mode Orientation
                </span>
                <h4 className="font-display font-medium text-stone-900 text-lg">
                  {mode === 'focused'
                    ? 'Left-Mode: Narrow & Categorical'
                    : 'Right-Mode: Wide & Contextual'}
                </h4>
              </div>
              <div className="text-xs text-stone-700 bg-stone-200/60 px-4 py-2 rounded-full font-light">
                {mode === 'focused'
                  ? 'Re-presents details in isolation'
                  : 'Experiences wholeness in real time'}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-stone-100/90 rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-4 h-4 text-sage-600" />
                <h3 className="font-display text-lg font-medium text-stone-900">
                  Attentional Sliders
                </h3>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                Adjust how you hold awareness right now to experiment with McGilchrist’s principles:
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium text-stone-700">
                  <span>Width of Field</span>
                  <span>{fieldWidth}%</span>
                </div>
                <input
                  id="field-width-slider"
                  name="field-width-slider"
                  aria-label="Width of attentional field"
                  type="range"
                  min="20"
                  max="100"
                  value={fieldWidth}
                  onChange={(e) => setFieldWidth(Number(e.target.value))}
                  className="w-full accent-sage-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-light">
                  <span>Spotlight (Left)</span>
                  <span>Panoramic (Right)</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium text-stone-700">
                  <span>Somatic Grounding</span>
                  <span>{somaticGrounding}%</span>
                </div>
                <input
                  id="somatic-grounding-slider"
                  name="somatic-grounding-slider"
                  aria-label="Somatic grounding level"
                  type="range"
                  min="10"
                  max="100"
                  value={somaticGrounding}
                  onChange={(e) => setSomaticGrounding(Number(e.target.value))}
                  className="w-full accent-sage-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-light">
                  <span>Head Concept</span>
                  <span>Embodied Whole</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200/60 bg-sage-50/70 p-4 rounded-2xl border border-sage-200/50">
              <div className="flex items-center gap-2 text-xs font-medium text-sage-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Nervous System Insight</span>
              </div>
              <p className="text-xs text-stone-700 font-light leading-normal">
                Broadening your visual gaze and feeling contact with the ground activates
                parasympathetic safety pathways in the vagus nerve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
