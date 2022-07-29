module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'json', 'unused-imports'],
  rules: {
    'prettier/prettier': 0,
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'jest/no-commented-out-tests': 'off',
    eqeqeq: 'off'
  }
}
