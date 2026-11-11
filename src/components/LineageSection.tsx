import { BookOpen, Brain, Compass, Heart, Sparkles } from 'lucide-react';
import React from 'react';

const LINEAGE_CARDS = [
  {
    title: 'Indo-Tibetan Mahamudra Origins',
    description:
      'This practice explicitly honors the living Indo-Tibetan contemplative traditions and great masters who preserved the Mahamudra ("Great Seal") maps of mind across centuries, acknowledging this sacred heritage with reverence and gratitude while striving to prevent cultural appropriation or commodification.',
  },
  {
    title: 'Dr. Daniel P. Brown Synthesis',
    description:
      'Quiet Ground honors the groundbreaking work of the late Dr. Daniel P. Brown (Harvard Medical School), whose meticulous translations and Western psychological synthesis of the "Pointing Out Way" rendered Mahamudra gradual meditation accessible to contemporary minds without diluting its rigor.',
  },
];

const RESOURCE_COLUMNS: Array<{
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  items: string[];
}> = [
  {
    category: 'Dr. Iain McGilchrist Neuroscience',
    icon: Brain,
    summary:
      'Exploring brain lateralization and the right hemisphere’s capacity for context, living relationship, and unconstructed presence.',
    items: [
      'The Master and His Emissary: The Divided Brain and the Making of the Western World (Yale University Press)',
      'The Matter With Things: Brains, Delusions, and the Unmaking of the World (Perspectiva)',
      'Right-Hemisphere Attention: Shifting from categorical re-presentation to real-time living presence.',
    ],
  },
  {
    category: 'Somatic Healing Techniques',
    icon: Heart,
    summary: 'Establishing psychological and somatic safety, and honoring personal agency.',
    items: [
      'Trauma-Sensitive Mindfulness (David Treleaven) - Principles of invitational language and choice.',
      'Somatic Vagal Regulation - Grounding techniques to support autonomic nervous system safety.',
      'Self-Paced Agency - You remain the ultimate authority over your body, posture, and practice.',
    ],
  },
  {
    category: 'Contemplative Wisdom',
    icon: Sparkles,
    summary:
      'Western interpretations of Mahamudra and non-dual self-inquiry for pointing out the open nature of awareness.',
    items: [
      'Pointing Out the Great Way & Transformation in Visuddhimagga (Dr. Daniel P. Brown)',
      'Self-Inquiry & Turning Awareness Back Upon Itself ("What is aware right now?")',
      'Recognizing that open awareness is an inherent capacity',
    ],
  },
];

export const LineageSection: React.FC = () => (
  <section
    id="lineage"
    className="py-24 px-6 lg:px-12 relative overflow-hidden bg-stone-50 border-t border-stone-200/50"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-50/60 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-5xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4 text-sage-700">
          <Compass className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-stone-900 mb-6">
          Lineage Attribution &amp; Ethical Framework
        </h2>
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light mb-6">
          Contemplative wisdom is part of shared human heritage. Here you will find a western
          interpretation of Mahamudra meditation practices, an exploration and interpretation of the
          work of Dr. Iain McGilchrist.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {LINEAGE_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="glass-card p-8 rounded-[2.5rem] border border-stone-200/70 hover:border-sage-300 transition-colors shadow-2xs"
          >
            <h3 className="font-display text-lg font-medium text-stone-900 mb-3">{card.title}</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-16 border-t border-stone-200/70">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200/60 text-stone-700 text-xs font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5 text-sage-600" />
            <span>Recommended Reading &amp; Foundation</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-stone-900">
            Resources &amp; Key Foundations
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {RESOURCE_COLUMNS.map((column, idx) => {
            const Icon = column.icon;
            return (
              <div
                key={idx}
                className="bg-stone-100/80 p-6 sm:p-8 rounded-[2rem] border border-stone-200/70 flex flex-col justify-between shadow-2xs hover:border-sage-300 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700 mb-4">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h4 className="font-display text-base font-medium text-stone-900 mb-2">
                    {column.category}
                  </h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                    {column.summary}
                  </p>
                  <ul className="space-y-2 border-t border-stone-200/60 pt-4">
                    {column.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-[11px] text-stone-700 font-light flex items-start gap-1.5 leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sage-600 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
