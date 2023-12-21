#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import * as url from 'node:url'
import debug from 'debug'
import { program } from 'commander'
import { Deob } from './index.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const { version, description } = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8'),
) as { version: string; description: string }

debug.enable('webcrack:*')

interface Options {
  force: boolean
  output?: string
  mangle?: boolean
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
  .option('-f, --force', 'overwrite output directory')
  .option('-m, --mangle', 'mangle variable names')
  .argument('[file]', 'input file, defaults to stdin')
  .action(async (input: string | undefined) => {
    const { output, force, mangle } = program.opts<Options>()
    const code = await (input ? readFile(input, 'utf8') : readStdin())

    if (output) {
      if (force || !existsSync(output)) {
        await rm(output, { recursive: true, force: true })
      }
      else {
        program.error('output directory already exists')
      }
    }

    const deob = new Deob(code)
    const result = await deob.run()

    if (output) {
      await result.save(output)
    }
    else {
      console.log(result.code)
    }
  })
  .parse()
