type ApolloEnrichResultBase = {
  httpStatus: number;
  requestId?: string;
};

export type ApolloEnrichResult<TData> =
  | (ApolloEnrichResultBase & { outcome: 'matched'; data: TData })
  | (ApolloEnrichResultBase & { outcome: 'not_found'; message?: string })
  | (ApolloEnrichResultBase & { outcome: 'error'; message: string });
