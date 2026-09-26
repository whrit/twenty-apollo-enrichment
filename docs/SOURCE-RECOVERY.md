# Source Recovery Notes

The upstream npm artifact did not include a public source repository, but its
published source maps embedded the original TypeScript `sourcesContent`.

This repository was reconstructed from the published `@excelium-tech/apollo`
`0.3.0` artifact by:

1. extracting each embedded `src/...` module from the source maps;
2. verifying duplicate source-map copies agreed;
3. reconstructing erased TypeScript-only interfaces from their call sites;
4. rebuilding metadata-definition files from the published Twenty
   `manifest.json`;
5. assigning fresh universal identifiers to all app-owned metadata;
6. removing the human-role enrichment gate;
7. replacing the bundled front-component wrappers with normal
   `defineFrontComponent` source definitions;
8. removing the upstream no-op synchronous post-install hook;
9. adding modern project, CI, formatting, linting, documentation, and
   publishing infrastructure.

All 112 upstream runtime source paths represented in the supplied source maps
are present in this repository except four files intentionally removed:

- `src/constants/enrichment-role.ts`
- `src/logic-functions/utils/assert-can-enrich.ts`
- `src/logic-functions/utils/resolve-actor.ts`
- `src/logic-functions/post-install.function.ts`

The first three implemented the conflicting human `Enrichment` role gate. The
fourth was a no-op synchronous install hook.
