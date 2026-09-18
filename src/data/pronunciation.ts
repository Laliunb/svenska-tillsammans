// Pronunciation practice built around minimal pairs — real Swedish words that
// differ by a single tricky sound. The research on High-Variability Phonetic
// Training (HVPT) found durable perception gains when learners hear *multiple
// voices* and must discriminate contrasts, so the Pronounce screen plays each
// word with whatever Swedish (or fallback) voices the device has, and asks
// "which did you hear?".
//
// Every pair below must be two genuinely different, real words — otherwise the
// listening task is impossible.

export interface MinimalPair {
  id: string
  focus: string
  tip: string
  a: { sv: string; en: string }
  b: { sv: string; en: string }
}

export const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: 'y-vs-i',
    focus: 'The Swedish "y"',
    tip: '"y" is like "ee" but with tightly rounded lips — very different from "i".',
    a: { sv: 'ny', en: 'new' },
    b: { sv: 'ni', en: 'you (plural)' },
  },
  {
    id: 'long-short-a',
    focus: 'Long vs short "a"',
    tip: 'A double consonant shortens the vowel before it. "tak" has a long a; "tack" a short one.',
    a: { sv: 'tak', en: 'roof (long a)' },
    b: { sv: 'tack', en: 'thanks (short a)' },
  },
  {
    id: 'long-short-i',
    focus: 'Long vs short "i"',
    tip: 'Same rule with i: "vit" is long, "vitt" is short.',
    a: { sv: 'vit', en: 'white (long i)' },
    b: { sv: 'vitt', en: 'white, neuter (short i)' },
  },
  {
    id: 'sj-sound',
    focus: 'The "sj" sound',
    tip: 'The "sj" sound has no English equivalent — a soft, breathy "hw/sh" from the back.',
    a: { sv: 'sju', en: 'seven' },
    b: { sv: 'ju', en: 'you know / indeed' },
  },
  {
    id: 'k-soft',
    focus: 'Soft "k" before e/i/y/ä/ö',
    tip: '"k" before e, i, y, ä, ö softens to a "sh"-like sound: kött ≈ "shött".',
    a: { sv: 'kött', en: 'meat (soft k)' },
    b: { sv: 'gott', en: 'tasty (hard g)' },
  },
  {
    id: 'o-length',
    focus: 'Long vs short "o"',
    tip: 'Swedish "o" is often like English "oo" in "boot". The double c shortens it.',
    a: { sv: 'bok', en: 'book (long o)' },
    b: { sv: 'bock', en: 'buck / trestle (short o)' },
  },
  {
    id: 'a-ring',
    focus: 'The letter "å"',
    tip: '"å" sounds like the "o" in English "more" — not like a plain "a".',
    a: { sv: 'på', en: 'on' },
    b: { sv: 'pappa', en: 'dad (plain a)' },
  },
  {
    id: 'a-umlaut',
    focus: 'The letter "ä"',
    tip: '"ä" is like the "e" in "bed", a bit more open than a plain "a".',
    a: { sv: 'häl', en: 'heel (ä)' },
    b: { sv: 'hal', en: 'slippery (a)' },
  },
  {
    id: 'o-umlaut',
    focus: 'The letter "ö"',
    tip: '"ö" is like the "u" in English "fur" — rounded lips.',
    a: { sv: 'öl', en: 'beer' },
    b: { sv: 'ål', en: 'eel' },
  },
]

/** Single words worth drilling for clear pronunciation. */
export const PRONOUNCE_WORDS: { sv: string; en: string }[] = [
  { sv: 'sju', en: 'seven' },
  { sv: 'sjuksköterska', en: 'nurse' },
  { sv: 'tjugo', en: 'twenty' },
  { sv: 'kött', en: 'meat' },
  { sv: 'hej', en: 'hi' },
  { sv: 'tack', en: 'thanks' },
  { sv: 'kärlek', en: 'love' },
  { sv: 'tillsammans', en: 'together' },
]
