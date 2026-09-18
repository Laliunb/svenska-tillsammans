import { useEffect, useState } from 'react'
import { useStore, dayKey } from '../store/useStore'
import { UNITS, vocabByUnit } from '../data/vocab'
import { isCloudConfigured } from '../lib/supabase'
import { useAuth, signInWithGoogle, signInWithEmail, signOut } from '../lib/auth'
import GoogleButton from '../components/GoogleButton'
import { pushProgress, fetchPartners, type PartnerProgress } from '../lib/sync'
import { speak, hasSpeech } from '../lib/speech'
import Icon from '../components/Icon'

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
      <h1 className="flex items-center gap-2 pt-6 text-2xl font-bold tracking-tight">
        <Icon name="heart" size={22} className="text-rose-500" filled /> Together
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Learn side by side. Cheer each other on — this is a team sport.
      </p>

      <CloudCard />

      {/* scoreboard */}
      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-bold text-ink">Today’s progress</h2>
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
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
            <Icon name={unit.icon} size={21} />
          </span>
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
                  className="text-blue transition active:scale-90"
                  aria-label="Play"
                >
                  <Icon name="speaker" size={19} />
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
        <span className="flex items-center justify-end gap-1">
          <Icon name="flame" size={12} className="text-amber-500" filled />
          {streak} · {reviews} today
        </span>
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
  const { user, loading } = useAuth()
  const displayName = useStore((s) => s.displayName)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [showEmail, setShowEmail] = useState(false)

  if (!isCloudConfigured) {
    return (
      <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <Icon name="cloud" size={19} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="font-semibold">Cloud sync isn’t switched on yet</p>
          <p className="mt-1 text-amber-800">
            Everything works offline on this device. Add your Supabase keys (see{' '}
            <code>SETUP.md</code>) to sign in and share progress.
          </p>
        </div>
      </div>
    )
  }

  const google = async () => {
    setBusy(true)
    setErr(null)
    const { error } = await signInWithGoogle()
    if (error) {
      setErr(error)
      setBusy(false)
    }
    // On success the browser navigates to Google, so no state reset needed.
  }

  const magicLink = async () => {
    if (!email) return
    setBusy(true)
    setErr(null)
    const { error } = await signInWithEmail(email)
    if (error) setErr(error)
    else setSent(true)
    setBusy(false)
  }

  const sync = async () => {
    setBusy(true)
    await pushProgress()
    setBusy(false)
  }

  if (loading) {
    return (
      <div className="mt-4 h-20 animate-pulse rounded-2xl border border-slate-200/70 bg-white" />
    )
  }

  // ── signed in ──
  if (user) {
    return (
      <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-blue/10 font-bold text-blue">
              {(user.name ?? displayName).charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-ink">{user.name ?? displayName}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Icon name="cloud" size={13} /> Synced
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={sync}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue py-2.5 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-50"
          >
            <Icon name="refresh" size={15} />
            {busy ? 'Syncing…' : 'Sync now'}
          </button>
          <button
            onClick={() => signOut()}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 transition active:scale-95"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  // ── signed out ──
  return (
    <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <p className="font-semibold text-ink">Sign in to share progress</p>
      <p className="mt-0.5 mb-3 text-sm text-slate-500">
        So you and your partner see each other’s streaks on any device.
      </p>

      <GoogleButton onClick={google} busy={busy} />

      {!showEmail ? (
        <button
          onClick={() => setShowEmail(true)}
          className="mt-3 w-full text-center text-xs font-semibold text-slate-400"
        >
          or use an email link instead
        </button>
      ) : sent ? (
        <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
          Check your inbox for a sign-in link.
        </p>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            onClick={magicLink}
            disabled={busy || !email}
            className="shrink-0 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      )}

      {err && <p className="mt-3 text-sm text-rose-600">{err}</p>}
    </div>
  )
}
