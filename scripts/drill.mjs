// Drives the "Listen and choose" drill to completion in a real browser, to prove
// it terminates (it used to cycle forever), records progress, and reaches the
// completion screen. Usage: node scripts/drill.mjs <url>
import puppeteer from 'puppeteer-core'
import { existsSync } from 'node:fs'

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
]
const CHROME = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p))
const URL = process.argv[2]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--mute-audio'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
const errors = []
page.on('pageerror', (e) => errors.push(String(e).split('\n')[0]))

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const tap = async (text) => {
  const ok = await page.evaluate((t) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.innerText.trim().includes(t))
    if (b && !b.disabled) {
      b.click()
      return true
    }
    return false
  }, text)
  await wait(320)
  return ok
}
const text = () => page.evaluate(() => document.getElementById('root').innerText)

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 45000 })
await wait(1200)

await tap('Speak')
const menu = await text()
const declared = menu.match(/(\d+) of (\d+) pairs mastered/)
console.log('menu says:', declared ? declared[0] : '(no progress line)')

await tap('Listen and choose')
await wait(400)
console.log('drill opened:', (await text()).split('\n')[0])

// Answer rounds. We always pick the FIRST option; the target is random, so wrong
// answers re-queue and we converge. If the drill never terminates, the cap trips.
let rounds = 0
let reachedEnd = false
const CAP = 200
while (rounds < CAP) {
  rounds++
  const t = await text()
  if (/Round complete|All pairs mastered/.test(t)) {
    reachedEnd = true
    break
  }
  // Click the first of the two answer buttons.
  const clicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')]
    const opt = btns.find((b) => /^[a-zåäöA-ZÅÄÖ]+\n/.test(b.innerText.trim()))
    if (opt) {
      opt.click()
      return opt.innerText.trim().split('\n')[0]
    }
    return null
  })
  if (!clicked) {
    console.log(`round ${rounds}: no answer button found`)
    break
  }
  await wait(220)
  if (!(await tap('Next'))) {
    // No Next button -> we are probably on the completion screen already.
    const t2 = await text()
    if (/Round complete|All pairs mastered/.test(t2)) {
      reachedEnd = true
      break
    }
  }
}

const finalText = await text()
console.log(`\nrounds played : ${rounds}`)
console.log(`reached end   : ${reachedEnd}`)
console.log('completion screen:')
console.log(
  finalText
    .split('\n')
    .filter(Boolean)
    .slice(0, 8)
    .map((l) => '   ' + l)
    .join('\n'),
)

// Progress list should now show ticks.
const sawList = await tap('See my progress')
if (sawList) {
  await wait(400)
  const list = await text()
  const m = list.match(/(\d+) of (\d+) mastered/)
  console.log('\nprogress list :', m ? m[0] : '(not found)')
  const rows = list.split('\n').filter((l) => l.includes('·')).length
  console.log('pair rows     :', rows)
}

console.log(`\npage errors   : ${errors.length}`)
errors.slice(0, 4).forEach((e) => console.log('   ' + e))

await browser.close()
const pass = reachedEnd && rounds < CAP && errors.length === 0
console.log(pass ? '\nRESULT: PASS' : '\nRESULT: FAIL')
process.exit(pass ? 0 : 1)
