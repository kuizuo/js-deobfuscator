<div align="center">
  <img src="https://img.kuizuo.me/js-deobfuscator.png" alt="JS Deobfuscator Logo" width="800" />

  <h1>JS Deobfuscator</h1>

  <p><a href="./README.zh-CN.md">简体中文</a> | English</p>

  <p>
    🚀 A fully automated JavaScript deobfuscation tool powered by <b>Babel AST</b>, built to turn obfuscated code into readable source efficiently.
  </p>
  <a href="https://js-deobfuscator.vercel.app/" style="display:inline-block;margin-top:8px;">
    <b>💻 Try the Playground →</b>
  </a>
</div>

## Features

| Feature | Description |
| --- | --- |
| **Decoder discovery** | Locate decoders by string array length, call count, or manually supplied setup code and decoder names |
| **String decoding** | Detect string arrays and rotators, unwrap decoder wrappers, and replace calls with decoded values |
| **Control-flow recovery** | Unflatten control flow, remove dead or distracting code, and merge object properties and assignments |
| **Code cleanup** | Unminify, format, and rename variables with hex, short, or custom matching, with optional keyword marking |
| **Protection removal** | Remove self-defending and anti-debug logic, with repeated passes for heavily obfuscated code |
| **Multiple ways to use** | Use the CLI, browser Playground, or TypeScript API, with real-world examples included |

## Quick Start

### CLI / Local

```bash
git clone https://github.com/kuizuo/js-deobfuscator
cd js-deobfuscator
pnpm install

# Process one file and write output.js to a directory
pnpm exec deob path/to/input.js -o ./out

# Read from stdin
cat path/to/input.js | pnpm exec deob > output.js
```

For a quick local run, put obfuscated code in `tmp/input.js` and run `pnpm tmp`. The result is written to `tmp/output.js`.

### API

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

## Examples

The `example/` directory contains real obfuscation samples. Each example includes:

- `index.ts`: configuration and runner.
- `input.js` / `output.js`: obfuscated input and restored output.
- `setupCode.js`: optional code injected before execution.

## Project Structure

- `packages/deob`: core AST transforms and the `deob` CLI.
- `website`: online Playground built with Nuxt 3 and Monaco.
- `example`: real-world samples and runners.
- `tmp`: minimal directory for quick local runs.

## Acknowledgements

This project references and is inspired by [j4k0xb/webcrack](https://github.com/j4k0xb/webcrack) and the book [反爬虫 AST 原理与还原混淆实战](https://book.douban.com/subject/35575838/).
