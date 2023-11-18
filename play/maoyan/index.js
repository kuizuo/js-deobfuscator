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

  deob.splitMultipleDeclarations()

  deob.findDecryptFnByCallCount(1000, true)
  await deob.record(fileName, 1)

  // 根据情况可 在执行平坦化
  for (let i = 0; i <= 3; i++) {
    deob.saveAllObject()
    deob.objectMemberReplace()
    deob.switchFlat()
    console.log(`执行第${i + 1}遍 平坦化完成`)
  }
  await deob.record(fileName, 3)

  // 最后通用处理
  deob.calcBinary()
  deob.replaceConstant()
  deob.reParse()

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  // deob.selfCallFnReplace()
  await deob.record(fileName, 4)

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.markComment()

  const code = deob.getCode()
  await fs.writeFile(`${__dirname}/output.js`, code)
})()
