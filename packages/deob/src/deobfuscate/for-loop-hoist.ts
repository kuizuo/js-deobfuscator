import * as t from '@babel/types'
import type { Transform } from '../ast-utils'

/**
 * 将 for 初始化赋值前置
 * @example
 * for (var a = 1, w = "2|1|2|3"["split"]("|"), void 0;;) {
 *   break;
 * }
 * 🔽
 * var a = 1;
 * var w = "2|1|2|3"["split"]("|")
 * void 0
 * for (void 0;;) {
 *    break;
 * }
 */
export default {
  name: 'forLoopHoist',
  tags: ['safe'],
  visitor() {
    return {
      ForStatement: {
        exit(path) {
          if (t.isVariableDeclaration(path.node.init)) {
            path.insertBefore(path.node.init)

            path.node.init = null
          }
        },
      },
    }
  },
} satisfies Transform
