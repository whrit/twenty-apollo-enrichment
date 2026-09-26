import { isObject } from '@sniptt/guards';

import { APOLLO_BASE_URL } from 'src/constants/apollo-base-url';
import { extractApolloErrorMessage } from 'src/logic-functions/utils/extract-apollo-error-message';
import { getApolloApiKey } from 'src/logic-functions/utils/get-apollo-api-key';

const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 250;
const MAX_RETRY_AFTER_MS = 30_000;

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableStatus = (status: number): boolean => status === 429 || status >= 500;

// Prefer the server-provided Retry-After (seconds) when present, clamped to a
// sane maximum; otherwise fall back to bounded exponential backoff.
const computeBackoffMs = (response: Response, attempt: number): number => {
  const retryAfterHeader = response.headers.get('retry-after');
  if (retryAfterHeader !== null) {
    const retryAfterSeconds = Number.parseInt(retryAfterHeader, 10);
    if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
      return Math.min(retryAfterSeconds * 1000, MAX_RETRY_AFTER_MS);
    }
  }

  return BASE_BACKOFF_MS * 2 ** attempt;
};

export type ApolloFetchResult =
  | { ok: true; httpStatus: number; json: Record<string, unknown> }
  | { ok: false; httpStatus: number; message: string };

// Low-level Apollo REST call. Retries transient failures (network errors, HTTP
// 429, and 5xx responses) with bounded exponential backoff, honoring Retry-After.
export const apolloFetch = async ({
  method,
  path,
  body,
}: {
  method: 'GET' | 'POST';
  path: string;
  body?: Record<string, unknown>;
}): Promise<ApolloFetchResult> => {
  const apiKey = getApolloApiKey();

  for (let attempt = 0; ; attempt++) {
    let response: Response;
    try {
      response = await fetch(`${APOLLO_BASE_URL}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await sleep(BASE_BACKOFF_MS * 2 ** attempt);
        continue;
      }

      const message = error instanceof Error ? error.message : String(error);

      return { ok: false, httpStatus: 0, message: `Apollo.io request failed: ${message}` };
    }

    if (isRetryableStatus(response.status) && attempt < MAX_RETRIES) {
      await sleep(computeBackoffMs(response, attempt));
      continue;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch {
      return {
        ok: false,
        httpStatus: response.status,
        message: `Apollo.io returned a non-JSON response (HTTP ${response.status}).`,
      };
    }

    const responseObject = isObject(json) ? (json as Record<string, unknown>) : {};

    if (!response.ok) {
      return {
        ok: false,
        httpStatus: response.status,
        message: extractApolloErrorMessage({
          json: responseObject,
          httpStatus: response.status,
        }),
      };
    }

    return { ok: true, httpStatus: response.status, json: responseObject };
  }
};
