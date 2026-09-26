import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';
import { normalizeLinkedinUrl } from 'src/logic-functions/utils/normalize-linkedin-url';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloOrganizationEnrichParams } from 'src/types/apollo-organization-enrich-params';
import { type BulkEnrichInput } from 'src/types/bulk-enrich-input';
import { type CompanyNode } from 'src/types/company-node';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const extractCompanyMatchParams = ({
  node,
}: {
  node: CompanyNode;
  input: BulkEnrichInput;
}): ApolloOrganizationEnrichParams | undefined => {
  const params = pruneUndefined({
    domain: normalizeDomain(node.domainName?.primaryLinkUrl),
    linkedinUrl: normalizeLinkedinUrl(node.linkedinLink?.primaryLinkUrl),
    name: toText(node.name),
  });

  if (Object.keys(params).length === 0) {
    return undefined;
  }

  return params;
};
