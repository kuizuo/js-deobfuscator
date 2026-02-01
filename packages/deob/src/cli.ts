#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import * as url from 'node:url'
import { program } from 'commander'
import debug from 'debug'
import { deob } from './index.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const { version, description } = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8'),
) as { version: string, description: string }

debug.enable('deob:*')

interface Options {
  output?: string
}

async function readStdin() {
  let data = ''
  process.stdin.setEncoding('utf8')
  for await (const chunk of process.stdin) data += chunk
  return data
}

program
  .version(version)
  .description(description)
  .option('-o, --output <path>', 'output directory for bundled files')
  .argument('[file]', 'input file, defaults to stdin')
  .action(async (input: string | undefined) => {
    const { output } = program.opts<Options>()
    const code = await (input ? readFile(input, 'utf8') : readStdin())

    const result = await deob(code)

    if (output) {
      await result.save(output)
    }
    else {
      console.log(result.code)
    }
  })
  .parse()
