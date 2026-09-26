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
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloSeniority,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloSeniority',
  label: 'Seniority',
  description: 'Apollo canonical seniority.',
  icon: 'IconStairsUp',
  isNullable: true,
  options: [
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.owner,
      value: 'OWNER',
      label: 'Owner',
      color: 'red',
      position: 0,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.founder,
      value: 'FOUNDER',
      label: 'Founder',
      color: 'purple',
      position: 1,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.cSuite,
      value: 'C_SUITE',
      label: 'C-Suite',
      color: 'blue',
      position: 2,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.partner,
      value: 'PARTNER',
      label: 'Partner',
      color: 'sky',
      position: 3,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.vp,
      value: 'VP',
      label: 'VP',
      color: 'green',
      position: 4,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.head,
      value: 'HEAD',
      label: 'Head',
      color: 'turquoise',
      position: 5,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.director,
      value: 'DIRECTOR',
      label: 'Director',
      color: 'orange',
      position: 6,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.manager,
      value: 'MANAGER',
      label: 'Manager',
      color: 'pink',
      position: 7,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.senior,
      value: 'SENIOR',
      label: 'Senior',
      color: 'yellow',
      position: 8,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.entry,
      value: 'ENTRY',
      label: 'Entry',
      color: 'cyan',
      position: 9,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.intern,
      value: 'INTERN',
      label: 'Intern',
      color: 'gray',
      position: 10,
    },
    {
      universalIdentifier:
        APOLLO_SELECT_OPTION_UNIVERSAL_IDENTIFIERS.seniority.unpaid,
      value: 'UNPAID',
      label: 'Unpaid',
      color: 'brown',
      position: 11,
    },
  ],
});
