import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import { GroupContext } from '../Group/types';
import { castType, CastTypeFn } from '../utils/castType';
import { FieldContext } from './types';

const castContext: CastTypeFn<Partial<FieldContext>> = castType;

export function createFieldContext(group: GroupContext): FieldContext {
  const key = Symbol();
  group.registerField({ key });

  const context = {} as FieldContext;
  const methods = castContext({
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
  });
  return extend(context, group, methods);
}

export function useFieldContext<T>(context: GroupContext<T>) {
  return React.useMemo(() => createFieldContext(context), [context]);
}
