import { useEffect, useState } from 'react'
import { useStore, dayKey } from '../store/useStore'
import { UNITS, vocabByUnit } from '../data/vocab'
import { supabase, isCloudConfigured } from '../lib/supabase'
import { pushProgress, fetchPartners, type PartnerProgress } from '../lib/sync'
import { speak, hasSpeech } from '../lib/speech'

export default function Together() {
  const displayName = useStore((s) => s.displayName)
  const partnerName = useStore((s) => s.partnerName)
  const xp = useStore((s) => s.xp)
  const reviewsToday = useStore((s) => s.reviewsToday())
  const streak = useStore((s) => s.effectiveStreak())

  // pick a shared challenge unit that changes daily (same for both partners)
  const dayNumber = Math.floor(Date.now() / (24 * 60 * 60 * 1000))
  const unit = UNITS[dayNumber % UNITS.length]
  const words = vocabByUnit(unit.id).slice(0, 5)

  return (
    <div className="safe-top px-5 pb-6">
      <h1 className="pt-6 text-2xl font-bold">Together ❤️</h1>
      <p className="mt-1 text-sm text-slate-500">
        Learn side by side. Cheer each other on — this is a team sport.
      </p>

      <CloudCard />

      {/* scoreboard */}
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold text-ink">This is you both today</h2>
        <div className="mt-3 space-y-3">
          <PlayerRow
            name={displayName || 'Me'}
            xp={xp}
            reviews={reviewsToday}
            streak={streak}
            you
          />
          <PartnerRows fallbackName={partnerName} />
        </div>
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
          Tip from the research: aim to <strong>beat your own best</strong>, not each
          other. Shared streaks and encouragement beat head-to-head pressure.
        </p>
      </section>

      {/* shared challenge */}
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{unit.emoji}</span>
          <div>
            <h2 className="font-bold text-ink">Today’s shared challenge</h2>
            <p className="text-sm text-slate-500">
              {unit.title} · {unit.titleSv}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Both learn these 5 words today, then quiz each other out loud tonight.
        </p>
        <ul className="mt-3 space-y-2">
          {words.map((w) => (
            <li
              key={w.id}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
            >
              <span className="flex-1">
                <span className="block font-semibold text-ink">{w.sv}</span>
                <span className="block text-sm text-slate-500">{w.en}</span>
              </span>
              {hasSpeech() && (
                <button
                  onClick={() => speak(w.sv)}
                  className="text-xl text-blue"
                  aria-label="Play"
                >
                  🔊
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function PlayerRow({
  name,
  xp,
  reviews,
  streak,
  you,
}: {
  name: string
  xp: number
  reviews: number
  streak: number
  you?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-3 ${
        you ? 'bg-blue/10' : 'bg-slate-50'
      }`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg font-bold text-blue shadow-sm">
        {name.charAt(0).toUpperCase() || '?'}
      </span>
      <span className="flex-1 font-semibold text-ink">
        {name} {you && <span className="text-xs text-blue">(you)</span>}
      </span>
      <span className="text-right text-xs text-slate-500">
        <span className="block font-bold text-ink">{xp} XP</span>
        🔥{streak} · {reviews} today
      </span>
    </div>
  )
}

function PartnerRows({ fallbackName }: { fallbackName: string }) {
  const [partners, setPartners] = useState<PartnerProgress[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    if (isCloudConfigured) {
      fetchPartners().then((p) => {
        if (alive) {
          setPartners(p)
          setLoaded(true)
        }
      })
    } else {
      setLoaded(true)
    }
    return () => {
      alive = false
    }
  }, [])

  if (partners.length > 0) {
    return (
      <>
        {partners.map((p, i) => (
          <PlayerRow
            key={i}
            name={p.displayName}
            xp={p.data?.xp ?? 0}
            reviews={p.data?.reviewsByDate?.[dayKey(Date.now())] ?? 0}
            streak={p.data?.streak ?? 0}
          />
        ))}
      </>
    )
  }

  // no partner data yet
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 p-3 text-center text-sm text-slate-400">
      {loaded && isCloudConfigured
        ? `Waiting for ${fallbackName || 'your partner'} to sync…`
        : fallbackName
          ? `Add cloud sync so ${fallbackName}’s progress shows here.`
          : 'Connect cloud sync to see your partner here.'}
    </div>
  )
}

function CloudCard() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isCloudConfigured) {
    return (
      <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-semibold">☁️ Cloud sync isn’t switched on yet</p>
        <p className="mt-1">
          Everything works offline on this device. Once Supabase keys are added
          (see <code>SETUP.md</code>), you and your partner can share progress here.
        </p>
      </div>
    )
  }

  const signIn = async () => {
    if (!supabase || !email) return
    setBusy(true)
    await supabase.auth.signInWithOtp({ email })
    setSent(true)
    setBusy(false)
  }

  const sync = async () => {
    setBusy(true)
    await pushProgress()
    setBusy(false)
  }

  if (userEmail) {
    return (
      <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">☁️ Signed in as {userEmail}</p>
        <button
          onClick={sync}
          disabled={busy}
          className="mt-2 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white active:scale-95 disabled:opacity-50"
        >
          {busy ? 'Syncing…' : 'Sync my progress now'}
        </button>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <p className="font-semibold text-ink">☁️ Sign in to share progress</p>
      {sent ? (
        <p className="mt-2 text-sm text-emerald-700">
          Check your email for a magic sign-in link ✉️
        </p>
      ) : (
        <div className="mt-2 flex gap-2">
          <input
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            onClick={signIn}
            disabled={busy || !email}
            className="rounded-xl bg-blue px-4 py-2 text-sm font-semibold text-white active:scale-95 disabled:opacity-50"
          >
            Send link
          </button>
        </div>
      )}
    </div>
  )
}
