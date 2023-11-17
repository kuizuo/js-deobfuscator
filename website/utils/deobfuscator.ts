import { Deob } from '@deob/utils'

self.addEventListener(
  'message',
  ({ data }) => {
    const { code, _options } = data

    if (!code)
      return

    const deob = new Deob(code)

    deob.findDecryptFnByCallCount(200, true)

    deob.saveAllObject()
    deob.objectMemberReplace()

    deob.switchFlat()
    deob.switchFlat()

    // 最后通用处理
    deob.calcBinary()
    deob.calcBoolean()
    deob.replaceConstant()

    deob.removeUnusedBlock()
    deob.removeUnusedVariables()
    deob.selfCallFnReplace()

    // 优化
    // deob.changeObjectAccessMode()
    deob.deleteExtra()
    deob.addComments()

    const output = deob.getCode()

    // TODO: parse time;
    self.postMessage({ code: output })
  },
  false,
)
