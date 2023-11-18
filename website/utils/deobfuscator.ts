import { Deob } from '@deob/utils'

self.addEventListener(
  'message',
  ({ data }: { data: { code: string; options: Options } }) => {
    const { code, options } = data

    if (!code || !options)
      return

    const deob = new Deob(code)

    if (options.isDecryptFnEnabled)
      deob.findDecryptFnByCallCount(options.decryptFnCallCount, options.isRemoveDecryptFn)

    for (let i = 0; i <= options.execCount; i++) {
      deob.saveAllObject()
      deob.objectMemberReplace()
      deob.switchFlat()
    }

    // 最后通用处理
    if (options.isCalcBinaryEnable)
      deob.calcBinary()

    if (options.isReplaceConstantEnable)
      deob.replaceConstant()

    if (options.isRemoveUnusedBlock)
      deob.removeUnusedBlock()
    if (options.isRemoveUnusedVariables)
      deob.removeUnusedVariables()

    deob.selfCallFnReplace()

    if (options.deleteExtraEnable)
      deob.deleteExtra()

    if (options.isMarkEnable)
      deob.markComment(options.keywords)

    const output = deob.getCode()

    // TODO: parse time;
    self.postMessage({ code: output })
  },
  false,
)
