-- Svenska Tillsammans — Supabase schema
-- Run this once in your Supabase project: SQL Editor → paste → Run.
--
-- Design: each signed-in user owns exactly one row in `progress`, holding a
-- JSON blob of their learning state. Couples are linked by sharing a `couple_id`
-- so Row Level Security lets partners read each other's progress but nobody
-- else's.

create table if not exists public.progress (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  couple_id    uuid,
  display_name text not null default 'Learner',
  data         jsonb not null default '{}'::jsonb,
  updated_at   timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Helper: the couple_id of the currently signed-in user.
create or replace function public.my_couple_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select couple_id from public.progress where user_id = auth.uid()
$$;

-- You can always read/write your own row.
create policy "own row - select"
  on public.progress for select
  using (user_id = auth.uid());

create policy "own row - insert"
  on public.progress for insert
  with check (user_id = auth.uid());

create policy "own row - update"
  on public.progress for update
  using (user_id = auth.uid());

-- You can also read your partner's row (same couple_id, non-null).
create policy "partner row - select"
  on public.progress for select
  using (
    couple_id is not null
    and couple_id = public.my_couple_id()
  );

-- To pair up: after both sign in once, run in SQL editor (replace the UUIDs):
--   update public.progress set couple_id = gen_random_uuid()
--     where user_id = 'USER_A_UUID';
--   update public.progress set couple_id =
--     (select couple_id from public.progress where user_id = 'USER_A_UUID')
--     where user_id = 'USER_B_UUID';
