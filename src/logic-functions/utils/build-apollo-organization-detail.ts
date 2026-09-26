import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';
import { pruneUndefined } from 'src/utils/prune-undefined';

// Maps our internal match params to an Apollo organization enrich detail object.
export const buildApolloOrganizationDetail = (
  entry: ApolloOrganizationEnrichParams,
): Record<string, unknown> =>
  pruneUndefined({
    domain: entry.domain,
    name: entry.name,
    linkedin_url: entry.linkedinUrl,
  });
