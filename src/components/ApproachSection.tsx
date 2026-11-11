import { BookOpen, ChevronDown, Earth, Footprints, HeartHandshake, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

interface PillarItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  fullDetail: string;
  practiceTakeaway: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'gradual-path',
    icon: Footprints,
    title: 'The Gradual Path',
    shortDesc:
      'Rooted in Indo-Tibetan Mahamudra traditions and synthesized for modern minds by Dr. Daniel P. Brown. Step-by-step maps allowing insights to unfold naturally.',
    fullDetail:
      'In traditional Mahamudra practice as structured by Dr. Daniel P. Brown, spiritual and cognitive realization is not presented as a mysterious stroke of luck or a high-pressure breakthrough. Instead, it is mapped as a systematic, step-by-step gradual path. Practice begins with somatic grounding and body ease, quiets the conceptual mind, turns attention back to observe the knowing nature of awareness itself, and eventually rests effortlessly in uncontrived presence.',
    practiceTakeaway:
      'In practice: You never have to force-close your eyes or quiet every thought. You follow gentle, bite-sized invitations at your own natural pace.',
  },
  {
    id: 'context-wholeness',
    icon: Earth,
    title: 'Context & Wholeness',
    shortDesc:
      'Inspired by psychiatrist Iain McGilchrist’s research on brain lateralization. Fostering the right hemisphere’s capacity for holistic, embodied understanding.',
    fullDetail:
      'Dr. Iain McGilchrist’s work highlights two distinct modes of attention: the left hemisphere’s re-presentational, categorizing, detail-oriented focus, and the right hemisphere’s present-moment, relational, context-rich awareness. Modern culture heavily over-privileges left-hemisphere mechanical analysis. Open Space offers tools specifically designed to invite a gentle shift back into right-hemisphere wholeness.',
    practiceTakeaway:
      'In practice: Rather than viewing thoughts as problems to fix, attention expands to encompass the broad context, somatic sensations, and silent space holding them.',
  },
  {
    id: 'trauma-informed',
    icon: HeartHandshake,
    title: 'Your Pace, Your Choice',
    shortDesc: 'Encouraging agency, choice, and grounding as needed.',
    fullDetail:
      'Forced stillness or intense introspective instructions can dysregulate a sensitive or traumatized nervous system. The framework embeds trauma-informed principles at every layer: all instructions are invitations ("If you wish", "Notice if..."), options are provided for eyes open or closed, and grounding exits are always accessible.',
    practiceTakeaway:
      'In practice: You remain the absolute authority over your experience. If any prompt feels uncomfortable, you are encouraged to pause, open your eyes, or engage the grounding tool.',
  },
];

export const ApproachSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="approach" className="py-24 bg-stone-100/60 border-y border-stone-200/40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            <span>Methodology &amp; Synthesis</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 mb-6">
            A Grounded Framework
          </h2>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light">
            This methodology respects the complexity of the human nervous system, weaving together
            modern understandings of brain lateralization with time-tested contemplative maps while
            prioritizing your agency and safety.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isExpanded = expandedId === pillar.id;
            return (
              <article
                key={pillar.id}
                className={`bg-stone-50 p-8 sm:p-10 rounded-[2rem] shadow-2xs hover:shadow-sm transition-all duration-300 border border-stone-200/60 flex flex-col justify-between ${
                  isExpanded ? 'ring-1 ring-sage-600/40 bg-stone-50/95' : ''
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sage-100/80 flex items-center justify-center mb-6 text-sage-700">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-stone-900 mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-light text-sm sm:text-base mb-6">
                    {pillar.shortDesc}
                  </p>

                  {isExpanded && (
                    <div className="pt-4 border-t border-stone-200/60 space-y-4">
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-light bg-stone-100/80 p-4 rounded-xl border border-stone-200/40">
                        {pillar.fullDetail}
                      </p>
                      <div className="text-xs text-sage-800 font-medium bg-sage-50/80 p-3.5 rounded-xl border border-sage-200/50 flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                        <span>{pillar.practiceTakeaway}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleToggle(pillar.id)}
                  className="mt-6 pt-4 text-xs font-medium text-sage-700 hover:text-sage-800 flex items-center gap-1.5 cursor-pointer self-start"
                >
                  <span>{isExpanded ? 'Show less' : 'Read full concept'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
