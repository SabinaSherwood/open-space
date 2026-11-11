import { BookOpen, Calendar, Download, Plus, Sparkles, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import type { JournalEntry, NewJournalEntry } from '../types';

interface JournalSectionProps {
  entries: JournalEntry[];
  onAddEntry: (entry: NewJournalEntry) => void;
  onDeleteEntry: (id: string) => void;
}

const STATE_TAGS: Array<{ name: string; color: string }> = [
  { name: 'Calm', color: 'bg-sage-200 text-sage-800 border-sage-300' },
  { name: 'Grounded', color: 'bg-stone-200 text-stone-800 border-stone-300' },
  { name: 'Curiously Aware', color: 'bg-amber-950/60 text-amber-200 border-amber-700/50' },
  { name: 'Resting', color: 'bg-emerald-950/60 text-emerald-200 border-emerald-700/50' },
  { name: 'Processing', color: 'bg-sky-950/60 text-sky-200 border-sky-700/50' },
];

export const JournalSection: React.FC<JournalSectionProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [selectedState, setSelectedState] = useState<string>('Grounded');
  const [notes, setNotes] = useState<string>('');
  const [insights, setInsights] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!notes.trim()) return;
    onAddEntry({ state: selectedState, notes, insights });
    setNotes('');
    setInsights('');
    setShowForm(false);
  };

  const handleExport = () => {
    const dataUri =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const link = document.createElement('a');
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`;
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `open-space-notes-${dateStr}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section
      id="journal"
      className="py-24 px-6 lg:px-12 bg-stone-100/60 relative border-t border-stone-200/40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-medium mb-3">
              <BookOpen className="w-3.5 h-3.5 text-sage-600" />
              <span>Integration Space</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-stone-900">
              Reflective Integration Notes
            </h2>
            <p className="text-stone-600 text-sm font-light mt-1 max-w-xl">
              A private, non-judgmental space to capture somatic qualities, mental shifts, and quiet
              insights after practice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {entries.length > 0 && (
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-full bg-stone-200/80 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                title="Download your notes locally"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Notes</span>
              </button>
            )}
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 rounded-full bg-sage-700 hover:bg-sage-600 text-white text-xs font-medium flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Reflection</span>
            </button>
          </div>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-stone-50 p-6 sm:p-8 rounded-[2rem] border border-sage-200/80 shadow-2xs mb-10 space-y-6"
          >
            <div>
              <label className="block text-xs font-medium text-stone-800 mb-2">
                Nervous System State Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {STATE_TAGS.map((tag) => (
                  <button
                    key={tag.name}
                    type="button"
                    onClick={() => setSelectedState(tag.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      selectedState === tag.name
                        ? `${tag.color} font-semibold ring-1 ring-sage-600/30`
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="journal-somatic-notes"
                className="block text-xs font-medium text-stone-800 mb-1.5"
              >
                Somatic &amp; Experiential Notes
              </label>
              <textarea
                id="journal-somatic-notes"
                name="journal-somatic-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did your body and attention feel during practice? (e.g., Softened jaw, noticed thoughts settling)..."
                rows={3}
                required
                className="w-full p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-sage-600 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="journal-quiet-insight"
                className="block text-xs font-medium text-stone-800 mb-1.5"
              >
                Quiet Insight or Takeaway (Optional)
              </label>
              <input
                id="journal-quiet-insight"
                name="journal-quiet-insight"
                type="text"
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                placeholder="e.g., Awareness doesn't need effort to remain open..."
                className="w-full p-3.5 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-sage-600"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-full bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-sage-700 text-white text-xs font-medium cursor-pointer hover:bg-sage-600"
              >
                Save Reflection
              </button>
            </div>
          </form>
        )}

        {entries.length === 0 ? (
          <div className="bg-stone-50 rounded-[2rem] p-12 text-center border border-stone-200/60">
            <Sparkles className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="font-display text-lg font-medium text-stone-800 mb-1">
              Your Space is Clear
            </h3>
            <p className="text-xs text-stone-600 font-light max-w-sm mx-auto mb-6">
              When you finish a practice session or want to record an insight, your notes will
              appear safely here.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2.5 rounded-full bg-stone-200 text-stone-800 text-xs font-medium cursor-pointer hover:bg-stone-300"
            >
              Add First Reflection
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-stone-50 p-6 rounded-[2rem] border border-stone-200/70 flex flex-col justify-between shadow-2xs group hover:border-sage-300 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {entry.timestamp}
                    </span>
                    <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-sage-100 text-sage-800 border border-sage-200/60">
                      {entry.state}
                    </span>
                  </div>
                  {entry.stageTitle && (
                    <span className="text-xs font-display font-medium text-sage-700 block mb-2">
                      {entry.stageTitle}
                    </span>
                  )}
                  <p className="text-xs text-stone-800 font-light leading-relaxed mb-4">
                    &ldquo;{entry.notes}&rdquo;
                  </p>
                  {entry.insights && (
                    <div className="p-3 rounded-xl bg-stone-100/90 text-[11px] text-stone-700 font-light italic border border-stone-200/50">
                      Insight: {entry.insights}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/50 flex justify-end">
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1.5 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
