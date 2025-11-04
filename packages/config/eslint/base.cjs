module.exports = {
  env: {
    es2023: true,
    node: false,
    browser: false
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import', 'promise', 'security', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended'
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/tests/**',
          '**/*.test.*',
          '**/*.spec.*',
          '**/vitest.config.*',
          '**/jest.config.*'
        ],
        optionalDependencies: false
      }
    ],
    'security/detect-object-injection': 'off'
  }
};
