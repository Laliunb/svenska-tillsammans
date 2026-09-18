-- Pair the two of you.
--
-- Run this ONCE, in the Supabase SQL Editor, after BOTH partners have signed in
-- at least once (each sign-in creates one row in public.progress).
--
-- It puts every existing row into a single couple, which is what you want when
-- the project has exactly the two of you in it. After this, each partner can
-- read the other's row and the Together tab shows their real streak and XP
-- instead of "Waiting for your partner to sync…".

-- 1. Sanity check: you should see exactly 2 rows before pairing.
select user_id, display_name, couple_id, updated_at
from public.progress
order by updated_at;

-- 2. Link them under one shared couple_id.
update public.progress
set couple_id = coalesce(
  (select couple_id from public.progress where couple_id is not null limit 1),
  gen_random_uuid()
);

-- 3. Confirm: both rows should now share the same couple_id.
select display_name, couple_id
from public.progress;
