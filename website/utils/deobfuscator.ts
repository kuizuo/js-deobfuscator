import { Deob } from '@deob/utils'

self.addEventListener(
  'message',
  function ({ data }) {
    const { code, options } = data

    if (!code) {
      return
    }

    let deob = new Deob(code)

    deob.findDecryptFnByCallCount(800, true)


    // deob.saveAllObject()
    // deob.objectMemberReplace()
    // await deob.record(fileName, 2)

    deob.switchFlat()
    deob.switchFlat()
    deob.reParse()

    // 最后通用处理
    deob.calcBinary()
    deob.calcBoolean()
    deob.replaceConstant()

    deob.removeUnusedBlock()
    deob.removeUnusedVariables()
    deob.selfCallFnReplace()


    deob.deleteExtra()
    deob.addComments()

    let output = deob.getCode()

    // TODO: parse time;
    self.postMessage({ code: output })
  },
  false,
)
