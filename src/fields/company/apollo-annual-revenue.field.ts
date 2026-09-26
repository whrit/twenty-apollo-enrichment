import {
  defineField,
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { APOLLO_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.company.apolloAnnualRevenue,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  type: FieldType.NUMBER,
  name: 'apolloAnnualRevenue',
  label: 'Annual Revenue',
  description: 'Annual revenue from Apollo.',
  icon: 'IconCoin',
  isNullable: true,
});
