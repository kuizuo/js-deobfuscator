import fs from 'fs'
import { Deobfuscator } from '../src/utils/ast/deobfuscator'

let jscode = fs.readFileSync(__dirname + '/demo.js', {
  encoding: 'utf-8',
})

const deob = new Deobfuscator(
  jscode,
  [],
  {
    minified: false,
    jsescOption: { minimal: true },
    compact: false,
    comments: true,
  },
  false,
)

deob.run()

const code = deob.getCode()
fs.writeFile(__dirname + '/newCode.js', code, (err) => {})
