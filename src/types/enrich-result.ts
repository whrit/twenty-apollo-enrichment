export type EnrichmentStatus = 'MATCHED' | 'NOT_FOUND' | 'SKIPPED' | 'ERROR';

export type EnrichResult = {
  success: boolean;
  recordId: string;
  status: EnrichmentStatus;
  updatedFields: string[];
  data?: Record<string, unknown>;
  message: string;
  error?: string;
};
