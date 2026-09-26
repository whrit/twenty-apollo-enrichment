import { isArray } from '@sniptt/guards';

import { EMAIL_STATUS_OPTIONS } from 'src/constants/email-status-options';
import { SENIORITY_OPTIONS } from 'src/constants/seniority-options';
import { buildAllowedValues } from 'src/logic-functions/utils/build-allowed-values';
import { buildEmails } from 'src/logic-functions/utils/build-emails';
import { buildFullName } from 'src/logic-functions/utils/build-full-name';
import { buildLinks } from 'src/logic-functions/utils/build-links';
import { normalizeLinkedinUrl } from 'src/logic-functions/utils/normalize-linkedin-url';
import { pickSelect } from 'src/logic-functions/utils/pick-select';
import { toJsonArray } from 'src/logic-functions/utils/to-json-array';
import { toStringArray } from 'src/logic-functions/utils/to-string-array';
import { toText } from 'src/logic-functions/utils/to-text';
import { type ApolloPersonData } from 'src/types/apollo-person-data';
import { type MappedRecord } from 'src/types/mapped-record';
import { pruneUndefined } from 'src/utils/prune-undefined';

const SENIORITY_VALUES = buildAllowedValues(SENIORITY_OPTIONS);
const EMAIL_STATUS_VALUES = buildAllowedValues(EMAIL_STATUS_OPTIONS);

export const mapPerson = (personData: ApolloPersonData): MappedRecord => {
  const personalEmails = isArray(personData.personal_emails) ? personData.personal_emails : [];

  const standard = pruneUndefined({
    name: buildFullName({
      firstName: personData.first_name,
      lastName: personData.last_name,
      fullName: personData.name,
    }),
    jobTitle: toText(personData.title),
    linkedinLink: buildLinks({
      url: normalizeLinkedinUrl(personData.linkedin_url),
    }),
    emails: buildEmails([personData.email, ...personalEmails]),
    city: toText(personData.city),
  });

  const apollo = pruneUndefined({
    apolloId: toText(personData.id),
    apolloHeadline: toText(personData.headline),
    apolloSeniority: pickSelect({
      raw: personData.seniority,
      allowedValues: SENIORITY_VALUES,
    }),
    apolloDepartments: toStringArray(personData.departments),
    apolloEmailStatus: pickSelect({
      raw: personData.email_status,
      allowedValues: EMAIL_STATUS_VALUES,
    }),
    apolloPhotoUrl: toText(personData.photo_url),
    apolloEmploymentHistory: toJsonArray(personData.employment_history),
    apolloPersonalEmails: toStringArray(personData.personal_emails),
  });

  return { standard, apollo };
};
