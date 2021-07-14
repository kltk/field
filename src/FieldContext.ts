import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import { FieldContext, GroupContext, NamePath } from './types';

export function createFieldContext<T extends {}>(
  context: GroupContext<T>,
  path: NamePath,
): FieldContext {
  return extend({}, context, {
    hasValue() {
      return context.hasFieldValue(path);
    },
    getValue<Value>() {
      return context.getFieldValue<Value>(path);
    },
    setValue<Value>(value: Value) {
      return context.setFieldValue(path, value);
    },
  });
}

export function useFieldContext<T>(context: GroupContext<T>, path: NamePath) {
  return React.useMemo(
    () => createFieldContext(context, path),
    [context, path],
  );
}
