// Authentication helpers built on Supabase Auth. Google OAuth is the primary
// path (one tap, no password, no inbox round-trip); magic-link email is kept as
// a fallback for anyone who would rather not use a Google account.
//
// All of this is inert until Supabase env vars exist — see lib/supabase.ts.

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

/** Where Supabase should send the user back to after the OAuth round-trip. */
export function redirectUrl(): string {
  // BASE_URL is '/svenska-tillsammans/' in production, '/' in dev.
  return `${window.location.origin}${import.meta.env.BASE_URL}`
}

export async function signInWithGoogle(): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Cloud sync is not configured yet.' }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl(),
      queryParams: { prompt: 'select_account' },
    },
  })
  return { error: error?.message ?? null }
}

export async function signInWithEmail(email: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Cloud sync is not configured yet.' }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl() },
  })
  return { error: error?.message ?? null }
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut()
}

export interface AuthUser {
  id: string
  email: string | null
  name: string | null
  avatarUrl: string | null
}

function toUser(session: Session | null): AuthUser | null {
  if (!session?.user) return null
  const m = session.user.user_metadata ?? {}
  return {
    id: session.user.id,
    email: session.user.email ?? null,
    name: (m.full_name as string) ?? (m.name as string) ?? null,
    avatarUrl: (m.avatar_url as string) ?? (m.picture as string) ?? null,
  }
}

/** Subscribes to the current auth session. `loading` is true until first resolve. */
export function useAuth(): { user: AuthUser | null; loading: boolean } {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return
    let alive = true

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      setUser(toUser(data.session))
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session))
      setLoading(false)
    })

    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
