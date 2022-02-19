import React from 'react';
import shallowEqual from 'shallowequal';
import { RenderOptions, UniArrObj } from '../types';
import { context } from '../utils/context';
import { useFieldContext } from './FieldContext';
import { useDefaultRender } from './render';
import { FieldPath, FieldRender, FieldValidate } from './types';
import { useValidate } from './useValidate';

type FieldPropsBase<Value> = {
  path?: FieldPath;
  initial?: Value;
  validate?: FieldValidate<Value>;
  depends?: UniArrObj<FieldPath>;
  children?: FieldRender | React.ReactNode;
};

export type FieldProps<Value = any> = FieldPropsBase<Value> & RenderOptions;

export function Field<Value = any>(props: FieldProps<Value>) {
  const { path, initial, validate, depends, children } = props;

  const groupContext = React.useContext(context);
  const fieldContext = useFieldContext(groupContext);

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

  const useRender = children instanceof Function ? children : useDefaultRender;

  const nodes = useRender(fieldContext, { ...props, dependValues });

  React.useEffect(() => fieldContext.unregister, []);

  return nodes as React.ReactElement;
}
