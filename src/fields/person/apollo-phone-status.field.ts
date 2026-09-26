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
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloPhoneStatus,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloPhoneStatus',
  label: 'Phone Status',
  description: 'Status of the async Apollo phone reveal.',
  icon: 'IconPhoneCall',
  isNullable: true,
  options: [
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.phoneStatus.none,
      value: 'NONE',
      label: 'None',
      color: 'gray',
      position: 0,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.phoneStatus.pending,
      value: 'PENDING',
      label: 'Pending',
      color: 'yellow',
      position: 1,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.phoneStatus.revealed,
      value: 'REVEALED',
      label: 'Revealed',
      color: 'green',
      position: 2,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.phoneStatus.failed,
      value: 'FAILED',
      label: 'Failed',
      color: 'red',
      position: 3,
    },
  ],
});
