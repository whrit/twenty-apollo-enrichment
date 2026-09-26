import {
  definePageLayoutTab,
  PageLayoutTabLayoutMode,
  STANDARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default definePageLayoutTab({
  universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personTab,
  pageLayoutUniversalIdentifier:
    STANDARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIERS.personRecordPage.universalIdentifier,
  title: 'Apollo',
  position: 90,
  icon: 'IconSparkles',
  layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
  widgets: [
    {
      universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personTabPanelWidget,
      title: 'Apollo Enrichment',
      type: 'FRONT_COMPONENT',
      configuration: {
        configurationType: 'FRONT_COMPONENT',
        frontComponentUniversalIdentifier:
          APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.personRecordPanel,
      },
    },
    {
      universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personTabFieldsWidget,
      title: 'Apollo Data',
      type: 'FIELDS',
      configuration: {
        configurationType: 'FIELDS',
        viewUniversalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personFieldsView,
      },
    },
  ],
});
