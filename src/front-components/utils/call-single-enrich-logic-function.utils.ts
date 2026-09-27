import { RestApiClient } from 'twenty-client-sdk/rest';
import { enqueueSnackbar } from 'twenty-sdk/front-component';

import { UPDATE_FIELDS_OPTIONS } from 'src/constants/update-fields-options';
import { type EnrichResult } from 'src/types/enrich-result';

const getMatchedMessage = ({
  recordLabel,
  updatedFieldCount,
  fallbackMessage,
}: {
  recordLabel: 'Person' | 'Company';
  updatedFieldCount: number;
  fallbackMessage: string;
}): string => {
  if (updatedFieldCount > 0) {
    return `${recordLabel} enriched — ${updatedFieldCount} field${updatedFieldCount === 1 ? '' : 's'} updated.`;
  }

  return fallbackMessage || `${recordLabel} matched in Apollo; no fields needed updating.`;
};

export const executeSingleEnrichment = async ({
  path,
  recordId,
  recordLabel,
}: {
  path: string;
  recordId: string;
  recordLabel: 'Person' | 'Company';
}): Promise<EnrichResult | null> => {
  try {
    const response = await new RestApiClient().post<EnrichResult>(`/s${path}`, {
      recordId,
      updateFields: UPDATE_FIELDS_OPTIONS.fillEmpty,
    });

    if (!response.success || response.status === 'ERROR') {
      await enqueueSnackbar({
        message: response.error || response.message || `${recordLabel} enrichment failed.`,
        variant: 'error',
      });
      return response;
    }

    if (response.status === 'NOT_FOUND') {
      await enqueueSnackbar({
        message: response.message || `No Apollo match found for this ${recordLabel.toLowerCase()}.`,
        variant: 'warning',
      });
      return response;
    }

    if (response.status === 'SKIPPED') {
      await enqueueSnackbar({
        message: response.message || `${recordLabel} enrichment was skipped.`,
        variant: 'info',
      });
      return response;
    }

    const updatedFieldCount = response.updatedFields?.length ?? 0;
    await enqueueSnackbar({
      message: getMatchedMessage({
        recordLabel,
        updatedFieldCount,
        fallbackMessage: response.message,
      }),
      variant: 'success',
    });

    return response;
  } catch {
    await enqueueSnackbar({
      message: `${recordLabel} enrichment failed.`,
      variant: 'error',
    });
    return null;
  }
};
