import { antfu } from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'no-restricted-globals': 'off',
  },
})
