const TRUTHY_VALUES = new Set(['true', '1', 'yes', 'on']);

// Whether newly created Companies are auto-enriched. Controlled by the
// APOLLO_AUTO_ENRICH_COMPANIES application variable (Settings -> Apps -> Apollo for Twenty -> Variables).
// Off by default so enabling it (and the credit usage) is an explicit choice.
export const getAutoEnrichCompanies = (): boolean => {
  const raw = process.env.APOLLO_AUTO_ENRICH_COMPANIES?.trim().toLowerCase();

  return raw !== undefined && TRUTHY_VALUES.has(raw);
};
