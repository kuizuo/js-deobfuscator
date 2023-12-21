import { Deob, type Options } from 'deob'

self.addEventListener(
  'message',
  async ({ data }: { data: { code: string; options: Options } }) => {
    const { code, options } = data

    if (!code || !options)
      return

    const start = performance.now()

    const deob = new Deob(code, options)

    const { code: output } = await deob.run()

    const end = performance.now()
    self.postMessage({ code: output, parseTime: (end - start).toFixed(0) })
  },
  false,
)
