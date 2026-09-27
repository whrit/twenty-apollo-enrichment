import { useState } from 'react';
import { defineFrontComponent } from 'twenty-sdk/define';
import { useFrontComponentExecutionContext } from 'twenty-sdk/front-component';

import {
  APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  APOLLO_LOGIC_FUNCTION_CONSTANTS,
} from 'src/constants/universal-identifiers';
import {
  EnrichmentResultPreview,
  type EnrichmentPreviewRow,
} from 'src/front-components/components/enrichment-result-preview';
import { executeSingleEnrichment } from 'src/front-components/utils/call-single-enrich-logic-function.utils';
import {
  readPersonEnrichmentPreviewRecord,
  type PersonEnrichmentPreviewRecord,
} from 'src/front-components/utils/read-enrichment-preview-record.utils';

const PANEL_STYLE = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
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

const PREVIEW_WARNING_STYLE = {
  margin: 0,
  color: '#92400e',
  fontSize: 11,
  lineHeight: 1.4,
};

const useCurrentRecordId = (): string | null =>
  useFrontComponentExecutionContext(
    (context) =>
      context.recordId ??
      (context.selectedRecordIds.length === 1 ? context.selectedRecordIds[0] : null),
  );

const getPreviewRows = (record: PersonEnrichmentPreviewRecord): EnrichmentPreviewRow[] => [
  { label: 'Status', value: record.apolloEnrichmentStatus, kind: 'enum' },
  { label: 'Last enriched', value: record.apolloLastEnrichedAt, kind: 'date-time' },
  { label: 'Headline', value: record.apolloHeadline },
  { label: 'Seniority', value: record.apolloSeniority, kind: 'enum' },
  { label: 'Departments', value: record.apolloDepartments, kind: 'array' },
  { label: 'Email status', value: record.apolloEmailStatus, kind: 'enum' },
  { label: 'Personal emails', value: record.apolloPersonalEmails, kind: 'array' },
  { label: 'Phone', value: record.apolloPhone },
  { label: 'Phone status', value: record.apolloPhoneStatus, kind: 'enum' },
  { label: 'Employment history', value: record.apolloEmploymentHistory, kind: 'json-summary' },
];

const PersonRecordEnrichmentPanel = () => {
  const recordId = useCurrentRecordId();
  const [isRunning, setIsRunning] = useState(false);
  const [preview, setPreview] = useState<PersonEnrichmentPreviewRecord | null>(null);
  const [updatedFieldCount, setUpdatedFieldCount] = useState(0);
  const [previewReadFailed, setPreviewReadFailed] = useState(false);

  const enrich = async () => {
    if (!recordId || isRunning) return;

    setIsRunning(true);
    setPreviewReadFailed(false);

    try {
      const result = await executeSingleEnrichment({
        path: APOLLO_LOGIC_FUNCTION_CONSTANTS.enrichPerson.path,
        recordId,
        recordLabel: 'Person',
      });

      if (!result || result.status !== 'MATCHED') {
        return;
      }

      setUpdatedFieldCount(result.updatedFields?.length ?? 0);

      try {
        const persistedRecord = await readPersonEnrichmentPreviewRecord(recordId);
        if (persistedRecord) {
          setPreview(persistedRecord);
          return;
        }
      } catch {
        // Keep the successful enrichment result even when the read-after-write
        // preview request cannot be completed.
      }

      if (result.data) {
        setPreview({
          ...(result.data as Omit<PersonEnrichmentPreviewRecord, 'id'>),
          id: recordId,
        });
      } else {
        setPreviewReadFailed(true);
      }
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
      {preview ? (
        <EnrichmentResultPreview
          rows={getPreviewRows(preview)}
          updatedFieldCount={updatedFieldCount}
        />
      ) : null}
      {previewReadFailed ? (
        <p style={PREVIEW_WARNING_STYLE}>
          Enrichment was saved, but the live preview could not be refreshed. Reopen the record to
          see the persisted Apollo fields.
        </p>
      ) : null}
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.personRecordPanel,
  name: 'person-apollo-enrichment-panel',
  description: 'Visible Apollo enrichment action for Person record pages',
  component: PersonRecordEnrichmentPanel,
});
