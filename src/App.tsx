import { useEffect, useState } from 'react'
import { useAuth } from './lib/auth'
import { useAutoSync } from './lib/sync'
import { useStore } from './store/useStore'
import BottomNav, { type Tab } from './components/BottomNav'
import Today from './screens/Today'
import Flashcards from './screens/Flashcards'
import Lessons from './screens/Lessons'
import Pronounce from './screens/Pronounce'
import Together from './screens/Together'
import Profile from './screens/Profile'

export default function App() {
  const { user } = useAuth()
  useAutoSync(Boolean(user))

  // Adopt the name from the signed-in account, but only while the user has not
  // chosen one — otherwise both partners show up as the default "Me" on the
  // shared scoreboard. A name they set by hand is never overwritten.
  const displayName = useStore((s) => s.displayName)
  const setDisplayName = useStore((s) => s.setDisplayName)
  useEffect(() => {
    if (user?.name && displayName === 'Me') setDisplayName(user.name)
  }, [user, displayName, setDisplayName])

  const [tab, setTab] = useState<Tab>('today')
  // Flashcards can be launched from Today; we lift that intent here.
  const [reviewOpen, setReviewOpen] = useState(false)

  const startReview = () => {
    setReviewOpen(true)
    setTab('cards')
  }

  return (
    <div className="mx-auto flex h-full max-w-md flex-col bg-slate-100">
      <main className="flex-1 overflow-y-auto">
        {tab === 'today' && <Today onStartReview={startReview} goTab={setTab} />}
        {tab === 'cards' && (
          <Flashcards autoStart={reviewOpen} onExit={() => setReviewOpen(false)} />
        )}
        {tab === 'lessons' && <Lessons />}
        {tab === 'pronounce' && <Pronounce />}
        {tab === 'together' && <Together />}
        {tab === 'profile' && <Profile />}
      </main>
      <BottomNav tab={tab} onChange={setTab} />
    </div>
  )
}
