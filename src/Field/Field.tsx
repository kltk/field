import React from 'react';
import { RenderOptions, UniArrObj } from '../types';
import { context } from '../utils/context';
import { getOnlyChild } from '../utils/getOnlyChild';
import { useFieldContext } from './FieldContext';
import { defaultRender } from './render';
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
  const { path = '', initial, validate, depends, children, ...rest } = props;

  const groupContext = React.useContext(context);
  const fieldContext = useFieldContext(groupContext, path);

  if (initial !== undefined) {
    if (!fieldContext.hasValue()) {
      fieldContext.setValue(initial);
    }
  }

  useValidate(fieldContext, validate);

  const control = getOnlyChild(children);
  const { key, errors } = fieldContext.useField() || {};
  const value = fieldContext.useValue();
  const dependValues = fieldContext.useFieldsValue(depends);
  const options = fieldContext.useSelector((root) => ({
    ...root.options,
    ...rest,
  }));

  const data = {
    children: control,
    ...{ key, path, initial, value, errors },
    ...{ depends, dependValues },
    ...options,
  };

  const render = children instanceof Function ? children : defaultRender;

  return render(fieldContext, data) as React.ReactElement;
}
