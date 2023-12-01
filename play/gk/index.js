import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Deob } from '@deob/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

; (async function () {
  const fileName = 'code'

  const rawCode = await fs.readFile(`${__dirname}/${fileName}.js`, {
    encoding: 'utf-8',
  })

  const deob = new Deob(rawCode, {
    dir: __dirname,
    isWriteFile: true,
  })

  await deob.prettierCode()

  for (let i = 1; i <= 2; i++) {
    deob.nestedFnReplace()
    await deob.record(fileName, 0)

    deob.findDecryptFnByCallCount(800, true)

    await deob.record(fileName, 1)

    for (let i = 1; i <= 2; i++) {
      deob.saveAllObject()
      deob.objectMemberReplace()
      deob.switchFlat()
    }

    deob.calcBinary()

    deob.replaceConstant()
    deob.reParse()
    await deob.record(fileName, 4)

    deob.removeUnusedVariables()
    deob.removeUnusedBlock()
  }

  deob.selfCallFnReplace()

  // 最后通用处理
  deob.calcBinary()

  deob.replaceConstant()
  deob.reParse()
  await deob.record(fileName, 4)

  for (let i = 1; i <= 2; i++) {
    deob.removeUnusedVariables()
    deob.removeUnusedBlock()
  }

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.markComment()

  const code = deob.getCode()
  fs.writeFile(`${__dirname}/output.js`, code)
})()
