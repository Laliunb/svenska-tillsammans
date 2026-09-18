# Setup guide — Svenska Tillsammans

The app is **local-first**: it works fully offline on one device with no setup at
all. Cloud sync — so you and your partner share progress and can sign in with
Google — is optional and takes about 15 minutes to switch on.

## 1. Run it locally

```bash
npm install
npm run dev
```

## 2. Create a Supabase project

1. Sign up at <https://supabase.com> and create a new (free) project.
2. Open **SQL Editor**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
3. Go to **Project Settings → API** and copy:
   - the **Project URL**
   - the **anon public** key
4. Copy `.env.example` to `.env` and paste those two values in.

## 3. Turn on Google sign-in

You need a Google OAuth client, then you hand its details to Supabase.

### a. Get your Supabase callback URL

In Supabase: **Authentication → Providers → Google**. Copy the
**Callback URL (for OAuth)** shown there. It looks like:

```
https://<your-project-ref>.supabase.co/auth/v1/callback
```

### b. Create the Google OAuth client

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create
   a project (or pick an existing one).
2. **APIs & Services → OAuth consent screen**: choose **External**, give the app
   a name and your email, and save. While it is in "Testing", add both your and
   your partner's Google accounts under **Test users** — otherwise sign-in is
   blocked for them.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Web application**
   - **Authorised JavaScript origins**: add
     - `http://localhost:5173` (for local dev)
     - `https://<your-username>.github.io` (for the deployed app)
   - **Authorised redirect URIs**: paste the Supabase callback URL from step (a)
4. Copy the generated **Client ID** and **Client secret**.

### c. Hand them to Supabase

Back in **Authentication → Providers → Google**: enable the provider, paste the
Client ID and Client secret, and save.

### d. Set the redirect allow-list

In Supabase **Authentication → URL Configuration**:

- **Site URL**: `https://<your-username>.github.io/svenska-tillsammans/`
- **Redirect URLs**: add both
  - `https://<your-username>.github.io/svenska-tillsammans/`
  - `http://localhost:5173/`

Restart `npm run dev`. The **Together** tab now shows **Continue with Google**.

## 4. Pair the two of you

After you *and* your partner have each signed in once (so both have a row in
`progress`), link the accounts — see the comment at the bottom of
[`supabase/schema.sql`](supabase/schema.sql). Once linked, each of you sees the
other's streak and XP on the Together tab. Progress auto-syncs a couple of
seconds after each review.

## 5. Deploy to GitHub Pages

Pushing to `main` builds and publishes automatically via
`.github/workflows/deploy.yml`.

Because the site is static, the Supabase values are baked in at build time. Add
them as repository secrets so the deployed app can use them:

**Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | your Project URL |
| `VITE_SUPABASE_ANON_KEY` | your anon public key |

> The anon key is designed to be public — it is safe in a browser bundle. Your
> data is protected by the Row Level Security policies in `schema.sql`, not by
> hiding this key. Never put the **service_role** key in the app.

Without those secrets the deployed app simply runs in offline mode.

## Verifying it works

```bash
npm run build
npx vite preview --port 4174    # in one terminal
npm run smoke                   # renders without errors?
npm run flow                    # every tab + a full review + a quiz
```
