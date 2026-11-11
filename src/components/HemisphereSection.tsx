import { Anchor, Focus, Info, ShieldCheck, SlidersVertical, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export const HemisphereSection: React.FC = () => {
  const [mode, setMode] = useState<'focused' | 'open'>('open');
  const [fieldWidth, setFieldWidth] = useState<number>(80);
  const [somaticGrounding, setSomaticGrounding] = useState<number>(75);

  const groundingRatio = somaticGrounding / 100;
  const fieldLabel =
    fieldWidth >= 68 ? 'Panoramic' : fieldWidth >= 42 ? 'Balanced Horizon' : 'Narrow Spotlight';
  const somaticLabel =
    somaticGrounding >= 68
      ? 'Embodied & Settled'
      : somaticGrounding >= 40
        ? 'Gently Rooting'
        : 'Head-Centered';

  return (
    <section id="hemisphere" className="py-24 px-6 lg:px-12 bg-stone-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200/60 text-stone-700 text-xs font-medium mb-4">
            <SlidersVertical aria-hidden="true" className="w-3.5 h-3.5 text-sage-600" />
            <span>Interactive Perception Experiment</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 mb-6">
            The Right-Hemisphere Shift
          </h2>
          <p className="text-stone-700 text-base sm:text-lg font-light leading-relaxed">
            In Dr. Iain McGilchrist’s research, the two cerebral hemispheres pay attention in
            fundamentally different ways. Toggle between these modes below and adjust both sliders
            to feel how field width and somatic contact transform perception.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-stone-200/70 border border-stone-300/50 flex items-center gap-2 max-w-md w-full">
            <button
              type="button"
              aria-pressed={mode === 'focused'}
              onClick={() => setMode('focused')}
              className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'focused'
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Focus aria-hidden="true" className="w-4 h-4" />
              <span>Left Mode (Focused)</span>
            </button>
            <button
              type="button"
              aria-pressed={mode === 'open'}
              onClick={() => setMode('open')}
              className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'open'
                  ? 'bg-sage-700 text-stone-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Sparkles aria-hidden="true" className="w-4 h-4" />
              <span>Right Mode (Quiet Ground)</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-stone-100/90 rounded-[2.5rem] p-6 sm:p-10 border border-stone-200/70 flex flex-col justify-between relative overflow-hidden min-h-[420px]">
            <div className="relative w-full h-[290px] rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-700 bg-stone-50 border border-stone-200/60">
              {/* Warm somatic earth-horizon layer responding live to Somatic Grounding slider */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 pointer-events-none transition-all duration-500"
                style={{
                  height: `${Math.round(18 + groundingRatio * 56)}%`,
                  opacity: mode === 'open' ? 0.25 + groundingRatio * 0.65 : 0.1 + groundingRatio * 0.3,
                  background:
                    'linear-gradient(to top, rgba(72, 100, 72, 0.55) 0%, rgba(107, 102, 90, 0.24) 55%, transparent 100%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-4 rounded-full transition-all duration-500 pointer-events-none"
                style={{
                  width: `${Math.round(28 + fieldWidth * 0.58)}%`,
                  height: `${Math.max(2, Math.round(groundingRatio * 6))}px`,
                  opacity: 0.2 + groundingRatio * 0.75,
                  backgroundColor: '#8eb18e',
                }}
              />

              {mode === 'focused' ? (
                <div
                  className="w-full h-full p-6 grid grid-cols-1 sm:grid-cols-3 items-center relative z-10 transition-all duration-500"
                  style={{ gap: `${Math.round(8 + (fieldWidth / 100) * 16)}px` }}
                >
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #101</span>
                    [Thought: Worry]
                    <span className="block mt-2 text-[10px] text-stone-600">Status: To Fix</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #102</span>
                    [Sensation: Tight]
                    <span className="block mt-2 text-[10px] text-stone-600">Status: Labelled</span>
                  </div>
                  <div className="p-4 rounded-lg bg-stone-200 border-2 border-stone-400 text-stone-900 text-xs font-mono">
                    <span className="block font-bold text-stone-800 uppercase mb-1">Item #103</span>
                    [Noise: External]
                    <span className="block mt-2 text-[10px] text-stone-600">
                      Status: Distraction
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <div
                    aria-hidden="true"
                    className="absolute bg-gradient-to-tr from-sage-200 via-stone-100 to-sage-100 rounded-full blur-xl transition-all duration-500"
                    style={{
                      width: `${Math.round(fieldWidth * 3.6)}px`,
                      height: `${Math.round(fieldWidth * 2.4 + somaticGrounding * 0.6)}px`,
                      opacity: 0.38 + groundingRatio * 0.5,
                      transform: `translateY(${Math.round((50 - somaticGrounding) * 0.24)}px)`,
                    }}
                  />
                  <div
                    className="relative z-10 text-center max-w-md rounded-3xl px-6 py-5 transition-all duration-500 border backdrop-blur-xs"
                    style={{
                      transform: `translateY(${Math.round((50 - somaticGrounding) * 0.18)}px)`,
                      backgroundColor: `rgba(24, 24, 22, ${0.35 + groundingRatio * 0.45})`,
                      borderColor: `rgba(142, 177, 142, ${0.18 + groundingRatio * 0.55})`,
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-display font-medium text-sage-800 bg-sage-100/90 px-4 py-1.5 rounded-full mb-3 border border-sage-200/70">
                      <Anchor aria-hidden="true" className="w-3 h-3 text-sage-700" />
                      <span>
                        {somaticGrounding >= 68
                          ? 'Grounded Presence'
                          : somaticGrounding >= 40
                            ? 'Settling Into Body'
                            : 'Floating Conceptual Field'}
                      </span>
                    </span>
                    <p className="text-stone-800 font-light text-sm sm:text-base leading-relaxed">
                      {somaticGrounding >= 65
                        ? 'Weight rests into the floor while thoughts, sensations, and sounds move freely inside one steady, supported field.'
                        : somaticGrounding >= 38
                          ? 'Awareness is widening—invite attention down from the forehead into your feet, seat, and easy breath.'
                          : 'Notice when awareness hovers mainly in abstract thought. Gently feel gravity holding your physical body below.'}
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
                <h3 className="font-display font-medium text-stone-900 text-lg">
                  {mode === 'focused'
                    ? 'Left-Mode: Narrow & Categorical'
                    : 'Right-Mode: Wide & Embodied'}
                </h3>
              </div>
              <div className="text-xs text-stone-700 bg-stone-200/70 px-4 py-2 rounded-full font-light border border-stone-300/40">
                Field: <strong className="font-medium text-stone-900">{fieldLabel}</strong> &middot;
                Ground: <strong className="font-medium text-sage-800">{somaticLabel}</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-stone-100/90 rounded-[2.5rem] p-6 sm:p-8 border border-stone-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Info aria-hidden="true" className="w-4 h-4 text-sage-600" />
                <h3 className="font-display text-lg font-medium text-stone-900">
                  Attentional Sliders
                </h3>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                Adjust how you hold awareness right now to experiment with McGilchrist’s principles:
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium text-stone-700">
                  <label htmlFor="field-width-slider">Width of Field</label>
                  <span>{fieldWidth}%</span>
                </div>
                <input
                  id="field-width-slider"
                  name="field-width-slider"
                  type="range"
                  min="20"
                  max="100"
                  value={fieldWidth}
                  onChange={(e) => {
                    setFieldWidth(Number(e.target.value));
                    if (mode === 'focused' && Number(e.target.value) > 55) {
                      setMode('open');
                    }
                  }}
                  className="w-full accent-sage-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-light">
                  <span>Spotlight (Left)</span>
                  <span>Panoramic (Right)</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium text-stone-700">
                  <label htmlFor="somatic-grounding-slider">Somatic Grounding</label>
                  <span>{somaticGrounding}%</span>
                </div>
                <input
                  id="somatic-grounding-slider"
                  name="somatic-grounding-slider"
                  type="range"
                  min="10"
                  max="100"
                  value={somaticGrounding}
                  onChange={(e) => {
                    setSomaticGrounding(Number(e.target.value));
                    if (mode === 'focused') {
                      setMode('open');
                    }
                  }}
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
                <ShieldCheck aria-hidden="true" className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Nervous System Insight</span>
              </div>
              <p className="text-xs text-stone-700 font-light leading-normal">
                {somaticGrounding < 40
                  ? 'Spaciousness without bodily contact can feel floaty. Press your feet gently into the floor and slide Somatic Grounding upward to anchor.'
                  : 'Broadening your peripheral gaze while feeling physical contact with the ground activates ventral vagal safety pathways.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
