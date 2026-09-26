import { type CoreApiClient } from 'twenty-client-sdk/core';

import { aggregateBulkEnrichResult } from 'src/logic-functions/utils/aggregate-bulk-enrich-result';
import {
  buildErrorResult,
  ENRICHMENT_FAILED_MESSAGE,
} from 'src/logic-functions/utils/build-error-result';
import { buildSkippedResult } from 'src/logic-functions/utils/build-skipped-result';
import { chunk } from 'src/logic-functions/utils/chunk';
import { getMaxBulkEnrich } from 'src/logic-functions/utils/get-max-bulk-enrich';
import { enrichChunk } from 'src/logic-functions/utils/enrich-chunk';
import { extractRecordIds } from 'src/logic-functions/utils/extract-record-ids';
import { type BatchEnrichmentAdapter } from 'src/types/batch-enrichment-adapter';
import { type BulkEnrichInput } from 'src/types/bulk-enrich-input';
import { type BulkEnrichResult } from 'src/types/bulk-enrich-result';
import { type CompanyIdByMatchKeyCache } from 'src/types/company-id-by-match-key-cache';
import { type EnrichResult } from 'src/types/enrich-result';

// Apollo bulk endpoints accept at most 10 records per request.
const APOLLO_BATCH_SIZE = 10;

export const runBatchEnrichment = async <TNode, TData, TParams>({
  client,
  input,
  adapter,
}: {
  client: CoreApiClient;
  input: BulkEnrichInput;
  adapter: BatchEnrichmentAdapter<TNode, TData, TParams>;
}): Promise<BulkEnrichResult> => {
  const recordIds = Array.from(new Set(extractRecordIds(input.records)));

  // Cap the batch to protect Apollo credits from an accidental "select all ->
  // Enrich": refuse the whole batch (no Apollo calls) with a clear message. The
  // cap is configurable via the APOLLO_MAX_BULK_ENRICH application variable.
  const maxBulkEnrich = getMaxBulkEnrich();
  if (recordIds.length > maxBulkEnrich) {
    const message = `Enrichment is limited to ${maxBulkEnrich} records at a time (you selected ${recordIds.length}). Select fewer and try again.`;

    return {
      ...aggregateBulkEnrichResult(
        recordIds.map((recordId) => buildSkippedResult({ recordId, message })),
        message,
      ),
      success: false,
    };
  }

  const resultById = new Map<string, EnrichResult>();
  const companyIdByMatchKeyCache: CompanyIdByMatchKeyCache = new Map();

  for (const recordIdsChunk of chunk({ items: recordIds, size: APOLLO_BATCH_SIZE })) {
    await enrichChunk({
      client,
      recordIds: recordIdsChunk,
      input,
      adapter,
      resultById,
      companyIdByMatchKeyCache,
    });
  }

  const results = recordIds.map(
    (recordId) =>
      resultById.get(recordId) ??
      buildErrorResult({ recordId, error: ENRICHMENT_FAILED_MESSAGE }),
  );

  return aggregateBulkEnrichResult(results);
};
