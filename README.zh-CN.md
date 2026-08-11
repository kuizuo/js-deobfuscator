<div align="center">
  <img src="https://img.kuizuo.me/js-deobfuscator.png" alt="JS Deobfuscator Logo" width="800" />

  <h1>JS Deobfuscator</h1>

  <p>简体中文 | <a href="./README.md">English</a></p>

  <p>
    🚀 基于 <b>Babel AST</b> 的全自动 JavaScript 反混淆工具，助你高效还原各种混淆代码。
  </p>
  <a href="https://js-deobfuscator.vercel.app/" style="display:inline-block;margin-top:8px;">
    <b>💻 立即体验 Playground →</b>
  </a>
</div>

## 功能亮点

| 功能 | 说明 |
| --- | --- |
| **解密入口定位** | 按字符串数组长度、解密器调用次数或手动注入代码、解密器名称进行定位 |
| **字符串解密** | 识别字符串数组与旋转器，展开解密器封装并用明文替换调用点 |
| **控制流还原** | 展开控制流平坦化、移除死代码和花指令、合并对象属性与赋值 |
| **代码整形** | 反压缩、美化、变量重命名（hex、short、custom），并可选择标记关键字 |
| **自卫清理** | 移除 self-defending 和 anti-debug 逻辑，支持多轮执行处理重度混淆 |
| **多种使用方式** | 支持命令行、浏览器 Playground 和 TypeScript 接口，并附带真实案例集合 |

## 快速开始

### 命令行 / 本地运行

```bash
git clone https://github.com/kuizuo/js-deobfuscator
cd js-deobfuscator
pnpm install

# 处理单个文件并写入目录（生成 output.js）
pnpm exec deob path/to/input.js -o ./out

# 也可通过 stdin 使用
cat path/to/input.js | pnpm exec deob > output.js
```

快速体验：将混淆代码放到 `tmp/input.js`，执行 `pnpm tmp`，结果会输出到 `tmp/output.js`。

### 编程接口

```ts
import { readFileSync } from 'node:fs'
import { deob } from 'deob'

const code = readFileSync('input.js', 'utf8')
const { code: outputCode, save } = await deob(code, {
  decoderLocationMethod: 'callCount',
  decoderCallCount: 300,
  mangleMode: 'hex',
})
await save('./out')
```

## 示例与案例

`example/` 下收录了多组真实混淆样本，每个子目录包含：

- `index.ts`：配置和运行脚本。
- `input.js` / `output.js`：混淆输入与还原输出。
- `setupCode.js`：运行前注入的可选代码。

## 项目结构

- `packages/deob`：核心 AST 转换与 `deob` 命令行工具。
- `website`：基于 Nuxt 3 和 Monaco 的在线 Playground。
- `example`：真实混淆案例与运行脚本。
- `tmp`：用于快速本地运行的最小目录。

## 致谢

该项目引用并受到 [j4k0xb/webcrack](https://github.com/j4k0xb/webcrack) 的启发，以及书籍 [反爬虫 AST 原理与还原混淆实战](https://book.douban.com/subject/35575838/)。
