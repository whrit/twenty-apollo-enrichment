import { isNonEmptyString, isObject, isString } from '@sniptt/guards';

import { isDefined } from 'src/utils/is-defined';

const extractMessageFromValue = (
  messageValue: unknown,
): string | undefined => {
  if (isNonEmptyString(messageValue)) {
    return messageValue;
  }

  if (Array.isArray(messageValue)) {
    const joinedMessages = messageValue.filter(isString).join('; ');

    return isNonEmptyString(joinedMessages) ? joinedMessages : undefined;
  }

  return undefined;
};

export const extractApolloErrorMessage = ({
  json,
  httpStatus,
}: {
  json: Record<string, unknown>;
  httpStatus: number;
}): string => {
  const errorField = json.error;

  if (isObject(errorField)) {
    const messageFromErrorObject = extractMessageFromValue(
      (errorField as Record<string, unknown>).message,
    );
    if (isDefined(messageFromErrorObject)) {
      return messageFromErrorObject;
    }
  }

  const messageFromTopLevelField =
    extractMessageFromValue(errorField) ??
    extractMessageFromValue(json.message) ??
    extractMessageFromValue(json.errors);
  if (isDefined(messageFromTopLevelField)) {
    return messageFromTopLevelField;
  }

  return `Apollo.io request failed (HTTP ${httpStatus}).`;
};
