import type { Options } from 'deob'
import debug from 'debug'
import { Deob } from 'deob'

const originalDebugLog = debug.log

function normalizeLogArgs(args: any[]) {
  return args
    .map((value) => {
      if (typeof value === 'string') {
        const cleaned = value.replace(/%c/g, '').trim()
        if (!cleaned || /^color:/i.test(cleaned))
          return ''
        return cleaned
      }
      return formatLogValue(value)
    })
    .filter(Boolean)
}

function formatLogValue(value: any) {
  if (value instanceof Error)
    return value.stack || value.message

  if (value instanceof Map)
    return JSON.stringify(Object.fromEntries(value.entries()), null, 2)

  if (value instanceof Set)
    return JSON.stringify(Array.from(value.values()), null, 2)

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2)
    }
    catch {
      return String(value)
    }
  }

  return String(value)
}

debug.log = (...args: any[]) => {
  originalDebugLog?.(...args)

  // Send log entries back to the main thread for display
  self.postMessage({
    type: 'log',
    message: normalizeLogArgs(args).join(' '),
    timestamp: Date.now(),
  })
}

self.addEventListener(
  'message',
  async ({ data }: { data: { code: string, options: Options } }) => {
    const { code, options } = data

    if (!code || !options)
      return

    const start = performance.now()

    const deob = new Deob(code, options)

    const { code: output } = await deob.run()

    const end = performance.now()
    self.postMessage({ type: 'result', code: output, parseTime: (end - start).toFixed(0) })
  },
  false,
)
