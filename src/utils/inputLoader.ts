import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export function loadInput(relativePath: string): string {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return readFileSync(join(__dirname, relativePath), 'utf-8')
}
