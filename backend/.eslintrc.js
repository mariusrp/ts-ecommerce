module.exports = {
  env: {
    es2015: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'es2015',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  plugins: ['*typescript-eslint'],
}
