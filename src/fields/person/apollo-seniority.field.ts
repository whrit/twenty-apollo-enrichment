import { defineField, FieldType, STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS } from 'twenty-sdk/define';

import { APOLLO_FIELD_UNIVERSAL_IDENTIFIERS } from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: APOLLO_FIELD_UNIVERSAL_IDENTIFIERS.person.apolloSeniority,
  objectUniversalIdentifier: STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.SELECT,
  name: 'apolloSeniority',
  label: 'Seniority',
  description: 'Apollo canonical seniority.',
  icon: 'IconStairsUp',
  isNullable: true,
  options: [
    {
      value: 'OWNER',
      label: 'Owner',
      color: 'red',
      position: 0,
    },
    {
      value: 'FOUNDER',
      label: 'Founder',
      color: 'purple',
      position: 1,
    },
    {
      value: 'C_SUITE',
      label: 'C-Suite',
      color: 'blue',
      position: 2,
    },
    {
      value: 'PARTNER',
      label: 'Partner',
      color: 'sky',
      position: 3,
    },
    {
      value: 'VP',
      label: 'VP',
      color: 'green',
      position: 4,
    },
    {
      value: 'HEAD',
      label: 'Head',
      color: 'turquoise',
      position: 5,
    },
    {
      value: 'DIRECTOR',
      label: 'Director',
      color: 'orange',
      position: 6,
    },
    {
      value: 'MANAGER',
      label: 'Manager',
      color: 'pink',
      position: 7,
    },
    {
      value: 'SENIOR',
      label: 'Senior',
      color: 'yellow',
      position: 8,
    },
    {
      value: 'ENTRY',
      label: 'Entry',
      color: 'cyan',
      position: 9,
    },
    {
      value: 'INTERN',
      label: 'Intern',
      color: 'gray',
      position: 10,
    },
    {
      value: 'UNPAID',
      label: 'Unpaid',
      color: 'brown',
      position: 11,
    },
  ],
});
