import { type AddressPreviewValue } from 'src/front-components/utils/read-enrichment-preview-record.utils';

export type EnrichmentPreviewRow = {
  label: string;
  value: unknown;
  kind?: 'text' | 'number' | 'date-time' | 'array' | 'address' | 'json-summary' | 'enum';
};

const PREVIEW_STYLE = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
  paddingTop: 4,
};

const PREVIEW_HEADER_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: 600,
  color: '#166534',
};

const PREVIEW_ROWS_STYLE = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 7,
  fontSize: 12,
};

const ROW_STYLE = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
};

const LABEL_STYLE = {
  width: 128,
  flexShrink: 0,
  color: '#6b7280',
};

const VALUE_STYLE = {
  minWidth: 0,
  color: '#171717',
  overflowWrap: 'anywhere' as const,
};

const NOTE_STYLE = {
  margin: 0,
  color: '#6b7280',
  fontSize: 11,
  lineHeight: 1.4,
};

const isEmptyValue = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

const humanizeEnum = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const formatAddress = (value: unknown): string => {
  if (typeof value !== 'object' || value === null) return '';

  const address = value as AddressPreviewValue;
  return [
    address.addressStreet1,
    address.addressStreet2,
    address.addressCity,
    address.addressState,
    address.addressPostcode,
    address.addressCountry,
  ]
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .join(', ');
};

const formatJsonSummary = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `${value.length} ${value.length === 1 ? 'entry' : 'entries'}`;
  }

  if (typeof value === 'object' && value !== null) {
    return `${Object.keys(value as Record<string, unknown>).length} properties`;
  }

  return String(value ?? '');
};

const formatPreviewValue = ({ value, kind = 'text' }: EnrichmentPreviewRow): string => {
  if (isEmptyValue(value)) return '';

  if (kind === 'array') {
    return Array.isArray(value) ? value.map(String).join(', ') : String(value);
  }

  if (kind === 'number') {
    return typeof value === 'number' && Number.isFinite(value)
      ? new Intl.NumberFormat().format(value)
      : String(value);
  }

  if (kind === 'date-time') {
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
  }

  if (kind === 'address') {
    return formatAddress(value);
  }

  if (kind === 'json-summary') {
    return formatJsonSummary(value);
  }

  if (kind === 'enum') {
    return humanizeEnum(String(value));
  }

  return String(value);
};

export const EnrichmentResultPreview = ({
  rows,
  updatedFieldCount,
}: {
  rows: EnrichmentPreviewRow[];
  updatedFieldCount: number;
}) => {
  const displayRows = rows
    .map((row) => ({ ...row, formattedValue: formatPreviewValue(row) }))
    .filter((row) => row.formattedValue.length > 0);

  if (displayRows.length === 0) return null;

  return (
    <div style={PREVIEW_STYLE}>
      <div style={PREVIEW_HEADER_STYLE}>
        <span>✓</span>
        <span>
          Saved to Twenty
          {updatedFieldCount > 0
            ? ` · ${updatedFieldCount} field${updatedFieldCount === 1 ? '' : 's'} updated`
            : ''}
        </span>
      </div>
      <div style={PREVIEW_ROWS_STYLE}>
        {displayRows.map((row) => (
          <div key={row.label} style={ROW_STYLE}>
            <span style={LABEL_STYLE}>{row.label}</span>
            <span style={VALUE_STYLE}>{row.formattedValue}</span>
          </div>
        ))}
      </div>
      <p style={NOTE_STYLE}>
        This preview is read back from Twenty after enrichment. The native fields below may refresh
        when the record view reloads.
      </p>
    </div>
  );
};
