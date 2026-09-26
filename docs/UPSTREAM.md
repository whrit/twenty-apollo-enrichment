# Upstream Attribution

This project incorporates and modifies portions of:

- Package: `@excelium-tech/apollo`
- Upstream version: `0.3.0`
- Publisher: Excelium Tech
- License: MIT

The upstream npm artifact included source maps containing the original TypeScript source for the enrichment logic and front components. This repository reconstructs those MIT-licensed sources into a maintainable public source tree.

## Material changes

This project independently maintains the code and includes substantial changes, including:

- removal of the assignable human `Enrichment` role and its runtime gate;
- reliance on Twenty's native caller-permissions × application-role intersection;
- new application, metadata, field, function, command, option, and view identifiers;
- workspace-scoped application-variable configuration;
- removal of the no-op synchronous post-install hook;
- TypeScript 6.0.3;
- pnpm;
- Oxlint and Oxfmt TypeScript configuration;
- public CI and provenance-backed npm publishing workflow;
- updated documentation and security guidance;
- new app branding.

This project is not affiliated with or endorsed by Excelium Tech.
