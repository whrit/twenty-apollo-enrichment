import { isObject } from '@sniptt/guards';
import { CoreApiClient } from 'twenty-client-sdk/core';

export type AddressPreviewValue = {
  addressStreet1?: string | null;
  addressStreet2?: string | null;
  addressCity?: string | null;
  addressPostcode?: string | null;
  addressState?: string | null;
  addressCountry?: string | null;
};

export type CompanyEnrichmentPreviewRecord = {
  id: string;
  apolloEnrichmentStatus?: string | null;
  apolloLastEnrichedAt?: string | null;
  apolloIndustry?: string | null;
  apolloEmployees?: number | null;
  apolloAnnualRevenue?: number | null;
  apolloFoundedYear?: number | null;
  apolloKeywords?: string[] | null;
  apolloTechnologies?: string[] | null;
  apolloTotalFunding?: number | null;
  apolloLatestFundingStage?: string | null;
  apolloLinkedinUrl?: string | null;
  apolloLocation?: AddressPreviewValue | null;
  apolloHeadcountGrowth12mo?: number | null;
  apolloNaicsCodes?: string[] | null;
};

export type PersonEnrichmentPreviewRecord = {
  id: string;
  apolloEnrichmentStatus?: string | null;
  apolloLastEnrichedAt?: string | null;
  apolloHeadline?: string | null;
  apolloSeniority?: string | null;
  apolloDepartments?: string[] | null;
  apolloEmailStatus?: string | null;
  apolloPersonalEmails?: string[] | null;
  apolloPhone?: string | null;
  apolloPhoneStatus?: string | null;
  apolloEmploymentHistory?: unknown;
};

const getFirstNode = <T extends { id: string }>(
  result: unknown,
  objectPluralName: string,
): T | null => {
  if (!isObject(result)) return null;

  const resultRecord = result as Record<string, unknown>;
  const connection = resultRecord[objectPluralName];
  if (!isObject(connection)) return null;

  const connectionRecord = connection as Record<string, unknown>;
  if (!Array.isArray(connectionRecord.edges)) return null;

  const firstEdge = connectionRecord.edges[0];
  if (!isObject(firstEdge)) return null;

  const firstEdgeRecord = firstEdge as Record<string, unknown>;
  if (!isObject(firstEdgeRecord.node)) return null;

  return firstEdgeRecord.node as T;
};

export const readCompanyEnrichmentPreviewRecord = async (
  recordId: string,
): Promise<CompanyEnrichmentPreviewRecord | null> => {
  const result = await new CoreApiClient().query({
    companies: {
      __args: { filter: { id: { in: [recordId] } }, first: 1 },
      edges: {
        node: {
          id: true,
          apolloEnrichmentStatus: true,
          apolloLastEnrichedAt: true,
          apolloIndustry: true,
          apolloEmployees: true,
          apolloAnnualRevenue: true,
          apolloFoundedYear: true,
          apolloKeywords: true,
          apolloTechnologies: true,
          apolloTotalFunding: true,
          apolloLatestFundingStage: true,
          apolloLinkedinUrl: true,
          apolloLocation: {
            addressStreet1: true,
            addressStreet2: true,
            addressCity: true,
            addressPostcode: true,
            addressState: true,
            addressCountry: true,
          },
          apolloHeadcountGrowth12mo: true,
          apolloNaicsCodes: true,
        },
      },
    },
  });

  return getFirstNode<CompanyEnrichmentPreviewRecord>(result, 'companies');
};

export const readPersonEnrichmentPreviewRecord = async (
  recordId: string,
): Promise<PersonEnrichmentPreviewRecord | null> => {
  const result = await new CoreApiClient().query({
    people: {
      __args: { filter: { id: { in: [recordId] } }, first: 1 },
      edges: {
        node: {
          id: true,
          apolloEnrichmentStatus: true,
          apolloLastEnrichedAt: true,
          apolloHeadline: true,
          apolloSeniority: true,
          apolloDepartments: true,
          apolloEmailStatus: true,
          apolloPersonalEmails: true,
          apolloPhone: true,
          apolloPhoneStatus: true,
          apolloEmploymentHistory: true,
        },
      },
    },
  });

  return getFirstNode<PersonEnrichmentPreviewRecord>(result, 'people');
};
