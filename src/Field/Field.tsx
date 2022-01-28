import React from 'react';
import { context } from '../utils/context';
import { FieldContext, NamePath } from '../utils/types';
import { useMeta } from '../utils/useMeta';
import { useRender } from '../utils/useRender';
import { useFieldContext } from './FieldContext';

export type FieldProps<Value> = Partial<{
  path?: NamePath;
  initial?: Value;
  validate?: (context: FieldContext, value: any) => void | Promise<void>;
  dependencies?: NamePath[];
  normalize?: string | ((...rest: any[]) => any);
  trigger?: string;
  valueName?: string;
  children?:
    | React.ReactNode
    | ((context: FieldContext, meta: any) => React.ReactNode);
}>;

export function Field<Value = any>(props: FieldProps<Value>) {
  const { path = '', initial } = props;

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

  useMeta(fieldContext, props);

  return useRender(fieldContext, props);
}
