import { buildCompanyMatchedData } from 'src/logic-functions/utils/build-company-matched-data';
import { enrichCompanies } from 'src/logic-functions/utils/enrich-companies';
import { extractCompanyMatchParams } from 'src/logic-functions/utils/extract-company-match-params';
import { readCompanies } from 'src/logic-functions/utils/read-companies';
import { updateCompaniesStatus } from 'src/logic-functions/utils/update-companies-status';
import { updateCompanyRecord } from 'src/logic-functions/utils/update-company-record';
import { type BatchEnrichmentAdapter } from 'src/types/batch-enrichment-adapter';
import { type CompanyNode } from 'src/types/company-node';
import { type ApolloOrganizationData } from 'src/types/apollo-organization-data';
import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';

export const companyEnrichmentAdapter: BatchEnrichmentAdapter<
  CompanyNode,
  ApolloOrganizationData,
  ApolloOrganizationEnrichParams
> = {
  objectNameSingular: 'Company',
  noIdentifierMessage:
    'No usable identifier (domain, LinkedIn, or name) to match against Apollo.io.',
  readRecords: readCompanies,
  getNodeId: (node) => node.id,
  getLastEnrichedAt: (node) => node.apolloLastEnrichedAt ?? null,
  extractParams: extractCompanyMatchParams,
  enrichBatch: enrichCompanies,
  buildMatchedData: ({
    node,
    outcome,
    enrichedAt,
    overrideExistingValues,
    shouldPersist,
  }) =>
    buildCompanyMatchedData({
      node,
      outcome,
      enrichedAt,
      overrideExistingValues,
      shouldPersist,
    }),
  updateOne: updateCompanyRecord,
  updateManyStatus: updateCompaniesStatus,
};
