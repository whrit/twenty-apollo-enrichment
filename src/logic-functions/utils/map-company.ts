import { buildAddress } from 'src/logic-functions/utils/build-address';
import { buildLinks } from 'src/logic-functions/utils/build-links';
import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';
import { normalizeLinkedinUrl } from 'src/logic-functions/utils/normalize-linkedin-url';
import { toNumber } from 'src/logic-functions/utils/to-number';
import { toStringArray } from 'src/logic-functions/utils/to-string-array';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloOrganizationData } from 'src/types/apollo-organization-data';
import { type MappedRecord } from 'src/types/mapped-record';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const mapCompany = (
  companyData: ApolloOrganizationData,
): MappedRecord => {
  const address = buildAddress({
    street1: companyData.street_address,
    city: companyData.city,
    postcode: companyData.postal_code,
    state: companyData.state,
    country: companyData.country,
  });

  const standard = pruneUndefined({
    name: toText(companyData.name),
    domainName: buildLinks({
      url: normalizeDomain(companyData.primary_domain),
    }),
    linkedinLink: buildLinks({
      url: normalizeLinkedinUrl(companyData.linkedin_url),
    }),
    address,
  });

  const apollo = pruneUndefined({
    apolloId: toText(companyData.id),
    apolloIndustry: toText(companyData.industry),
    apolloEmployees: toNumber(companyData.estimated_num_employees),
    apolloAnnualRevenue: toNumber(companyData.annual_revenue),
    apolloFoundedYear: toNumber(companyData.founded_year),
    apolloKeywords: toStringArray(companyData.keywords),
    apolloTechnologies: toStringArray(companyData.technology_names),
    apolloTotalFunding: toNumber(companyData.total_funding),
    apolloLatestFundingStage: toText(companyData.latest_funding_stage),
    apolloLinkedinUrl: toText(companyData.linkedin_url),
    apolloPhone: toText(companyData.primary_phone?.number),
    apolloLocation: address,
    apolloHeadcountGrowth6mo: toNumber(
      companyData.organization_headcount_six_month_growth,
    ),
    apolloHeadcountGrowth12mo: toNumber(
      companyData.organization_headcount_twelve_month_growth,
    ),
    apolloNaicsCodes: toStringArray(companyData.naics_codes),
  });

  return { standard, apollo };
};
