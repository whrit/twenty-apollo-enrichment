import { RestApiClient } from 'twenty-client-sdk/rest';
import { enqueueSnackbar } from 'twenty-sdk/front-component';

export const execute = async ({
  path,
  recordIds,
}: {
  path: string;
  recordIds: string[];
}) => {
  // The per-action cap is configurable server-side (APOLLO_MAX_BULK_ENRICH) and
  // not visible to the browser, so the server enforces it and returns a message
  // that this handler surfaces below.
  try {
    const client = new RestApiClient();

    const response = (await client.post(`/s${path}`, { recordIds })) as
      | { success?: boolean; message?: string }
      | undefined;

    // The route returns HTTP 200 with { success:false, message } for expected
    // refusals (for example, over the configured bulk cap), so inspect the body.
    if (response && response.success === false) {
      await enqueueSnackbar({
        message: response.message ?? 'Enrichment could not be completed.',
        variant: 'error',
      });

      return;
    }

    await enqueueSnackbar({
      message: `Enriched ${recordIds.length > 1 ? 'records.' : 'record.'}`,
      variant: 'success',
    });
  } catch {
    await enqueueSnackbar({
      message: 'Records enrichment failed',
      variant: 'error',
    });
  }
};
