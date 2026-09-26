import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const appConfig = fs.readFileSync(new URL('../src/application-config.ts', import.meta.url), 'utf8');

const text = JSON.stringify(packageJson) + appConfig;
const placeholders = ['YOUR_GITHUB_USERNAME'];

for (const placeholder of placeholders) {
  if (text.includes(placeholder)) {
    console.error(
      `Release metadata still contains ${placeholder}. Replace it with your real GitHub username before publishing.`,
    );
    process.exit(1);
  }
}

if (!packageJson.keywords?.includes('twenty-app')) {
  console.error('package.json must include the "twenty-app" keyword.');
  process.exit(1);
}

console.log('Release metadata looks ready.');
