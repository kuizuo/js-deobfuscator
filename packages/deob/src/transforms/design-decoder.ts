import type * as t from '@babel/types'
import traverse from '@babel/traverse'
import { Decoder } from '../deobfuscate/decoder'

export function designDecoder(ast: t.Node, decoderName: string | string[]): Decoder[] {
  const decoderNameList = Array.isArray(decoderName) ? decoderName : [decoderName]

  const decoders: Decoder[] = []

  traverse(ast, {
    FunctionDeclaration(path) {
      const { id } = path.node
      const name = id?.name

      if (name && decoderNameList.includes(name)) {
        decoders.push(new Decoder(name, path))
      }
    },
  })

  // // 将所有引用解密函数的变量都重命名变为解密函数, 同时移除自身
  // traverse(ast, {
  //   VariableDeclarator(path) {
  //     const { id, init } = path.node

  //     if (init && init.type === 'Identifier') {
  //       const name = decoderNameList.find(n => n === init.name)

  //       if (name) {
  //         path.scope.rename((id as t.Identifier).name, name)
  //         path.remove()
  //       }
  //     }
  //   },
  // })

  return decoders
}
