import fs from 'node:fs/promises'

import type { Options } from 'deob'
import { codePrettier, deob, parseCode } from 'deob'

; (async function () {
  const options: Options = {
    decoderLocationMethod: 'callCount',
    decoderCallCount: 1000,
  }

  const rawCode = await fs.readFile(`${import.meta.dirname}/input.js`, 'utf-8')

  const { code, save } = await deob(rawCode, options)
  save(import.meta.dirname)
})()
