import React from 'react';
import { context } from '../utils/context';
import { useRender } from '../utils/useRender';
import { useFieldContext } from './FieldContext';
import { FieldContext, FieldPath, FieldValidate } from './types';
import { useValidate } from './useValidate';

export type FieldProps<Value = any> = Partial<{
  path?: FieldPath;
  initial?: Value;
  validate?: FieldValidate<Value>;
  dependencies?: FieldPath[];
  normalize?: string | ((...rest: any[]) => any);
  trigger?: string;
  valueName?: string;
  children?:
    | React.ReactNode
    | ((context: FieldContext, meta: any) => React.ReactNode);
}>;

export function Field<Value = any>(props: FieldProps<Value>) {
  const { path = '', initial, validate } = props;

  const groupContext = React.useContext(context);
  const fieldContext = useFieldContext(groupContext, path);

  const update = React.useCallback(() => {
    if (initial !== undefined) {
      if (!fieldContext.hasValue()) {
        fieldContext.setValue(initial);
      }
    }
  }, [fieldContext, initial]);

  React.useState(update);
  React.useEffect(update);

  useValidate(fieldContext, validate);

  return useRender(fieldContext, props);
}
