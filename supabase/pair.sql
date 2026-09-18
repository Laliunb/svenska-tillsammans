-- Pair the two of you.
--
-- Run this ONCE, in the Supabase SQL Editor, after BOTH partners have signed in
-- at least once (each sign-in creates one row in public.progress).
--
-- IMPORTANT: gen_random_uuid() is VOLATILE — Postgres evaluates it once per row,
-- not once per statement. Calling it directly in the UPDATE would hand each
-- partner a different couple_id and pair nobody. So the shared id is resolved to
-- a single value in a CTE first, and that one value is written to every row.

-- 1. Sanity check: you should see exactly 2 rows before pairing.
select user_id, display_name, couple_id, updated_at
from public.progress
order by updated_at;

-- 2. Resolve ONE shared id (reusing an existing one if a partner already has
--    it), then apply that same id to every row.
with target as (
  select coalesce(
    (select p.couple_id
     from public.progress p
     where p.couple_id is not null
     order by p.couple_id
     limit 1),
    gen_random_uuid()
  ) as id
)
update public.progress
set couple_id = (select id from target);

-- 3. Confirm: both rows must now show the SAME couple_id.
select display_name, couple_id
from public.progress;
