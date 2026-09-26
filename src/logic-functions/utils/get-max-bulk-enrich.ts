import { MAX_BULK_ENRICH_RECORDS } from 'src/constants/enrichment-limits';

// The per-action bulk enrichment cap. Admins can override the default via the
// APOLLO_MAX_BULK_ENRICH application variable (Settings -> Apps -> Apollo for Twenty -> Variables).
export const getMaxBulkEnrich = (): number => {
  const raw = process.env.APOLLO_MAX_BULK_ENRICH?.trim();

  if (raw === undefined || raw === '') {
    return MAX_BULK_ENRICH_RECORDS;
  }

  const parsed = Number.parseInt(raw, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return MAX_BULK_ENRICH_RECORDS;
  }

  return parsed;
};
