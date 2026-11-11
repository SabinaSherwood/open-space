import { Compass, Heart } from 'lucide-react';
import React from 'react';
import type { SectionId } from '../types';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
  onOpenGrounding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGrounding }) => (
  <footer className="bg-[#121412] text-stone-600 py-12 border-t border-stone-200/60">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3 shrink-0">
        <Compass className="w-5 h-5 text-sage-600 stroke-[1.75]" />
        <span className="font-display font-medium text-stone-900 text-lg">Open Space</span>
      </div>

      <div className="text-center max-w-2xl text-xs font-light text-stone-600 space-y-2 leading-relaxed">
        <p>
          Open Space is a mindfulness application designed for general contemplative practice and
          wellness support. It does not replace or offer professional medical advice, diagnosis, or
          mental health treatment.
        </p>
        <p className="text-[11px] text-stone-500 pt-1">
          &copy; 2026 At Peace Pilates LLC. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-6 text-xs text-stone-600 shrink-0">
        <button
          onClick={() => onNavigate('approach')}
          className="hover:text-sage-700 transition-colors cursor-pointer"
        >
          The Approach
        </button>
        <button
          onClick={() => onNavigate('lineage')}
          className="hover:text-sage-700 transition-colors cursor-pointer"
        >
          Lineage &amp; Ethics
        </button>
        <button
          onClick={onOpenGrounding}
          className="hover:text-sage-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Heart className="w-3 h-3 text-sage-600" />
          <span>Grounding Reset</span>
        </button>
      </div>
    </div>
  </footer>
);
