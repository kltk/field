import { toPath } from 'lodash';
import { FieldPath } from '../Field/types';

export function toValuePath(path: FieldPath) {
  return ['value', ...toPath(path)];
}
