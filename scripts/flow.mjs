import puppeteer from 'puppeteer-core'
import { existsSync } from 'node:fs'

// Drives an already-installed Chrome/Edge - no browser download.
const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const URL = process.argv[2]
const CHROME = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
const errors = []
page.on('pageerror', (e) => errors.push(String(e).split('\n')[0]))

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 45000 })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
await wait(1200)

const clickText = async (txt) => {
  const done = await page.evaluate((t) => {
    const els = [...document.querySelectorAll('button')]
    const el = els.find((b) => b.innerText.trim().includes(t))
    if (el) { el.click(); return true }
    return false
  }, txt)
  await wait(700)
  return done
}
const snap = async (label) => {
  const r = await page.evaluate(() => ({
    len: document.getElementById('root').innerText.trim().length,
    head: document.getElementById('root').innerText.trim().slice(0, 60).replace(/\n/g, ' | '),
  }))
  console.log(`${label.padEnd(22)} textLen=${String(r.len).padEnd(5)} ${r.head}`)
  return r.len
}

let fails = 0
for (const tab of ['Today', 'Cards', 'Grammar', 'Speak', 'Together']) {
  const ok = await clickText(tab)
  const len = await snap(`tab:${tab}`)
  if (!ok || len < 20) { console.log(`  !! ${tab} FAILED`); fails++ }
}

// settings
await clickText('Today'); await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(x => x.getAttribute('aria-label') === 'Settings'); b && b.click()
}); await wait(700); await snap('screen:Settings')

// flashcard flow
await clickText('Today')
await clickText('Start today')
await snap('flashcards:start')
await clickText('Show answer')
await snap('flashcards:revealed')
const graded = await clickText('Good')
await snap('flashcards:after-grade')
if (!graded) { console.log('  !! grading FAILED'); fails++ }

// grammar quiz
await clickText('Grammar')
await page.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>x.innerText.includes('en & ett')); b&&b.click() }); await wait(700)
await snap('lesson:opened')
await clickText('Take the quick quiz')
await snap('quiz:opened')

console.log('\n--- PAGE ERRORS (' + errors.length + ') ---')
errors.slice(0, 6).forEach((e) => console.log(e))
await browser.close()
const ok = fails === 0 && errors.length === 0
console.log(ok ? '\nRESULT: PASS' : `\nRESULT: FAIL (${fails} flow failures, ${errors.length} errors)`)
process.exit(ok ? 0 : 1)
