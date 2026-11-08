import type { Options } from '../../index'
import { describe, expect, test } from 'vitest'
import { deob } from '../../index'

const source = `
  function init() { return "ok"; }
  var config = { debug: false };
`

describe('mangle mode', () => {
  test.each<{ label: string, options?: Options }>([
    { label: 'by default' },
    { label: 'when disabled', options: { mangleMode: 'off' } },
    { label: 'with an invalid custom pattern', options: { mangleMode: 'custom', manglePattern: '[' } },
  ])('preserves global names $label', async ({ options }) => {
    const { code } = await deob(source, options)

    expect(code).toContain('function init(')
    expect(code).toContain('var config =')
  })

  test('renames globals when enabled', async () => {
    const { code } = await deob(source, { mangleMode: 'all' })

    expect(code).not.toContain('function init(')
    expect(code).not.toContain('var config =')
  })
})
