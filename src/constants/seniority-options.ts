import { type SelectOptionMeta } from 'src/types/select-option-meta';

// Apollo person `seniority` values (lowercase in the API, normalized to
// SCREAMING_SNAKE_CASE for storage by normalizeEnumValue).
export const SENIORITY_OPTIONS: readonly SelectOptionMeta[] = [
  { key: 'owner', value: 'OWNER', label: 'Owner', color: 'red', position: 0 },
  { key: 'founder', value: 'FOUNDER', label: 'Founder', color: 'purple', position: 1 },
  { key: 'cSuite', value: 'C_SUITE', label: 'C-Suite', color: 'blue', position: 2 },
  { key: 'partner', value: 'PARTNER', label: 'Partner', color: 'sky', position: 3 },
  { key: 'vp', value: 'VP', label: 'VP', color: 'green', position: 4 },
  { key: 'head', value: 'HEAD', label: 'Head', color: 'turquoise', position: 5 },
  { key: 'director', value: 'DIRECTOR', label: 'Director', color: 'orange', position: 6 },
  { key: 'manager', value: 'MANAGER', label: 'Manager', color: 'pink', position: 7 },
  { key: 'senior', value: 'SENIOR', label: 'Senior', color: 'yellow', position: 8 },
  { key: 'entry', value: 'ENTRY', label: 'Entry', color: 'cyan', position: 9 },
  { key: 'intern', value: 'INTERN', label: 'Intern', color: 'gray', position: 10 },
  { key: 'unpaid', value: 'UNPAID', label: 'Unpaid', color: 'brown', position: 11 },
];
