import { CoreApiClient } from 'twenty-client-sdk/core';
import { defineLogicFunction, type RoutePayload } from 'twenty-sdk/define';

import { APOLLO_LOGIC_FUNCTION_CONSTANTS } from 'src/constants/universal-identifiers';
import { apolloPhoneWebhookHandler } from 'src/logic-functions/handlers/apollo-phone-webhook-handler';
import {
  type ApolloPhoneWebhookPayload,
  type ApolloPhoneWebhookResult,
} from 'src/types/apollo-phone-webhook-payload';
import { isDefined } from 'src/utils/is-defined';

const apolloPhoneWebhookRouteHandler = async (
  routePayload: RoutePayload<ApolloPhoneWebhookPayload>,
): Promise<ApolloPhoneWebhookResult> => {
  const body = routePayload.body;

  if (!isDefined(body)) {
    return { error: 'Apollo phone webhook payload was empty' };
  }

  const providedSecret =
    routePayload.queryStringParameters?.secret ?? routePayload.headers?.['x-apollo-webhook-secret'];

  return apolloPhoneWebhookHandler({
    payload: body,
    client: new CoreApiClient(),
    providedSecret,
  });
};

export default defineLogicFunction({
  universalIdentifier: APOLLO_LOGIC_FUNCTION_CONSTANTS.phoneWebhook.universalIdentifier,
  name: 'apollo-phone-webhook',
  description:
    'Receives Apollo async phone-reveal callbacks and writes the revealed phone number onto the correlated Person, matched by apolloRequestId.',
  timeoutSeconds: 60,
  handler: apolloPhoneWebhookRouteHandler,
  httpRouteTriggerSettings: {
    path: APOLLO_LOGIC_FUNCTION_CONSTANTS.phoneWebhook.path,
    httpMethod: 'POST',
    isAuthRequired: false,
  },
});
