import { type CoreApiClient } from 'twenty-client-sdk/core';

import { buildPhones } from 'src/logic-functions/utils/build-phones';
import { extractApolloPhoneNumbers } from 'src/logic-functions/utils/extract-apollo-phone-numbers';
import { findPersonIdByRequestId } from 'src/logic-functions/utils/find-person-id-by-request-id';
import { getApolloWebhookSecret } from 'src/logic-functions/utils/get-apollo-webhook-secret';
import { toText } from 'src/logic-functions/utils/to-text';
import { updatePersonRecord } from 'src/logic-functions/utils/update-person-record';
import {
  type ApolloPhoneWebhookPayload,
  type ApolloPhoneWebhookResult,
} from 'src/types/apollo-phone-webhook-payload';
import { isDefined } from 'src/utils/is-defined';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const apolloPhoneWebhookHandler = async ({
  payload,
  client,
  providedSecret,
}: {
  payload: ApolloPhoneWebhookPayload;
  client: CoreApiClient;
  providedSecret?: string;
}): Promise<ApolloPhoneWebhookResult> => {
  const configuredSecret = getApolloWebhookSecret();
  if (isDefined(configuredSecret) && providedSecret !== configuredSecret) {
    return {
      skipped: true,
      reason: 'Apollo phone webhook secret is missing or does not match',
    };
  }

  const requestId = toText(payload.request_id);
  if (!isDefined(requestId)) {
    return { error: 'Apollo phone webhook payload is missing request_id' };
  }

  const personId = await findPersonIdByRequestId({ client, requestId });
  if (!isDefined(personId)) {
    return {
      skipped: true,
      reason: 'No Person is awaiting a phone reveal for this request_id',
      requestId,
    };
  }

  const phoneNumbers = extractApolloPhoneNumbers(payload);
  const primaryPhone = phoneNumbers[0];
  const wasRevealed = isDefined(primaryPhone);

  await updatePersonRecord({
    client,
    recordId: personId,
    data: pruneUndefined({
      phones: buildPhones(phoneNumbers),
      apolloPhone: primaryPhone,
      apolloPhoneStatus: wasRevealed ? 'REVEALED' : 'FAILED',
      // Clear the request id so this reveal can't be replayed/re-matched: the
      // record leaves the PENDING state and no longer satisfies the lookup.
      apolloRequestId: null,
    }),
  });

  return { action: 'updated', recordId: personId, requestId, phone: primaryPhone };
};
