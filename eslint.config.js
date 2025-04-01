/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // No plugins required for basic linting
    
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        process: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Relaxed rules for a non-enforced linting setup
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'no-unused-vars': 'warn', // Warning instead of error
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
];
