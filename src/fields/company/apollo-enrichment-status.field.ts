import { defineField, FieldType, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS } from 'twenty-sdk/define';

import {
  APOLLO_FIELD_UNIVERSAL_IDENTIFIERS,
  APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloEnrichmentStatus,
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloEnrichmentStatus',
  label: 'Enrichment Status',
  description: 'Outcome of the latest Apollo enrichment attempt.',
  icon: 'IconProgressCheck',
  isNullable: true,
  options: [
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.companyEnrichmentStatus.matched,
      value: 'MATCHED',
      label: 'Matched',
      color: 'green',
      position: 0,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.companyEnrichmentStatus.notFound,
      value: 'NOT_FOUND',
      label: 'No Match',
      color: 'gray',
      position: 1,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.companyEnrichmentStatus.error,
      value: 'ERROR',
      label: 'Error',
      color: 'red',
      position: 2,
    },
  ],
});
