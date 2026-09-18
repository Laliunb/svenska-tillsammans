// Global app state, persisted to localStorage (local-first). A subset of this
// state — the `syncable` slice — is what we push to / pull from Supabase so two
// devices (you and your fiancé) can share progress.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { freshCard, schedule, isDue, type Grade, type SrsState } from '../lib/srs'
import { VOCAB } from '../data/vocab'

const DAY = 24 * 60 * 60 * 1000

/** Local calendar day key, e.g. "2026-09-18". */
export function dayKey(ts: number): string {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const XP_PER_GRADE: Record<Grade, number> = { again: 2, hard: 8, good: 10, easy: 12 }

interface LessonProgress {
  completed: boolean
  best: number // best quiz score 0..100
}

export interface SyncableState {
  cards: Record<string, SrsState>
  lessons: Record<string, LessonProgress>
  streak: number
  lastActiveDate: string
  freezes: number
  xp: number
  reviewsByDate: Record<string, number>
}

interface AppState extends SyncableState {
  // identity / couple
  displayName: string
  partnerName: string
  // settings
  dailyGoal: number
  newPerDay: number
  direction: 'sv-en' | 'en-sv'
  // per-day new-card budget bookkeeping
  newToday: number
  newTodayDate: string

  // ── actions ──
  setDisplayName: (n: string) => void
  setPartnerName: (n: string) => void
  setDailyGoal: (n: number) => void
  setDirection: (d: 'sv-en' | 'en-sv') => void
  gradeCard: (id: string, grade: Grade, now?: number) => void
  completeLesson: (id: string, score: number) => void
  reviewsToday: (now?: number) => number
  effectiveStreak: (now?: number) => number
  dueCardIds: (now?: number) => string[]
  buildSession: (now?: number) => string[]
  masteredCount: () => number
  seenCount: () => number
  applyRemote: (data: SyncableState) => void
  getSyncable: () => SyncableState
  resetAll: () => void
}

function rollNewDay(state: AppState, now: number): Partial<AppState> {
  const today = dayKey(now)
  if (state.newTodayDate !== today) {
    return { newTodayDate: today, newToday: 0 }
  }
  return {}
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cards: {},
      lessons: {},
      streak: 0,
      lastActiveDate: '',
      freezes: 2,
      xp: 0,
      reviewsByDate: {},

      displayName: 'Me',
      partnerName: '',
      dailyGoal: 20,
      newPerDay: 6,
      direction: 'sv-en',
      newToday: 0,
      newTodayDate: '',

      setDisplayName: (n) => set({ displayName: n.trim() || 'Me' }),
      setPartnerName: (n) => set({ partnerName: n.trim() }),
      setDailyGoal: (n) => set({ dailyGoal: Math.max(5, Math.min(100, n)) }),
      setDirection: (d) => set({ direction: d }),

      gradeCard: (id, grade, now = Date.now()) => {
        const state = get()
        const prev = state.cards[id] ?? freshCard(now)
        const wasNew = prev.lastReviewed === 0
        const next = schedule(prev, grade, now)

        const today = dayKey(now)
        const reviewsByDate = { ...state.reviewsByDate }
        reviewsByDate[today] = (reviewsByDate[today] ?? 0) + 1

        // streak bookkeeping — only advance on the first review of a new day
        let { streak, lastActiveDate, freezes } = state
        if (lastActiveDate !== today) {
          const yesterday = dayKey(now - DAY)
          if (lastActiveDate === yesterday || lastActiveDate === '') {
            streak = lastActiveDate === '' ? 1 : streak + 1
          } else {
            // missed one or more days — a freeze saves the streak once
            if (freezes > 0) {
              freezes -= 1
              streak += 1
            } else {
              streak = 1
            }
          }
          lastActiveDate = today
        }

        const rolled = rollNewDay(state, now)
        set({
          cards: { ...state.cards, [id]: next },
          reviewsByDate,
          streak,
          lastActiveDate,
          freezes,
          xp: state.xp + XP_PER_GRADE[grade],
          ...rolled,
          newToday:
            (rolled.newToday ?? state.newToday) + (wasNew ? 1 : 0),
        })
      },

      completeLesson: (id, score) => {
        const state = get()
        const prev = state.lessons[id]
        set({
          lessons: {
            ...state.lessons,
            [id]: {
              completed: true,
              best: Math.max(prev?.best ?? 0, score),
            },
          },
          xp: state.xp + (prev?.completed ? 5 : 20),
        })
      },

      reviewsToday: (now = Date.now()) => get().reviewsByDate[dayKey(now)] ?? 0,

      effectiveStreak: (now = Date.now()) => {
        const { streak, lastActiveDate } = get()
        const today = dayKey(now)
        const yesterday = dayKey(now - DAY)
        if (lastActiveDate === today || lastActiveDate === yesterday) return streak
        return 0
      },

      dueCardIds: (now = Date.now()) => {
        const { cards } = get()
        return VOCAB.filter((c) => {
          const s = cards[c.id]
          return s && s.lastReviewed !== 0 && isDue(s, now)
        }).map((c) => c.id)
      },

      // A session = due review cards first, then a capped number of brand-new
      // cards (respecting today's remaining new-card budget).
      buildSession: (now = Date.now()) => {
        const state = get()
        const rolled = rollNewDay(state, now)
        const usedNew = rolled.newToday ?? state.newToday

        const due = state.dueCardIds(now)
        const remainingNew = Math.max(0, state.newPerDay - usedNew)
        const fresh = VOCAB.filter((c) => !state.cards[c.id] || state.cards[c.id].lastReviewed === 0)
          .slice(0, remainingNew)
          .map((c) => c.id)

        // interleave a little: due first (recall practice), then new
        return [...due, ...fresh]
      },

      masteredCount: () => {
        const { cards } = get()
        return Object.values(cards).filter((s) => s.interval >= 7).length
      },
      seenCount: () => {
        const { cards } = get()
        return Object.values(cards).filter((s) => s.lastReviewed !== 0).length
      },

      applyRemote: (data) =>
        set({
          cards: data.cards ?? {},
          lessons: data.lessons ?? {},
          streak: data.streak ?? 0,
          lastActiveDate: data.lastActiveDate ?? '',
          freezes: data.freezes ?? 0,
          xp: data.xp ?? 0,
          reviewsByDate: data.reviewsByDate ?? {},
        }),

      getSyncable: () => {
        const s = get()
        return {
          cards: s.cards,
          lessons: s.lessons,
          streak: s.streak,
          lastActiveDate: s.lastActiveDate,
          freezes: s.freezes,
          xp: s.xp,
          reviewsByDate: s.reviewsByDate,
        }
      },

      resetAll: () =>
        set({
          cards: {},
          lessons: {},
          streak: 0,
          lastActiveDate: '',
          freezes: 2,
          xp: 0,
          reviewsByDate: {},
          newToday: 0,
          newTodayDate: '',
        }),
    }),
    {
      name: 'svenska-tillsammans-v1',
      version: 1,
    },
  ),
)
