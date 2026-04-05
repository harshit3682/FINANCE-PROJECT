// Copy dist/index.html to dist/404.html to support SPA routing on GitHub Pages
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distIndex = `${__dirname}/../dist/index.html`
const dist404 = `${__dirname}/../dist/404.html`

try {
  if (!existsSync(`${__dirname}/../dist`)) {
    mkdirSync(`${__dirname}/../dist`, { recursive: true })
  }
  copyFileSync(distIndex, dist404)
  console.log('Created dist/404.html from dist/index.html')
} catch (e) {
  console.error('Failed to create dist/404.html:', e)
  process.exitCode = 0
}

