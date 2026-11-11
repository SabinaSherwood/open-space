import { Compass, HeartHandshake, Menu, Share2, Sparkles, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { SectionId } from '../types';
import { SoundscapeControl } from './SoundscapeControl';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenGrounding: () => void;
}

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: 'approach', label: 'The Approach' },
  { id: 'hemisphere', label: 'Shift Attention' },
  { id: 'practice', label: 'Enter the Space' },
  { id: 'breathing', label: 'Somatic Breath' },
  { id: 'journal', label: 'Reflective Notes' },
  { id: 'lineage', label: 'Lineage & Ethics' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenGrounding,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: SectionId) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Open Space',
          text: 'A trauma-informed space for contemplative practice and somatic grounding.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 glass-panel border-b border-stone-200/60 transition-all duration-500 ${
        scrolled ? 'py-3 shadow-xs bg-stone-100/85' : 'py-4 bg-stone-50/75'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-sage-100/90 text-sage-700 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
            <Compass className="w-4 h-4 stroke-[1.75] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-xl tracking-wide text-stone-900 leading-tight">
              Open Space
            </span>
          </div>
        </button>

        <div className="hidden lg:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive ? 'text-sage-700 font-semibold' : 'text-stone-700 hover:text-sage-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sage-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <SoundscapeControl />
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all duration-300 flex items-center justify-center cursor-pointer border border-stone-200/50"
            title="Share App"
          >
            <Share2 className="w-4 h-4 text-stone-600" />
          </button>
          <button
            onClick={onOpenGrounding}
            className="px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-stone-200/50"
            title="Instant Grounding Reset"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-sage-600" />
            <span>Grounding Pause</span>
          </button>
          <button
            onClick={() => handleNavClick('practice')}
            className="px-5 py-2.5 rounded-full bg-sage-700 hover:bg-sage-600 text-white text-sm font-medium transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Space</span>
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SoundscapeControl />
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200"
            aria-label="Share App"
          >
            <Share2 className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={onOpenGrounding}
            className="p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200"
            aria-label="Pause & Ground"
          >
            <HeartHandshake className="w-5 h-5 text-sage-600" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-900 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-stone-200 px-6 py-6 mt-2 space-y-4">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-sage-100 text-sage-800 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-stone-200/60 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('practice')}
              className="w-full py-3 rounded-full bg-sage-700 text-white font-medium text-center shadow-xs"
            >
              Enter Practice Space
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
