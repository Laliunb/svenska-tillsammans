import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { cardById } from '../data/vocab'
import { schedule, freshCard, type Grade } from '../lib/srs'
import { speak, hasSpeech } from '../lib/speech'

const GRADES: { grade: Grade; label: string; hint: string; cls: string }[] = [
  { grade: 'again', label: 'Again', hint: '<1 min', cls: 'bg-rose-500' },
  { grade: 'hard', label: 'Hard', hint: 'shorter', cls: 'bg-amber-500' },
  { grade: 'good', label: 'Good', hint: 'normal', cls: 'bg-emerald-500' },
  { grade: 'easy', label: 'Easy', hint: 'longer', cls: 'bg-blue' },
]

export default function Flashcards({
  autoStart,
  onExit,
}: {
  autoStart: boolean
  onExit: () => void
}) {
  const buildSession = useStore((s) => s.buildSession)
  const gradeCard = useStore((s) => s.gradeCard)
  const cards = useStore((s) => s.cards)
  const direction = useStore((s) => s.direction)

  const [queue, setQueue] = useState<string[]>([])
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const [started, setStarted] = useState(false)

  const total = useMemo(() => queue.length + done, [queue.length, done])

  const begin = () => {
    setQueue(buildSession())
    setDone(0)
    setFlipped(false)
    setStarted(true)
  }

  useEffect(() => {
    if (autoStart && !started) begin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

  const currentId = queue[0]
  const card = currentId ? cardById(currentId) : undefined

  // preview of the next interval each grade would produce (nice feedback)
  const previews = useMemo(() => {
    if (!card) return {} as Record<Grade, string>
    const now = Date.now()
    const prev = cards[card.id] ?? freshCard(now)
    const out = {} as Record<Grade, string>
    for (const g of GRADES) {
      const next = schedule(prev, g.grade, now)
      const days = Math.max(0, Math.round((next.due - now) / (24 * 60 * 60 * 1000)))
      out[g.grade] = days < 1 ? 'soon' : days === 1 ? '1 day' : `${days} days`
    }
    return out
  }, [card, cards])

  const onGrade = (grade: Grade) => {
    if (!card) return
    gradeCard(card.id, grade)
    setFlipped(false)
    setQueue((q) => {
      const [head, ...rest] = q
      // "Again" keeps the card in this session (re-inserted near the end).
      if (grade === 'again') return [...rest, head]
      return rest
    })
    if (grade !== 'again') setDone((d) => d + 1)
  }

  // ── not started ──
  if (!started) {
    return (
      <StartOrEmpty
        title="Flashcards"
        body="Review with spaced repetition — the app shows each word again right before you’d forget it."
        cta="Start a session"
        onCta={begin}
      />
    )
  }

  // ── finished ──
  if (!card) {
    return (
      <div className="safe-top flex min-h-full flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold">Session complete!</h2>
        <p className="mt-1 text-slate-500">
          You reviewed {done} card{done === 1 ? '' : 's'}. Bra jobbat!
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <button
            onClick={begin}
            className="rounded-2xl bg-blue py-4 font-bold text-white shadow-md active:scale-95"
          >
            Review more
          </button>
          <button
            onClick={onExit}
            className="rounded-2xl bg-white py-4 font-bold text-slate-600 shadow-sm active:scale-95"
          >
            Done for now
          </button>
        </div>
      </div>
    )
  }

  const front = direction === 'sv-en' ? card.sv : card.en
  const back = direction === 'sv-en' ? card.en : card.sv

  return (
    <div className="safe-top flex min-h-full flex-col px-5 pb-6">
      {/* progress */}
      <div className="flex items-center gap-3 pt-5">
        <button onClick={onExit} className="text-2xl text-slate-400" aria-label="Exit">
          ✕
        </button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
          />
        </div>
        <span className="w-12 text-right text-sm font-semibold text-slate-500">
          {done}/{total}
        </span>
      </div>

      {/* card */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-5 flex flex-1 flex-col items-center justify-center rounded-3xl bg-white px-6 py-10 text-center shadow-md active:scale-[0.99]"
      >
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {card.pos}
          {card.note ? ` · ${card.note}` : ''}
        </span>
        <span className="text-4xl font-extrabold text-ink">{front}</span>

        {!flipped ? (
          <span className="mt-8 text-sm text-slate-400">Tap to reveal</span>
        ) : (
          <div className="animate-flip mt-6 w-full border-t border-slate-100 pt-6">
            <p className="text-2xl font-bold text-blue">{back}</p>
            <p className="mt-4 text-lg text-ink">{card.exampleSv}</p>
            <p className="text-sm text-slate-500">{card.exampleEn}</p>
          </div>
        )}
      </button>

      {/* audio */}
      {hasSpeech() && (
        <button
          onClick={() => speak(card.sv)}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-blue shadow-sm active:scale-95"
        >
          🔊 Hear it in Swedish
        </button>
      )}

      {/* grade buttons */}
      {flipped ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.grade}
              onClick={() => onGrade(g.grade)}
              className={`flex flex-col items-center rounded-2xl ${g.cls} py-3 text-white shadow active:scale-95`}
            >
              <span className="font-bold">{g.label}</span>
              <span className="text-[10px] opacity-90">{previews[g.grade]}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="mt-3 rounded-2xl bg-ink py-4 font-bold text-white shadow-md active:scale-95"
        >
          Show answer
        </button>
      )}
    </div>
  )
}

function StartOrEmpty({
  title,
  body,
  cta,
  onCta,
}: {
  title: string
  body: string
  cta: string
  onCta: () => void
}) {
  return (
    <div className="safe-top flex min-h-full flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl">🃏</div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 max-w-xs text-slate-500">{body}</p>
      <button
        onClick={onCta}
        className="mt-8 w-full max-w-xs rounded-2xl bg-blue py-4 font-bold text-white shadow-md active:scale-95"
      >
        {cta}
      </button>
    </div>
  )
}
