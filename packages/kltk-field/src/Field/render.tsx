import { defaults } from 'lodash';
import React from 'react';
import { FieldProps } from '../Field/Field';
import { getOnlyChild } from '../utils/getOnlyChild';
import { ControlAdapter } from './ControlAdapter';
import { FieldRender } from './types';

type RenderData = FieldProps<any, any> & { dependValues?: any };

export const useDefaultRender: FieldRender<RenderData> = (context, data) => {
  const { path, initial, validate, ...rest } = data;
  const { depends, dependValues, children, ...options } = rest;

  const value = context.useValue();
  const errors = context.useErrors();
  const globalOptions = context.useSelector((root) => root.options);
  defaults(options, globalOptions);

  const control = getOnlyChild(children);

  if (!React.isValidElement(control)) return children ?? null;

  return (
    <ControlAdapter value={value} onChange={context.setValue} {...options}>
      {control}
    </ControlAdapter>
  );
};
