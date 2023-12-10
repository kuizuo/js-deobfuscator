import { Deob } from '@deob/tool'

self.addEventListener(
  'message',
  ({ data }: { data: { code: string; options: Options } }) => {
    const { code, options } = data

    if (!code || !options)
      return

    const start = performance.now()
    const deob = new Deob(code, {
      opts: {
        minified: options.isMinifiedEnable ?? false,
        jsescOption: { minimal: true },
        compact: options.isMinifiedEnable ?? false,
        comments: !options.isMinifiedEnable ?? true,
      },
    })

    const process = (deob: Deob) => {
      deob.splitMultipleDeclarations()
      deob.nestedFnReplace(options.nestedFnDepth)

      if (options.isDecryptFnEnabled) {
        if (options.decryptFnLocationMethod === 'callCount') {
          const decryptFnCode = deob.findDecoderByCallCount(options.decryptFnCallCount, options.isRemoveDecryptFn)
          deob.designDecryptFn(deob.decryptFnList)
          deob.decryptReplace(decryptFnCode)
        }

        if (options.decryptFnLocationMethod === 'bigArrLength') {
          const decryptFnCode = deob.findDecryptFnByBigArr(options.bigArrlength, options.isRemoveDecryptFn)
          deob.designDecryptFn(deob.decryptFnList)
          deob.decryptReplace(decryptFnCode)
        }

        if (options.decryptFnLocationMethod === 'evalCode' && options.evalCode && options.designDecryptFn) {
          deob.evalCode(options.evalCode)

          deob.designDecryptFn(options.designDecryptFn)
        }
      }

      for (let i = 1; i <= options.execCount; i++) {
        deob.decryptReplace()
        deob.saveAllObject()
        deob.objectMemberReplace()
        deob.controlFlowSwitch()
        deob.calcBinary()
      }

      // 最后通用处理
      if (options.isremoveDeadCode)
        deob.removeDeadCode()

      if (options.isdeleteUnusedVar)
        deob.deleteUnusedVar()

      if (options.isReplaceConstantEnable)
        deob.replaceConstant()

      if (options.isCalcBinaryEnable)
        deob.calcBinary()

      if (options.isRestoreSequence)
        deob.restoreSequence()

      deob.splitMultipleDeclarations()
      deob.replaceSelfCallFn()

      if (options.deleteExtraEnable)
        deob.deleteExtra()

      if (options.isMarkEnable)
        deob.markComment(options.keywords)
    }

    const runCount = options.isStrongRemove ? 5 : 1

    for (let i = 1; i <= runCount; i++)
      process(deob)

    const output = deob.getCode()

    const end = performance.now()
    self.postMessage({ code: output, parseTime: (end - start).toFixed(0) })
  },
  false,
)
