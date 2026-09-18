import puppeteer from 'puppeteer-core'
import { existsSync, mkdirSync } from 'node:fs'
const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
]
const CHROME = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p))
const URL = process.argv[2]
mkdirSync('shots', { recursive: true })
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await page.goto(URL, { waitUntil: 'networkidle0' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
await wait(1200)
const tap = async (t) => {
  await page.evaluate((x) => {
    const b = [...document.querySelectorAll('button')].find((e) => e.innerText.trim().includes(x))
    b && b.click()
  }, t)
  await wait(700)
}
await page.screenshot({ path: 'shots/1-today.png' })
await tap('Grammar'); await page.screenshot({ path: 'shots/2-grammar.png' })
await tap('Speak');   await page.screenshot({ path: 'shots/3-speak.png' })
await tap('Together');await page.screenshot({ path: 'shots/4-together.png' })
await tap('Today'); await tap('Start today'); await tap('Show answer')
await page.screenshot({ path: 'shots/5-card.png' })
await browser.close()
console.log('screenshots written to shots/')
