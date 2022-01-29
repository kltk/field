import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import { GroupContext } from '../Group/types';
import { NamePath } from '../types';
import { FieldContext, FieldMeta } from './types';

export function createFieldContext<T extends {}>(
  context: GroupContext<T>,
  sym: symbol,
  path: NamePath,
): FieldContext {
  const fieldContext = {} as FieldContext;
  return extend(fieldContext, context, {
    hasValue() {
      return context.hasFieldValue(path);
    },
    getValue<Value>() {
      return context.getFieldValue<Value>(path);
    },
    setValue<Value>(value: Value) {
      return context.setFieldValue(path, value);
    },

    getMeta() {
      return context.getFieldsMeta([sym])[0];
    },
    updateMeta(changed: Partial<FieldMeta>) {
      const meta = fieldContext.getMeta();
      context.setFieldMeta(sym, { ...meta, ...changed, sym });
    },
  });
}

export function useFieldContext<T>(context: GroupContext<T>, path: NamePath) {
  const [sym] = React.useState(() => Symbol());
  React.useEffect(() => context.registerField(sym), [context, sym]);

  return React.useMemo(
    () => createFieldContext(context, sym, path),
    [context, path, sym],
  );
}
