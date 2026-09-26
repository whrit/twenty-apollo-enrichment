import { buildPersonNameParam } from 'src/logic-functions/utils/build-person-name-param';
import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPersonEnrichParams } from 'src/types/apollo-person-enrich-params';
import { type BulkEnrichInput } from 'src/types/bulk-enrich-input';
import { type PersonNode } from 'src/types/person-node';
import { isDefined } from 'src/utils/is-defined';
import { pruneUndefined } from 'src/utils/prune-undefined';

export const extractPersonMatchParams = ({
  node,
}: {
  node: PersonNode;
  input: BulkEnrichInput;
}): ApolloPersonEnrichParams | undefined => {
  const existingApolloId = toText(node.apolloId);
  if (isDefined(existingApolloId)) {
    return { apolloId: existingApolloId };
  }

  const params = pruneUndefined({
    email: toText(node.emails?.primaryEmail),
    linkedinUrl: toText(node.linkedinLink?.primaryLinkUrl),
    name: buildPersonNameParam({
      firstName: node.name?.firstName,
      lastName: node.name?.lastName,
    }),
    organizationName: toText(node.company?.name),
    // Use the company's real primary domain; a normalized company NAME is junk.
    domain: normalizeDomain(node.company?.domainName?.primaryLinkUrl),
  });

  // Apollo cannot match a bare organization name without a person identifier.
  const hasPersonIdentifier =
    isDefined(params.email) ||
    isDefined(params.linkedinUrl) ||
    isDefined(params.name);

  if (!hasPersonIdentifier) {
    return undefined;
  }

  return params;
};
