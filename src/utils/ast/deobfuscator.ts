import generator, { GeneratorOptions } from '@babel/generator'
import * as parser from '@babel/parser'
import { ParseResult } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
// import * as fs from 'fs'

import { visitorar, type Visitorar } from './visitorar'
import { Traverse_ob } from './traverse_ob'

import { Base64 } from './encoding'

if (typeof window !== 'undefined') {
  global = window
}

interface Config {
  name: string
  value: string
  args?: any[]
}

interface History {
  ast: ParseResult<t.File>
  time: number
}

const configList: Config[] = []

const defaultoutOptions: GeneratorOptions = {
  minified: false,
  jsescOption: { minimal: true },
  compact: false,
  comments: true,
}

export class Deobfuscator {
  public ast: ParseResult<t.File>
  public historys: History[]

  constructor(
    public jscode: string,
    public configList: Config[],
    public outOptions: GeneratorOptions = defaultoutOptions,
    private isHistory: boolean = false,
  ) {
    if (!jscode) throw new Error('请输入js代码')

    console.time('useTime')
    this.ast = parser.parse(jscode)
  }

  getCode(outOptions?: GeneratorOptions): string {
    if (outOptions) {
      return generator(this.ast, outOptions).code
    }
    return generator(this.ast, this.outOptions).code
  }

  reParse() {
    // 将当前ast对应的代码重解析

    const code = this.getCode()
    // 记录解析后生成的代码 方便调试查看
    if (this.isHistory) {
      this.historys.push({
        ast: this.ast,
        time: new Date().getTime(),
      })
    }

    try {
      this.ast = parser.parse(code)
    } catch (error) {
      console.log(error)
      // fs.writeFile(__dirname + '/errorCode.js', code, () => {})
    }
  }

  run() {
    // 针对解密函数与花指令处理 -------------------------------------------------
    const traverse_ob = new Traverse_ob()

    traverse_ob.flowerCodeFunc(this.ast) // 处理函数花指令
    this.reParse()

    // traverse_ob.mergeObj(this.ast) // 合并对象 (慎用!)
    traverse_ob.flowerCodeObj(this.ast) // 处理对象花指令
    this.reParse()

    traverse_ob.findDecFuncByBigArr(this.ast, true) // 找到大数组的解密函数
    this.reParse()

    // 通用处理 -------------------------------------------------
    traverse(this.ast, visitorar.removeVariableDeclaration()) // 移除逗号赋值表达式
    traverse(this.ast, visitorar.removeSequenceExpression()) // 移除逗号表达式
    traverse(this.ast, visitorar.removeUnusedValue()) // 移除无用变量

    // traverse(this.ast, visitorar.calcUnary()) // 计算一项式
    traverse(this.ast, visitorar.calcBinary()) // 计算二项式
    traverse(this.ast, visitorar.calcBoolean()) // 计算布尔值

    traverse(this.ast, visitorar.transCondition()) // 三元表达式
    traverse(this.ast, visitorar.conditionVarToIf()) // 三元表达式转换成if

    traverse(this.ast, visitorar.clearDeadCode()) // 清理死代码
    traverse(this.ast, visitorar.replaceLiteral()) // 字面量替换

    traverse(this.ast, visitorar.deleteExtra()) // 清理十六进制编码
    traverse(this.ast, visitorar.addComments(['debugger', 'username', 'password', 'crypto'])) // 添加关键字注释
    traverse(this.ast, visitorar.addCatchLog()) // 输出异常捕获信息
    // -------------------------------------------------
  }
}

self.addEventListener(
  'message',
  function ({ data }) {
    if (data.code) {
      try {
        const deob = new Deobfuscator(data.code, [])
        deob.run()
        const code = deob.getCode()
        console.timeEnd('useTime')
        
        self.postMessage({ code })
      } catch (error: any) {
        self.postMessage({
          type: 'error',
          message: error.message,
        })
      }
    }
  },
  false,
)
