import { antfu } from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/code.js', '**/code copy.js', '**/code_*.js', '**/output.js', '**/pretty.js', '**/errorCode.js', '**/evalCode.js'],
}, {
  rules: {
    'no-console': 'off',
    'no-eval': 'off',
    'no-restricted-globals': 'off',

    'unused-imports/no-unused-vars': 'warn',

    'antfu/if-newline': 'off',
  },
})
