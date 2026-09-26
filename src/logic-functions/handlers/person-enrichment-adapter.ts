import { buildPersonMatchedData } from 'src/logic-functions/utils/build-person-matched-data';
import { enrichPeople } from 'src/logic-functions/utils/enrich-people';
import { extractPersonMatchParams } from 'src/logic-functions/utils/extract-person-match-params';
import { readPeople } from 'src/logic-functions/utils/read-people';
import { updatePeopleStatus } from 'src/logic-functions/utils/update-people-status';
import { updatePersonRecord } from 'src/logic-functions/utils/update-person-record';
import { type BatchEnrichmentAdapter } from 'src/types/batch-enrichment-adapter';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';
import { type PersonNode } from 'src/types/person-node';

export const personEnrichmentAdapter: BatchEnrichmentAdapter<
  PersonNode,
  ApolloPersonData,
  ApolloPersonEnrichParams
> = {
  objectNameSingular: 'Person',
  noIdentifierMessage:
    'No usable identifier (email, LinkedIn, Apollo id, or name) to match against Apollo.io.',
  readRecords: readPeople,
  getNodeId: (node) => node.id,
  getLastEnrichedAt: (node) => node.apolloLastEnrichedAt ?? null,
  extractParams: extractPersonMatchParams,
  enrichBatch: enrichPeople,
  buildMatchedData: buildPersonMatchedData,
  updateOne: updatePersonRecord,
  updateManyStatus: updatePeopleStatus,
};
