import { toText } from 'src/logic-functions/utils/to-text';

// Apollo's async phone reveal POSTs its result to a publicly reachable webhook.
// TODO: the app cannot infer its own public base URL at runtime, so the workspace
// admin must set APOLLO_PHONE_WEBHOOK_URL to the public URL that resolves to this
// app's phone webhook httpRoute (APOLLO_LOGIC_FUNCTION_CONSTANTS.phoneWebhook.path,
// i.e. `<public-app-base>/webhook/apollo-phone`). When unset, sync enrichment still
// runs fully and only the async phone reveal is skipped.
export const getApolloPhoneWebhookUrl = (): string | undefined =>
  toText(process.env.APOLLO_PHONE_WEBHOOK_URL);
