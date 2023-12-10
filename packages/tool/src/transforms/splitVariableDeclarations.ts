import * as t from '@babel/types'
import type { Transform } from '.'

/**
 * 分离多个 var 赋值
 * @example
 * var a = 1, b = 2;
 * ⬇️
 * var a = 1;
 * var b = 2;
 */
export default {
  name: 'splitVariableDeclarations',
  visitor: () => ({
    VariableDeclaration: {
      exit(path) {
        if (path.node.declarations.length > 1 && path.key !== 'init') {
          if (path.parentPath.isExportNamedDeclaration()) {
            path.parentPath.replaceWithMultiple(
              path.node.declarations.map(declaration =>
                t.exportNamedDeclaration(
                  t.variableDeclaration(path.node.kind, [declaration]),
                ),
              ),
            )
          }
          else {
            path.replaceWithMultiple(
              path.node.declarations.map(declaration =>
                t.variableDeclaration(path.node.kind, [declaration]),
              ),
            )
          }
          this.changes++
        }
      },
    },
    noScope: true,
  }),
} satisfies Transform
