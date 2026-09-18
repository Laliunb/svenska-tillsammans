// Builds src/data/audio.json: a map of Swedish word -> a real native-speaker
// recording hosted on Wikimedia Commons.
//
// Device text-to-speech reads Swedish with an English voice when no Swedish
// voice is installed, which teaches the wrong pronunciation outright, so we
// prefer real recordings and keep TTS only as a fallback.
//
// Two sources, tried in order:
//   1. Shtooka  — File:Sv-<word>.ogg           (a large, consistent set)
//   2. Lingua Libre — File:LL-Q9027 (swe)-<speaker>-<word>.wav
//
// Each candidate's description is checked to confirm it really is a recording of
// the word we asked for, rather than trusting the filename.
//
// Commons asks for a descriptive User-Agent and sane request rates, so titles
// are batched and paused between calls.
//
// Run: node scripts/fetch-audio.mjs

import { writeFileSync, readFileSync } from 'node:fs'

const UA =
  'SvenskaTillsammans/1.0 (https://github.com/Laliunb/svenska-tillsammans) audio-manifest-builder'
const API = 'https://commons.wikimedia.org/w/api.php'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const strip = (v) => (v?.value ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

/** Every Swedish string we might want to pronounce, reduced to its headword. */
function words() {
  const set = new Set()
  for (const file of ['src/data/vocab.ts', 'src/data/pronunciation.ts']) {
    const src = readFileSync(file, 'utf8')
    for (const m of src.matchAll(/\bsv: '([^']+)'/g)) {
      const w = m[1].trim().replace(/^(en|ett|att)\s+/, '')
      if (/^[a-zà-öø-ÿåäö]+$/i.test(w)) set.add(w.toLowerCase())
    }
  }
  return [...set].sort()
}

function entryFrom(ii, word, source) {
  // The API decorates URLs with utm_* params; strip them before deriving paths.
  const clean = ii.url.split('?')[0]
  const file = clean.split('/').pop()
  const meta = ii.extmetadata ?? {}
  return {
    // The ORIGINAL file. Preferred at playback: Wikimedia's MP3 renditions are
    // re-encodes, and MP3 encoder delay can add an audible artifact to the start
    // of very short clips.
    src: clean,
    // MP3 transcode, for Safari/iOS which cannot decode Ogg Vorbis. Only Ogg
    // gets transcoded; WAV is played directly.
    mp3: clean.endsWith('.ogg')
      ? clean.replace('/commons/', '/commons/transcoded/') + `/${file}.mp3`
      : null,
    license: strip(meta.LicenseShortName) || 'see Commons',
    artist: strip(meta.Artist).slice(0, 80),
    source,
    word,
  }
}

/** Batch-look-up Shtooka files: File:Sv-<word>.ogg */
async function shtooka(batch) {
  const titles = batch.map((w) => `File:Sv-${w}.ogg`).join('|')
  const url = `${API}?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(titles)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const out = {}
  for (const p of Object.values(json.query?.pages ?? {})) {
    if (p.missing !== undefined || !p.imageinfo) continue
    const word = p.title.replace(/^File:Sv-/, '').replace(/\.ogg$/, '').toLowerCase()
    const ii = p.imageinfo[0]
    const desc = strip(ii.extmetadata?.ImageDescription).toLowerCase()
    // When a description exists it should name the word; if it names a DIFFERENT
    // quoted word, the file is mislabelled for our purposes and is skipped.
    const quoted = desc.match(/"([^"]+)"/)?.[1]
    if (quoted && quoted.toLowerCase() !== word) {
      console.warn(`  skip ${p.title}: description says "${quoted}"`)
      continue
    }
    // A title can be a REDIRECT to a differently-named file — Commons resolves
    // "Sv-nyckel.ogg" to "Sv-nycklar.oga", the PLURAL, which would teach the
    // wrong word. Trust the resolved filename, not the requested title.
    const actual = decodeURIComponent(ii.url.split('?')[0].split('/').pop() ?? '').toLowerCase()
    if (!actual.includes(word)) {
      console.warn(`  skip Sv-${word}: resolves to "${actual}"`)
      continue
    }
    out[word] = entryFrom(ii, word, 'Shtooka')
  }
  return out
}

/** Fall back to Lingua Libre for a single word. */
async function linguaLibre(word) {
  const q = `intitle:"LL-Q9027" intitle:"${word}"`
  const searchUrl = `${API}?action=query&format=json&list=search&srnamespace=6&srlimit=5&srsearch=${encodeURIComponent(q)}`
  const res = await fetch(searchUrl, { headers: { 'User-Agent': UA } })
  if (!res.ok) return null
  const json = await res.json()
  // The title must end in exactly "-<word>.wav", so "hal" never matches "halv".
  const hit = (json.query?.search ?? []).find((s) =>
    new RegExp(`-${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.wav$`, 'i').test(s.title),
  )
  if (!hit) return null

  const infoUrl = `${API}?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(hit.title)}`
  const res2 = await fetch(infoUrl, { headers: { 'User-Agent': UA } })
  if (!res2.ok) return null
  const json2 = await res2.json()
  const page = Object.values(json2.query?.pages ?? {})[0]
  if (!page?.imageinfo) return null
  return entryFrom(page.imageinfo[0], word, 'Lingua Libre')
}

const all = words()
console.log(`looking up ${all.length} words on Commons…`)

const manifest = {}
for (let i = 0; i < all.length; i += 50) {
  const batch = all.slice(i, i + 50)
  try {
    Object.assign(manifest, await shtooka(batch))
  } catch (e) {
    console.error(`  batch ${i}: ${e.message}`)
  }
  process.stdout.write(`  shtooka ${Math.min(i + 50, all.length)}/${all.length}\r`)
  await sleep(1200)
}

const stillMissing = all.filter((w) => !manifest[w])
console.log(`\nShtooka covered ${Object.keys(manifest).length}/${all.length}`)
console.log(`trying Lingua Libre for ${stillMissing.length} remaining…`)

for (const w of stillMissing) {
  try {
    const entry = await linguaLibre(w)
    if (entry) {
      manifest[w] = entry
      console.log(`  + ${w} (Lingua Libre)`)
    }
  } catch (e) {
    console.error(`  ${w}: ${e.message}`)
  }
  await sleep(1100)
}

const found = Object.keys(manifest).length
console.log(`\nfound recordings for ${found}/${all.length} words`)
console.log('still missing:', all.filter((w) => !manifest[w]).join(', ') || '(none)')

writeFileSync('src/data/audio.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('wrote src/data/audio.json')

const bySource = {}
const byLicence = {}
for (const v of Object.values(manifest)) {
  bySource[v.source] = (bySource[v.source] ?? 0) + 1
  byLicence[v.license] = (byLicence[v.license] ?? 0) + 1
}
console.log('sources :', JSON.stringify(bySource))
console.log('licences:', JSON.stringify(byLicence))
