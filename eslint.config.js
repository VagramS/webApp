const airbnbBase = require('eslint-config-airbnb-base');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'implicit-arrow-linebreak': 0,
      'camelcase': 0,
      'linebreak-style': 0,
      'no-unused-vars': 0,
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
      'padded-blocks': ['error', { blocks: 'never' }],
    },
  },
];