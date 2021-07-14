import React from 'react';
import { useFieldContext } from './FieldContext';
import { FieldContext, NamePath } from './types';
import { context } from './utils/context';
import { useRender } from './utils/useRender';

export type FieldProps<Value> = {
  path: NamePath;
  initial?: Value;
  children?:
    | React.ReactNode
    | ((context: FieldContext, meta: any) => React.ReactNode);
};

export function Field<Value = any>(props: FieldProps<Value>) {
  const { path, initial } = props;

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

  return useRender(fieldContext, props);
}
