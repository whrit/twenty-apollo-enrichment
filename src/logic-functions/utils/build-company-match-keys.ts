import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';
import { normalizeLinkedinUrl } from 'src/logic-functions/utils/normalize-linkedin-url';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type CompanyMatchKeys } from 'src/types/company-match-keys';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const buildCompanyMatchKeys = (personData: ApolloPersonData): CompanyMatchKeys => {
  const organization = personData.organization ?? {};

  return pruneUndefined({
    apolloId: toText(organization.id) ?? toText(personData.organization_id),
    website: normalizeDomain(organization.primary_domain ?? organization.website_url),
    linkedinUrl: normalizeLinkedinUrl(organization.linkedin_url),
    name: toText(organization.name) ?? toText(personData.organization_name),
  });
};
