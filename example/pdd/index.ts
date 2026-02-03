import { promises as fs } from 'node:fs'
import type { Options } from 'deob'
import { deob } from 'deob'

; (async function () {
  const rawCode = await fs.readFile(`${import.meta.dirname}/input.js`, 'utf-8')

  // 注入分析后的解密器代码, 需要自行截取大数组,解密函数,参见 setupCode.js
  const setupCode = await fs.readFile(`${import.meta.dirname}/setupCode.js`, 'utf-8')

  const options: Options = {
    decoderLocationMethod: 'evalCode',
    setupCode,
    // 并声明解密函数名称
    decoderNames: 'qt',
  }

  const { code, save } = await deob(rawCode, options)

  save(import.meta.dirname)
})()
