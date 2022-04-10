export interface IConfig {
  id?: number
  name: string
  value?: string
  disable?: boolean
}

export const configData = [
  {
    name: '重解析AST',
    value: 'reParse',
    content: '对于遍历后生成的节点,需要重新解析才能获取最新节点',
  },
  {
    name: '寻找解密函数',
    value: 'findDecFunction',
    label: '调用次数',
    arguments: '100',
    content: `
      找到调用最频繁的函数即解密函数，调用次数根据混淆后的大数组的长度而定,对于千行以上代码,一般都为100次以上
    `,
  },
  {
    name: '解密函数还原',
    value: 'doDecStringFuncFlower',
    content: `
    _0x3028('0x1c', '\x73\x4c\x64\x6e') 转
    "kuizuo"
    `,
  },
  {
    name: '移除解密函数语句',
    value: 'removeDecFunction',
    content: `
    移除解密函数所定义的语句(有可能会导致运行出错,依情况使用)
    `,
  },
  {
    name: '字符串花指令',
    value: 'stringflowerCode',
    content: `
    var _0x52627b = {
      'QqaUY': "attribute",
    }
    _0x52627b["QqaUY"] 转 "attribute"`,
  },
  {
    name: '函数花指令',
    value: 'funcFlowerCode',
    content: `
    var _0x52627b = {
      'nWchU': function (_0x4cf812, _0x337d52) {
        return _0x4cf812 == _0x337d52;
      }
    }
    _0x52627b["nWchU"](_0x2efae8["length"], 8) 转 _0x2efae8["length"] == 8
    `,
  },
  {
    name: 'Switch流程平坦化',
    value: 'switchFlat',
    content: `
    针对switch流程混淆还原成正常执行流程语句`,
  },
  {
    name: '二项式计算',
    value: 'transformBinary',
    content: `
    'de' + 'bugger' 转 debugger
    和 1 + 2 转 3`,
  },
  {
    name: '字面量引用替换',
    value: 'replaceLiteral',
    content: `
    var a = "kuizuo"; b = a 转 b = "kuizuo"
    将字符串和数值常量直接替换对应的变量引用地方`,
  },
  {
    name: '布尔值还原',
    value: 'unaryExpression',
    content: `将 !![] 转化为true ![] 转为false（!0 !1同理）`,
  },
  {
    name: '改变对象属性访问方式',
    value: 'changeObjectAccessMode',
    content: `将console['log']() 转 console.log()`,
  },
  {
    name: '转正常字符串',
    value: 'hexUnicodeToString',
    content: `将所有十六进制编码与Unicode编码转为正常字符() 以及将0x123转化为291`,
  },
  {
    name: '移除无用变量',
    value: 'transformBoolean',
    content: `var _0x12345 = 100; _0x12345未使用过直接移除`,
  },
  {
    name: '移除无用代码块',
    value: 'removeUnusedValue',
    content: `if(false){ } 这类代码直接移除 `,
  },
  {
    name: '代码压缩',
    value: 'compact',
    content: `将代码压缩成一行,防止检测代码格式化无法运行`,
  },
  {
    name: '标识符重命名',
    value: 'renameIdentifier',
    content: `针对OOOoo0而言，_0xabc就好看一丢丢(实际用处不大)`,
  },
  {
    name: '添加注释',
    value: 'addComments',
    label: '关键词',
    arguments: 'debugger,CryptoJS,password',
    content: `如setInterval,debugger,password 前加上// TOLOOK 注释`,
  },
]

// 正常流程
export const defaultConfig = [
  { name: '寻找解密函数', arguments: '100', label: '调用次数' },
  { name: '解密函数还原' },
  { name: '解密函数调用次数' },
  { name: '字符串花指令' },
  { name: '函数花指令' },
  { name: '重解析AST' },
  { name: 'Switch流程平坦化', disable: true },
  { name: '二项式计算' },
  { name: '字面量引用替换' },
  { name: '布尔值还原' },
  { name: '改变对象属性访问方式' },
  { name: '转正常字符串' },
  { name: '移除无用变量' },
  { name: '移除无用代码块' },
  { name: '移除解密函数语句', disable: true },
  { name: '代码压缩' },
  { name: '添加注释', arguments: 'debugger,CryptoJS,password', label: '关键词' },
]
