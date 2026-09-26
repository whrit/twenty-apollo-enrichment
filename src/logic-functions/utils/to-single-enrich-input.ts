import { isObject } from '@sniptt/guards';
import { type RoutePayload } from 'twenty-sdk/define';

import { type SingleEnrichInput } from 'src/types/single-enrich-input';

type SingleEnrichRouteBody = SingleEnrichInput;

export type SingleEnrichTriggerInput = SingleEnrichInput | RoutePayload<SingleEnrichRouteBody>;

const isRoutePayload = (
  input: SingleEnrichTriggerInput,
): input is RoutePayload<SingleEnrichRouteBody> => isObject(input) && 'requestContext' in input;

export const toSingleEnrichInput = (input: SingleEnrichTriggerInput): SingleEnrichInput =>
  isRoutePayload(input) ? (input.body ?? {}) : input;
