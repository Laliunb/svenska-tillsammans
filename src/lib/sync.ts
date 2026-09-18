// Cloud sync helpers. These are no-ops until Supabase env vars are set, so the
// app is fully usable offline first. Strategy is deliberately simple: each user
// owns one `progress` row keyed by their auth user id; we push our syncable
// slice up and pull the partner's row down to display shared progress.

import { useEffect } from 'react'
import { supabase } from './supabase'
import { useStore, type SyncableState } from '../store/useStore'

export interface PartnerProgress {
  displayName: string
  updatedAt: string
  data: SyncableState
}

/** Push my local syncable slice to my row. */
export async function pushProgress(): Promise<void> {
  if (!supabase) return
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return

  const store = useStore.getState()
  await supabase.from('progress').upsert({
    user_id: auth.user.id,
    display_name: store.displayName,
    data: store.getSyncable(),
    updated_at: new Date().toISOString(),
  })
}

/** Fetch every partner row I'm allowed to see (via shared couple id / RLS). */
export async function fetchPartners(): Promise<PartnerProgress[]> {
  if (!supabase) return []
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return []

  const { data, error } = await supabase
    .from('progress')
    .select('display_name, updated_at, data')
    .neq('user_id', auth.user.id)

  if (error || !data) return []
  return data.map((r) => ({
    displayName: r.display_name as string,
    updatedAt: r.updated_at as string,
    data: r.data as SyncableState,
  }))
}

/**
 * Keeps the cloud copy current without the user thinking about it: pushes a
 * debounced snapshot whenever learning state changes, plus once on sign-in.
 * Inert when signed out or when Supabase isn't configured.
 */
export function useAutoSync(signedIn: boolean): void {
  useEffect(() => {
    if (!supabase || !signedIn) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const queue = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        void pushProgress()
      }, 2500)
    }

    void pushProgress() // initial snapshot on sign-in

    // Only react to state that actually represents progress.
    const unsub = useStore.subscribe((s, prev) => {
      if (s.cards !== prev.cards || s.lessons !== prev.lessons || s.xp !== prev.xp) {
        queue()
      }
    })

    return () => {
      clearTimeout(timer)
      unsub()
    }
  }, [signedIn])
}
