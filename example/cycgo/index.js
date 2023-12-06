import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Deob } from '@deob/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class MyDeOb extends Deob { }

; (async function () {
  const fileName = 'code'

  const rawCode = await fs.readFile(`${__dirname}/${fileName}.js`, {
    encoding: 'utf-8',
  })

  const deob = new MyDeOb(rawCode, {
    dir: __dirname,
    isWriteFile: true,
    opts: {
      minified: false,
      jsescOption: { minimal: true },
      compact: false,
      comments: true,
    },
  })

  let index = 0

  await deob.prettierCode()

  const decryptFnCode = deob.findDecryptFnByCallCount(1000, true)
  deob.designDecryptFn(deob.decryptFnList)
  deob.decryptReplace(decryptFnCode)
  await deob.record(fileName, ++index)

  for (let j = 1; j <= 2; j++) {
    deob.saveAllObject()
    deob.objectMemberReplace()
    deob.controlFlowFlat()
    deob.calcBinary()
  }
  await deob.record(fileName, ++index)

  // 通用处理
  deob.replaceConstant()
  deob.calcBinary()

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  deob.restoreSequence()

  deob.deleteExtra()
  deob.markComment()

  const code = deob.getCode()
  fs.writeFile(`${__dirname}/output.js`, code)
})()
