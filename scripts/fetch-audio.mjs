// Builds src/data/audio.json: a map of Swedish word -> real native-speaker
// recording hosted on Wikimedia Commons.
//
// Synthetic speech was reading Swedish with an English voice on devices without
// a Swedish TTS voice installed, which taught the wrong pronunciation outright.
// Commons hosts thousands of "Sv-<word>.ogg" recordings by native speakers, so
// we prefer those and keep TTS only as a fallback.
//
// Commons asks for a descriptive User-Agent and reasonable request rates, so
// titles are batched (50 per call) with a pause between batches.
// Run: node scripts/fetch-audio.mjs

import { writeFileSync, readFileSync } from 'node:fs'

const UA = 'SvenskaTillsammans/1.0 (https://github.com/Laliunb/svenska-tillsammans) audio-manifest-builder'
const API = 'https://commons.wikimedia.org/w/api.php'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Pull every Swedish string we might want to pronounce out of the data files.
function words() {
  const vocab = readFileSync('src/data/vocab.ts', 'utf8')
  const pron = readFileSync('src/data/pronunciation.ts', 'utf8')
  const set = new Set()
  for (const src of [vocab, pron]) {
    for (const m of src.matchAll(/\bsv: '([^']+)'/g)) {
      let w = m[1].trim()
      // Recordings are of single headwords: drop articles and "att" infinitives.
      w = w.replace(/^(en|ett|att)\s+/, '')
      if (/^[a-zà-öø-ÿåäö]+$/i.test(w)) set.add(w.toLowerCase())
    }
  }
  return [...set].sort()
}

async function lookup(batch) {
  const titles = batch.map((w) => `File:Sv-${w}.ogg`).join('|')
  const url = `${API}?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(titles)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const pages = json.query?.pages ?? {}
  const out = {}
  for (const p of Object.values(pages)) {
    if (p.missing !== undefined || !p.imageinfo) continue
    const word = p.title.replace(/^File:Sv-/, '').replace(/\.ogg$/, '').toLowerCase()
    const ii = p.imageinfo[0]
    const meta = ii.extmetadata ?? {}
    const strip = (v) => (v?.value ?? '').replace(/<[^>]*>/g, '').trim()
    // The API decorates URLs with utm_* tracking params; they must be stripped
    // before deriving the transcode path or the query string lands mid-URL.
    const clean = ii.url.split('?')[0]
    const file = clean.split('/').pop()
    out[word] = {
      ogg: clean,
      // Wikimedia transcodes Ogg audio to MP3; iOS/Safari cannot play Ogg.
      mp3: clean.replace('/commons/', '/commons/transcoded/') + `/${file}.mp3`,
      license: strip(meta.LicenseShortName) || 'see Commons',
      artist: strip(meta.Artist).slice(0, 80),
    }
  }
  return out
}

const all = words()
console.log(`looking up ${all.length} words on Commons…`)
const manifest = {}
for (let i = 0; i < all.length; i += 50) {
  const batch = all.slice(i, i + 50)
  try {
    Object.assign(manifest, await lookup(batch))
  } catch (e) {
    console.error(`batch ${i}: ${e.message}`)
  }
  process.stdout.write(`  ${Math.min(i + 50, all.length)}/${all.length}\r`)
  await sleep(1200)
}

const found = Object.keys(manifest).length
console.log(`\nfound recordings for ${found}/${all.length} words`)
console.log('missing:', all.filter((w) => !manifest[w]).join(', ') || '(none)')

writeFileSync('src/data/audio.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('wrote src/data/audio.json')

const licenses = [...new Set(Object.values(manifest).map((v) => v.license))]
console.log('licenses seen:', licenses.join(' | '))
