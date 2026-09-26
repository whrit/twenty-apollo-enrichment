import { defineView, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS, ViewType } from 'twenty-sdk/define';

import {
  APOLLO_FIELD_UNIVERSAL_IDENTIFIERS,
  APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.companyFieldsView,
  name: 'Apollo Company Fields',
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: ViewType.FIELDS_WIDGET,
  fields: [
    {
      universalIdentifier: '6cd37110-b07d-41df-abbd-29bb8df617dd',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloEnrichmentStatus,
      position: 0,
      isVisible: true,
    },
    {
      universalIdentifier: 'e6c5ba5e-b0a0-457d-9e39-983411d11e4c',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloLastEnrichedAt,
      position: 1,
      isVisible: true,
    },
    {
      universalIdentifier: '2e58eac9-bd2c-4639-8f3c-49c350ba933f',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloIndustry,
      position: 2,
      isVisible: true,
    },
    {
      universalIdentifier: '5b1cb37e-80fb-4b57-baca-0ebd4a4cba60',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloEmployees,
      position: 3,
      isVisible: true,
    },
    {
      universalIdentifier: 'ffca7cfb-90d2-46be-a40d-98f6d12b68e2',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloAnnualRevenue,
      position: 4,
      isVisible: true,
    },
    {
      universalIdentifier: 'b0536a25-0b7b-4c24-84d1-033710b4cbb0',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloFoundedYear,
      position: 5,
      isVisible: true,
    },
    {
      universalIdentifier: 'c5eda959-3220-49aa-942c-14e75177619b',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloKeywords,
      position: 6,
      isVisible: true,
    },
    {
      universalIdentifier: 'e6130970-8324-44ed-af0c-1f792c3ba022',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloTechnologies,
      position: 7,
      isVisible: true,
    },
    {
      universalIdentifier: '7edde2f0-3300-4411-9e65-4cf4fc26813f',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloTotalFunding,
      position: 8,
      isVisible: true,
    },
    {
      universalIdentifier: '9eacc08a-ca2e-430b-9bbf-993f26712358',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloLatestFundingStage,
      position: 9,
      isVisible: true,
    },
    {
      universalIdentifier: '23f10a8b-93b7-4bd7-a6f2-040ccc0f1d45',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloLinkedinUrl,
      position: 10,
      isVisible: true,
    },
    {
      universalIdentifier: '051fbdf6-0472-4c64-88be-6598770c9706',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloLocation,
      position: 11,
      isVisible: true,
    },
    {
      universalIdentifier: 'bc55ba4f-353b-4462-a61c-ce782c72b0ac',
      fieldMetadataUniversalIdentifier:
        APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloHeadcountGrowth12mo,
      position: 12,
      isVisible: true,
    },
    {
      universalIdentifier: '67f282a6-5081-4aa9-8d2b-4d075a7422fb',
      fieldMetadataUniversalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloNaicsCodes,
      position: 13,
      isVisible: true,
    },
  ],
});
