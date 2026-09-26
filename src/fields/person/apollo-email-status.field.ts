import { defineField, FieldType, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS } from 'twenty-sdk/define';

import {
  APOLLO_FIELD_UNIVERSAL_IDENTIFIERS,
  APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloEmailStatus,
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloEmailStatus',
  label: 'Email Status',
  description: 'Deliverability status of the Apollo email.',
  icon: 'IconMailCheck',
  isNullable: true,
  options: [
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.emailStatus.verified,
      value: 'VERIFIED',
      label: 'Verified',
      color: 'green',
      position: 0,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.emailStatus.guessed,
      value: 'GUESSED',
      label: 'Guessed',
      color: 'yellow',
      position: 1,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.emailStatus.unavailable,
      value: 'UNAVAILABLE',
      label: 'Unavailable',
      color: 'gray',
      position: 2,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.emailStatus.bounced,
      value: 'BOUNCED',
      label: 'Bounced',
      color: 'red',
      position: 3,
    },
    {
      id: APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.emailStatus.pendingManualFulfillment,
      value: 'PENDING_MANUAL_FULFILLMENT',
      label: 'Pending Manual Fulfillment',
      color: 'orange',
      position: 4,
    },
  ],
});
