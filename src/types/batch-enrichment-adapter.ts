import { type CoreApiClient } from 'twenty-client-sdk/core';

import { type ApolloEnrichResult } from 'src/types/apollo-enrich-result';
import { type BulkEnrichInput } from 'src/types/bulk-enrich-input';
import { type CompanyIdByMatchKeyCache } from 'src/types/company-id-by-match-key-cache';

export type BatchEnrichmentAdapter<TNode, TData, TParams> = {
  objectNameSingular: string;
  noIdentifierMessage: string;
  readRecords: (args: { client: CoreApiClient; recordIds: string[] }) => Promise<TNode[]>;
  getNodeId: (node: TNode) => string;
  getLastEnrichedAt: (node: TNode) => string | null | undefined;
  extractParams: (args: { node: TNode; input: BulkEnrichInput }) => TParams | undefined;
  enrichBatch: (params: TParams[]) => Promise<ApolloEnrichResult<TData>[]>;
  buildMatchedData: (args: {
    client: CoreApiClient;
    node: TNode;
    outcome: Extract<ApolloEnrichResult<TData>, { outcome: 'matched' }>;
    enrichedAt: string;
    companyIdByMatchKeyCache: CompanyIdByMatchKeyCache;
    overrideExistingValues: boolean;
    shouldPersist: boolean;
  }) => Promise<{
    mappedData: Record<string, unknown>;
    persistData: Record<string, unknown>;
  }>;
  updateOne: (args: {
    client: CoreApiClient;
    recordId: string;
    data: Record<string, unknown>;
  }) => Promise<void>;
  updateManyStatus: (args: {
    client: CoreApiClient;
    recordIds: string[];
    data: Record<string, unknown>;
  }) => Promise<void>;
};
