import debug from 'debug'

export const deobLogger = debug('Deob')

export function createLogger(namespace: string) {
  return debug(namespace)
}

export function enableLogger(namespace = 'Deob') {
  debug.enable(namespace)
}
