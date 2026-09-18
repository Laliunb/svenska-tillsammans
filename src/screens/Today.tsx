import { useStore } from '../store/useStore'
import { VOCAB } from '../data/vocab'
import Ring from '../components/Ring'
import Icon, { type IconName } from '../components/Icon'
import type { Tab } from '../components/BottomNav'

function greeting(now = new Date()): { text: string; icon: IconName } {
  const h = now.getHours()
  if (h < 10) return { text: 'God morgon', icon: 'sun' }
  if (h < 18) return { text: 'Hej', icon: 'sun' }
  return { text: 'God kväll', icon: 'moon' }
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
  const g = greeting()

  return (
    <div className="safe-top px-5 pb-8">
      <header className="flex items-center justify-between pt-6">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            <Icon name={g.icon} size={15} /> {g.text}
          </p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-ink">
            {displayName}
          </h1>
        </div>
        <button
          onClick={() => goTab('profile')}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition active:scale-95"
          aria-label="Settings"
        >
          <Icon name="settings" size={19} />
        </button>
      </header>

      {/* streak + xp */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatCard
          icon="flame"
          tone={streak > 0 ? 'amber' : 'slate'}
          value={streak}
          label={streak === 1 ? 'day streak' : 'day streak'}
        />
        <StatCard icon="star" tone="blue" value={xp} label="total XP" />
      </div>

      {/* daily goal */}
      <section className="mt-3 flex flex-col items-center rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <Ring value={reviewsToday} max={dailyGoal}>
          <p className="text-3xl font-extrabold tracking-tight text-ink">{reviewsToday}</p>
          <p className="text-xs text-slate-400">of {dailyGoal} today</p>
        </Ring>
        <p className="mt-4 text-center text-sm text-slate-600">
          {goalHit
            ? 'Daily goal reached — snyggt jobbat!'
            : sessionCount > 0
              ? `${sessionCount} card${sessionCount === 1 ? '' : 's'} ready for you.`
              : 'All caught up. Come back later for reviews.'}
        </p>
        <button
          onClick={onStartReview}
          disabled={sessionCount === 0}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue py-4 text-base font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40"
        >
          <Icon name="play" size={18} filled />
          {goalHit ? 'Keep going' : 'Start today’s session'}
        </button>
      </section>

      {/* vocabulary progress */}
      <section className="mt-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-ink">Vocabulary</span>
          <span className="text-xs text-slate-400">
            {seen} seen · {mastered} strong · {VOCAB.length} total
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-yellow transition-all duration-500"
            style={{ width: `${(seen / VOCAB.length) * 100}%` }}
          />
        </div>
      </section>

      {/* shortcuts */}
      <section className="mt-3 grid grid-cols-3 gap-3">
        <Shortcut icon="book" label="Grammar" onClick={() => goTab('lessons')} />
        <Shortcut icon="speaker" label="Speak" onClick={() => goTab('pronounce')} />
        <Shortcut icon="heart" label="Together" onClick={() => goTab('together')} />
      </section>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  tone,
}: {
  icon: IconName
  value: number
  label: string
  tone: 'amber' | 'blue' | 'slate'
}) {
  const tones = {
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue/10 text-blue',
    slate: 'bg-slate-100 text-slate-400',
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
        <Icon name={icon} size={18} filled={tone !== 'slate'} strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-bold leading-none tracking-tight">{value}</p>
        <p className="mt-1 truncate text-xs text-slate-400">{label}</p>
      </div>
    </div>
  )
}

function Shortcut({
  icon,
  label,
  onClick,
}: {
  icon: IconName
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200/70 bg-white py-4 text-slate-600 shadow-sm transition active:scale-95"
    >
      <Icon name={icon} size={21} className="text-blue" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  )
}
