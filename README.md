# 🇸🇪 Svenska Tillsammans

A mobile-friendly web app (installable PWA) for two absolute beginners to learn
Swedish **together** — spaced-repetition flashcards, bite-sized grammar,
pronunciation ear-training, and a shared "Together" mode.

Built local-first (works offline), with optional Supabase cloud sync so partners
can share progress across devices.

## Features

- **🃏 Flashcards** — spaced repetition (SM-2 style) with real example sentences,
  four-button grading, and Swedish audio.
- **📘 Grammar** — short, plain-English lessons (en/ett, verb forms, word order,
  negation) each with a quick quiz.
- **🔊 Speak** — pronunciation drills built on *High-Variability Phonetic
  Training*: minimal-pair listening tasks that rotate between every Swedish voice
  on your device.
- **❤️ Together** — shared daily challenge, a friendly scoreboard, and cloud sync
  to see your partner's streak and XP.
- **🔥 Habit loop** — daily goal ring, streaks with forgiving "freezes", and XP,
  designed around the Fogg Behavior Model (tiny, doable daily sessions).

## Why these features?

The content and mechanics are grounded in a verified research pass — see
[`docs/RESEARCH.md`](docs/RESEARCH.md) for the evidence and sources (CEFR
frequency lists, HVPT, extensive reading, B=MAP, and the *gamification-misuse*
caution that shaped the gentle, non-toxic competition design).

## Tech

Vite · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Supabase ·
vite-plugin-pwa.

## Quick start

```bash
npm install
npm run dev
```

See [`SETUP.md`](SETUP.md) for cloud sync and GitHub Pages deployment.

## Content & licensing

Beginner vocabulary and example sentences are original A1-level material. Planned
imports of [Tatoeba](https://tatoeba.org) example sentences (CC-BY) will be
credited in [`CREDITS.md`](CREDITS.md).
