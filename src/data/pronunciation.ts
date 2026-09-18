// Pronunciation practice built around minimal pairs.
//
// RULES for anything added here, learned the hard way:
//
//  1. A pair must be a TRUE minimal pair — the two words differ in exactly ONE
//     sound. If two things change at once (e.g. "kött" vs "gott", where both the
//     consonant and the vowel differ) the learner cannot tell which difference
//     they are supposed to be hearing, and the drill teaches nothing.
//  2. Both words must be real, useful words. A grammatical particle like "ju"
//     is not something a beginner can picture, so it makes a poor answer option.
//  3. The `tip` must describe exactly the one sound that differs — no more.
//  4. Both words should have a native-speaker recording (see audio.json), or the
//     Speak screen will filter the pair out rather than mix recorded and
//     synthetic audio, which would be answerable from audio quality alone.
//
// Swedish's real difficulties for an English speaker are: the rounded vowels
// (y, u, ö, å), vowel LENGTH (a double consonant shortens the vowel before it),
// and the two back fricatives (the "sj" sound vs the "tj" sound).

export interface MinimalPair {
  id: string
  focus: string
  tip: string
  a: { sv: string; en: string }
  b: { sv: string; en: string }
}

export const MINIMAL_PAIRS: MinimalPair[] = [
  // ── rounded front vowels ──────────────────────────────────────────
  {
    id: 'y-vs-i-1',
    focus: 'The Swedish "y"',
    tip: 'Say "ee" — then push your lips into a tight circle without moving your tongue. That is "y". Only that vowel differs here.',
    a: { sv: 'ny', en: 'new' },
    b: { sv: 'ni', en: 'you (plural)' },
  },
  {
    id: 'y-vs-i-2',
    focus: '"y" vs "i" again',
    tip: 'Same contrast inside a word: rounded "y" against plain "i".',
    a: { sv: 'syn', en: 'sight' },
    b: { sv: 'sin', en: 'his / her own' },
  },
  {
    id: 'o-umlaut-vs-o',
    focus: 'The letter "ö"',
    tip: '"ö" is the vowel in English "fur", with rounded lips. Swedish "o" here is closer to "oo" in "boot".',
    a: { sv: 'kör', en: 'drives / choir' },
    b: { sv: 'kor', en: 'cows' },
  },
  {
    id: 'o-umlaut-vs-o-2',
    focus: '"ö" vs "o" again',
    tip: 'Listen for the lip rounding and the tongue position — everything else is identical.',
    a: { sv: 'söt', en: 'sweet' },
    b: { sv: 'sot', en: 'soot' },
  },
  {
    id: 'o-umlaut-vs-a-ring',
    focus: '"ö" vs "å"',
    tip: 'Both are rounded, which is why they blur together. "ö" is a front vowel; "å" is the "o" in English "more".',
    a: { sv: 'hör', en: 'hears' },
    b: { sv: 'hår', en: 'hair' },
  },

  // ── å and ä against plain a ───────────────────────────────────────
  {
    id: 'a-ring-vs-a',
    focus: 'The letter "å"',
    tip: '"å" sounds like the "o" in English "more" — nothing like a plain "a", which is opener and unrounded.',
    a: { sv: 'får', en: 'sheep' },
    b: { sv: 'far', en: 'father' },
  },
  {
    id: 'a-ring-vs-a-2',
    focus: '"å" vs "a" again',
    tip: 'Same single-vowel contrast in a different word.',
    a: { sv: 'mål', en: 'goal' },
    b: { sv: 'mal', en: 'moth' },
  },
  {
    id: 'a-umlaut-vs-a',
    focus: 'The letter "ä"',
    tip: '"ä" is the "e" in English "bed", a little more open. Plain "a" is further back.',
    a: { sv: 'vän', en: 'friend' },
    b: { sv: 'van', en: 'used to it' },
  },
  {
    id: 'a-umlaut-vs-a-2',
    focus: '"ä" vs "a" again',
    tip: 'Only the vowel changes — the consonants around it are the same.',
    a: { sv: 'häl', en: 'heel' },
    b: { sv: 'hal', en: 'slippery' },
  },
  {
    id: 'a-vs-u',
    focus: 'The Swedish "u"',
    tip: 'Swedish "u" has no English match — rounded and far forward, somewhere between "ee" and "oo".',
    a: { sv: 'hund', en: 'dog' },
    b: { sv: 'hand', en: 'hand' },
  },

  // ── vowel length (a double consonant shortens the vowel) ──────────
  {
    id: 'length-a-glas',
    focus: 'Long vs short "a"',
    tip: 'A double consonant shortens the vowel before it. Worth getting right — "glas" is a drinking glass, "glass" is ice cream.',
    a: { sv: 'glas', en: 'glass (long a)' },
    b: { sv: 'glass', en: 'ice cream (short a)' },
  },
  {
    id: 'length-a-tak',
    focus: 'Long vs short "a"',
    tip: 'One "k" keeps the vowel long; "ck" cuts it short.',
    a: { sv: 'tak', en: 'roof (long a)' },
    b: { sv: 'tack', en: 'thanks (short a)' },
  },
  {
    id: 'length-a-mat',
    focus: 'Long vs short "a"',
    tip: 'Same rule again — the double "t" shortens the vowel.',
    a: { sv: 'mat', en: 'food (long a)' },
    b: { sv: 'matt', en: 'faint / matt (short a)' },
  },
  {
    id: 'length-u',
    focus: 'Long vs short "u"',
    tip: 'Vowel length changes the word entirely: one "l" is long, double "l" is short.',
    a: { sv: 'ful', en: 'ugly (long u)' },
    b: { sv: 'full', en: 'full (short u)' },
  },

  // ── the two back fricatives ───────────────────────────────────────
  {
    id: 'sj-vs-tj',
    focus: 'The "sj" sound vs the "tj" sound',
    tip: 'Swedish’s hardest pair. "sk" before ä/e/i/y/ö is the breathy "sj" sound made far back; "k" before those letters is the lighter "tj" sound, close to English "ch" in "cheese".',
    a: { sv: 'skär', en: 'cuts / pink' },
    b: { sv: 'kär', en: 'in love' },
  },
]

/**
 * Single words worth drilling by imitation rather than discrimination — these
 * carry the sounds English speakers find hardest.
 */
export const PRONOUNCE_WORDS: { sv: string; en: string }[] = [
  { sv: 'sju', en: 'seven — the "sj" sound' },
  { sv: 'sjuksköterska', en: 'nurse — three tricky sounds in one word' },
  { sv: 'tjugo', en: 'twenty — the "tj" sound' },
  { sv: 'kött', en: 'meat — soft k before ö' },
  { sv: 'hej', en: 'hi' },
  { sv: 'tack', en: 'thanks' },
  { sv: 'kärlek', en: 'love' },
  { sv: 'tillsammans', en: 'together' },
]
