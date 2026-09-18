// Text-to-speech via the browser's built-in SpeechSynthesis API. No network,
// no keys, works offline once voices are loaded. For pronunciation practice we
// deliberately rotate through *all* available Swedish voices (and fall back to
// any voice) to approximate High-Variability Phonetic Training — hearing the
// same word from multiple talkers is what the meta-analysis links to durable
// perception gains.

let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  const v = window.speechSynthesis.getVoices()
  if (v.length) cachedVoices = v
  return cachedVoices
}

// Voices load asynchronously in most browsers.
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

interface SpeakOptions {
  /** 0 = first Swedish voice, 1 = second, etc. Wraps around. */
  voiceIndex?: number
  rate?: number
}

/** Speak a Swedish string. Picks a Swedish voice when available. */
export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!hasSpeech()) return
  window.speechSynthesis.cancel()

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'sv-SE'
  utter.rate = opts.rate ?? 0.95

  const voices = swedishVoices()
  if (voices.length) {
    const idx = ((opts.voiceIndex ?? 0) % voices.length + voices.length) % voices.length
    utter.voice = voices[idx]
  }
  window.speechSynthesis.speak(utter)
}

/** Number of distinct Swedish talkers we can rotate through (min 1). */
export function voiceCount(): number {
  return Math.max(1, swedishVoices().length)
}
