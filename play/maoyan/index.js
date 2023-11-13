const { Deob } = require('@deob/utils')
const fs = require('fs/promises')

class MyDeOb extends Deob {}

;(async function () {
  const fileName = 'code'

  let rawCode = await fs.readFile(__dirname + `/${fileName}.js`, {
    encoding: 'utf-8',
  })

  let deob = new MyDeOb(rawCode, {
    dir: __dirname,
    isWriteFile: true,
  })

  await deob.prettierCode()

  deob.splitMultipleDeclarations()

  deob.findDecryptFnByCallCount(1000, true)
  await deob.record(fileName, 1)

  // 根据情况可 在执行平坦化
  for (let i = 0; i <  4; i++) {
    deob.saveAllObject()
    deob.objectMemberReplace()
    deob.switchFlat()
    console.log(`执行第${i + 1}遍 平坦化完成`)
  }
  await deob.record(fileName, 3)

  // 最后通用处理
  deob.calcBinary()
  deob.calcBoolean()
  deob.reParse()
  await deob.record(fileName, 4)
  
  deob.replaceConstant()
  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  // deob.selfCallFnReplace()

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.addComments()

  let code = deob.getCode()
  await fs.writeFile(__dirname + '/output.js', code)
})()
