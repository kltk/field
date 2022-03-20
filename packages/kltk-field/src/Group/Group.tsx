import React from 'react';
import { FieldMeta, FieldRender } from '../Field/types';
import { ControlProps } from '../types';
import { context } from '../utils/context';
import { useGroupContext } from './GroupContext';
import { GroupContext } from './types';
import { useUpdate } from './update';

const { Provider } = context;

type GroupPropsBase<State, Options> = {
  context?: GroupContext<State, Options>;
  initial?: State;
  onInvalid?: (errorFields: FieldMeta[]) => void | Promise<void>;
  onSubmit?: (values: State) => void | Promise<void>;
  render?: FieldRender<Options>;
  children?: React.ReactNode;
};

export type GroupProps<State, Options> = ControlProps<State> &
  GroupPropsBase<State, Options> &
  Options;

export function Group<T, O>(props: GroupProps<T, O>) {
  const { context, initial, value, children = null, ...rest } = props;
  const { onChange, onInvalid, onSubmit, render, ...options } = rest;

  const groupContext = useGroupContext(context);

  useUpdate(groupContext, initial, value, render, options as O);

  groupContext.useEvent('change', onChange);
  groupContext.useEvent('invalid', onInvalid);
  groupContext.useEvent('submit', onSubmit);

  return <Provider value={groupContext}>{children}</Provider>;
}
