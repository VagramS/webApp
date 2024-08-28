// eslint.config.js
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
    rules: {
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'implicit-arrow-linebreak': 0,
      'camelcase': 0,
      'linebreak-style': 0,
      'no-console': 0,
      'nonblock-statement-body-position': 0,
      'curly': 0,
      'no-unused-vars': 0,
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],  // This rule limits multiple empty lines
      'padded-blocks': ['error', { blocks: 'never' }],
    },
  },
];
