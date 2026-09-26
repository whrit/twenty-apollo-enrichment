import { isArray } from '@sniptt/guards';

import { buildApolloOrganizationDetail } from 'src/logic-functions/utils/build-apollo-organization-detail';
import { isApolloOrganizationMatched } from 'src/logic-functions/utils/is-apollo-matched';
import { postApolloBulkEnrich } from 'src/logic-functions/utils/post-apollo-enrich';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';
import { type ApolloOrganizationData } from 'src/types/apollo-organization-data';
import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';

// Apollo /organizations/bulk_enrich accepts at most 10 detail entries per request.
export const enrichCompanies = (
  params: ApolloOrganizationEnrichParams[],
): Promise<ApolloEnrichResult<ApolloOrganizationData>[]> =>
  postApolloBulkEnrich<ApolloOrganizationData>({
    path: '/organizations/bulk_enrich',
    body: { details: params.map(buildApolloOrganizationDetail) },
    count: params.length,
    extractList: (json) =>
      isArray(json.organizations)
        ? json.organizations
        : isArray(json.matches)
          ? json.matches
          : [],
    isMatched: isApolloOrganizationMatched,
  });
