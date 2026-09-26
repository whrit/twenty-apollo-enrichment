import { isArray, isObject, isString } from '@sniptt/guards';

import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPhoneWebhookPayload } from 'src/types/apollo-phone-webhook-payload';
import { isDefined } from 'src/utils/is-defined';

const MAX_PHONE_NUMBERS = 25;

const toPhoneList = (value: unknown): unknown[] => (isArray(value) ? value : []);

// Pulls phone-number strings out of an Apollo phone-reveal webhook payload,
// tolerating both bare strings and Apollo's phone objects.
export const extractApolloPhoneNumbers = (
  payload: ApolloPhoneWebhookPayload,
): string[] => {
  const rawEntries = [
    ...toPhoneList(payload.phone_numbers),
    ...toPhoneList(payload.person?.phone_numbers),
    ...toPhoneList(payload.people).flatMap((person) =>
      isObject(person) ? toPhoneList((person as ApolloPhonePayload).phone_numbers) : [],
    ),
  ];

  const numbers: string[] = [];
  for (const entry of rawEntries.slice(0, MAX_PHONE_NUMBERS)) {
    if (isString(entry)) {
      const value = toText(entry);
      if (isDefined(value)) {
        numbers.push(value);
      }
      continue;
    }

    if (isObject(entry)) {
      const record = entry as Record<string, unknown>;
      const value =
        toText(record.sanitized_number) ??
        toText(record.raw_number) ??
        toText(record.number);
      if (isDefined(value)) {
        numbers.push(value);
      }
    }
  }

  return numbers;
};

type ApolloPhonePayload = { phone_numbers?: unknown[] | null };
