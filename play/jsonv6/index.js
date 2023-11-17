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
  })

  await deob.prettierCode()

  deob.findDecryptFnByCallCount(1000)
  await deob.record(fileName, 1)

  deob.saveAllObject()
  deob.objectMemberReplace()
  await deob.record(fileName, 2)

  deob.switchFlat()
  deob.switchFlat()
  await deob.record(fileName, 3)

  // 最后通用处理
  deob.calcBinary()
  deob.calcBoolean()
  deob.replaceConstant()
  await deob.record(fileName, 4)

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  deob.selfCallFnReplace()

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.addComments()

  const code = deob.getCode()
  await fs.writeFile(`${__dirname}/output.js`, code)
})()
