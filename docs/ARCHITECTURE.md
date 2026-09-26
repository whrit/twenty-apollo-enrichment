# Architecture

## Execution model

```text
Person / Company
      |
      v
Command menu / Workflow / AI tool / DB trigger
      |
      v
Twenty Logic Function
      |
      +-- caller permissions
      |
      +-- app default role
      |
      v
permission intersection
      |
      v
Apollo API
      |
      v
normalize + map + persist
```

## Permission model

The app intentionally defines only a **non-assignable application role**.

Twenty narrows calls made by a human to the intersection of the user's existing
workspace role and the app's own role. The app role grants only Person/Company
read and update plus the Workflow permission.

There is no human `Enrichment` role. A user remains Admin or Member.

## Configuration

Apollo credentials are workspace-scoped `applicationVariables`, not
instance-scoped `serverVariables`. This matters for a public app because each
workspace must be able to use its own Apollo account.

Secret variables are injected only into server-side logic functions.

## Enrichment modes

- **Fill empty** (default): preserves populated standard CRM fields.
- **Overwrite**: allows Apollo values to replace populated standard fields.
- **Preview**: returns mapped enrichment without persisting it.

Apollo-specific bookkeeping fields are maintained by the app.

## Bulk safety

Apollo bulk APIs are processed in chunks of 10. `APOLLO_MAX_BULK_ENRICH`
places an additional per-action ceiling (default 50) before any Apollo call is
made.

## Phone reveal

Single-Person enrichment may request an asynchronous Apollo phone reveal. The
record stores the Apollo request ID while pending. The public webhook route
matches the callback by that request ID and clears it after processing to make
replays a no-op.

Bulk People enrichment does not request phone reveal.

## Automatic Company enrichment

When `APOLLO_AUTO_ENRICH_COMPANIES=true`, the `company.created` database event
runs single-Company enrichment in fill-empty mode.

This feature is opt-in because it consumes Apollo credits.
