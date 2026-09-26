import { toText } from 'src/logic-functions/utils/to-text';

// Optional shared secret for the public phone webhook. When set, the webhook
// handler requires callers to present a matching secret (via ?secret=<value>
// query param or x-apollo-webhook-secret header). When unset, the webhook stays
// open (backward compatible).
export const getApolloWebhookSecret = (): string | undefined =>
  toText(process.env.APOLLO_WEBHOOK_SECRET);
