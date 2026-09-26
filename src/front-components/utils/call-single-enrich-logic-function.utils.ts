import { RestApiClient } from 'twenty-client-sdk/rest';
import { enqueueSnackbar } from 'twenty-sdk/front-component';

import { UPDATE_FIELDS_OPTIONS } from 'src/constants/update-fields-options';
import { type EnrichResult } from 'src/types/enrich-result';

export const executeSingleEnrichment = async ({
  path,
  recordId,
  recordLabel,
}: {
  path: string;
  recordId: string;
  recordLabel: 'Person' | 'Company';
}): Promise<void> => {
  try {
    const response = (await new RestApiClient().post(`/s${path}`, {
      recordId,
      updateFields: UPDATE_FIELDS_OPTIONS.fillEmpty,
    })) as EnrichResult;

    if (!response.success) {
      await enqueueSnackbar({
        message: response.message || `${recordLabel} enrichment failed.`,
        variant: 'error',
      });
      return;
    }

    const updatedFieldCount = response.updatedFields?.length ?? 0;
    await enqueueSnackbar({
      message:
        updatedFieldCount > 0
          ? `${recordLabel} enriched with ${updatedFieldCount} updated field${updatedFieldCount === 1 ? '' : 's'}.`
          : `${recordLabel} enrichment completed.`,
      variant: 'success',
    });
  } catch {
    await enqueueSnackbar({
      message: `${recordLabel} enrichment failed.`,
      variant: 'error',
    });
  }
};
