import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { codePrettier, deob, parseCode } from 'deob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

; (async function () {
  const rawCode = await fs.readFile(`${__dirname}/input.js`, 'utf-8')

  await fs.writeFile(`${__dirname}/pretty.js`, codePrettier(parseCode(rawCode)))

  const { code, save } = await deob(rawCode)
  save(__dirname)
})()
