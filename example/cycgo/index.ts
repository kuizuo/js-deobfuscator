import fs from 'node:fs/promises'
import { deob } from 'deob'

;(async function () {
  const rawCode = await fs.readFile(`${import.meta.dirname}/input.js`, 'utf-8')

  const { save } = await deob(rawCode)
  save(import.meta.dirname)
})()