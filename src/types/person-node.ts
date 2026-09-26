import { type EmailsValue } from 'src/types/emails-value';
import { type FullNameValue } from 'src/types/full-name-value';
import { type LinksValue } from 'src/types/links-value';
import { type PhonesValue } from 'src/types/phones-value';

export type PersonNode = {
  id: string;
  name?: Partial<FullNameValue> | null;
  emails?: Partial<EmailsValue> | null;
  phones?: Partial<PhonesValue> | null;
  jobTitle?: string | null;
  linkedinLink?: Partial<LinksValue> | null;
  company?: {
    id?: string;
    name?: string | null;
    domainName?: Partial<LinksValue> | null;
  } | null;
  apolloId?: string | null;
  apolloLastEnrichedAt?: string | null;
  [key: string]: unknown;
};
