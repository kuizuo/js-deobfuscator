import { antfu } from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/code.js', '**/code_*.js', '**/output.js', '**/pretty.js'],
}, {
  rules: {
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'no-restricted-globals': 'off',
  },
})
