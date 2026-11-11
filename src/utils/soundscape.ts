import type { SoundscapeType } from '../types';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;
  private currentVolume = 0.18;
  private isPlaying = false;
  private activeType: SoundscapeType = 'none';

  private initCtx(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private clearActiveNodes(): void {
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }
    for (const node of [this.osc1, this.osc2, this.osc3, this.noiseNode, this.lfo]) {
      if (node) {
        try {
          node.stop();
        } catch {
          // Ignore already-stopped nodes
        }
        node.disconnect();
      }
    }
    this.osc1 = null;
    this.osc2 = null;
    this.osc3 = null;
    this.noiseNode = null;
    this.noiseFilter = null;
    this.lfo = null;
  }

  public setVolume(volume: number): void {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(
        this.currentVolume,
        this.ctx.currentTime + 0.2,
      );
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public startSoundscape(type: SoundscapeType = 'root_drone', baseFreq = 216): void {
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.clearActiveNodes();
      this.activeType = type;
      if (type === 'none') {
        this.isPlaying = false;
        return;
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(this.currentVolume, now + 2);

      if (type === 'root_drone') {
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(baseFreq, now);

        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'sine';
        this.osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

        const fifthGain = this.ctx.createGain();
        fifthGain.gain.setValueAtTime(0.25, now);

        const lowpass = this.ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(450, now);

        this.osc1.connect(this.masterGain);
        this.osc2.connect(fifthGain);
        fifthGain.connect(this.masterGain);
        this.masterGain.connect(lowpass);
        lowpass.connect(this.ctx.destination);

        this.osc1.start(now);
        this.osc2.start(now);
      } else if (type === 'alpine_wind') {
        const bufferSize = this.ctx.sampleRate * 3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);

        let b0 = 0;
        let b1 = 0;
        let b2 = 0;
        let b3 = 0;
        let b4 = 0;
        let b5 = 0;
        let b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
          b6 = white * 0.115926;
        }

        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;

        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'lowpass';
        this.noiseFilter.frequency.setValueAtTime(320, now);

        this.lfo = this.ctx.createOscillator();
        this.lfo.frequency.setValueAtTime(0.12, now);

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(120, now);
        this.lfo.connect(lfoGain);
        lfoGain.connect(this.noiseFilter.frequency);

        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(136.1, now);

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.1, now);

        this.noiseNode.connect(this.noiseFilter);
        this.noiseFilter.connect(this.masterGain);
        this.osc1.connect(droneGain);
        droneGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.noiseNode.start(now);
        this.lfo.start(now);
        this.osc1.start(now);
      } else if (type === 'forest_stream') {
        const bufferSize = this.ctx.sampleRate * 4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);

        let b0 = 0;
        let b1 = 0;
        let b2 = 0;
        let b3 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.07;
          b2 = 0.85 * b2 + white * 0.12;
          b3 = 0.6 * b3 + white * 0.2;
          output[i] = (b0 + b1 + b2 + b3 + white * 0.1) * 0.04;
        }

        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;

        this.noiseFilter = this.ctx.createBiquadFilter();
        this.noiseFilter.type = 'bandpass';
        this.noiseFilter.frequency.setValueAtTime(600, now);
        this.noiseFilter.Q.setValueAtTime(1.5, now);

        this.lfo = this.ctx.createOscillator();
        this.lfo.frequency.setValueAtTime(0.35, now);

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(180, now);
        this.lfo.connect(lfoGain);
        lfoGain.connect(this.noiseFilter.frequency);

        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(108, now);

        const droneGain = this.ctx.createGain();
        droneGain.gain.setValueAtTime(0.08, now);

        this.noiseNode.connect(this.noiseFilter);
        this.noiseFilter.connect(this.masterGain);
        this.osc1.connect(droneGain);
        droneGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.noiseNode.start(now);
        this.lfo.start(now);
        this.osc1.start(now);
      } else if (type === 'singing_bowl') {
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(baseFreq, now);

        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'sine';
        this.osc2.frequency.setValueAtTime(baseFreq * 2.76, now);

        this.osc3 = this.ctx.createOscillator();
        this.osc3.type = 'sine';
        this.osc3.frequency.setValueAtTime(baseFreq * 5.4, now);

        const overtone1Gain = this.ctx.createGain();
        overtone1Gain.gain.setValueAtTime(0.15, now);

        const overtone2Gain = this.ctx.createGain();
        overtone2Gain.gain.setValueAtTime(0.08, now);

        const lowpass = this.ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(800, now);

        this.osc1.connect(this.masterGain);
        this.osc2.connect(overtone1Gain);
        overtone1Gain.connect(this.masterGain);
        this.osc3.connect(overtone2Gain);
        overtone2Gain.connect(this.masterGain);
        this.masterGain.connect(lowpass);
        lowpass.connect(this.ctx.destination);

        this.osc1.start(now);
        this.osc2.start(now);
        this.osc3.start(now);
      }

      this.isPlaying = true;
    } catch (err) {
      console.warn('Audio soundscape initialized with user action required', err);
    }
  }

  public updateFreq(freq: number): void {
    if (this.ctx && this.osc1 && this.isPlaying) {
      this.osc1.frequency.exponentialRampToValueAtTime(
        Math.max(40, freq),
        this.ctx.currentTime + 2,
      );
      if (this.osc2) {
        this.osc2.frequency.exponentialRampToValueAtTime(
          Math.max(60, freq * 1.5),
          this.ctx.currentTime + 2,
        );
      }
    }
  }

  public stopSoundscape(): void {
    if (this.ctx && this.masterGain && this.isPlaying) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
        if (this.stopTimer) clearTimeout(this.stopTimer);
        this.stopTimer = setTimeout(() => {
          this.clearActiveNodes();
          this.isPlaying = false;
          this.activeType = 'none';
        }, 1300);
      } catch (err) {
        console.warn('Error fading audio out', err);
      }
    }
  }

  public playGentleChime(freq = 432): void {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1000, now);

      osc.connect(gain);
      gain.connect(lowpass);
      lowpass.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 4);
    } catch (err) {
      console.warn('Audio chime warning', err);
    }
  }

  public getActiveType(): SoundscapeType {
    return this.activeType;
  }

  public isAudioActive(): boolean {
    return this.isPlaying;
  }
}

export const soundscape = new SoundscapeEngine();
