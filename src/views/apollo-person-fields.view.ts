import { defineView, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS, ViewType } from 'twenty-sdk/define';

import {
  APOLLO_FIELD_UNIVERSAL_IDENTIFIERS,
  APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personFieldsView,
  name: 'Apollo Person Fields',
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: ViewType.FIELDS_WIDGET,
  fields: [
    {
      universalIdentifier: '155c5d01-ee42-4a4e-acf9-4904f95e6ea2',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloEnrichmentStatus,
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: '07339396-a2de-4a7a-b4a2-e7429408dccd',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloLastEnrichedAt,
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: 'cde8c826-c69b-48d3-a6c4-17054fc1fcf6',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloHeadline,
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: '3fda71d8-52bb-44c2-9f53-007ebe8b6f5a',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloSeniority,
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: 'ec1a1fea-c801-49fa-a513-d659e0c6ce98',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloDepartments,
      position: 4,
      isVisible: true,
    },
    {
      universalIdentifier: '4ed4ccc8-5304-40b2-a82b-24a18d6132bf',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloEmailStatus,
      position: 5,
      isVisible: true,
    },
    {
      universalIdentifier: '9d3fd154-aed1-470d-93c0-d9cb3ad86c2b',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloPersonalEmails,
      position: 6,
      isVisible: true,
    },
    {
      universalIdentifier: 'aa592a00-282a-46a5-ad5f-ff1903ea8458',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloPhone,
      position: 7,
      isVisible: true,
    },
    {
      universalIdentifier: 'e7571bcd-5a58-4524-b804-51e8ea9dd6ce',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloPhoneStatus,
      position: 8,
      isVisible: true,
    },
    {
      universalIdentifier: 'e90307c7-44d9-4608-b638-78a3457c4126',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloEmploymentHistory,
      position: 9,
      isVisible: true,
    },
  ],
});
