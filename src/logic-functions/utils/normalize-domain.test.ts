import { describe, expect, it } from 'vitest';

import { normalizeDomain } from 'src/logic-functions/utils/normalize-domain';

describe('normalizeDomain', () => {
  it('normalizes schemes, paths, www, and case', () => {
    expect(normalizeDomain('HTTPS://WWW.Example.com/path')).toBe('example.com');
  });

  it('returns undefined for empty values', () => {
    expect(normalizeDomain('   ')).toBeUndefined();
  });
});
