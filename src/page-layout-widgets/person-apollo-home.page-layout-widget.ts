import {
  definePageLayoutWidget,
  PageLayoutTabLayoutMode,
  PageLayoutWidgetVerticalListHeightBehavior,
  STANDARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import {
  APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS,
} from 'src/constants/universal-identifiers';

export default definePageLayoutWidget({
  universalIdentifier: APOLLO_RECORD_PAGE_UNIVERSAL_IDENTIFIERS.personHomePanelWidget,
  pageLayoutTabUniversalIdentifier:
    STANDARD_PAGE_LAYOUT_UNIVERSAL_IDENTIFIERS.personRecordPage.tabs.home.universalIdentifier,
  title: 'Apollo Enrichment',
  type: 'FRONT_COMPONENT',
  position: {
    layoutMode: PageLayoutTabLayoutMode.VERTICAL_LIST,
    index: 1,
    heightBehavior: PageLayoutWidgetVerticalListHeightBehavior.FIT_CONTENT,
  },
  configuration: {
    configurationType: 'FRONT_COMPONENT',
    frontComponentUniversalIdentifier:
      APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.personRecordPanel,
  },
});
