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
  readCompanyEnrichmentPreviewRecord,
  type CompanyEnrichmentPreviewRecord,
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

const getPreviewRows = (record: CompanyEnrichmentPreviewRecord): EnrichmentPreviewRow[] => [
  { label: 'Status', value: record.apolloEnrichmentStatus, kind: 'enum' },
  { label: 'Last enriched', value: record.apolloLastEnrichedAt, kind: 'date-time' },
  { label: 'Industry', value: record.apolloIndustry },
  { label: 'Employees', value: record.apolloEmployees, kind: 'number' },
  { label: 'Annual revenue', value: record.apolloAnnualRevenue, kind: 'number' },
  { label: 'Founded year', value: record.apolloFoundedYear, kind: 'number' },
  { label: 'Keywords', value: record.apolloKeywords, kind: 'array' },
  { label: 'Technologies', value: record.apolloTechnologies, kind: 'array' },
  { label: 'Total funding', value: record.apolloTotalFunding, kind: 'number' },
  { label: 'Latest funding stage', value: record.apolloLatestFundingStage, kind: 'enum' },
  { label: 'LinkedIn', value: record.apolloLinkedinUrl },
  { label: 'Location', value: record.apolloLocation, kind: 'address' },
  { label: 'Headcount growth (12mo)', value: record.apolloHeadcountGrowth12mo, kind: 'number' },
  { label: 'NAICS codes', value: record.apolloNaicsCodes, kind: 'array' },
];

const CompanyRecordEnrichmentPanel = () => {
  const recordId = useCurrentRecordId();
  const [isRunning, setIsRunning] = useState(false);
  const [preview, setPreview] = useState<CompanyEnrichmentPreviewRecord | null>(null);
  const [updatedFieldCount, setUpdatedFieldCount] = useState(0);
  const [previewReadFailed, setPreviewReadFailed] = useState(false);

  const enrich = async () => {
    if (!recordId || isRunning) return;

    setIsRunning(true);
    setPreviewReadFailed(false);

    try {
      const result = await executeSingleEnrichment({
        path: APOLLO_LOGIC_FUNCTION_CONSTANTS.enrichCompany.path,
        recordId,
        recordLabel: 'Company',
      });

      if (!result || result.status !== 'MATCHED') {
        return;
      }

      setUpdatedFieldCount(result.updatedFields?.length ?? 0);

      try {
        const persistedRecord = await readCompanyEnrichmentPreviewRecord(recordId);
        if (persistedRecord) {
          setPreview(persistedRecord);
          return;
        }
      } catch {
        // The enrichment itself already succeeded. Fall back to the mapped data
        // returned by the logic function instead of turning a preview failure
        // into an enrichment failure.
      }

      if (result.data) {
        setPreview({
          ...(result.data as Omit<CompanyEnrichmentPreviewRecord, 'id'>),
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
          Match this company in Apollo and fill empty firmographic, funding, technology, and profile
          fields.
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
  universalIdentifier: APOLLO_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.companyRecordPanel,
  name: 'company-apollo-enrichment-panel',
  description: 'Visible Apollo enrichment action for Company record pages',
  component: CompanyRecordEnrichmentPanel,
});
