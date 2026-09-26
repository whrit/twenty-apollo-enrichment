import { isObject } from '@sniptt/guards';

import { apolloFetch } from 'src/logic-functions/utils/apollo-fetch';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';

export const postApolloSingleEnrich = async <TData>({
  method,
  path,
  body,
  extractEntity,
  isMatched,
  includeRequestId = false,
}: {
  method: 'GET' | 'POST';
  path: string;
  body?: Record<string, unknown>;
  extractEntity: (json: Record<string, unknown>) => unknown;
  isMatched: (entity: unknown) => boolean;
  // Only the single /people/match path with an async phone reveal in flight
  // should surface request_id, so the phone webhook can later correlate it.
  includeRequestId?: boolean;
}): Promise<ApolloEnrichResult<TData>> => {
  const result = await apolloFetch({ method, path, body });

  if (!result.ok) {
    return { outcome: 'error', httpStatus: result.httpStatus, message: result.message };
  }

  const entity = extractEntity(result.json);

  if (!isObject(entity) || !isMatched(entity)) {
    return { outcome: 'not_found', httpStatus: result.httpStatus };
  }

  return {
    outcome: 'matched',
    httpStatus: result.httpStatus,
    data: entity as TData,
    requestId: includeRequestId ? toText(result.json.request_id) : undefined,
  };
};
