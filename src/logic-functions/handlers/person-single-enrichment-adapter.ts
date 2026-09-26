import { personEnrichmentAdapter } from 'src/logic-functions/handlers/person-enrichment-adapter';
import { enrichPerson } from 'src/logic-functions/utils/enrich-person';
import { type BatchEnrichmentAdapter } from 'src/types/batch-enrichment-adapter';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';
import { type PersonNode } from 'src/types/person-node';

export const personSingleEnrichmentAdapter: BatchEnrichmentAdapter<
  PersonNode,
  ApolloPersonData,
  ApolloPersonEnrichParams
> = {
  ...personEnrichmentAdapter,
  enrichBatch: enrichPerson,
};
