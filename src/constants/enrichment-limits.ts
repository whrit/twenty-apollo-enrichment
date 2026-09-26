// Hard cap on how many records a single bulk enrichment may process. Protects
// Apollo credits from an accidental "select all -> Enrich" on a large view.
// Enforced server-side (in run-batch-enrichment) and echoed client-side for
// immediate feedback.
export const MAX_BULK_ENRICH_RECORDS = 50;
