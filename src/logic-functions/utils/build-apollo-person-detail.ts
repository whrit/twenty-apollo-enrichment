import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';
import { pruneUndefined } from 'src/utils/prune-undefined';

// Maps our internal match params to an Apollo /people/match detail object.
export const buildApolloPersonDetail = (entry: ApolloPersonEnrichParams): Record<string, unknown> =>
  pruneUndefined({
    id: entry.apolloId,
    name: entry.name,
    email: entry.email,
    organization_name: entry.organizationName,
    domain: entry.domain,
    linkedin_url: entry.linkedinUrl,
  });
