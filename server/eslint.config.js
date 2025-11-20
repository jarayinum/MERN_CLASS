import js from '@eslint/js';

export default [
  {
    files: ['src/**/*.js'],
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    ...js.configs.recommended,
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 'off',
    },
  },
];

