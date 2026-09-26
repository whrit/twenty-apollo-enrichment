import { isNonEmptyString } from '@sniptt/guards';

import { ApolloConfigError } from 'src/logic-functions/errors/apollo-config-error';

export const getApolloApiKey = (): string => {
  const apiKey = process.env.APOLLO_API_KEY?.trim();

  if (!isNonEmptyString(apiKey)) {
    throw new ApolloConfigError(
      'APOLLO_API_KEY is not set. The workspace admin must configure the Apollo.io API key in Settings -> Apps.',
    );
  }

  return apiKey;
};
