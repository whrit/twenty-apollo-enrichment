import { buildApolloPersonDetail } from 'src/logic-functions/utils/build-apollo-person-detail';
import { buildApolloRevealConfig } from 'src/logic-functions/utils/build-apollo-reveal-config';
import { isApolloPersonMatched } from 'src/logic-functions/utils/is-apollo-matched';
import { postApolloSingleEnrich } from 'src/logic-functions/utils/post-apollo-single-enrich';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';

export const enrichPerson = (
  params: ApolloPersonEnrichParams[],
): Promise<ApolloEnrichResult<ApolloPersonData>[]> => {
  const revealConfig = buildApolloRevealConfig({ includePhoneReveal: true });
  // Only stamp request_id (and thus PENDING) when a phone reveal is actually
  // in flight, i.e. a webhook URL is configured and reveal_phone_number was set.
  const revealPhoneNumber = revealConfig.reveal_phone_number === true;

  return Promise.all(
    params.map((entry) =>
      postApolloSingleEnrich<ApolloPersonData>({
        method: 'POST',
        path: '/people/match',
        body: { ...buildApolloPersonDetail(entry), ...revealConfig },
        extractEntity: (json) => json.person,
        isMatched: isApolloPersonMatched,
        includeRequestId: revealPhoneNumber,
      }),
    ),
  );
};
