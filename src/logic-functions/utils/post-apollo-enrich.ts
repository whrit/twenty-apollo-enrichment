import { isObject } from '@sniptt/guards';

import { apolloFetch } from 'src/logic-functions/utils/apollo-fetch';
import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';

export const postApolloBulkEnrich = async <TData>({
  path,
  body,
  count,
  extractList,
  isMatched,
}: {
  path: string;
  body: Record<string, unknown>;
  count: number;
  extractList: (json: Record<string, unknown>) => unknown[];
  isMatched: (entity: unknown) => boolean;
}): Promise<ApolloEnrichResult<TData>[]> => {
  if (count === 0) {
    return [];
  }

  const result = await apolloFetch({ method: 'POST', path, body });

  if (!result.ok) {
    return Array.from({ length: count }, () => ({
      outcome: 'error' as const,
      httpStatus: result.httpStatus,
      message: result.message,
    }));
  }

  const entities = extractList(result.json);

  // Apollo bulk endpoints return one batch-level request_id, which cannot be
  // correlated back to an individual record. Phone reveal is therefore never
  // requested on bulk paths, so no requestId is stamped here.
  return Array.from({ length: count }, (_unused, index) => {
    const entity = entities[index];

    if (!isObject(entity) || !isMatched(entity)) {
      return { outcome: 'not_found' as const, httpStatus: result.httpStatus };
    }

    return {
      outcome: 'matched' as const,
      httpStatus: result.httpStatus,
      data: entity as TData,
    };
  });
};
