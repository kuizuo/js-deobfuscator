import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Options } from 'deob'
import { codePrettier, deob, parseCode } from 'deob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

; (async function () {
  const rawCode = await fs.readFile(`${__dirname}/input.js`, 'utf-8')

  // 注入分析后的解密器代码, 需要自行截取大数组,解密函数,参见 setupCode.js
  const setupCode = await fs.readFile(`${__dirname}/setupCode.js`, 'utf-8')

  const options: Options = {
    decoderLocationMethod: 'evalCode',
    setupCode,
    decoderNames: 'qt',
  }

  await fs.writeFile(`${__dirname}/pretty.js`, codePrettier(parseCode(rawCode)))

  const { code, save } = await deob(rawCode, options)

  save(__dirname)
})()
