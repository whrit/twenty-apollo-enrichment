export type ApolloPhoneWebhookPayload = {
  request_id?: unknown;
  phone_numbers?: unknown[] | null;
  person?: { phone_numbers?: unknown[] | null } | null;
  people?: unknown[] | null;
  [key: string]: unknown;
};

export type ApolloPhoneWebhookResult =
  | { action: 'updated'; recordId: string; requestId: string; phone?: string }
  | { skipped: true; reason: string; requestId?: string }
  | { error: string };
