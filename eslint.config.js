// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

// ... existing imports ...

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      'prettier',
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // ADD THIS LINE BELOW:
      '@typescript-eslint/no-unused-vars': 'warn',

      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      // ... rest of your rules ...
    },
  },
  // ... HTML section ...
]);
