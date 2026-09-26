import {
  defineCommandMenuItem,
  isSelectAll,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

export default defineCommandMenuItem({
  universalIdentifier: '7ef377e7-70ab-4766-9829-ea5fd6d38dd5',
  availabilityObjectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  frontComponentUniversalIdentifier: 'b50b9615-ef3b-41f2-ac33-dcdb434cb730',
  label: 'Enrich people',
  availabilityType: 'RECORD_SELECTION',
  conditionalAvailabilityExpression: !isSelectAll,
});
