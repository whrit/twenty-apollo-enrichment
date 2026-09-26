# Publishing

This repository is prepared for a personal GitHub account and npm Trusted
Publishing.

## 1. Personalize release metadata

Replace every occurrence of:

```text
YOUR_GITHUB_USERNAME
```

with your real personal GitHub username.

Verify:

```bash
pnpm check:release
```

The release check intentionally fails while placeholders remain.

## 2. Install and validate

```bash
pnpm install
pnpm check
```

Commit the generated `pnpm-lock.yaml` after the first successful install.

After the lockfile exists, you may change CI from
`pnpm install --no-frozen-lockfile` to `pnpm install --frozen-lockfile`.

## 3. Create the public GitHub repository

```bash
git init
git add .
git commit -m "Initial release"

gh repo create YOUR_GITHUB_USERNAME/twenty-apollo-enrichment \
  --public \
  --source=. \
  --remote=origin \
  --push
```

## 4. Prepare npm

The configured package name is:

```text
twenty-apollo-enrichment
```

Confirm it is available before the first publish. If you change the npm package
name, update `package.json` before releasing.

npm Trusted Publishing (OIDC) can only be configured on a package that already
exists, and npm has no "pending publisher". Until it is configured, the GitHub
workflow fails with `404 Not Found - PUT https://registry.npmjs.org/twenty-apollo-enrichment`.

## 5. First publish (manual, once)

Requires an npm account with 2FA enabled.

```bash
npm login
pnpm check:release && pnpm check
pnpm exec twenty app:publish
```

`twenty app:publish` builds `.twenty/output` and runs
`npm publish --access public` there; npm prompts for 2FA. Provenance is only
added inside GitHub Actions.

Alternative without an interactive 2FA publish: run `npm stage publish` from
`.twenty/output` (npm 11+), then approve it with 2FA via `npm stage approve <id>`
or the Staged Packages tab on npmjs.com.

## 6. Configure Trusted Publishing

On npmjs.com → package `twenty-apollo-enrichment` → Settings → Trusted
Publisher → GitHub Actions:

- Organization or user: `whrit`
- Repository: `twenty-apollo-enrichment`
- Workflow filename: `publish.yml`
- Environment: leave empty

## 7. Publish from CI

Bump to a version not yet on npm, then push the tag:

```bash
pnpm version patch
git push origin main --follow-tags
```

`.github/workflows/publish.yml` runs the validation suite and
`pnpm exec twenty app:publish` with OIDC and provenance; no npm token needed.

## 8. Twenty marketplace

The package includes the required `twenty-app` npm keyword.

After npm publication, wait for Twenty's marketplace catalog sync or trigger one
from a configured remote:

```bash
pnpm exec twenty dev:catalog-sync --remote production
```

Community apps may require disabling the `Vetted only` marketplace filter.

## 9. Claim ownership

Because the app exposes a public server route for phone callbacks, claim the app
registration from the intended owner workspace using GitHub provenance:

**Settings → Applications → Developer → Claim an application**

Then configure the app variables and install it in the owner workspace.

## 10. Future releases

Bump semver before every release:

```bash
pnpm version patch
git push origin main --follow-tags
```

Keep every Twenty universal identifier stable once released.
