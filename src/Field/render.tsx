import React from 'react';
import { getOnlyChild } from '../utils/getOnlyChild';
import ControlAdapter from './ControlAdapter';
import { FieldContext } from './types';

export function defaultRender(context: FieldContext, props: any) {
  const { key, path, initial, value, errors, ...rest } = props;
  const { depends, dependValues, children, ...options } = rest;

  const control = getOnlyChild(children);

  if (!React.isValidElement(control)) return children ?? null;

  return (
    <ControlAdapter value={value} onChange={context.setValue} {...options}>
      {control}
    </ControlAdapter>
  );
}
