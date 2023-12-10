import { describe, expect, it } from 'vitest'
import { Deob } from '../src'

describe('handleError', async () => {
  it('syntax error', () => {
    const rawCode = `continue;`

    const triggerError = () => {
      try {
        const deob = new Deob(rawCode)
      }
      catch (error) {
        throw new Error(error)
      }
    }

    expect(triggerError).toThrowError('SyntaxError: Unsyntactic continue')
  })
})
