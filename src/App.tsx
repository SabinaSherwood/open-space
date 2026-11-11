import { HeartHandshake } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ApproachSection } from './components/ApproachSection';
import { BreathingSection } from './components/BreathingSection';
import { DailyIntentionBanner } from './components/DailyIntentionBanner';
import { Footer } from './components/Footer';
import { GroundingModal } from './components/GroundingModal';
import { HemisphereSection } from './components/HemisphereSection';
import { HeroSection } from './components/HeroSection';
import { JournalSection } from './components/JournalSection';
import { LineageSection } from './components/LineageSection';
import { Navbar } from './components/Navbar';
import { PracticeSection } from './components/PracticeSection';
import type { JournalEntry, NewJournalEntry, SectionId } from './types';

const JOURNAL_STORAGE_KEY = 'quiet_ground_journal_entries';
const LEGACY_STORAGE_KEY = 'open_space_journal_entries';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [groundingOpen, setGroundingOpen] = useState<boolean>(false);
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved =
        localStorage.getItem(JOURNAL_STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as JournalEntry[];
      }
    } catch (err) {
      console.warn('Failed to parse local journal entries', err);
    }
    return [
      {
        id: 'initial-1',
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        stageTitle: 'Establishing Ground & Somatic Ease',
        state: 'Grounded',
        notes:
          'Felt my weight settle into gravity. Acknowledged shoulder tension without trying to fix it immediately.',
        insights: 'Grounding is not an achievement; it is simply letting go into support.',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      console.warn('Failed to save journal entries', err);
    }
  }, [entries]);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddEntry = (entry: NewJournalEntry) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181816] text-[#e8e3d5] selection:bg-sage-200 selection:text-sage-800">
      <a
        href="#hero-heading"
        className="visually-hidden fixed top-3 left-3 z-[60] px-4 py-2 rounded-full bg-sage-700 text-stone-50 text-xs font-semibold shadow-md"
      >
        Skip to main content
      </a>

      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenGrounding={() => setGroundingOpen(true)}
      />

      <main className="flex-grow">
        <DailyIntentionBanner />
        <HeroSection onNavigate={handleNavigate} />
        <ApproachSection />
        <HemisphereSection />
        <PracticeSection
          onSaveJournalEntry={handleAddEntry}
          onOpenGrounding={() => setGroundingOpen(true)}
        />
        <BreathingSection />
        <JournalSection
          entries={entries}
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
        />
        <LineageSection />
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setGroundingOpen(true)}
          aria-label="Grounding Reset"
          className="px-4 py-3 rounded-full bg-sage-700 text-stone-50 hover:bg-sage-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer border border-sage-800/60 text-xs font-semibold backdrop-blur-md group"
        >
          <HeartHandshake
            aria-hidden="true"
            className="w-4 h-4 text-stone-50 group-hover:scale-110 transition-transform"
          />
          <span className="hidden sm:inline-block">Grounding Reset</span>
        </button>
      </div>

      <GroundingModal isOpen={groundingOpen} onClose={() => setGroundingOpen(false)} />
      <Footer onNavigate={handleNavigate} onOpenGrounding={() => setGroundingOpen(true)} />
    </div>
  );
};

export default App;
