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
import { useStore } from '../store/useStore'
import Icon from '../components/Icon'

type Mode = 'menu' | 'listen' | 'words' | 'list'

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
  const pairsDone = useStore((s) => s.pairsDone)
  const pairs = useMemo(() => MINIMAL_PAIRS.filter((p) => pairMode(p) !== 'unplayable'), [])
  const doneCount = pairs.filter((p) => pairsDone[p.id]).length

  if (mode === 'listen' && pairs.length > 0)
    return <ListenDrill pairs={pairs} onBack={() => setMode('menu')} onList={() => setMode('list')} />
  if (mode === 'words') return <WordDrill onBack={() => setMode('menu')} />
  if (mode === 'list')
    return <PairList pairs={pairs} onBack={() => setMode('menu')} onPractise={() => setMode('listen')} />

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
              ? `${doneCount} of ${pairs.length} pairs mastered`
              : 'Needs a Swedish voice installed — see above'
          }
          progress={pairs.length > 0 ? doneCount / pairs.length : undefined}
          disabled={pairs.length === 0}
          onClick={() => setMode('listen')}
        />
        <MenuRow
          icon="mic"
          title="Practice words"
          sub="Tap tricky words and repeat after the speaker"
          onClick={() => setMode('words')}
        />
        {doneCount > 0 && (
          <button
            onClick={() => setMode('list')}
            className="w-full py-1 text-center text-xs font-semibold text-slate-400"
          >
            See all pairs and progress
          </button>
        )}
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
  progress,
}: {
  icon: 'ear' | 'mic'
  title: string
  sub: string
  onClick: () => void
  disabled?: boolean
  progress?: number
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
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-slate-500">{sub}</span>
        {progress !== undefined && (
          <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <span
              className="block h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
        )}
      </span>
      <Icon name="chevronRight" size={18} className="shrink-0 text-slate-300" />
    </button>
  )
}

/** Compact overview of every pair, ticked where already mastered. */
function PairList({
  pairs,
  onBack,
  onPractise,
}: {
  pairs: MinimalPair[]
  onBack: () => void
  onPractise: () => void
}) {
  const pairsDone = useStore((s) => s.pairsDone)
  const resetPairs = useStore((s) => s.resetPairs)
  const done = pairs.filter((p) => pairsDone[p.id]).length

  return (
    <div className="safe-top px-5 pb-8">
      <button onClick={onBack} className="pt-6 text-sm font-semibold text-blue">
        ← Back
      </button>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Your pairs</h1>
      <p className="mt-1 text-sm text-slate-500">
        {done} of {pairs.length} mastered
      </p>

      <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/70 bg-white">
        {pairs.map((p) => {
          const ok = Boolean(pairsDone[p.id])
          return (
            <li key={p.id} className="flex items-center gap-3 px-4 py-2.5">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  ok ? 'bg-emerald-500 text-white' : 'border border-slate-200 text-transparent'
                }`}
              >
                <Icon name="check" size={13} strokeWidth={2.6} />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-semibold ${
                    ok ? 'text-slate-400' : 'text-ink'
                  }`}
                >
                  {p.a.sv} · {p.b.sv}
                </span>
                <span className="block truncate text-xs text-slate-400">{p.focus}</span>
              </span>
            </li>
          )
        })}
      </ul>

      <button
        onClick={onPractise}
        className="mt-4 w-full rounded-2xl bg-blue py-4 font-semibold text-white shadow-sm transition active:scale-95"
      >
        {done === pairs.length ? 'Practise again' : 'Continue practising'}
      </button>
      {done > 0 && (
        <button
          onClick={() => {
            if (confirm('Clear your pair progress and start over?')) resetPairs()
          }}
          className="mt-2 w-full py-2 text-center text-xs font-semibold text-slate-400"
        >
          Reset pair progress
        </button>
      )}
    </div>
  )
}

function ListenDrill({
  pairs,
  onBack,
  onList,
}: {
  pairs: MinimalPair[]
  onBack: () => void
  onList: () => void
}) {
  const pairsDone = useStore((s) => s.pairsDone)
  const markPairDone = useStore((s) => s.markPairDone)

  // Work through the pairs not yet mastered. Captured once on mount so the queue
  // does not reshuffle underneath the learner as they mark pairs off.
  const [queue, setQueue] = useState<MinimalPair[]>(() => {
    const todo = pairs.filter((p) => !pairsDone[p.id])
    return todo.length > 0 ? todo : pairs
  })
  const [target, setTarget] = useState<0 | 1>(() => (Math.random() < 0.5 ? 0 : 1))
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [startCount] = useState(() => {
    const todo = pairs.filter((p) => !pairsDone[p.id])
    return todo.length > 0 ? todo.length : pairs.length
  })

  const pair = queue[0]
  const mastered = pairs.filter((p) => pairsDone[p.id]).length

  // ── finished the queue ──
  if (!pair) {
    const allDone = mastered === pairs.length
    return (
      <div className="safe-top flex min-h-full flex-col items-center justify-center px-6 text-center">
        <span
          className={`grid h-16 w-16 place-items-center rounded-full ${
            allDone ? 'bg-emerald-50 text-emerald-600' : 'bg-blue/10 text-blue'
          }`}
        >
          <Icon name={allDone ? 'trophy' : 'check'} size={30} />
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          {allDone ? 'All pairs mastered!' : 'Round complete'}
        </h2>
        <p className="mt-1 text-slate-500">
          {correct} of {attempts} correct this round.
          <br />
          {allDone
            ? `You have now got all ${pairs.length} pairs right at least once.`
            : `${mastered} of ${pairs.length} pairs mastered so far.`}
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          {!allDone && (
            <button
              onClick={() => {
                setQueue(pairs.filter((p) => !pairsDone[p.id]))
                setAnswered(null)
                setCorrect(0)
                setAttempts(0)
              }}
              className="rounded-2xl bg-blue py-4 font-semibold text-white shadow-sm transition active:scale-95"
            >
              Continue to the remaining pairs
            </button>
          )}
          <button
            onClick={() => {
              setQueue(pairs)
              setAnswered(null)
              setCorrect(0)
              setAttempts(0)
            }}
            className={`rounded-2xl py-4 font-semibold shadow-sm transition active:scale-95 ${
              allDone ? 'bg-blue text-white' : 'border border-slate-200 bg-white text-slate-600'
            }`}
          >
            Keep practising all {pairs.length}
          </button>
          <button
            onClick={onList}
            className="rounded-2xl border border-slate-200 bg-white py-4 font-semibold text-slate-600 shadow-sm transition active:scale-95"
          >
            See my progress
          </button>
          <button onClick={onBack} className="py-2 text-sm font-semibold text-slate-400">
            Done for now
          </button>
        </div>
      </div>
    )
  }

  const options = [pair.a, pair.b]
  const mode = pairMode(pair)
  const done = startCount - queue.length

  const choose = (choice: number) => {
    if (answered !== null) return
    setAnswered(choice)
    setAttempts((a) => a + 1)
    if (choice === target) {
      setCorrect((c) => c + 1)
      markPairDone(pair.id)
    }
  }

  const next = () => {
    const wasRight = answered === target
    setQueue((q) => {
      const [head, ...rest] = q
      // A pair you got wrong comes back later in the round rather than vanishing.
      return wasRight ? rest : [...rest, head]
    })
    const nt: 0 | 1 = Math.random() < 0.5 ? 0 : 1
    const nv = voiceIdx + 1
    setTarget(nt)
    setVoiceIdx(nv)
    setAnswered(null)

    const upcoming = wasRight ? queue[1] : queue[1] ?? queue[0]
    if (upcoming) {
      const m = pairMode(upcoming)
      setTimeout(() => {
        speak([upcoming.a, upcoming.b][nt].sv, { voiceIndex: nv, preferTts: m === 'tts' })
      }, 60)
    }
  }

  return (
    <div className="safe-top px-5 pb-6">
      <div className="flex items-center gap-3 pt-6">
        <button onClick={onBack} className="text-slate-400 transition active:scale-90" aria-label="Exit">
          <Icon name="close" size={20} />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${startCount > 0 ? (done / startCount) * 100 : 0}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-500">
          {done}/{startCount}
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
        <>
          <p
            className={`mt-4 text-center text-sm font-semibold ${
              answered === target ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {answered === target
              ? 'Correct — pair mastered.'
              : `Not quite — it was "${options[target].sv}". This one comes back later.`}
          </p>
          <button
            onClick={next}
            className="mt-3 w-full rounded-2xl bg-ink py-4 font-semibold text-white shadow-sm transition active:scale-95"
          >
            Next →
          </button>
        </>
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
