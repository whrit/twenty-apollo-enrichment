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

Configure npm Trusted Publishing for:

- GitHub owner: your username
- Repository: `twenty-apollo-enrichment`
- Workflow: `publish.yml`

If npm requires a bootstrap publication before Trusted Publishing can be
configured, make that one publication with a short-lived granular publish token,
revoke the token, then use OIDC thereafter.

## 5. Publish

```bash
git tag v0.1.0
git push origin v0.1.0
```

`.github/workflows/publish.yml` runs the validation suite and:

```bash
pnpm exec twenty app:publish
```

The public GitHub workflow supplies OIDC for npm provenance.

## 6. Twenty marketplace

The package includes the required `twenty-app` npm keyword.

After npm publication, wait for Twenty's marketplace catalog sync or trigger one
from a configured remote:

```bash
pnpm exec twenty dev:catalog-sync --remote production
```

Community apps may require disabling the `Vetted only` marketplace filter.

## 7. Claim ownership

Because the app exposes a public server route for phone callbacks, claim the app
registration from the intended owner workspace using GitHub provenance:

**Settings → Applications → Developer → Claim an application**

Then configure the app variables and install it in the owner workspace.

## 8. Future releases

Bump semver before every release:

```bash
pnpm version patch
git push origin main --follow-tags
```

Keep every Twenty universal identifier stable once released.
