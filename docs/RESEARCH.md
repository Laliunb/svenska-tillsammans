# How to learn Swedish — the evidence behind this app

This app's design is grounded in a multi-source research pass in which each claim
was adversarially verified (3 independent checks per claim; a claim needed 2 of 3
refutations to be killed). **25 claims were checked: 16 confirmed, 9 refuted.**
Refuted claims are listed at the bottom so we don't quietly build on them.

---

## Confirmed findings & what we built because of them

### 1. Use CEFR-graded frequency lists as the vocabulary backbone

Swedish has free, corpus-derived, CEFR-tagged lexical resources:

- **SVALex** — 15,681 words/expressions across A1–C1, derived from the COCTAILL
  coursebook corpus.
- **Swedish Kelly list** — 8,425 lemmas covering ~80% of the 114-million-word
  SweWAC web corpus, each tagged with CEFR level, part of speech, and frequency.

SVALex also distinguishes **core** vocabulary (shared across multiple coursebooks
at a level) from **peripheral** (appearing in only one) — an objective way to
decide what to teach first.

> **In the app:** the A1 deck is ordered by frequency and grouped into themed
> units, teaching high-value core words first rather than arbitrary textbook
> order. Nouns carry their `en`/`ett` gender because that must be learned with
> the word.

Sources: [SVALex (LREC paper)](https://spraakbanken.gu.se/sites/default/files/d7/SVALex_LREC_cameraReady.pdf) ·
[Kelly list](https://spraakbanken.gu.se/en/resources/kelly)

### 2. Always pair vocabulary with a real example sentence

**Tatoeba** offers free, downloadable, Creative Commons–licensed (CC BY 2.0 FR,
with a CC0 subset) Swedish sentence and translation datasets — legally reusable
as contextual examples.

> **In the app:** every flashcard shows an example sentence in Swedish *and*
> English on reveal, so words are learned in context (comprehensible input)
> rather than in isolation.

Source: [Tatoeba downloads](https://tatoeba.org/en/downloads)

### 3. Train pronunciation with *multiple voices* (HVPT)

**High-Variability Phonetic Training** — perception practice using many talkers
and phonetic contexts instead of one canned recording — has a meta-analytically
confirmed medium effect on L2 pronunciation/perception (Hedge's *g* ≈ 0.77, 95%
CI 0.41–1.13, 18 studies / 22 effect sizes), with roughly **12–14% improvement in
perception accuracy** for both trained *and* novel words, retained **up to six
months**.

*Caveat:* heterogeneity across studies is very high (I² = 92.68%), and one prior
meta-analysis found a near-zero effect after bias correction. The effect is
directionally reliable but not precisely fixed.

> **In the app:** the Speak tab runs minimal-pair "which did you hear?" drills
> and deliberately **rotates through every Swedish voice** installed on your
> device, rather than replaying one voice.

Sources: [HVPT meta-analysis (SSLA, Cambridge)](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/high-variability-phonetic-training-hvpt-a-metaanalysis-of-l2-perceptual-training-studies/6ABB8C1F32D88D53EA8D05A4565E76F6) ·
[second meta-analysis (ERIC)](https://files.eric.ed.gov/fulltext/EJ1425175.pdf)

### 4. Add reading — but as a supplement, not a replacement

Extensive reading produces a **small but statistically significant** positive
effect on L2 outcomes (Cohen's *d* = 0.41, from an 86-comparison 2025
meta-analysis), consistent with earlier work.

> **In the app:** example sentences and themed units provide light reading input
> now; a graded-reading track is the natural next feature. Because the effect is
> modest, reading supplements the drills rather than replacing them.

Source: [Extensive reading meta-analysis (2025)](https://link.springer.com/article/10.1007/s10648-025-10068-6)

### 5. Design the habit with B = MAP

The **Fogg Behavior Model** holds that behavior happens only when **M**otivation,
**A**bility, and a **P**rompt converge at the same moment — and when a behavior
fails, you diagnose which of the three is missing rather than just piling on
rewards.

> **In the app:** sessions are deliberately tiny (default goal 20 reviews, ~2
> minutes) to maximise *ability*; the daily-goal ring and streak supply
> *motivation*; and the installable PWA on the home screen acts as the *prompt*.
> The daily goal is adjustable down to 5 for low-energy days.

Source: [Fogg Behavior Model](https://www.behaviormodel.org/)

### 6. Gamify carefully — it can backfire

Competition is **not** purely harmful: in a 565,732-student PISA analysis, peer
competition was positively associated with mastery-approach goals
(self-improvement). But a qualitative study of a major language-learning app
documented **"gamification misuse"** — users becoming fixated on streaks, points
and leaderboards to the point of being *distracted from actually learning*,
driven by competitive impulses, over-focus on playful elements, and herd
behaviour, with negative consequences for learning, well-being and ethics.

*Caveat:* that is a single qualitative case study of one app (Duolingo) and
shouldn't be over-generalised.

> **In the app:** streaks exist but come with **forgiving "freezes"** so one
> missed day doesn't destroy motivation; the Together tab explicitly frames the
> goal as *"beat your own best, not each other"*; there are no speed bonuses that
> would reward rushing over comprehension.

Sources: [PISA competition/mastery-goals analysis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12590937/) ·
["When Gamification Spoils Your Learning" (arXiv)](https://arxiv.org/pdf/2203.16175)

---

## ⚠️ What we could *not* verify — couples learning together

**Every claim specific to paired/couple language learning was refuted on
verification**, including:

- that cooperative *and* competitive pairs both learn faster than solo learners,
  with no difference between cooperation and competition;
- that competitive pairs show an early temporary advantage;
- that peer cooperation is positively associated with mastery goals at both
  individual and school level.

Additionally refuted: specific per-CEFR-level vocabulary counts for Swedish, the
specific spaced-repetition RCT results we found, and the claim that accountability
mechanisms substantially boost extensive-reading gains.

> **What this means for the Together mode:** it is built on *general* motivation
> principles — shared accountability, mastery framing, moderate rather than
> aggressive competition — and is honestly labelled as **best practice, not
> proven science**. If it doesn't suit you two, ignore the scoreboard and just
> use the shared daily challenge.

## Open questions worth revisiting

1. Is there methodologically sound research on study-partner dyads specifically?
2. What are verified optimal spaced-repetition intervals for L2 vocabulary?
3. Which free Swedish grammar references are evaluated as accurate per CEFR level?
4. What is the *correct* vocabulary load per CEFR level for Swedish?
