export type SectionId =
  | 'hero'
  | 'approach'
  | 'hemisphere'
  | 'practice'
  | 'breathing'
  | 'journal'
  | 'lineage';

export type SoundscapeType =
  | 'none'
  | 'forest_stream'
  | 'alpine_wind'
  | 'singing_bowl'
  | 'root_drone';

export interface PracticeStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  description: string;
  guidanceText: string[];
  inquiryPrompts: string[];
  invitation: string;
  ambientFreqHz: number;
}

export interface BreathPattern {
  id: string;
  name: string;
  description: string;
  inhaleSec: number;
  holdInSec: number;
  exhaleSec: number;
  holdOutSec: number;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  stageTitle?: string;
  state: string;
  notes: string;
  insights: string;
}

export type NewJournalEntry = Omit<JournalEntry, 'id' | 'timestamp'>;
