import type * as Babel from '@babel/parser'

import type { JsonNode, Range } from '#imports'

export interface Parser<C = unknown, O = unknown> {
  id: string
  label: string
  icon: string
  init?(): C | Promise<C>
  version: string | ((this: C | Promise<C>) => string | Promise<string>)
  parse(this: C, code: string, options: O): unknown
  options: {
    configurable: boolean
  } & (
    | {
      defaultValue: string
      defaultValueType: 'javascript'
    }
    | {
      defaultValue: O
      defaultValueType?: 'json5'
    }
  )
  getAstLocation?(ast: JsonNode): Range | undefined
}

export interface LanguageOption {
  label: string
  icon: string
  parsers: Parser<any, any>[]
}

export const currentParser = computed(() => javascript.parsers[0])

export const parserVersion = ref('')

const astLocationFields = {
  babel: {
    type: ['type'],
    start: ['start'],
    end: ['end'],
  },
  ts: {
    type: ['kind'],
    start: ['pos'],
    end: ['end'],
  },
  swc: {
    type: ['type'],
    start: ['span', 'start'],
    end: ['span', 'end'],
  },
} as const

export function getAstLocation(
  preset: keyof typeof astLocationFields,
  node: JsonNode
) {
  if (node.type !== 'Object') return
  if (!getJsonValue(node, astLocationFields[preset].type)) return

  const start = getJsonValue(node, astLocationFields[preset].start)
  const end = getJsonValue(node, astLocationFields[preset].end)
  if (typeof start !== 'number' || typeof end !== 'number') return

  return { start, end }
}

const getAstLocationBabel = getAstLocation.bind(null, 'babel')

const babel: Parser<typeof Babel, Babel.ParserOptions> = {
  id: 'babel',
  label: '@babel/parser',
  icon: 'i-vscode-icons:file-type-babel2',
  options: {
    configurable: true,
    defaultValue: {
      sourceType: 'module',
      plugins: [],
    },
  },
  // @ts-expect-error
  init: () => import('https://cdn.jsdelivr.net/npm/@babel/parser/+esm'),
  version: () =>
    fetch('https://cdn.jsdelivr.net/npm/@babel/parser/package.json')
      .then((r) => r.json())
      .then((raw) => `@babel/parser@${raw.version}`),
  parse(code, options) {
    return this.parse(code, { ...options })
  },

  getAstLocation: getAstLocationBabel,
}

export const javascript: LanguageOption = {
  label: 'JavaScript',
  icon: 'i-vscode-icons:file-type-js-official',
  parsers: [babel],
}
