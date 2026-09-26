import { isObject } from '@sniptt/guards';

// A database-event invocation (e.g. company.created) carries a `name` like
// "company.created" and a top-level `recordId`. Returns the created record's id.
export const extractDatabaseEventRecordId = (
  input: unknown,
): string | undefined => {
  if (!isObject(input)) {
    return undefined;
  }

  const event = input as { name?: unknown; recordId?: unknown };

  if (typeof event.name !== 'string' || !event.name.includes('.')) {
    return undefined;
  }

  return typeof event.recordId === 'string' && event.recordId.trim() !== ''
    ? event.recordId.trim()
    : undefined;
};
