import { defineLogicFunction } from 'twenty-sdk/define';

import { UPDATE_FIELDS_OPTIONS } from 'src/constants/update-fields-options';
import { APOLLO_LOGIC_FUNCTION_CONSTANTS } from 'src/constants/universal-identifiers';
import { enrichCompanyCore } from 'src/logic-functions/handlers/enrich-company';
import { buildSkippedResult } from 'src/logic-functions/utils/build-skipped-result';
import { extractDatabaseEventRecordId } from 'src/logic-functions/utils/extract-database-event-record-id';
import { getAutoEnrichCompanies } from 'src/logic-functions/utils/get-auto-enrich-companies';
import { type EnrichResult } from 'src/types/enrich-result';

// Fires on every Company creation. Enriches the new record (fill-empty) only
// when the APOLLO_AUTO_ENRICH_COMPANIES application variable is enabled, so the
// feature — and its Apollo credit usage — is opt-in.
export const autoEnrichCompanyHandler = (
  input: unknown,
): Promise<EnrichResult> => {
  const recordId = extractDatabaseEventRecordId(input);

  if (recordId === undefined) {
    return Promise.resolve(
      buildSkippedResult({ recordId: '', message: 'Missing recordId.' }),
    );
  }

  if (!getAutoEnrichCompanies()) {
    return Promise.resolve(
      buildSkippedResult({
        recordId,
        message: 'Auto-enrichment of new companies is disabled.',
      }),
    );
  }

  return enrichCompanyCore({
    input: { recordId, updateFields: UPDATE_FIELDS_OPTIONS.fillEmpty },
  });
};

export default defineLogicFunction({
  universalIdentifier:
    APOLLO_LOGIC_FUNCTION_CONSTANTS.autoEnrichCompany.universalIdentifier,
  name: 'auto-enrich-company',
  description:
    'Automatically enriches a newly created Company with Apollo (fill-empty) when APOLLO_AUTO_ENRICH_COMPANIES is enabled.',
  timeoutSeconds: 60,
  handler: autoEnrichCompanyHandler,
  databaseEventTriggerSettings: {
    eventName: 'company.created',
  },
});
