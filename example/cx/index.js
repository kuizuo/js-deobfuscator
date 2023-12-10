import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Deob, prettierCode, record } from '@deob/tool'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

; (async function () {
  const fileName = 'code'

  const rawCode = await fs.readFile(`${__dirname}/${fileName}.js`, {
    encoding: 'utf-8',
  })

  const deob = new Deob(rawCode)

  const index = 0

  await prettierCode(deob.ast, `${__dirname}/pretty.js`)

  deob.prepare()

  const decryptFnCode = deob.findDecoderByCallCount(100, true)
  deob.evalCode(decryptFnCode)
  deob.replaceDecoder(deob.decoders)
  deob.decodeStrings(deob.decoders)

  for (let j = 1; j <= 2; j++) {
    deob.saveAllObject()
    deob.controlFlowSwitch()
    deob.calcBinary()
  }
  await record(`${fileName}`, deob.code)

  deob.unminify()

  deob.markComment()

  const code = deob.code
  fs.writeFile(`${__dirname}/output.js`, code)
})()
