import { buildLinks } from 'src/logic-functions/utils/build-links';
import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';
import { normalizeLinkedinUrl } from 'src/logic-functions/utils/normalize-linkedin-url';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const buildCompanyCreateData = (
  personData: ApolloPersonData,
): Record<string, unknown> => {
  const organization = personData.organization ?? {};

  return pruneUndefined<unknown>({
    name: toText(organization.name) ?? toText(personData.organization_name),
    domainName: buildLinks({
      url: normalizeDomain(
        organization.primary_domain ?? organization.website_url,
      ),
    }),
    linkedinLink: buildLinks({
      url: normalizeLinkedinUrl(organization.linkedin_url),
    }),
    apolloId: toText(organization.id) ?? toText(personData.organization_id),
    apolloIndustry: toText(organization.industry),
  });
};
