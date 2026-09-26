# Apollo for Twenty

Open-source Apollo.io enrichment for [Twenty CRM](https://twenty.com).

Enrich People and Companies from Twenty's command menu, workflows, or AI tools using **your own Apollo.io API credits**.

> This project is independently maintained and is not affiliated with Apollo.io, Twenty, or Excelium Tech.

## Why this project exists

The only found Apollo enrichment package (won't name) was buns and did not function in any usable capacity so built one that works and people CAN ACTUALLY contribute to.

This project removes that human-role gate. Twenty's native permission intersection already ensures an app invocation cannot exceed either:

1. the triggering user's permissions; or
2. the app's own least-privilege application role.

That means Admins stay Admins, Members stay Members, and enrichment respects the permissions they already have.

## Features

- **People enrichment** — title, headline, seniority, departments, verified email state, personal emails, photo, employment history, and optional asynchronous phone reveal.
- **Company enrichment** — industry, employee count, annual revenue, founded year, keywords, technologies, funding, LinkedIn, location, headcount growth, and NAICS codes.
- **Command menu actions** — enrich selected People or Companies.
- **Workflow actions** — single- and multi-record enrichment.
- **AI tools** — single Person and Company enrichment can be exposed to Twenty AI.
- **Bulk safety limit** — configurable cap protects Apollo credits.
- **Fill-empty / overwrite / preview modes**.
- **Optional automatic Company enrichment** on record creation.
- **Optional phone reveal webhook** with shared-secret protection.

## Requirements

- Twenty `>=2.42.0 <2.43.0`
- Node.js `>=24.5.0`
- pnpm `12.6.0`
- TypeScript `6.0.3`
- An Apollo.io account with API access
- Twenty Logic Functions enabled (`LOCAL` for trusted/dev environments or `LAMBDA` for isolated production execution)

## Install from Twenty Marketplace

After this package is published to npm and synced into Twenty's marketplace:

1. Open **Settings → Applications → Marketplace**.
2. Turn off **Vetted only** if needed.
3. Install **Apollo for Twenty**.
4. Open the installed app's **Variables** page.
5. Set **Apollo API key**.

## App variables

| Variable                       | Required | Default | Purpose                                                                   |
| ------------------------------ | -------- | ------- | ------------------------------------------------------------------------- |
| `APOLLO_API_KEY`               | Yes      | —       | Apollo API key. Stored as a secret workspace-scoped application variable. |
| `APOLLO_MAX_BULK_ENRICH`       | No       | `50`    | Maximum records allowed in one bulk enrichment.                           |
| `APOLLO_AUTO_ENRICH_COMPANIES` | No       | `false` | Enrich new Companies automatically using fill-empty mode.                 |
| `APOLLO_PHONE_WEBHOOK_URL`     | No       | —       | Public callback URL for async phone reveal.                               |
| `APOLLO_WEBHOOK_SECRET`        | No       | —       | Optional shared secret for the public phone webhook.                      |

## Phone reveal

Apollo phone reveal is asynchronous. When enabled, point `APOLLO_PHONE_WEBHOOK_URL` at this app's public server route:

```text
<public-app-base>/webhook/apollo-phone
```

If `APOLLO_WEBHOOK_SECRET` is set, append it as `?secret=<value>` or have the caller send it using the `x-apollo-webhook-secret` header.

Phone reveal is requested only for single-Person enrichment, where Apollo's request ID maps to exactly one Person. Bulk People enrichment never requests phone reveal.

## Permissions

This app declares a non-assignable application role with only:

- Person: read + update
- Company: read + update
- Workflows permission

There is **no second human Enrichment role**. Twenty narrows app execution to the intersection of the caller's permissions and the app role.

## Development

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
```

Connect to a Twenty instance:

```bash
pnpm exec twenty remote:add --url https://your-twenty.example.com --as development
pnpm exec twenty remote:use development
pnpm dev
```

Build a tarball:

```bash
pnpm build:tarball
```

## Tooling

- TypeScript `6.0.3`
- Oxlint via `oxlint.config.ts`
- Oxfmt via `oxfmt.config.ts`
- Vitest
- pnpm

## Publishing from your personal GitHub account

Before the first public release, replace `YOUR_GITHUB_USERNAME` in:

- `package.json`
- `src/application-config.ts`

Then create the public repository:

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

### npm Trusted Publishing

1. Create or claim the npm package name `twenty-apollo-enrichment`.
2. In npm package settings, configure a **Trusted Publisher**:
   - GitHub owner: your personal username
   - Repository: `twenty-apollo-enrichment`
   - Workflow: `publish.yml`
3. Push a release tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The publish workflow validates, builds, and runs:

```bash
pnpm exec twenty app:publish
```

with GitHub OIDC provenance.

## Claiming the app in Twenty

Because this app exposes a public server route for Apollo phone callbacks, the publisher should claim the application registration on the Twenty instance that owns the route:

**Settings → Applications → Developer → Claim an application**

Claim the npm package through GitHub provenance, configure the app variables, and install it in the owner workspace.

## Security

See [SECURITY.md](SECURITY.md). Do not commit Apollo keys or Twenty API keys.

## Upstream attribution

This project incorporates and adapts portions of `@excelium-tech/apollo@0.3.0`, originally distributed under the MIT License. See [docs/UPSTREAM.md](docs/UPSTREAM.md).

## License

MIT
