import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'warn',
  },
  plugins: ['typescript', 'react', 'unicorn'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/.twenty/**', '**/coverage/**'],
  rules: {
    'no-console': 'off',
    // tsconfig uses `jsx: react-jsx` (automatic runtime); React import not needed.
    'react/react-in-jsx-scope': 'off',
  },
});
