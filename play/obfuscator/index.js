import { promises as fs } from 'node:fs'
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
  })

  await deob.prettierCode()

  deob.removeSelfCallFn()

  let index = 0

  deob.nestedFnReplace()

  deob.splitMultipleDeclarations()
  await deob.record(fileName, ++index)

  const decryptFnCode = deob.findDecryptFnByBigArr(60, true)

  deob.designDecryptFn(deob.decryptFnList)
  deob.decryptReplace(decryptFnCode)
  await deob.record(fileName, ++index)

  for (let i = 1; i <= 1; i++) {
    deob.decryptReplace()

    for (let j = 1; j <= 3; j++) {
      deob.saveAllObject()
      deob.objectMemberReplace()
      deob.controlFlowFlat()
      deob.calcBinary()
    }
  }

  await deob.record(fileName, ++index)

  // 通用处理
  deob.replaceConstant()
  deob.calcBinary()

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()

  deob.splitMultipleDeclarations()
  deob.restoreSequence()
  deob.selfCallFnReplace()

  deob.deleteExtra()
  deob.markComment()

  const code = deob.getCode()
  await fs.writeFile(`${__dirname}/output.js`, code)
})()
