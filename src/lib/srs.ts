// A small spaced-repetition scheduler (a trimmed SM-2). Each card tracks an
// ease factor, the current interval (in days), and when it is next due. Reviews
// grade recall on 4 buttons (Again / Hard / Good / Easy), matching the research
// that spacing + active recall drives durable vocabulary retention.

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export interface SrsState {
  /** number of successful reviews in a row */
  reps: number
  /** ease factor, SM-2 style (>= 1.3) */
  ease: number
  /** current interval in days */
  interval: number
  /** epoch ms when the card is next due */
  due: number
  /** epoch ms of the last review, or 0 if never seen */
  lastReviewed: number
}

const DAY = 24 * 60 * 60 * 1000

export function freshCard(now: number): SrsState {
  return { reps: 0, ease: 2.5, interval: 0, due: now, lastReviewed: 0 }
}

const GRADE_QUALITY: Record<Grade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
}

/**
 * Return the next SRS state after grading a review at time `now`.
 * "again" resets the streak and re-shows the card in ~1 minute (same session);
 * higher grades push the due date out by a growing interval.
 */
export function schedule(prev: SrsState, grade: Grade, now: number): SrsState {
  const q = GRADE_QUALITY[grade]

  if (q < 3) {
    // Lapse: relearn soon, gently reduce ease.
    return {
      reps: 0,
      ease: Math.max(1.3, prev.ease - 0.2),
      interval: 0,
      due: now + 60 * 1000, // ~1 min, stays in this session's queue
      lastReviewed: now,
    }
  }

  const reps = prev.reps + 1
  let interval: number
  if (reps === 1) interval = 1
  else if (reps === 2) interval = 3
  else interval = Math.round(prev.interval * prev.ease)

  if (grade === 'hard') interval = Math.max(1, Math.round(interval * 0.6))
  if (grade === 'easy') interval = Math.round(interval * 1.3)

  const ease = Math.max(
    1.3,
    prev.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  )

  return {
    reps,
    ease,
    interval,
    due: now + interval * DAY,
    lastReviewed: now,
  }
}

export const isDue = (s: SrsState, now: number): boolean => s.due <= now

/** A short, human label for when a card will next appear. */
export function dueLabel(s: SrsState, now: number): string {
  if (s.due <= now) return 'due now'
  const diff = s.due - now
  if (diff < 60 * 1000) return 'in <1 min'
  if (diff < DAY) return `in ${Math.round(diff / (60 * 60 * 1000))} h`
  return `in ${Math.round(diff / DAY)} d`
}
