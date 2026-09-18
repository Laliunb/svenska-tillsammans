// A small hand-built icon set. Stroke-based, 24x24, inheriting currentColor so
// icons pick up text colour and sit consistently with the type. Using real
// icons rather than emoji keeps the UI looking designed rather than decorated,
// and renders identically across platforms (emoji do not).

export type IconName =
  | 'home'
  | 'cards'
  | 'book'
  | 'speaker'
  | 'heart'
  | 'settings'
  | 'flame'
  | 'star'
  | 'check'
  | 'close'
  | 'chevronRight'
  | 'arrowLeft'
  | 'arrowRight'
  | 'play'
  | 'refresh'
  | 'ear'
  | 'mic'
  | 'users'
  | 'cloud'
  | 'trophy'
  | 'target'
  | 'sun'
  | 'moon'
  | 'coffee'
  | 'utensils'
  | 'clock'
  | 'house'
  | 'scale'
  | 'sparkle'
  | 'ban'
  | 'medal'
  | 'muted'

const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" />,
  cards: (
    <>
      <rect x="3" y="7" width="13" height="14" rx="2.5" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h8A2.5 2.5 0 0 1 21 5.5v10a2.5 2.5 0 0 1-2.5 2.5H17" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.2A1.8 1.8 0 0 1 6.8 2.5H19.5v15.8H6.8A1.8 1.8 0 0 0 5 20.1z" />
      <path d="M5 20.1a1.8 1.8 0 0 0 1.8 1.7H19.5v-3.5" />
      <path d="M8.8 2.5v15.8" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
      <path d="M16 9a4 4 0 0 1 0 6" />
      <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  muted: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
      <path d="m16.5 9.5 5 5m0-5-5 5" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.8a4.1 4.1 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />,
  settings: (
    <>
      <path d="M3.5 7h8M16.5 7h4M3.5 17h4M12.5 17h8M3.5 12h11M19.5 12h1" />
      <circle cx="14" cy="7" r="2.2" />
      <circle cx="10" cy="17" r="2.2" />
      <circle cx="17" cy="12" r="2.2" />
    </>
  ),
  flame: (
    <path d="M13 2.3c2.6 4.6 5.5 6.6 5.5 10.9a6.5 6.5 0 0 1-13 0c0-2.1.8-3.8 2.1-5.2.3 1.3 1.1 2.1 2.2 2.4C9.2 7.3 10.8 4.6 13 2.3z" />
  ),
  star: <path d="m12 3.6 2.6 5.5 5.9.8-4.3 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.5 9.9l5.9-.8z" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  chevronRight: <path d="m9.5 5.5 7 6.5-7 6.5" />,
  arrowLeft: <path d="M19 12H5.5m0 0 6-6m-6 6 6 6" />,
  arrowRight: <path d="M5 12h13.5m0 0-6-6m6 6-6 6" />,
  play: <path d="M7.5 5.2 18 12 7.5 18.8z" />,
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.5 4v4.5H16" />
    </>
  ),
  ear: (
    <>
      <path d="M7 9a5 5 0 0 1 10 0c0 3-2.5 3.8-2.5 6.2A2.8 2.8 0 0 1 11.7 18" />
      <path d="M10 9.2a2.2 2.2 0 0 1 4.3-.5" />
      <path d="M7 14.5V19a2 2 0 0 0 2 2" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 5.5a3.2 3.2 0 0 1 0 6M17.5 15.5c2 .6 3.5 2.3 3.5 4.5" />
    </>
  ),
  cloud: <path d="M7 18.5A3.8 3.8 0 0 1 7.3 11 5.2 5.2 0 0 1 17.2 11 3.8 3.8 0 0 1 17 18.5z" />,
  trophy: (
    <>
      <path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z" />
      <path d="M7.5 5.5H5a2.5 2.5 0 0 0 2.5 4M16.5 5.5H19a2.5 2.5 0 0 1-2.5 4" />
      <path d="M12 13.5V17M9 20h6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.5 4.5 6 6M18 18l1.5 1.5M3 12h2M19 12h2M4.5 19.5 6 18M18 6l1.5-1.5" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  coffee: (
    <>
      <path d="M4 8h13v5.5a5 5 0 0 1-10 0z" />
      <path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17M4 20h13" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9" />
      <path d="M17 3c-1.5 1-2.5 2.8-2.5 5s1 3 2.5 3 2.5-1 2.5-3-1-4-2.5-5zM17 11v10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  house: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20H4z" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 8h10" />
      <path d="M4 15a3 3 0 0 0 6 0L7 8.5zM14 15a3 3 0 0 0 6 0L17 8.5z" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 4 1.7 4.8L18.5 10.5 13.7 12.2 12 17l-1.7-4.8L5.5 10.5l4.8-1.7z" />
      <path d="M18.5 4v3M20 5.5h-3" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6.5 6.5 11 11" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14.5" r="5" />
      <path d="M8.5 9.8 6 3h12l-2.5 6.8" />
    </>
  ),
}

export default function Icon({
  name,
  size = 22,
  className = '',
  strokeWidth = 1.7,
  filled = false,
}: {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
  filled?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
