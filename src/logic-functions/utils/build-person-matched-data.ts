import { type CoreApiClient } from 'twenty-client-sdk/core';

import { findOrCreateCurrentCompany } from 'src/logic-functions/utils/find-or-create-current-company';
import { isEmptyEmails } from 'src/logic-functions/utils/is-empty-emails';
import { isEmptyFullName } from 'src/logic-functions/utils/is-empty-full-name';
import { isEmptyLinks } from 'src/logic-functions/utils/is-empty-links';
import { isEmptyPhones } from 'src/logic-functions/utils/is-empty-phones';
import { isEmptyText } from 'src/logic-functions/utils/is-empty-text';
import { mapPerson } from 'src/logic-functions/utils/map-person';
import { pickWritableStandard } from 'src/logic-functions/utils/pick-writable-standard';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type CompanyIdByMatchKeyCache } from 'src/types/company-id-by-match-key-cache';
import { type PersonNode } from 'src/types/person-node';
import { isDefined } from 'src/utils/is-defined';
import { pruneUndefined } from 'src/utils/prune-undefined';

const PERSON_EMPTY_CHECKS = {
  name: isEmptyFullName,
  emails: isEmptyEmails,
  phones: isEmptyPhones,
  jobTitle: isEmptyText,
  linkedinLink: isEmptyLinks,
};

export const buildPersonMatchedData = async ({
  client,
  node,
  outcome,
  enrichedAt,
  companyIdByMatchKeyCache,
  overrideExistingValues,
  shouldPersist,
}: {
  client: CoreApiClient;
  node: PersonNode;
  outcome: { data: ApolloPersonData; requestId?: string };
  enrichedAt: string;
  companyIdByMatchKeyCache: CompanyIdByMatchKeyCache;
  overrideExistingValues: boolean;
  shouldPersist: boolean;
}): Promise<{
  mappedData: Record<string, unknown>;
  persistData: Record<string, unknown>;
}> => {
  const mapped = mapPerson(outcome.data);
  const mappedData = pruneUndefined({ ...mapped.standard, ...mapped.apollo });

  if (!shouldPersist) {
    return { mappedData, persistData: {} };
  }

  const writableStandard = pickWritableStandard({
    standard: mapped.standard,
    current: node as unknown as Record<string, unknown>,
    emptyChecks: PERSON_EMPTY_CHECKS,
    overrideExistingValues,
  });

  const currentCompanyId = isDefined(node.company?.id)
    ? undefined
    : await findOrCreateCurrentCompany({
        client,
        personData: outcome.data,
        companyIdByMatchKeyCache,
      });

  // A request id means an async phone reveal is in flight; the phone number is
  // filled in later by the apollo-phone-webhook logic function.
  const phoneRevealRequestId = toText(outcome.requestId);

  const persistData = pruneUndefined({
    ...writableStandard,
    ...mapped.apollo,
    companyId: currentCompanyId,
    apolloRawPayload: outcome.data,
    apolloLastEnrichedAt: enrichedAt,
    apolloEnrichmentStatus: 'MATCHED',
    apolloRequestId: phoneRevealRequestId,
    apolloPhoneStatus: isDefined(phoneRevealRequestId) ? 'PENDING' : undefined,
  });

  return { mappedData, persistData };
};
