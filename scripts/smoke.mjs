// Loads the built app in a real headless Chrome and reports whether it renders
// and whether anything threw. Usage: node scripts/smoke.mjs <url>
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

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, isMobile: true })

const errors = []
const consoleErrors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`[${m.type()}] ${m.text()}`)
})

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 45000 })
await new Promise((r) => setTimeout(r, 2500)) // let React settle / loops surface

const result = await page.evaluate(() => {
  const root = document.getElementById('root')
  const text = root ? root.innerText.trim() : ''
  return {
    rootChildren: root ? root.children.length : -1,
    textLength: text.length,
    firstText: text.slice(0, 220),
    buttons: document.querySelectorAll('button').length,
    bodyBg: getComputedStyle(document.body).backgroundColor,
  }
})

console.log('--- RENDER ---')
console.log('root children :', result.rootChildren)
console.log('text length   :', result.textLength)
console.log('buttons       :', result.buttons)
console.log('body bg       :', result.bodyBg)
console.log('visible text  :', JSON.stringify(result.firstText))
console.log('--- PAGE ERRORS (' + errors.length + ') ---')
errors.slice(0, 5).forEach((e) => console.log(e.split('\n')[0]))
console.log('--- CONSOLE (' + consoleErrors.length + ') ---')
consoleErrors.slice(0, 8).forEach((e) => console.log(e.slice(0, 200)))

await browser.close()
const ok = result.rootChildren > 0 && result.textLength > 20 && errors.length === 0
console.log(ok ? '\nRESULT: PASS' : '\nRESULT: FAIL')
process.exit(ok ? 0 : 1)
