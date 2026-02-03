import fs from 'node:fs/promises'
import { codePrettier, deob, parseCode } from 'deob'

; (async function () {
  const rawCode = await fs.readFile(`${import.meta.dirname}/input.js`, 'utf-8')

  // 注入分析后的解密器代码, 需要自行截取大数组,解密函数,参见 setupCode.js
  const setupCode = await fs.readFile(`${import.meta.dirname}/setupCode.js`, 'utf-8')

  const { code, save } = await deob(rawCode, {
    decoderLocationMethod: 'evalCode',
    setupCode,
    decoderNames: '_0x1663',
  })
  save(import.meta.dirname)
})()
