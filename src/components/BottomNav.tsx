import Icon, { type IconName } from './Icon'

export type Tab = 'today' | 'cards' | 'lessons' | 'pronounce' | 'together' | 'profile'

const ITEMS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'today', label: 'Today', icon: 'home' },
  { id: 'cards', label: 'Cards', icon: 'cards' },
  { id: 'lessons', label: 'Grammar', icon: 'book' },
  { id: 'pronounce', label: 'Speak', icon: 'speaker' },
  { id: 'together', label: 'Together', icon: 'heart' },
]

export default function BottomNav({
  tab,
  onChange,
}: {
  tab: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <nav className="safe-bottom border-t border-slate-200/80 bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {ITEMS.map((it) => {
          const active = tab === it.id || (it.id === 'today' && tab === 'profile')
          return (
            <li key={it.id} className="flex-1">
              <button
                onClick={() => onChange(it.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full flex-col items-center gap-1 py-2.5 text-[11px] tracking-tight transition-colors ${
                  active ? 'font-semibold text-blue' : 'font-medium text-slate-400'
                }`}
              >
                <Icon
                  name={it.icon}
                  size={21}
                  strokeWidth={active ? 2 : 1.6}
                  filled={active && it.icon === 'heart'}
                />
                {it.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
