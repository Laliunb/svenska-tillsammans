import { useMemo, useState } from 'react'
import { MINIMAL_PAIRS, PRONOUNCE_WORDS, type MinimalPair } from '../data/pronunciation'
import {
  speak,
  hasSpeech,
  hasSwedishVoice,
  voiceCount,
  recordingFor,
  recordingCount,
} from '../lib/speech'
import Icon from '../components/Icon'

type Mode = 'menu' | 'listen' | 'words'

/**
 * How a pair can be played. Both words must come from the SAME source — mixing a
 * native recording with synthetic speech makes the "which did you hear?" task
 * solvable from audio quality alone rather than from the vowel being trained.
 */
function pairMode(p: MinimalPair): 'recording' | 'tts' | 'unplayable' {
  if (recordingFor(p.a.sv) && recordingFor(p.b.sv)) return 'recording'
  if (hasSwedishVoice()) return 'tts'
  return 'unplayable'
}

export default function Pronounce() {
  const [mode, setMode] = useState<Mode>('menu')
  const pairs = useMemo(() => MINIMAL_PAIRS.filter((p) => pairMode(p) !== 'unplayable'), [])

  if (mode === 'listen' && pairs.length > 0)
    return <ListenDrill pairs={pairs} onBack={() => setMode('menu')} />
  if (mode === 'words') return <WordDrill onBack={() => setMode('menu')} />

  return (
    <div className="safe-top px-5 pb-6">
      <h1 className="pt-6 text-2xl font-bold tracking-tight">Speak</h1>
      <p className="mt-1 text-sm text-slate-500">
        Train your ear on the sounds English doesn’t have.
      </p>

      <AudioStatus pairCount={pairs.length} />

      <div className="mt-4 space-y-3">
        <MenuRow
          icon="ear"
          title="Listen and choose"
          sub={
            pairs.length > 0
              ? `Hear a word, pick which of two you heard · ${pairs.length} pairs`
              : 'Needs a Swedish voice installed — see above'
          }
          disabled={pairs.length === 0}
          onClick={() => setMode('listen')}
        />
        <MenuRow
          icon="mic"
          title="Practice words"
          sub="Tap tricky words and repeat after the speaker"
          onClick={() => setMode('words')}
        />
      </div>
    </div>
  )
}

function AudioStatus({ pairCount }: { pairCount: number }) {
  const voices = hasSpeech() ? voiceCount() : 0

  return (
    <div className="mt-4 space-y-2">
      <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <Icon name="check" size={18} className="mt-0.5 shrink-0 text-emerald-600" />
        <p>
          <strong>{recordingCount} words</strong> use real recordings of native
          Swedish speakers, so what you hear is genuinely Swedish — not a computer
          guessing.
        </p>
      </div>

      {voices === 0 && (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <Icon name="speaker" size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold">No Swedish voice on this device</p>
            <p className="mt-1">
              Example sentences stay silent rather than being read in an English
              accent, which would teach you the wrong sounds.
              {pairCount > 0 && ' Word drills still work — those use real recordings.'}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-amber-800">
              <strong>Android:</strong> Settings → System → Languages →
              Text-to-speech → install Swedish.
              <br />
              <strong>iPhone:</strong> Settings → Accessibility → Spoken Content →
              Voices → Svenska.
              <br />
              <strong>Windows:</strong> Settings → Time and language → Language → add
              Swedish with speech.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuRow({
  icon,
  title,
  sub,
  onClick,
  disabled,
}: {
  icon: 'ear' | 'mic'
  title: string
  sub: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 text-left shadow-sm transition active:scale-[0.99] disabled:opacity-50"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
        <Icon name={icon} size={21} />
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-slate-500">{sub}</span>
      </span>
      <Icon name="chevronRight" size={18} className="shrink-0 text-slate-300" />
    </button>
  )
}

function ListenDrill({ pairs, onBack }: { pairs: MinimalPair[]; onBack: () => void }) {
  const [i, setI] = useState(0)
  const [target, setTarget] = useState<0 | 1>(() => (Math.random() < 0.5 ? 0 : 1))
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const pair = pairs[i]
  const options = [pair.a, pair.b]
  const mode = pairMode(pair)

  const choose = (choice: number) => {
    if (answered !== null) return
    setAnswered(choice)
    setAttempts((a) => a + 1)
    if (choice === target) setScore((s) => s + 1)
  }

  const nextCard = () => {
    const ni = (i + 1) % pairs.length
    const nt: 0 | 1 = Math.random() < 0.5 ? 0 : 1
    const nv = voiceIdx + 1
    setI(ni)
    setTarget(nt)
    setVoiceIdx(nv)
    setAnswered(null)
    // Resolve the NEXT pair explicitly; `pair` above still points at the old index.
    const next = pairs[ni]
    const nextMode = pairMode(next)
    setTimeout(() => {
      speak([next.a, next.b][nt].sv, { voiceIndex: nv, preferTts: nextMode === 'tts' })
    }, 60)
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

      <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {pair.focus}
        </p>
        <p className="mt-1 text-sm text-slate-600">{pair.tip}</p>
      </div>

      <button
        onClick={() =>
          speak(options[target].sv, { voiceIndex: voiceIdx, preferTts: mode === 'tts' })
        }
        className="mt-6 w-full rounded-3xl bg-blue py-8 text-white shadow-sm transition active:scale-[0.98]"
      >
        <span className="flex items-center justify-center gap-2.5 text-2xl font-bold">
          <Icon name="speaker" size={26} /> Play the word
        </span>
      </button>
      <p className="mt-2 text-center text-xs text-slate-400">
        Tap to replay ·{' '}
        {mode === 'recording' ? 'native speaker recording' : 'device Swedish voice'}
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
          className="mt-5 w-full rounded-2xl bg-ink py-4 font-bold text-white shadow-sm transition active:scale-95"
        >
          Next →
        </button>
      )}
    </div>
  )
}

function WordDrill({ onBack }: { onBack: () => void }) {
  const [voiceIdx, setVoiceIdx] = useState(0)

  return (
    <div className="safe-top px-5 pb-6">
      <button onClick={onBack} className="pt-6 text-sm font-semibold text-blue">
        ← Back
      </button>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Practice words</h1>
      <p className="mt-1 text-sm text-slate-500">
        Tap to hear it, then say it out loud. Aim for the sound, not perfection.
      </p>
      <ul className="mt-4 space-y-3">
        {PRONOUNCE_WORDS.map((w) => {
          const rec = recordingFor(w.sv)
          const playable = Boolean(rec) || hasSwedishVoice()
          return (
            <li key={w.sv}>
              <button
                onClick={() => {
                  speak(w.sv, { voiceIndex: voiceIdx })
                  setVoiceIdx((v) => v + 1)
                }}
                disabled={!playable}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 text-left shadow-sm transition active:scale-[0.99] disabled:opacity-50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                  <Icon name="speaker" size={19} />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold text-ink">{w.sv}</span>
                  <span className="block text-sm text-slate-500">{w.en}</span>
                </span>
                {rec && (
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    native
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
