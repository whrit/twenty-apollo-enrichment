import { type AddressValue } from 'src/types/address-value';
import { type LinksValue } from 'src/types/links-value';

export type CompanyNode = {
  id: string;
  name?: string | null;
  domainName?: Partial<LinksValue> | null;
  linkedinLink?: Partial<LinksValue> | null;
  address?: Partial<AddressValue> | null;
  apolloId?: string | null;
  apolloLastEnrichedAt?: string | null;
  [key: string]: unknown;
};
