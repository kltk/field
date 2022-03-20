import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import { GroupContext } from '../Group/types';
import { FieldContext } from './types';

export function createFieldContext<T, O>(
  group: GroupContext<T, O>,
): FieldContext<T, O> {
  const key = Symbol();
  group.registerField({ key });

  const context = {} as FieldContext<T, O>;
  const methods = {
    getMeta() {
      return group.getField(key)!;
    },
    setMeta(changed) {
      return group.setField(key, changed);
    },
    getValue() {
      const { path } = context.getMeta();
      return group.getFieldValue(path!);
    },
    setValue(value) {
      const { path } = context.getMeta();
      return group.setFieldValue(path!, value);
    },
    getErrors() {
      return context.getMeta().errors || [];
    },
    setErrors(errors) {
      return context.updateMeta({ errors });
    },

    updateMeta(changed) {
      return group.updateField(key, changed);
    },
    validate() {
      return context.getMeta()?.validate?.();
    },
    hasValue() {
      const { path } = context.getMeta();
      return group.hasFieldValue(path!);
    },

    useMeta() {
      return context.useSelector(() => context.getMeta());
    },
    useValue() {
      return context.useSelector(() => context.getValue());
    },
    useErrors() {
      return context.useSelector(() => context.getErrors());
    },

    unregister() {
      return context.unregisterField({ key });
    },
  } as FieldContext<T, O>;
  return extend(context, group, methods);
}

export function useFieldContext<T, O>(context: GroupContext<T, O>) {
  return React.useMemo(() => createFieldContext(context), [context]);
}
