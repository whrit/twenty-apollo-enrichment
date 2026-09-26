import { isArray } from '@sniptt/guards';

import { buildApolloPersonDetail } from 'src/logic-functions/utils/build-apollo-person-detail';
import { buildApolloRevealConfig } from 'src/logic-functions/utils/build-apollo-reveal-config';
import { isApolloPersonMatched } from 'src/logic-functions/utils/is-apollo-matched';
import { postApolloBulkEnrich } from 'src/logic-functions/utils/post-apollo-enrich';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';

// Apollo /people/bulk_match accepts at most 10 detail entries per request.
export const enrichPeople = (
  params: ApolloPersonEnrichParams[],
): Promise<ApolloEnrichResult<ApolloPersonData>[]> =>
  postApolloBulkEnrich<ApolloPersonData>({
    path: '/people/bulk_match',
    body: {
      details: params.map(buildApolloPersonDetail),
      ...buildApolloRevealConfig({ includePhoneReveal: false }),
    },
    count: params.length,
    extractList: (json) => (isArray(json.matches) ? json.matches : []),
    isMatched: isApolloPersonMatched,
  });
