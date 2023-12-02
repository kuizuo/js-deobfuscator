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

  // 注入分析后的解密代码, 需要自行分析谁是大数组,谁是解密函数
  const evalCode = await fs.readFile(`${__dirname}/evalCode.js`, {
    encoding: 'utf-8',
  })

  // 注入解密函数并指明解密函数
  deob.evalCode(evalCode)

  for (let i = 1; i <= 3; i++) {
    deob.splitMultipleDeclarations()

    deob.designDecryptFn('qt')

    await deob.record(fileName, ++index)

    for (let i = 1; i <= 4; i++) {
      deob.saveAllObject()
      deob.objectMemberReplace()
      deob.switchFlat()
    }

    deob.calcBinary()
    await deob.record(fileName, ++index)
  }

  // // 最后通用处理

  deob.replaceConstant()
  deob.reParse()

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  deob.selfCallFnReplace()

  const code = deob.getCode()
  await fs.writeFile(`${__dirname}/output.js`, code)
})()
