import React from 'react';
import { FieldProps } from '../Field';
import { FieldContext } from './types';

export function useMeta<Value>(
  context: FieldContext,
  props: FieldProps<Value>,
) {
  const { validate } = props;

  React.useEffect(() => {
    context.updateMeta({
      async validate() {
        if (!validate) return;
        try {
          const value = context.getValue();
          await validate(context, value);
          context.updateMeta({ errors: [] });
        } catch (error) {
          const errors = error instanceof Array ? error : [error];
          context.updateMeta({ errors });
        }
      },
    });
  }, [context, validate]);
}
