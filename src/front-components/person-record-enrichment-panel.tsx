import { useState } from 'react';
import { defineFrontComponent } from 'twenty-sdk/define';
import { useFrontComponentExecutionContext } from 'twenty-sdk/front-component';

import {
  APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  APOLLO_LOGIC_FUNCTION_CONSTANTS,
} from 'src/constants/universal-identifiers';
import { executeSingleEnrichment } from 'src/front-components/utils/call-single-enrich-logic-function.utils';

const PANEL_STYLE = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 10,
  padding: 16,
  fontFamily: 'system-ui, sans-serif',
};

const DESCRIPTION_STYLE = {
  margin: 0,
  color: '#6b7280',
  fontSize: 13,
  lineHeight: 1.45,
};

const BUTTON_STYLE = {
  alignSelf: 'flex-start',
  border: 0,
  borderRadius: 8,
  padding: '9px 13px',
  fontWeight: 600,
  cursor: 'pointer',
  background: '#ffb000',
  color: '#171717',
};

const useCurrentRecordId = (): string | null =>
  useFrontComponentExecutionContext(
    (context) =>
      context.recordId ??
      (context.selectedRecordIds.length === 1 ? context.selectedRecordIds[0] : null),
  );

const PersonRecordEnrichmentPanel = () => {
  const recordId = useCurrentRecordId();
  const [isRunning, setIsRunning] = useState(false);

  const enrich = async () => {
    if (!recordId || isRunning) return;

    setIsRunning(true);
    try {
      await executeSingleEnrichment({
        path: APOLLO_LOGIC_FUNCTION_CONSTANTS.enrichPerson.path,
        recordId,
        recordLabel: 'Person',
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={PANEL_STYLE}>
      <div>
        <strong>Apollo enrichment</strong>
        <p style={DESCRIPTION_STYLE}>
          Match this person in Apollo and fill empty profile fields. Single-record enrichment can
          also request asynchronous phone reveal when configured.
        </p>
      </div>
      <button
        type="button"
        style={{
          ...BUTTON_STYLE,
          opacity: !recordId || isRunning ? 0.55 : 1,
          cursor: !recordId || isRunning ? 'not-allowed' : 'pointer',
        }}
        disabled={!recordId || isRunning}
        onClick={enrich}
      >
        {isRunning ? 'Enriching…' : 'Enrich with Apollo'}
      </button>
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.personRecordPanel,
  name: 'person-apollo-enrichment-panel',
  description: 'Visible Apollo enrichment action for Person record pages',
  component: PersonRecordEnrichmentPanel,
});
