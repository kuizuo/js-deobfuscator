const { Deob } = require('@deob/utils')
const fs = require('fs/promises')

class MyDeOb extends Deob {}

;(async function () {
  const fileName = 'code'

  let rawCode = await fs.readFile(__dirname + `/${fileName}.js`, {
    encoding: 'utf-8',
  })

  let deob = new Deob({
    rawCode: rawCode,
    dir: __dirname,
    isWriteFile: true,
    opts: {
      minified: false,
      jsescOption: { minimal: false },
      compact: false,
      comments: true,
    },
  })

  deob.prettierCode()

  deob.findDecryptFnByCallCount(1000)
  deob.reParse() // 切记一定要在替换后执行, 因为替换后此时 ast 并未更新, 就可能会导致后续处理都使用原先的 ast
  deob.record(fileName, 1)

  deob.saveAllObject()
  deob.objectMemberReplace()
  deob.reParse()
  deob.record(fileName, 2)

  deob.switchFlat()
  deob.switchFlat()
  deob.reParse()
  deob.record(fileName, 3)

  // 最后通用处理
  deob.calcBinary()
  deob.calcBoolean()
  deob.constantReplace()
  deob.reParse()
  deob.record(fileName, 4)

  deob.removeUnusedBlock()
  deob.removeUnusedVariables()
  deob.selfCallFnReplace()

  // 优化
  // deob.changeObjectAccessMode()
  deob.deleteExtra()
  deob.addComments()

  let code = deob.getCode()
  fs.writeFile(__dirname + '/result.js', code)
})()
