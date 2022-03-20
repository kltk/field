import React from 'react';
import shallowEqual from 'shallowequal';
import { UniArrObj } from '../types';
import { context } from '../utils/context';
import { useFieldContext } from './FieldContext';
import { useDefaultRender } from './render';
import { FieldContext, FieldPath, FieldRender, FieldValidate } from './types';
import { useValidate } from './useValidate';

function getRender<Value, Options>(
  context: FieldContext<Value, Options>,
  props: FieldProps<Value, Options>,
) {
  const { render, children } = props;
  const globalRender = context.state.render;
  if (children instanceof Function) return children;
  if (render instanceof Function) return render;
  if (globalRender instanceof Function) return globalRender;
  return (useDefaultRender as unknown) as FieldRender<Options>;
}

export type FieldProps<Value, Options> = {
  path?: FieldPath;
  initial?: Value;
  validate?: FieldValidate<Value, Options>;
  depends?: UniArrObj<FieldPath>;
  render?: FieldRender<Options>;
  children?: FieldRender<Options> | React.ReactNode;
} & Options;

export function Field<Value, Options>(props: FieldProps<Value, Options>) {
  const { path, initial, validate, depends } = props;

  const groupContext = React.useContext(context);
  if (!groupContext) {
    throw new Error(
      'Can not get GroupContext, Field must be a descendants of the Form/Group.',
    );
  }
  const fieldContext = useFieldContext<Value, Options>(groupContext);

  if (!shallowEqual(path, fieldContext.getMeta().path)) {
    fieldContext.updateMeta({ path });
  }

  if (initial !== undefined) {
    if (!fieldContext.hasValue()) {
      fieldContext.setValue(initial);
    }
  }

  useValidate(fieldContext, validate);
  const dependValues = fieldContext.useFieldsValue(depends);

  const useRender = getRender(fieldContext, props);

  const nodes = useRender(fieldContext, { ...props, dependValues });

  React.useEffect(() => fieldContext.unregister, []);

  return nodes as React.ReactElement;
}
