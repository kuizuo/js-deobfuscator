import { antfu } from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/input.js',
    '**/output.js',
    '**/history_*.js',
    '**/pretty.js',
    '**/setupCode.js',
    '**/errorCode.js',
    'tmp/**/*',
    '**/*.js',
  ],
}, {
  rules: {
    'no-console': 'off',
    'no-eval': 'off',
    'no-restricted-globals': 'off',
    'node/prefer-global/process': 'off',

    'curly': 'off',
    'unused-imports/no-unused-vars': 'warn',

    'ts/consistent-type-imports': 'off',
    'ts/no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'test/consistent-test-it': 'off',
    
    'antfu/if-newline': 'off',
  },
})
