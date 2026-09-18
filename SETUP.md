# Setup guide — Svenska Tillsammans

This app is **local-first**: it works fully offline on one device with no setup.
Cloud sync (so you and your partner share progress) is optional and takes ~10
minutes to switch on.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed URL on your phone (same Wi-Fi) or computer.

## 2. Turn on cloud sync (Supabase)

1. Create a free project at <https://supabase.com>.
2. In the project, open **SQL Editor**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
3. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public** key.
4. In the app folder, copy `.env.example` to `.env` and paste those two values.
5. In Supabase **Authentication → Providers → Email**, make sure Email (magic
   link) is enabled.
6. Restart `npm run dev`. The **Together** tab now shows a sign-in box.

### Pairing the two of you

After you *and* your partner have each signed in once (so both have a row in the
`progress` table), open the SQL Editor and link your accounts — see the comment
block at the bottom of `supabase/schema.sql`. Once linked, each of you sees the
other's streak and XP on the Together tab.

## 3. Deploy free to GitHub Pages

```bash
npm run build      # outputs to dist/
```

A GitHub Actions workflow is included at `.github/workflows/deploy.yml` — pushing
to `main` builds and publishes automatically. Then in your repo:
**Settings → Pages → Source → GitHub Actions**. Your app will be live at
`https://<your-username>.github.io/svenska-tillsammans/`.

> Note: GitHub Pages is static, so cloud-sync env vars must be provided at build
> time as GitHub Actions **secrets** (`VITE_SUPABASE_URL`,
> `VITE_SUPABASE_ANON_KEY`) — the workflow reads them. Without them the deployed
> app simply runs in offline mode.
