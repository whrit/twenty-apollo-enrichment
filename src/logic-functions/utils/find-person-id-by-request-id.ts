import { type CoreApiClient } from 'twenty-client-sdk/core';

import { toText } from 'src/logic-functions/utils/to-text';

export const findPersonIdByRequestId = async ({
  client,
  requestId,
}: {
  client: CoreApiClient;
  requestId: string;
}): Promise<string | undefined> => {
  const result = (await client.query({
    people: {
      __args: {
        // Only match a Person that is actually awaiting a reveal, so a replayed
        // or duplicate webhook delivery for an already-resolved id is a no-op.
        filter: {
          apolloRequestId: { eq: requestId },
          apolloPhoneStatus: { eq: 'PENDING' },
        },
        first: 1,
      },
      edges: { node: { id: true } },
    },
  })) as { people?: { edges?: { node?: { id?: string } }[] } };

  return toText(result.people?.edges?.[0]?.node?.id);
};
