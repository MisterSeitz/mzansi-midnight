'use client';

import { GameSettings } from '../types/settings';

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientVolume: number = 0.75; // 0.0 to 1.0
  private sfxVolume: number = 0.85; // 0.0 to 1.0
  private ambientGain: GainNode | null = null;
  private humOsc: OscillatorNode | null = null;
  private rainSource: AudioBufferSourceNode | null = null;
  private ambientRunning: boolean = false;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.syncAmbientGain();
  }

  public setVolumes(ambientPct: number, sfxPct: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, ambientPct / 100));
    this.sfxVolume = Math.max(0, Math.min(1, sfxPct / 100));
    this.syncAmbientGain();
  }

  public applySettings(settings: GameSettings): void {
    this.isMuted = settings.masterMuted;
    this.ambientVolume = Math.max(0, Math.min(1, settings.ambientVolume / 100));
    this.sfxVolume = Math.max(0, Math.min(1, settings.sfxVolume / 100));
    this.syncAmbientGain();
  }

  private syncAmbientGain(): void {
    if (this.ambientGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.11 * this.ambientVolume;
      this.ambientGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.12);
    }
  }

  public startAmbient(): void {
    if (this.ambientRunning) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      const masterGain = ctx.createGain();
      masterGain.gain.value = this.isMuted ? 0 : 0.11 * this.ambientVolume;
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // 1. Coastal rain pink-filtered noise buffer (3 seconds looped)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.963 * b1 + white * 0.2965164;
        b2 = 0.57 * b2 + white * 1.0526913;
        output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.04;
      }

      const rainNode = ctx.createBufferSource();
      rainNode.buffer = noiseBuffer;
      rainNode.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 950;
      filter.Q.value = 0.7;

      rainNode.connect(filter);
      filter.connect(masterGain);
      rainNode.start();
      this.rainSource = rainNode;

      // 2. Subtle 55Hz Eskom substation transformer drone
      const hum = ctx.createOscillator();
      const humGain = ctx.createGain();
      hum.type = 'sawtooth';
      hum.frequency.value = 55;
      humGain.gain.value = 0.06;

      const humFilter = ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.value = 120;

      hum.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(masterGain);
      hum.start();
      this.humOsc = hum;

      this.ambientRunning = true;
    } catch {
      // Ignore autoplay errors until first user gesture
    }
  }

  public playDieSelect(): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.startAmbient();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.18 * this.sfxVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  public playOutcome(tier: 'clean' | 'compromised' | 'failure'): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.startAmbient();

    const now = ctx.currentTime;
    const freqs =
      tier === 'clean'
        ? [330, 440, 659.25] // Crisp emerald fifth/octave
        : tier === 'compromised'
        ? [293.66, 349.23] // Tense minor interval
        : [146.83, 138.59]; // Dissonant low buzz

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tier === 'failure' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.05);

      gain.gain.setValueAtTime(0.14 * this.sfxVolume, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.3);
    });
  }

  public playCycleRoll(isStage6: boolean): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.startAmbient();

    const now = ctx.currentTime;

    // 4 rapid dice clicks
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380 + i * 70, now + i * 0.065);
      gain.gain.setValueAtTime(0.13 * this.sfxVolume, now + i * 0.065);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.065 + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.065);
      osc.stop(now + i * 0.065 + 0.045);
    }

    // Heavy substation breaker clunk if Stage 6 hits
    if (isStage6) {
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(110, now + 0.15);
      sub.frequency.exponentialRampToValueAtTime(32, now + 0.55);

      subGain.gain.setValueAtTime(0.32 * this.sfxVolume, now + 0.15);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now + 0.15);
      sub.stop(now + 0.6);
    }
  }

  public playCrisisAlert(): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [740, 587.33].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.11);
      gain.gain.setValueAtTime(0.09 * this.sfxVolume, now + i * 0.11);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.11);
      osc.stop(now + i * 0.11 + 0.1);
    });
  }

  /**
   * Heartbeat thud pulse scaling in tempo and depth with adrenaline level (1 to 5)
   */
  public playHeartbeat(adrenalineLevel: number = 3): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const intensity = Math.max(1, Math.min(5, adrenalineLevel));
    const vol = (0.12 + intensity * 0.04) * this.sfxVolume;

    // Lub-dub double pulse
    [0, 0.13].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const baseFreq = idx === 0 ? 55 : 44;
      osc.frequency.setValueAtTime(baseFreq + intensity * 4, now + offset);
      osc.frequency.exponentialRampToValueAtTime(26, now + offset + 0.12);

      gain.gain.setValueAtTime(vol * (idx === 0 ? 1 : 0.7), now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  /**
   * Encrypted police/wire scanner squelch chirp
   */
  public playScannerSquelch(): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.linearRampToValueAtTime(1420, now + 0.025);
    osc.frequency.linearRampToValueAtTime(320, now + 0.06);

    gain.gain.setValueAtTime(0.08 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Cinematic cutscene / climax chord stinger
   */
  public playCutsceneStinger(mood: 'crisis' | 'triumph' | 'noir' = 'noir'): void {
    if (this.isMuted || this.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.startAmbient();

    const now = ctx.currentTime;
    const freqs =
      mood === 'crisis'
        ? [110, 116.54, 164.81, 233.08] // Dark diminished dread chord
        : mood === 'triumph'
        ? [130.81, 164.81, 196.0, 261.63] // Resolute major chord
        : [98.0, 123.47, 146.83, 220.0]; // Noir minor 7th

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = mood === 'crisis' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const noteVol = (0.16 / freqs.length) * this.sfxVolume;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(noteVol, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8 + idx * 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.2);
    });
  }

  /**
   * Escalated action outcome sound scaling with narrative adrenaline level
   */
  public playAdrenalineOutcome(
    tier: 'clean' | 'compromised' | 'failure',
    adrenalineLevel: number = 1
  ): void {
    this.playOutcome(tier);
    if (adrenalineLevel >= 4) {
      this.playHeartbeat(adrenalineLevel);
    }
    if (adrenalineLevel >= 3 && tier !== 'clean') {
      setTimeout(() => this.playScannerSquelch(), 180);
    }
  }
}

export const soundscape = new SoundscapeEngine();


