import { useState } from 'react'
import { LESSONS, type Lesson } from '../data/lessons'
import { useStore } from '../store/useStore'
import { speak, hasSpeech } from '../lib/speech'
import Icon from '../components/Icon'

export default function Lessons() {
  const [active, setActive] = useState<Lesson | null>(null)
  const lessons = useStore((s) => s.lessons)

  if (active) return <LessonView lesson={active} onBack={() => setActive(null)} />

  return (
    <div className="safe-top px-5 pb-6">
      <h1 className="pt-6 text-2xl font-bold tracking-tight">Grammar</h1>
      <p className="mt-1 text-sm text-slate-500">
        Short, plain-English lessons. 2–4 minutes each.
      </p>
      <ul className="mt-4 space-y-3">
        {LESSONS.map((l) => {
          const p = lessons[l.id]
          return (
            <li key={l.id}>
              <button
                onClick={() => setActive(l)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                  <Icon name={l.icon} size={21} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-ink">{l.title}</span>
                  <span className="block text-sm text-slate-500">{l.summary}</span>
                </span>
                {p?.completed ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                    {p.best}%
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">{l.minutes} min</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function LessonView({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  const [quizMode, setQuizMode] = useState(false)

  return (
    <div className="safe-top px-5 pb-8">
      <button onClick={onBack} className="pt-6 text-sm font-semibold text-blue">
        ← All lessons
      </button>

      {!quizMode ? (
        <>
          <h1 className="mt-3 flex items-center gap-2.5 text-2xl font-bold tracking-tight">
            <Icon name={lesson.icon} size={24} className="text-blue" />
            {lesson.title}
          </h1>
          <div className="mt-4 space-y-4">
            {lesson.points.map((pt, i) => (
              <section key={i} className="rounded-2xl bg-white p-4 shadow-sm">
                <h2 className="font-bold text-ink">{pt.heading}</h2>
                <p className="mt-1 text-sm text-slate-600">{pt.body}</p>
                <ul className="mt-3 space-y-2">
                  {pt.examples.map((ex, j) => (
                    <li key={j} className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-ink">{ex.sv}</span>
                        {hasSpeech() && (
                          <button
                            onClick={() => speak(ex.sv)}
                            className="text-blue transition active:scale-90"
                            aria-label="Play"
                          >
                            <Icon name="speaker" size={18} />
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-slate-500">{ex.en}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <button
            onClick={() => setQuizMode(true)}
            className="mt-5 w-full rounded-2xl bg-blue py-4 font-bold text-white shadow-md active:scale-95"
          >
            Take the quick quiz →
          </button>
        </>
      ) : (
        <Quiz lesson={lesson} onBack={onBack} />
      )}
    </div>
  )
}

function Quiz({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  const completeLesson = useStore((s) => s.completeLesson)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = lesson.quiz[idx]

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answerIndex) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (idx + 1 < lesson.quiz.length) {
      setIdx((n) => n + 1)
      setPicked(null)
    } else {
      const score = Math.round(((correct) / lesson.quiz.length) * 100)
      completeLesson(lesson.id, score)
      setFinished(true)
    }
  }

  if (finished) {
    const score = Math.round((correct / lesson.quiz.length) * 100)
    return (
      <div className="mt-10 flex flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-blue/10 text-blue">
          <Icon name={score >= 100 ? 'trophy' : score >= 50 ? 'check' : 'book'} size={30} />
        </span>
        <h2 className="mt-3 text-2xl font-bold">{score}%</h2>
        <p className="mt-1 text-slate-500">
          {correct}/{lesson.quiz.length} correct · +XP earned
        </p>
        <button
          onClick={onBack}
          className="mt-8 w-full max-w-xs rounded-2xl bg-blue py-4 font-bold text-white shadow-md active:scale-95"
        >
          Back to lessons
        </button>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-slate-400">
        Question {idx + 1} of {lesson.quiz.length}
      </p>
      <h2 className="mt-1 text-xl font-bold text-ink">{q.prompt}</h2>
      <div className="mt-4 space-y-2">
        {q.choices.map((c, i) => {
          const isAnswer = i === q.answerIndex
          const state =
            picked === null
              ? 'idle'
              : isAnswer
                ? 'right'
                : i === picked
                  ? 'wrong'
                  : 'idle'
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`w-full rounded-2xl border-2 p-4 text-left font-semibold transition ${
                state === 'right'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : state === 'wrong'
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-ink active:scale-[0.99]'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
          {q.explain}
        </div>
      )}
      {picked !== null && (
        <button
          onClick={next}
          className="mt-4 w-full rounded-2xl bg-ink py-4 font-bold text-white shadow-md active:scale-95"
        >
          {idx + 1 < lesson.quiz.length ? 'Next question →' : 'See result'}
        </button>
      )}
    </div>
  )
}
