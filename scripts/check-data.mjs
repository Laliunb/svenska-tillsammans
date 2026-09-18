// Validates the learning data. Run: node scripts/check-data.mjs
//
// This exists because three broken minimal pairs shipped to real users: one
// contrasted a word against a grammatical particle ("sju" vs "ju"), one changed
// two sounds at once ("kött" vs "gott" — consonant AND vowel), and one was not a
// minimal pair at all ("på" vs "pappa"). The type checker cannot catch any of
// that, so it gets checked here instead.

import { readFileSync } from 'node:fs'

const audio = JSON.parse(readFileSync('src/data/audio.json', 'utf8'))
const pronSrc = readFileSync('src/data/pronunciation.ts', 'utf8')
const vocabSrc = readFileSync('src/data/vocab.ts', 'utf8')

const headword = (w) => w.trim().toLowerCase().replace(/^(en|ett|att)\s+/, '')

let errors = 0
let warnings = 0
const err = (m) => {
  console.error('  ERROR  ' + m)
  errors++
}
const warn = (m) => {
  console.warn('  warn   ' + m)
  warnings++
}

// ── minimal pairs ────────────────────────────────────────────────────
const pairBlocks = pronSrc
  .slice(pronSrc.indexOf('MINIMAL_PAIRS'))
  .split(/\n  \{\n/)
  .slice(1)

const pairs = []
for (const block of pairBlocks) {
  const id = block.match(/id: '([^']+)'/)?.[1]
  const focus = block.match(/focus: '([^']*)'/)?.[1]
  const a = block.match(/a: \{ sv: '([^']+)'/)?.[1]
  const b = block.match(/b: \{ sv: '([^']+)'/)?.[1]
  if (id && a && b) pairs.push({ id, focus, a, b })
}

console.log(`minimal pairs: ${pairs.length}`)
if (pairs.length === 0) err('parsed zero pairs — the checker itself is broken')

const ids = new Set()
for (const p of pairs) {
  if (ids.has(p.id)) err(`${p.id}: duplicate id`)
  ids.add(p.id)

  if (p.a === p.b) err(`${p.id}: both words are identical ("${p.a}") — nothing to discriminate`)

  // A true minimal pair differs in one spot. A large length gap almost always
  // means the two words are simply unrelated.
  if (Math.abs(p.a.length - p.b.length) > 2)
    err(`${p.id}: "${p.a}" vs "${p.b}" differ too much in length to be a minimal pair`)

  // Very short function words make poor answer options for a beginner.
  for (const w of [p.a, p.b]) {
    if (w.length < 2) err(`${p.id}: "${w}" is too short to be a useful answer option`)
    if (!audio[headword(w)])
      warn(`${p.id}: no recording for "${w}" — pair is hidden unless a Swedish voice exists`)
  }
}

const playable = pairs.filter((p) => audio[headword(p.a)] && audio[headword(p.b)])
console.log(`  ${playable.length}/${pairs.length} pairs have recordings for BOTH words`)
if (playable.length < 5)
  err(`only ${playable.length} pairs are fully playable — the drill needs a reasonable set`)

// ── vocabulary ───────────────────────────────────────────────────────
const cards = [...vocabSrc.matchAll(/\{ id: '([^']+)', sv: '([^']+)'/g)].map((m) => ({
  id: m[1],
  sv: m[2],
}))
const seen = new Set()
for (const c of cards) {
  if (seen.has(c.id)) err(`vocab: duplicate card id "${c.id}"`)
  seen.add(c.id)
}
const withAudio = cards.filter((c) => audio[headword(c.sv)]).length
console.log(`vocab cards: ${cards.length}`)
console.log(`  ${withAudio}/${cards.length} have a native recording`)

// ── practice words ───────────────────────────────────────────────────
const drillSection = pronSrc.slice(pronSrc.indexOf('PRONOUNCE_WORDS'))
const drill = [...drillSection.matchAll(/\{ sv: '([^']+)'/g)].map((m) => m[1])
for (const w of drill) if (!audio[headword(w)]) warn(`practice word "${w}" has no recording`)

console.log(`\n${errors} error(s), ${warnings} warning(s)`)
process.exit(errors > 0 ? 1 : 0)
