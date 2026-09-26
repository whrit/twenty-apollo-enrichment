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

    // This project uses the automatic JSX runtime (`jsx: react-jsx`).
    // React does not need to be imported into every TSX file.
    'react/react-in-jsx-scope': 'off',
  },

  overrides: [
    {
      files: [
        'src/logic-functions/utils/apollo-fetch.ts',
        'src/logic-functions/utils/enrich-chunk.ts',
        'src/logic-functions/utils/run-batch-enrichment.ts',
      ],
      rules: {
        // These loops are intentionally sequential:
        // retries/backoff and rate-limited enrichment batches.
        'eslint/no-await-in-loop': 'off',
      },
    },
  ],
});
