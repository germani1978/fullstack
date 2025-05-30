import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules', 'dist', 'build'],
    plugins: { js, stylistic },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node
    },

    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/linebreak-style': ['error', 'unix'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/semi': ['error', 'never'],
      'eqeqeq':'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    }
  }
])
