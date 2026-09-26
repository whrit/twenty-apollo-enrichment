import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  APOLLO_FIELD_UNIVERSAL_IDENTIFIERS,
  APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloEnrichmentStatus,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloEnrichmentStatus',
  label: 'Enrichment Status',
  description: 'Outcome of the latest Apollo enrichment attempt.',
  icon: 'IconProgressCheck',
  isNullable: true,
  options: [
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.personEnrichmentStatus.matched,
      value: 'MATCHED',
      label: 'Matched',
      color: 'green',
      position: 0,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.personEnrichmentStatus.notFound,
      value: 'NOT_FOUND',
      label: 'No Match',
      color: 'gray',
      position: 1,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.personEnrichmentStatus.error,
      value: 'ERROR',
      label: 'Error',
      color: 'red',
      position: 2,
    },
  ],
});
