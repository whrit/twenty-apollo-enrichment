import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/.twenty/**', '**/coverage/**'],
});
