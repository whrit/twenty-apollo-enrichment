import { companyEnrichmentAdapter } from 'src/logic-functions/handlers/company-enrichment-adapter';
import { enrichCompany } from 'src/logic-functions/utils/enrich-company';
import { type BatchEnrichmentAdapter } from 'src/types/batch-enrichment-adapter';
import { type CompanyNode } from 'src/types/company-node';
import { type ApolloOrganizationData } from 'src/types/apollo-organization-data';
import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';

export const companySingleEnrichmentAdapter: BatchEnrichmentAdapter<
  CompanyNode,
  ApolloOrganizationData,
  ApolloOrganizationEnrichParams
> = {
  ...companyEnrichmentAdapter,
  enrichBatch: enrichCompany,
};
