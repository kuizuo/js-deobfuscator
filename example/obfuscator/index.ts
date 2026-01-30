import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Options } from 'deob'
import { Deob, codePrettier, generate } from 'deob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
; (async function () {
  const options: Options = {
    decoderLocationMethod: 'stringArray',
    isDebug: false,
  }

  const rawCode = await fs.readFile(`${__dirname}/input.js`, 'utf-8')

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
