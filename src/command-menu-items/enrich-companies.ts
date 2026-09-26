import {
  defineCommandMenuItem,
  isSelectAll,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

export default defineCommandMenuItem({
  universalIdentifier: '474b1f8b-1f74-4eb6-810f-2f8dd328a1e7',
  availabilityObjectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.company.universalIdentifier,
  frontComponentUniversalIdentifier: 'dc31f739-fc3e-447d-b582-c957b56e7e90',
  label: 'Enrich companies',
  availabilityType: 'RECORD_SELECTION',
  conditionalAvailabilityExpression: !isSelectAll,
});
