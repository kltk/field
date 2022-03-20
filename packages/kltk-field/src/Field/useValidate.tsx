import React from 'react';
import { FieldContext, FieldValidate } from './types';

export function useValidate<Value, Options>(
  context: FieldContext<Value, Options>,
  validate?: FieldValidate<Value, Options>,
) {
  React.useEffect(() => {
    context.updateMeta({
      async validate() {
        if (!validate) return;
        try {
          const value = context.getValue();
          await validate(context, value);
          context.updateMeta({ errors: [] });
        } catch (error) {
          const errors = Array.isArray(error) ? error : [error];
          context.updateMeta({ errors });
        }
      },
    });
  }, [context, validate]);
}
