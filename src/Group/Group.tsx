import React from 'react';
import { FieldMeta } from '../Field/types';
import { ControlProps } from '../types';
import { context } from '../utils/context';
import { RenderOptions } from '../utils/defaultRender';
import { useGroupContext } from './GroupContext';
import { GroupContext } from './types';
import { update } from './update';

const { Provider } = context;

type GroupPropsBase<State> = {
  context?: GroupContext<State>;
  initial?: State;
  onInvalid?: (errorFields: FieldMeta[]) => void | Promise<void>;
  onSubmit?: (values: State) => void | Promise<void>;
  children?: React.ReactNode;
};

export type GroupProps<State> = ControlProps<State> &
  GroupPropsBase<State> &
  RenderOptions;

export function Group<T>(props: GroupProps<T>) {
  const { context, initial, value, disabled, children = null } = props;
  const { onChange, onInvalid, onSubmit } = props;

  const groupContext = useGroupContext(context, initial);

  update(groupContext, initial, value, { disabled });

  groupContext.useEvent('change', onChange);
  groupContext.useEvent('invalid', onInvalid);
  groupContext.useEvent('submit', onSubmit);

  return <Provider value={groupContext}>{children}</Provider>;
}
