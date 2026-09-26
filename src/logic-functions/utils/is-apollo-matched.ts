import { isObject } from '@sniptt/guards';

import { toText } from 'src/logic-functions/utils/to-text';
import { isDefined } from 'src/utils/is-defined';

// Apollo returns HTTP 200 even when nothing matched, with a mostly-null entity
// (an `id` may still be present). Treat as matched only when real data exists.
export const isApolloPersonMatched = (person: unknown): boolean => {
  if (!isObject(person)) {
    return false;
  }

  const record = person as Record<string, unknown>;

  return (
    isDefined(toText(record.name)) ||
    isDefined(toText(record.first_name)) ||
    isDefined(toText(record.last_name)) ||
    isDefined(toText(record.email)) ||
    isDefined(toText(record.title))
  );
};

export const isApolloOrganizationMatched = (organization: unknown): boolean => {
  if (!isObject(organization)) {
    return false;
  }

  const record = organization as Record<string, unknown>;

  return (
    isDefined(toText(record.name)) || isDefined(toText(record.primary_domain))
  );
};
