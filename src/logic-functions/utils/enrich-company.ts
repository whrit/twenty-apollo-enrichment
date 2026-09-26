import { isApolloOrganizationMatched } from 'src/logic-functions/utils/is-apollo-matched';
import { postApolloSingleEnrich } from 'src/logic-functions/utils/post-apollo-single-enrich';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';
import { type ApolloOrganizationData } from 'src/types/apollo-organization-data';
import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const enrichCompany = (
  params: ApolloOrganizationEnrichParams[],
): Promise<ApolloEnrichResult<ApolloOrganizationData>[]> =>
  Promise.all(
    params.map((entry) => {
      const query = new URLSearchParams(
        pruneUndefined<string>({
          domain: entry.domain,
          name: entry.name,
          linkedin_url: entry.linkedinUrl,
        }),
      ).toString();

      return postApolloSingleEnrich<ApolloOrganizationData>({
        method: 'GET',
        path: `/organizations/enrich?${query}`,
        extractEntity: (json) => json.organization,
        isMatched: isApolloOrganizationMatched,
      });
    }),
  );
