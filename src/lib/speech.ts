// Swedish audio, in priority order:
//
//   1. A real native-speaker recording from Wikimedia Commons (src/data/audio.json).
//   2. Device text-to-speech — but ONLY when a genuine Swedish voice is installed.
//   3. Nothing, and the UI says why.
//
// Step 2's condition matters. Setting `utterance.lang = 'sv-SE'` does not make a
// browser find a Swedish voice; if none exists it simply speaks with the default
// (usually English) voice, which reads Swedish text with English phonetics and
// actively teaches the wrong pronunciation. Silence is better than that.

import AUDIO from '../data/audio.json'

export interface AudioEntry {
  ogg: string
  mp3: string
  license: string
  artist: string
}

const RECORDINGS = AUDIO as Record<string, AudioEntry>

/** Recordings are of bare headwords: "en bil" -> "bil", "att gå" -> "gå". */
export function headword(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/^(en|ett|att)\s+/, '')
}

export function recordingFor(text: string): AudioEntry | undefined {
  return RECORDINGS[headword(text)]
}

// ── device voices ────────────────────────────────────────────────────
let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  const v = window.speechSynthesis.getVoices()
  if (v.length) cachedVoices = v
  return cachedVoices
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = () => loadVoices()
}

export function swedishVoices(): SpeechSynthesisVoice[] {
  return loadVoices().filter((v) => v.lang.toLowerCase().startsWith('sv'))
}

export function hasSpeech(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function hasSwedishVoice(): boolean {
  return swedishVoices().length > 0
}

/** Distinct Swedish talkers available for TTS rotation (0 if none). */
export function voiceCount(): number {
  return swedishVoices().length
}

// ── playback ─────────────────────────────────────────────────────────
export type SpeechMode = 'recording' | 'tts' | 'none'

/** What `speak` would do for this text, without playing anything. */
export function speechModeFor(text: string): SpeechMode {
  if (recordingFor(text)) return 'recording'
  if (hasSpeech() && hasSwedishVoice()) return 'tts'
  return 'none'
}

let current: HTMLAudioElement | null = null

function playRecording(entry: AudioEntry): void {
  current?.pause()
  const audio = new Audio(entry.mp3)
  current = audio
  // Safari/iOS cannot decode Ogg Vorbis, most others can; if the MP3 transcode
  // is unavailable for a file, fall back to the original Ogg.
  audio.onerror = () => {
    const fallback = new Audio(entry.ogg)
    current = fallback
    void fallback.play().catch(() => {})
  }
  void audio.play().catch(() => {})
}

interface SpeakOptions {
  /** Rotates between Swedish TTS voices (HVPT). Ignored for recordings. */
  voiceIndex?: number
  rate?: number
  /** Skip the recording and force device TTS (used by voice-rotation drills). */
  preferTts?: boolean
}

/** Speak Swedish text. Returns how it was produced — 'none' means nothing played. */
export function speak(text: string, opts: SpeakOptions = {}): SpeechMode {
  const entry = recordingFor(text)
  if (entry && !opts.preferTts) {
    playRecording(entry)
    return 'recording'
  }

  if (!hasSpeech()) return 'none'
  const voices = swedishVoices()
  // Never speak Swedish through a non-Swedish voice.
  if (!voices.length) {
    // A recording is still better than nothing if we were asked for TTS.
    if (entry) {
      playRecording(entry)
      return 'recording'
    }
    return 'none'
  }

  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'sv-SE'
  utter.rate = opts.rate ?? 0.95
  const i = opts.voiceIndex ?? 0
  utter.voice = voices[((i % voices.length) + voices.length) % voices.length]
  window.speechSynthesis.speak(utter)
  return 'tts'
}

/** Attribution for every recording actually shipped, for the credits screen. */
export function recordingCredits(): { license: string; count: number }[] {
  const byLicense = new Map<string, number>()
  for (const e of Object.values(RECORDINGS)) {
    byLicense.set(e.license, (byLicense.get(e.license) ?? 0) + 1)
  }
  return [...byLicense].map(([license, count]) => ({ license, count }))
}

export const recordingCount = Object.keys(RECORDINGS).length
