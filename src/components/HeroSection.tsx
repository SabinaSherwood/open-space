import { ArrowRight, Compass, Wind } from 'lucide-react';
import React from 'react';
import type { SectionId } from '../types';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => (
  <section
    id="hero"
    className="pt-20 pb-16 lg:pt-28 lg:pb-28 px-6 lg:px-12 relative overflow-hidden min-h-[85vh] flex items-center"
  >
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-sage-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-stone-100 rounded-full blur-3xl opacity-70 pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
      <div className="flex flex-col items-start max-w-2xl">
        <h1
          id="hero-heading"
          tabIndex={-1}
          className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-stone-900 leading-[1.15] mb-6 tracking-tight focus:outline-hidden"
        >
          Discover the space of ever-present open awareness.
        </h1>
        <p className="text-lg sm:text-xl text-stone-800 font-medium leading-relaxed mb-4">
          An invitational source for somatic ease and non-dual practice.
        </p>
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 font-light">
          Contemplative wisdom is part of shared human heritage. In Quiet Ground you may explore the
          curious nature of mind with somatic grounding, gradual meditation, and restorative breath—at
          your own pace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigate('practice')}
            className="px-8 py-4 rounded-full bg-sage-700 text-stone-50 hover:bg-sage-800 transition-all duration-300 font-semibold text-center shadow-xs hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Begin Exploring</span>
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 stroke-[2] group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('approach')}
            className="px-8 py-4 rounded-full bg-stone-100/90 hover:bg-stone-200/80 border border-stone-200 text-stone-800 transition-all duration-300 font-medium text-center cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass aria-hidden="true" className="w-4 h-4 text-stone-600" />
            <span>Learn The Approach</span>
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center h-[360px] sm:h-[420px] lg:h-[480px]">
        <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] bg-sage-100/50 rounded-full blur-2xl animate-pulse" />
        <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] bg-gradient-to-br from-sage-100 via-stone-100 to-sage-200/60 animate-breathe shadow-inner border border-sage-200/40" />
        <button
          type="button"
          className="relative z-10 w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] bg-stone-50/90 hover:bg-stone-100/95 rounded-full shadow-xs border border-stone-200/60 flex flex-col items-center justify-center backdrop-blur-md p-4 text-center group cursor-pointer transition-colors"
          onClick={() => onNavigate('breathing')}
        >
          <Wind aria-hidden="true" className="w-10 h-10 text-sage-600 stroke-[1.2] mb-1.5 animate-float" />
          <span className="text-xs font-display font-medium text-stone-800">
            Breath &amp; Awareness
          </span>
          <span className="text-[10px] text-sage-700 font-light mt-0.5">Open Somatic Breath</span>
        </button>
      </div>
    </div>
  </section>
);
