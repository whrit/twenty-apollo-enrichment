import { describe, expect, it } from 'vitest';

import { UPDATE_FIELDS_OPTIONS } from 'src/constants/update-fields-options';
import { resolveUpdateFieldsMode } from 'src/logic-functions/utils/resolve-update-fields-mode';

describe('resolveUpdateFieldsMode', () => {
  it('defaults to fill-empty', () => {
    expect(resolveUpdateFieldsMode()).toEqual({
      shouldPersist: true,
      overrideExistingValues: false,
    });
  });

  it('supports preview mode', () => {
    expect(resolveUpdateFieldsMode(UPDATE_FIELDS_OPTIONS.no)).toEqual({
      shouldPersist: false,
      overrideExistingValues: false,
    });
  });

  it('supports overwrite mode', () => {
    expect(resolveUpdateFieldsMode(UPDATE_FIELDS_OPTIONS.overwrite)).toEqual({
      shouldPersist: true,
      overrideExistingValues: true,
    });
  });
});
