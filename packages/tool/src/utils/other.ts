import { promises as fs } from 'node:fs'
import type * as t from '@babel/types'
import { generate } from './generator'

/**
 * 输出成好看形式 用于对比
 */
export async function prettierCode(ast: t.Node, fileName: string) {
  const code = generate(ast, {
    minified: false,
    jsescOption: { minimal: true },
    compact: false,
    comments: true,
  })
  await fs.writeFile(fileName, code)
}

/**
 * 记录解析后生成的代码 方便调试查看
 */
export async function record(fileName: string, code: string) {
  await fs.writeFile(fileName, code)
  console.log(`${fileName}s 写入成功`)
}
