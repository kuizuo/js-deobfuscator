const { Deob } = require('./deob')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const fs = require('fs')

module.exports = {
  Deob,
  parser,
  traverse,
  generator,
  t,
}
