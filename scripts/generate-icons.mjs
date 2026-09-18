// Generates the PWA PNG icons (Swedish flag) with zero dependencies — a tiny
// hand-rolled PNG encoder. Run: node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

// color type 2 (truecolor RGB), 8-bit
function encodePng(size, pixelFn) {
  const bytesPerPixel = 3
  const rowLen = size * bytesPerPixel
  const raw = Buffer.alloc((rowLen + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (rowLen + 1)] = 0 // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixelFn(x, y)
      const off = y * (rowLen + 1) + 1 + x * bytesPerPixel
      raw[off] = r
      raw[off + 1] = g
      raw[off + 2] = b
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type: truecolor
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const BLUE = [0, 106, 167]
const YELLOW = [254, 204, 0]

// Swedish flag with an off-centre cross, like the real thing.
function flagPixel(size) {
  const barStart = 0.31 * size
  const barEnd = 0.44 * size
  const hStart = 0.44 * size
  const hEnd = 0.56 * size
  return (x, y) => {
    const onVertical = x >= barStart && x < barEnd
    const onHorizontal = y >= hStart && y < hEnd
    return onVertical || onHorizontal ? YELLOW : BLUE
  }
}

mkdirSync('public', { recursive: true })
for (const size of [192, 512]) {
  const png = encodePng(size, flagPixel(size))
  writeFileSync(`public/icon-${size}.png`, png)
  console.log(`wrote public/icon-${size}.png (${png.length} bytes)`)
}
// Apple touch icon
{
  const png = encodePng(180, flagPixel(180))
  writeFileSync('public/apple-touch-icon.png', png)
  console.log('wrote public/apple-touch-icon.png')
}
