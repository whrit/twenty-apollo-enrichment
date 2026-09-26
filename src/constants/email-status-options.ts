import { type SelectOptionMeta } from 'src/types/select-option-meta';

// Apollo person `email_status` values.
export const EMAIL_STATUS_OPTIONS: readonly SelectOptionMeta[] = [
  { key: 'verified', value: 'VERIFIED', label: 'Verified', color: 'green', position: 0 },
  { key: 'guessed', value: 'GUESSED', label: 'Guessed', color: 'yellow', position: 1 },
  { key: 'unavailable', value: 'UNAVAILABLE', label: 'Unavailable', color: 'gray', position: 2 },
  { key: 'bounced', value: 'BOUNCED', label: 'Bounced', color: 'red', position: 3 },
  {
    key: 'pendingManualFulfillment',
    value: 'PENDING_MANUAL_FULFILLMENT',
    label: 'Pending Manual Fulfillment',
    color: 'orange',
    position: 4,
  },
];
