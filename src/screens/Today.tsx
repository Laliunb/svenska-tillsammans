import { useStore } from '../store/useStore'
import { VOCAB } from '../data/vocab'
import Ring from '../components/Ring'
import type { Tab } from '../components/BottomNav'

function greeting(now = new Date()): string {
  const h = now.getHours()
  if (h < 10) return 'God morgon'
  if (h < 18) return 'Hej'
  return 'God kväll'
}

export default function Today({
  onStartReview,
  goTab,
}: {
  onStartReview: () => void
  goTab: (t: Tab) => void
}) {
  const displayName = useStore((s) => s.displayName)
  const dailyGoal = useStore((s) => s.dailyGoal)
  const xp = useStore((s) => s.xp)
  const reviewsToday = useStore((s) => s.reviewsToday())
  const streak = useStore((s) => s.effectiveStreak())
  // Select the COUNT, not the array: a selector returning a fresh array every
  // call never produces a stable snapshot, which sends useSyncExternalStore into
  // an infinite re-render loop and blanks the page.
  const sessionCount = useStore((s) => s.buildSession().length)
  const seen = useStore((s) => s.seenCount())
  const mastered = useStore((s) => s.masteredCount())

  const goalHit = reviewsToday >= dailyGoal

  return (
    <div className="safe-top px-5 pb-6">
      <header className="flex items-center justify-between pt-5">
        <div>
          <p className="text-sm text-slate-500">{greeting()},</p>
          <h1 className="text-2xl font-bold text-ink">{displayName} 👋</h1>
        </div>
        <button
          onClick={() => goTab('profile')}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl shadow-sm"
          aria-label="Settings"
        >
          ⚙️
        </button>
      </header>

      {/* streak + xp */}
      <div className="mt-4 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">
          <span className="text-2xl">{streak > 0 ? '🔥' : '🌱'}</span>
          <div>
            <p className="text-xl font-bold leading-none">{streak}</p>
            <p className="text-xs text-slate-500">day streak</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-xl font-bold leading-none">{xp}</p>
            <p className="text-xs text-slate-500">total XP</p>
          </div>
        </div>
      </div>

      {/* daily goal ring */}
      <section className="mt-4 flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm">
        <Ring value={reviewsToday} max={dailyGoal}>
          <p className="text-3xl font-extrabold text-ink">{reviewsToday}</p>
          <p className="text-xs text-slate-500">/ {dailyGoal} today</p>
        </Ring>
        <p className="mt-3 text-center text-sm text-slate-600">
          {goalHit
            ? 'Daily goal reached — snyggt jobbat! 🎉'
            : sessionCount > 0
              ? `${sessionCount} card${sessionCount === 1 ? '' : 's'} ready for you.`
              : 'All caught up. Come back later for reviews.'}
        </p>
        <button
          onClick={onStartReview}
          disabled={sessionCount === 0}
          className="mt-4 w-full rounded-2xl bg-blue py-4 text-lg font-bold text-white shadow-md transition active:scale-[0.98] disabled:opacity-40"
        >
          {goalHit ? 'Keep going ▶' : 'Start today’s session ▶'}
        </button>
      </section>

      {/* progress bar */}
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-semibold">Vocabulary</span>
          <span className="text-slate-500">
            {seen} seen · {mastered} strong · {VOCAB.length} total
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-yellow"
            style={{ width: `${(seen / VOCAB.length) * 100}%` }}
          />
        </div>
      </section>

      {/* shortcuts */}
      <section className="mt-4 grid grid-cols-3 gap-3">
        <Shortcut emoji="📘" label="Grammar" onClick={() => goTab('lessons')} />
        <Shortcut emoji="🔊" label="Speak" onClick={() => goTab('pronounce')} />
        <Shortcut emoji="❤️" label="Together" onClick={() => goTab('together')} />
      </section>
    </div>
  )
}

function Shortcut({ emoji, label, onClick }: { emoji: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-2xl bg-white py-4 shadow-sm transition active:scale-95"
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-semibold text-slate-600">{label}</span>
    </button>
  )
}
