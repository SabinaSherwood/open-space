import { ChevronDown, Disc, Sparkles, Volume2, VolumeX, Waves, Wind } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { SoundscapeType } from '../types';
import { soundscape } from '../utils/soundscape';

const SOUNDSCAPE_OPTIONS: Array<{
  id: Exclude<SoundscapeType, 'none'>;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'forest_stream', label: 'Forest Stream', icon: Waves },
  { id: 'alpine_wind', label: 'Alpine Breeze', icon: Wind },
  { id: 'singing_bowl', label: 'Singing Bowl', icon: Disc },
  { id: 'root_drone', label: 'Grounding Drone', icon: Sparkles },
];

export const SoundscapeControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => soundscape.isAudioActive());
  const [selectedId, setSelectedId] = useState<Exclude<SoundscapeType, 'none'>>('forest_stream');
  const [volume, setVolume] = useState<number>(0.18);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsPlaying(soundscape.isAudioActive());
    const active = soundscape.getActiveType();
    if (active !== 'none') {
      setSelectedId(active);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleTogglePlay = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isPlaying) {
      soundscape.stopSoundscape();
      setIsPlaying(false);
    } else {
      soundscape.setVolume(volume);
      soundscape.startSoundscape(selectedId, 432);
      setIsPlaying(true);
    }
  };

  const handleSelectOption = (id: Exclude<SoundscapeType, 'none'>) => {
    setSelectedId(id);
    if (isPlaying) {
      soundscape.startSoundscape(id, 432);
    } else {
      soundscape.setVolume(volume);
      soundscape.startSoundscape(id, 432);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = parseFloat(event.target.value);
    setVolume(nextVolume);
    soundscape.setVolume(nextVolume);
  };

  const activeOption =
    SOUNDSCAPE_OPTIONS.find((item) => item.id === selectedId) || SOUNDSCAPE_OPTIONS[0];
  const ActiveIcon = activeOption.icon;

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div className="flex items-center gap-1 rounded-full p-0.5 bg-stone-100/90 border border-stone-200/70 shadow-2xs">
        <button
          onClick={handleTogglePlay}
          className={`p-2 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center relative ${
            isPlaying
              ? 'bg-sage-600 text-white shadow-xs hover:bg-sage-700 ring-2 ring-sage-600/30'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
          title={isPlaying ? 'Pause Ambient Soundscape' : 'Play Ambient Soundscape'}
          aria-label={isPlaying ? 'Pause Ambient Soundscape' : 'Play Ambient Soundscape'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
            </>
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 rounded-full text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 transition-colors flex items-center gap-1 cursor-pointer"
          title="Soundscape settings"
        >
          <ActiveIcon className="w-3.5 h-3.5 text-sage-600" />
          <span className="hidden sm:inline font-sans text-[11px] text-stone-600">
            {activeOption.label}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-stone-200 shadow-lg p-3 z-50">
          <div className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase px-2 mb-2">
            Calming Soundscapes
          </div>
          <div className="space-y-1 mb-3">
            {SOUNDSCAPE_OPTIONS.map((option) => {
              const OptionIcon = option.icon;
              const isSelected = selectedId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sage-100 text-sage-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <OptionIcon
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-sage-700' : 'text-stone-400'
                      }`}
                    />
                    <span>{option.label}</span>
                  </div>
                  {isSelected && isPlaying && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200/60 px-2">
            <div className="flex justify-between items-center text-[11px] text-stone-500 mb-1 font-light">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              id="soundscape-volume"
              name="soundscape-volume"
              aria-label="Ambient soundscape volume"
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-sage-600 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
