import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Options } from 'deob'
import { Deob, codePrettier, generate } from 'deob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
; (async function () {
  const rawCode = await fs.readFile(`${__dirname}/input.js`, 'utf-8')

  // 注入分析后的解密器代码, 需要自行截取大数组,解密函数,参见 setupCode.js
  const setupCode = await fs.readFile(`${__dirname}/setupCode.js`, 'utf-8')

  const options: Options = {
    decoderLocationMethod: 'evalCode',
    setupCode,
    designDecoderName: '_0x1663',
    execCount: 4,
    isStrongRemove: true,
    isRemoveDecoder: false,
  }
  const deob = new Deob(rawCode, options)

  await fs.writeFile(`${__dirname}/pretty.js`, codePrettier(deob.ast))

  const { code, historys, save } = await deob.run()
  save(__dirname)

  // 输出 ast 处理历史用于调试, 需要 isDebug: true
  for (let i = 0; i < historys.length; i++) {
    const ast = historys[i]
    const code = generate(ast)

    await fs.writeFile(`${__dirname}/history_${i}.js`, code)
  }
})()
