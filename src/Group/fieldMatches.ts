import { isEqual, matches, toPath } from 'lodash';
import { FieldSpec } from '../Field/types';

export function fieldMatches(spec: FieldSpec) {
  if (typeof spec === 'symbol') {
    return matches({ key: spec });
  }
  const path = toPath(spec);
  return (field: any) => isEqual(field, { path });
}
