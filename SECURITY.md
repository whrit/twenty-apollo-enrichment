# Security Policy

## Reporting

Please report security issues privately through GitHub Security Advisories for this repository rather than opening a public issue.

## Secrets

Never commit:

- Apollo API keys
- Twenty API keys
- OAuth tokens
- webhook secrets
- `.twenty` remote credentials

`APOLLO_API_KEY` and `APOLLO_WEBHOOK_SECRET` are declared as secret application variables.

## Logic Functions

Twenty Logic Functions execute application code. For self-hosted production environments:

- use `LOGIC_FUNCTION_TYPE=LAMBDA` when isolation from application code is required;
- use `LOGIC_FUNCTION_TYPE=LOCAL` only for trusted code/environments;
- keep Logic Functions disabled when the feature is not needed.

## Webhook

The phone webhook supports an optional shared secret. Production deployments enabling phone reveal should set `APOLLO_WEBHOOK_SECRET`.
