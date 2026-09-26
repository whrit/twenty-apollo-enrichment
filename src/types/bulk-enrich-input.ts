import { type UpdateFieldsOption } from 'src/types/update-fields-option';

export type RecordInput = string | { id?: string | null } | null | undefined;

export type BulkEnrichInput = {
  records: RecordInput | RecordInput[];
  updateFields?: UpdateFieldsOption;
  minLikelihood?: number;
};
