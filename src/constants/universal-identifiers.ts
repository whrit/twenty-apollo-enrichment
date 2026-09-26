export const APPLICATION_UNIVERSAL_IDENTIFIER =
  '9dbd3ab1-f785-4004-8499-22bf7c7c19fa';

export const DEFAULT_ROLE_UNIVERSAL_IDENTIFIER =
  '5ac69291-12f8-471b-a544-f54e1bb427cb';

export const APOLLO_API_KEY_VARIABLE_UNIVERSAL_IDENTIFIER =
  '432580ce-39bc-4c90-a6d7-d10b48b9973a';

export const APOLLO_PHONE_WEBHOOK_URL_VARIABLE_UNIVERSAL_IDENTIFIER =
  '5ab0c9a8-cef2-4eef-bcc2-13b56a3fbf53';

export const APOLLO_WEBHOOK_SECRET_VARIABLE_UNIVERSAL_IDENTIFIER =
  'c1a5e7be-5111-4ce6-bc53-062a1755d646';

export const APOLLO_MAX_BULK_ENRICH_VARIABLE_UNIVERSAL_IDENTIFIER =
  '82ec4b3e-58bd-4e6d-be29-07e040c94027';

export const APOLLO_AUTO_ENRICH_COMPANIES_VARIABLE_UNIVERSAL_IDENTIFIER =
  '8fcc6792-8e0d-4c09-952b-40fa8659dd30';

export const APOLLO_LOGIC_FUNCTION_CONSTANTS = {
  enrichPeople: { universalIdentifier: 'bdd6a4ca-922d-48f6-95b7-97acacfc12b4', path: '/apollo/enrich-people' },
  enrichPerson: { universalIdentifier: '103850f5-ca15-4624-b3e5-155ee60c798c', path: '/apollo/enrich-person' },
  enrichCompanies: { universalIdentifier: '1e59b468-bc4f-4765-9440-bfb4c6b6e10c', path: '/apollo/enrich-companies' },
  enrichCompany: { universalIdentifier: '3fc610a7-3e44-4d79-9838-73c87ef51d6d', path: '/apollo/enrich-company' },
  autoEnrichCompany: { universalIdentifier: '215f37e2-ce2d-425a-9b08-0e08ad00706b' },
  phoneWebhook: { universalIdentifier: '6542e22c-8dff-43d0-ab37-f156be386aee', path: '/webhook/apollo-phone' },
} as const;

export const APOLLO_FIELD_UNIVERSAL_IDENTIFIERS = {
  person: {
    apolloId: '03e2f267-f7d2-4e40-8e32-7b4f10d9e0f8',
    apolloHeadline: '3706312e-d525-4c93-8046-1dcebcf1bc85',
    apolloSeniority: 'ce608810-a901-498d-93f3-5f0f3bec459a',
    apolloDepartments: '450c32c7-806d-4729-ad92-7c25946bcea6',
    apolloEmailStatus: '5c38074e-9956-4af1-ba52-88e4b386ef71',
    apolloPhotoUrl: 'db19e7c1-2442-4de1-b8d3-439676af58a9',
    apolloEmploymentHistory: '21646e35-b914-40df-92c3-d7b6f57e76a8',
    apolloPersonalEmails: '8bbf1a0c-2184-40d7-b0ef-e75c13722b54',
    apolloPhone: '1c6d02f0-c628-4e61-ab46-8aef6af4c573',
    apolloPhoneStatus: '333114f6-4d5e-40f5-8dcd-cf766f292ddc',
    apolloRequestId: '71ad085d-6612-4926-842a-b21a210b69de',
    apolloEnrichmentStatus: 'f1cae674-993e-441d-a7a4-15f2039af51d',
    apolloLastEnrichedAt: '0676385f-8e82-40cc-96fe-aa4147913617',
    apolloRawPayload: '9660859e-ac5b-47ba-9925-7e6fc3243a4d',
  },
  company: {
    apolloId: 'a807df72-b0ac-4dd8-8326-23e10f0e8c72',
    apolloIndustry: '69747705-fdce-41cb-b364-1787bd1e7169',
    apolloEmployees: 'fb1164c3-a3e5-48ac-a3f5-076b5c33d029',
    apolloAnnualRevenue: '40cb0031-7d01-412e-b13c-5a4b66f58fb6',
    apolloFoundedYear: 'ef9f9346-d8aa-4970-b9ba-1ab4a02fec24',
    apolloKeywords: 'e9a3fa49-48a7-4684-8cd3-24ff046f4147',
    apolloTechnologies: '1fc37eb9-4b77-448f-92fa-1a15f4e53d83',
    apolloTotalFunding: '3b70dc2f-2986-400a-93ef-4b6a1ec097d5',
    apolloLatestFundingStage: '374588c1-1c37-4514-902a-c34b73658015',
    apolloLinkedinUrl: '1038a1ca-8197-4ead-a81f-feb7b19237d8',
    apolloPhone: '02ad7251-f0fb-46e5-bd94-a00d480bfd25',
    apolloLocation: '87b9c03a-f059-4abb-992b-a2e57d9b3e9c',
    apolloHeadcountGrowth6mo: 'da1c91ba-5e2b-488d-adce-f8a57a8eb78c',
    apolloHeadcountGrowth12mo: '4c3665d9-61b6-4b83-bbb4-c880ae83749a',
    apolloNaicsCodes: 'cafeb50b-98ea-4855-8ed3-7cb599f9eb5d',
    apolloEnrichmentStatus: '63f39235-182f-4c1c-83ad-903988ea94e2',
    apolloLastEnrichedAt: '233d2944-dcd4-4b73-9299-edc741d23a93',
    apolloRawPayload: 'a2f1ba61-21f0-4dd1-9aee-d27b2a55f848',
  },
} as const;

export const APOLLO_VIEW_UNIVERSAL_IDENTIFIERS = {
  enrichedCompanies: 'cf781cef-661d-4445-84f0-8d0f3224dd14',
  enrichedPeople: 'fe578b7f-9e4d-4960-bb66-66b63450194e',
} as const;

export const APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS = {
  enrichCompanies: 'dc31f739-fc3e-447d-b582-c957b56e7e90',
  enrichPeople: 'b50b9615-ef3b-41f2-ac33-dcdb434cb730',
};

export const APOLLO_COMMAND_MENU_ITEM_UNIVERSAL_IDENTIFIERS = {
  enrichCompanies: '474b1f8b-1f74-4eb6-810f-2f8dd328a1e7',
  enrichPeople: '7ef377e7-70ab-4766-9829-ea5fd6d38dd5',
};

export const APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS = {
  personEnrichmentStatus: {
    matched: '4dafc199-67f2-4c51-a28c-85ae6d74847e',
    notFound: '083311a9-6ea9-4e4d-9311-fa9a2ca01c8d',
    error: 'fbfabcd1-6b0a-44b5-a517-7597f9baf3f4',
  },
  companyEnrichmentStatus: {
    matched: 'd83ead57-b618-4d46-bdd8-20892c33f54f',
    notFound: 'be64f77c-5123-49b1-b05a-08f6430cbdd8',
    error: '0be86255-6c01-4cde-959e-2b28e53872f4',
  },
  seniority: {
    owner: 'd823abcc-3e45-40f7-a4b3-8daea01d15ef',
    founder: 'b3a4f0c8-a46a-4903-95d4-ecd3c0a61f62',
    cSuite: 'a291d895-2012-4f78-bc23-7913632a16cc',
    partner: '5b844af9-8b26-4388-acd6-e3eeca5aae0d',
    vp: '85973976-9327-4c08-affd-ca160d1a51ab',
    head: '17bc3ace-2e0f-4441-9fa8-7590cfdf446e',
    director: '36d7eaa3-8ceb-4137-a0bb-e1dc33c4b547',
    manager: 'cb7a041e-b660-4417-be9b-63744758b431',
    senior: 'f6110163-f781-42db-9fe7-f45d848f2461',
    entry: '6dec29d4-25b2-4b98-8036-eba805988178',
    intern: '1f54d868-3d1c-4bb2-984d-1784b975ce10',
    unpaid: '57a0257e-bfd2-4447-baa7-2ff2d2039dce',
  },
  emailStatus: {
    verified: 'a2981b67-3344-4878-bcdc-3ae351f76d3c',
    guessed: 'f5e64e91-5e1d-4239-9481-7b9823a90002',
    unavailable: 'bed4c74a-5b6d-419d-9ebe-b2f370361a27',
    bounced: 'c84d7217-b792-4622-917e-1388917e0fe6',
    pendingManualFulfillment: 'c7a1f9d3-0003-45a0-a698-f9f7d675ab10',
  },
  phoneStatus: {
    none: 'a158034c-c503-4db6-90c8-542d78c0b795',
    pending: 'c9b0c64b-0e84-4a10-9e99-be9351a3c8f4',
    revealed: '4c3e8d9b-75ba-48d9-82d4-fb1ab444e503',
    failed: 'aec06c3e-ee87-4e67-ae7b-2ef40815463f',
  },
} as const;
