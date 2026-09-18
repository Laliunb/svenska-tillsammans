import { useStore } from '../store/useStore'
import { isCloudConfigured } from '../lib/supabase'
import Icon from '../components/Icon'

export default function Profile() {
  const displayName = useStore((s) => s.displayName)
  const partnerName = useStore((s) => s.partnerName)
  const dailyGoal = useStore((s) => s.dailyGoal)
  const direction = useStore((s) => s.direction)
  const newPerDay = useStore((s) => s.newPerDay)
  const freezes = useStore((s) => s.freezes)
  const seen = useStore((s) => s.seenCount())
  const mastered = useStore((s) => s.masteredCount())

  const setDisplayName = useStore((s) => s.setDisplayName)
  const setPartnerName = useStore((s) => s.setPartnerName)
  const setDailyGoal = useStore((s) => s.setDailyGoal)
  const setDirection = useStore((s) => s.setDirection)
  const setNewPerDay = useStore((s) => s.setNewPerDay)
  const resetAll = useStore((s) => s.resetAll)

  return (
    <div className="safe-top px-5 pb-10">
      <h1 className="pt-6 text-2xl font-bold tracking-tight">Settings</h1>

      <section className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm">
        <Field label="Your name">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </Field>
        <Field label="Partner’s name">
          <input
            value={partnerName}
            placeholder="e.g. your fiancé"
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
          />
        </Field>
      </section>

      <section className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm">
        <Field label={`Daily goal — ${dailyGoal} reviews`}>
          <input
            type="range"
            min={5}
            max={60}
            step={5}
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
            className="w-full accent-[var(--color-blue)]"
          />
          <p className="mt-1 text-xs text-slate-400">
            Small and daily beats big and rare — 10–20 is a great habit.
          </p>
        </Field>

        <Field label={`New words per day — ${newPerDay}`}>
          <input
            type="range"
            min={3}
            max={40}
            step={1}
            value={newPerDay}
            onChange={(e) => setNewPerDay(Number(e.target.value))}
            className="w-full accent-[var(--color-blue)]"
          />
          <p className="mt-1 text-xs text-slate-400">
            How many brand-new words get introduced each day. Raise it to move
            faster; every new word also comes back for review later.
          </p>
        </Field>

        <Field label="Show cards as">
          <div className="grid grid-cols-2 gap-2">
            <ToggleBtn
              active={direction === 'sv-en'}
              onClick={() => setDirection('sv-en')}
            >
              Swedish → English
            </ToggleBtn>
            <ToggleBtn
              active={direction === 'en-sv'}
              onClick={() => setDirection('en-sv')}
            >
              English → Swedish
            </ToggleBtn>
          </div>
        </Field>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <Stat value={seen} label="words seen" />
        <Stat value={mastered} label="words strong" />
        <Stat value={freezes} label="streak freezes" />
      </section>

      <section className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-500 shadow-sm">
        <p className="flex items-center gap-2">
          <Icon
            name={isCloudConfigured ? 'cloud' : 'ban'}
            size={17}
            className={isCloudConfigured ? 'text-emerald-600' : 'text-slate-400'}
          />
          <span>
            <strong className="text-ink">Cloud sync:</strong>{' '}
            {isCloudConfigured ? 'configured' : 'not set up yet (offline mode)'}
          </span>
        </p>
      </section>

      <button
        onClick={() => {
          if (confirm('Reset all progress on this device? This cannot be undone.')) {
            resetAll()
          }
        }}
        className="mt-6 w-full rounded-2xl border border-rose-200 py-3 font-semibold text-rose-600 active:scale-95"
      >
        Reset progress
      </button>

      <p className="mt-6 text-center text-xs text-slate-400">
        Svenska Tillsammans — built for two
      </p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  )
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 py-2 text-sm font-semibold transition ${
        active ? 'border-blue bg-blue/10 text-blue' : 'border-slate-200 text-slate-500'
      }`}
    >
      {children}
    </button>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
      <p className="text-2xl font-extrabold text-ink">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}
