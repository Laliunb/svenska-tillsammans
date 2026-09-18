export type Tab = 'today' | 'cards' | 'lessons' | 'pronounce' | 'together' | 'profile'

const ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: 'today', label: 'Today', icon: '🏠' },
  { id: 'cards', label: 'Cards', icon: '🃏' },
  { id: 'lessons', label: 'Grammar', icon: '📘' },
  { id: 'pronounce', label: 'Speak', icon: '🔊' },
  { id: 'together', label: 'Together', icon: '❤️' },
]

export default function BottomNav({
  tab,
  onChange,
}: {
  tab: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <nav className="safe-bottom border-t border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {ITEMS.map((it) => {
          const active = tab === it.id || (it.id === 'today' && tab === 'profile')
          return (
            <li key={it.id} className="flex-1">
              <button
                onClick={() => onChange(it.id)}
                className={`flex w-full flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                  active ? 'text-blue' : 'text-slate-400'
                }`}
              >
                <span className={`text-xl transition-transform ${active ? 'scale-110' : ''}`}>
                  {it.icon}
                </span>
                {it.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
