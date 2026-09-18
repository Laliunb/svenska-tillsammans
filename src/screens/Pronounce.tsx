import { useState } from 'react'
import { MINIMAL_PAIRS, PRONOUNCE_WORDS, type MinimalPair } from '../data/pronunciation'
import { speak, hasSpeech, hasSwedishVoice, voiceCount } from '../lib/speech'

type Mode = 'menu' | 'listen' | 'words'

export default function Pronounce() {
  const [mode, setMode] = useState<Mode>('menu')

  if (!hasSpeech()) {
    return (
      <div className="safe-top px-6 pt-20 text-center">
        <div className="text-5xl">🔇</div>
        <h1 className="mt-4 text-xl font-bold">No speech support</h1>
        <p className="mt-2 text-slate-500">
          This browser can’t play speech. Try Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  if (mode === 'listen') return <ListenDrill onBack={() => setMode('menu')} />
  if (mode === 'words') return <WordDrill onBack={() => setMode('menu')} />

  return (
    <div className="safe-top px-5 pb-6">
      <h1 className="pt-6 text-2xl font-bold">Speak 🔊</h1>
      <p className="mt-1 text-sm text-slate-500">
        Train your ear on the sounds English doesn’t have.
      </p>

      {!hasSwedishVoice() ? (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
          Tip: your device has no dedicated Swedish voice, so audio uses a default
          voice and may be imperfect. On iOS/Android you can add a Swedish TTS
          voice in system settings for much better pronunciation.
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
          {voiceCount()} Swedish voice{voiceCount() === 1 ? '' : 's'} found — drills
          rotate between them so your ear generalises (the HVPT method).
        </div>
      )}

      <div className="mt-4 space-y-3">
        <button
          onClick={() => setMode('listen')}
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
        >
          <span className="text-3xl">👂</span>
          <span className="flex-1">
            <span className="block font-semibold">Listen & choose</span>
            <span className="block text-sm text-slate-500">
              Hear a word, pick which of two you heard
            </span>
          </span>
          <span className="text-slate-300">›</span>
        </button>
        <button
          onClick={() => setMode('words')}
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
        >
          <span className="text-3xl">🗣️</span>
          <span className="flex-1">
            <span className="block font-semibold">Practice words</span>
            <span className="block text-sm text-slate-500">
              Tap tricky words and repeat after the voice
            </span>
          </span>
          <span className="text-slate-300">›</span>
        </button>
      </div>
    </div>
  )
}

// Randomly choose which of the two words in the pair gets played.
function pickTarget(): 0 | 1 {
  return Math.random() < 0.5 ? 0 : 1
}

function ListenDrill({ onBack }: { onBack: () => void }) {
  const [i, setI] = useState(0)
  const [target, setTarget] = useState<0 | 1>(() => pickTarget())
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const pair: MinimalPair = MINIMAL_PAIRS[i]
  const options = [pair.a, pair.b]

  const playTarget = (vi = voiceIdx) => {
    speak(options[target].sv, { voiceIndex: vi })
  }

  const choose = (choice: number) => {
    if (answered !== null) return
    setAnswered(choice)
    setAttempts((a) => a + 1)
    if (choice === target) setScore((s) => s + 1)
  }

  const nextCard = () => {
    const ni = (i + 1) % MINIMAL_PAIRS.length
    const nt = pickTarget()
    const nv = voiceIdx + 1
    setI(ni)
    setTarget(nt)
    setVoiceIdx(nv)
    setAnswered(null)
    // small delay so the UI updates before audio
    const nextPair = MINIMAL_PAIRS[ni]
    setTimeout(() => speak([nextPair.a, nextPair.b][nt].sv, { voiceIndex: nv }), 50)
  }

  return (
    <div className="safe-top px-5 pb-6">
      <div className="flex items-center justify-between pt-6">
        <button onClick={onBack} className="text-sm font-semibold text-blue">
          ← Back
        </button>
        <span className="text-sm font-semibold text-slate-500">
          {score}/{attempts}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {pair.focus}
        </p>
        <p className="mt-1 text-sm text-slate-600">{pair.tip}</p>
      </div>

      <button
        onClick={() => playTarget()}
        className="mt-6 w-full rounded-3xl bg-blue py-8 text-2xl font-bold text-white shadow-md active:scale-[0.98]"
      >
        🔊 Play the word
      </button>
      <p className="mt-2 text-center text-xs text-slate-400">
        Tap to replay · voices rotate each round
      </p>

      <p className="mt-6 text-center text-sm font-semibold text-slate-500">
        Which word did you hear?
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {options.map((o, idx) => {
          const state =
            answered === null
              ? 'idle'
              : idx === target
                ? 'right'
                : idx === answered
                  ? 'wrong'
                  : 'idle'
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`rounded-2xl border-2 p-5 text-center transition ${
                state === 'right'
                  ? 'border-emerald-500 bg-emerald-50'
                  : state === 'wrong'
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-slate-200 bg-white active:scale-95'
              }`}
            >
              <span className="block text-xl font-bold text-ink">{o.sv}</span>
              <span className="block text-xs text-slate-500">{o.en}</span>
            </button>
          )
        })}
      </div>

      {answered !== null && (
        <button
          onClick={nextCard}
          className="mt-5 w-full rounded-2xl bg-ink py-4 font-bold text-white shadow-md active:scale-95"
        >
          Next →
        </button>
      )}
    </div>
  )
}

function WordDrill({ onBack }: { onBack: () => void }) {
  const [voiceIdx, setVoiceIdx] = useState(0)

  const play = (sv: string) => {
    speak(sv, { voiceIndex: voiceIdx })
    setVoiceIdx((v) => v + 1) // rotate voices across taps
  }

  return (
    <div className="safe-top px-5 pb-6">
      <button onClick={onBack} className="pt-6 text-sm font-semibold text-blue">
        ← Back
      </button>
      <h1 className="mt-2 text-2xl font-bold">Practice words 🗣️</h1>
      <p className="mt-1 text-sm text-slate-500">
        Tap to hear it, then say it out loud. Aim for the sound, not perfection.
      </p>
      <ul className="mt-4 space-y-3">
        {PRONOUNCE_WORDS.map((w) => (
          <li key={w.sv}>
            <button
              onClick={() => play(w.sv)}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
            >
              <span className="text-2xl">🔊</span>
              <span className="flex-1">
                <span className="block text-lg font-bold text-ink">{w.sv}</span>
                <span className="block text-sm text-slate-500">{w.en}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
