import { defaults } from 'lodash';
import React from 'react';
import { FieldProps } from '../Field/Field';
import { Layout } from '../Layout/Layout';
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

  const { disabled, trigger, normalize, valueName, ...layoutProps } = options;
  const adapterProps = { disabled, trigger, normalize, valueName, value };

  const node = (
    <ControlAdapter {...adapterProps} onChange={context.setValue}>
      {control}
    </ControlAdapter>
  );

  if (layoutProps.layout === null) {
    return node;
  }

  return (
    <Layout {...layoutProps} errors={errors}>
      {node}
    </Layout>
  );
};
