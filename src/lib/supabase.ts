// Supabase client. Credentials come from Vite env vars so they are never
// hard-coded. If they are missing (e.g. before you finish the Supabase setup),
// `supabase` is null and the whole app still runs fully offline/local-first —
// cloud sync simply switches on once the env vars are present.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isCloudConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isCloudConfigured
  ? createClient(url!, anonKey!)
  : null

// Shape of a row in the `progress` table (see supabase/schema.sql).
export interface ProgressRow {
  user_id: string
  display_name: string
  updated_at: string
  // JSON blob of the local store's syncable slice.
  data: unknown
}
