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
    'no-alert': 'off',
    'no-control-regex': 'off',
    'node/prefer-global/process': 'off',
    'curly': 'off',
    'unused-imports/no-unused-vars': 'warn',
    
    'ts/no-use-before-define': 'off',
    'ts/no-non-null-asserted-optional-chain': 'off',
    'no-unused-expressions': 'off',
    'test/consistent-test-it': 'off',
    
    'antfu/if-newline': 'off',
  },
})
