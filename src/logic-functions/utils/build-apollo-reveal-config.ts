import { getApolloPhoneWebhookUrl } from 'src/logic-functions/utils/get-apollo-phone-webhook-url';
import { isDefined } from 'src/utils/is-defined';

// Reveal flags for /people/match and /people/bulk_match. Personal emails are
// returned synchronously and are always safe to request. Phone numbers are only
// revealed asynchronously via a batch-level webhook that returns a single
// request_id, so `reveal_phone_number` MUST only be requested on the single
// /people/match path (`includePhoneReveal: true`) where that one request_id maps
// to exactly one Person. The bulk path passes `includePhoneReveal: false` so it
// never requests phone reveal nor a webhook_url.
export const buildApolloRevealConfig = ({
  includePhoneReveal,
}: {
  includePhoneReveal: boolean;
}): Record<string, unknown> => {
  const webhookUrl = getApolloPhoneWebhookUrl();

  if (!includePhoneReveal || !isDefined(webhookUrl)) {
    return { reveal_personal_emails: true };
  }

  return {
    reveal_personal_emails: true,
    reveal_phone_number: true,
    webhook_url: webhookUrl,
  };
};
