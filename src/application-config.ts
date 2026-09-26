import { defineApplication, FieldType } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  APOLLO_API_KEY_VARIABLE_UNIVERSAL_IDENTIFIER,
  APOLLO_AUTO_ENRICH_COMPANIES_VARIABLE_UNIVERSAL_IDENTIFIER,
  APOLLO_MAX_BULK_ENRICH_VARIABLE_UNIVERSAL_IDENTIFIER,
  APOLLO_PHONE_WEBHOOK_URL_VARIABLE_UNIVERSAL_IDENTIFIER,
  APOLLO_WEBHOOK_SECRET_VARIABLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: 'Apollo for Twenty',
  description: 'Enrich People and Companies with Apollo.io using your own Apollo API credits.',
  logo: 'public/apollo-icon.png',
  category: 'Enrichment',
  author: 'YOUR_GITHUB_USERNAME',
  galleryImages: ['public/gallery/cover.png'],
  websiteUrl: 'https://github.com/YOUR_GITHUB_USERNAME/twenty-apollo-enrichment',
  issueReportUrl: 'https://github.com/YOUR_GITHUB_USERNAME/twenty-apollo-enrichment/issues',
  applicationVariables: {
    APOLLO_API_KEY: {
      universalIdentifier: APOLLO_API_KEY_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Apollo API key',
      description:
        'Apollo.io API key used for Person and Company enrichment. Uses your own Apollo credits.',
      isSecret: true,
      isRequired: true,
    },
    APOLLO_PHONE_WEBHOOK_URL: {
      universalIdentifier: APOLLO_PHONE_WEBHOOK_URL_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Phone webhook URL',
      description:
        "Optional public URL resolving to this app's /webhook/apollo-phone route. Enables asynchronous phone reveal.",
      isSecret: false,
    },
    APOLLO_WEBHOOK_SECRET: {
      universalIdentifier: APOLLO_WEBHOOK_SECRET_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Phone webhook secret',
      description:
        'Optional shared secret required by the public phone webhook. Append ?secret=<value> to the webhook URL or send x-apollo-webhook-secret.',
      isSecret: true,
    },
    APOLLO_MAX_BULK_ENRICH: {
      universalIdentifier: APOLLO_MAX_BULK_ENRICH_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Maximum bulk enrichment size',
      description:
        'Maximum records allowed in one bulk enrichment. Protects Apollo credits from accidental large selections.',
      type: FieldType.NUMBER,
      value: 50,
      isSecret: false,
    },
    APOLLO_AUTO_ENRICH_COMPANIES: {
      universalIdentifier: APOLLO_AUTO_ENRICH_COMPANIES_VARIABLE_UNIVERSAL_IDENTIFIER,
      label: 'Automatically enrich new companies',
      description:
        'Automatically enrich newly created Companies using fill-empty mode. Disabled by default.',
      type: FieldType.BOOLEAN,
      value: false,
      isSecret: false,
    },
  },
});
