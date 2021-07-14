import React from 'react';
import shallowEqual from 'shallowequal';
import { useGroupContext } from './GroupContext';
import { ControlProps, GroupContext } from './types';
import { context } from './utils/context';

const { Provider } = context;

export type GroupProps<T> = ControlProps<T> & {
  context?: GroupContext<T>;
  initial?: T;
  onSubmit?: (values: T) => void | Promise<void>;
  children?: React.ReactNode;
};

export function Group<T>(props: GroupProps<T>) {
  const { context, initial, value, children = null } = props;
  const { onChange, onSubmit } = props;

  const groupContext = useGroupContext(context, initial);

  const update = React.useCallback(() => {
    groupContext.setState((draft) => {
      if (initial !== undefined) {
        draft.initial = initial;
      }

      if (value !== undefined) {
        if (!shallowEqual(draft.value, value)) {
          draft.value = value;
        }
      }

      if (draft.value === undefined) {
        draft.value = draft.initial;
      }
    });
  }, [groupContext, initial, value]);

  /**
   * 为了尽早使用 initial/value，在首次渲染的时候直接更新数据
   * 相当于 constructor/willMount
   */
  React.useState(update);

  React.useEffect(update, [update]);

  React.useEffect(() => {
    if (onChange instanceof Function) {
      return groupContext.on('change', onChange);
    }
  }, [groupContext, onChange]);

  React.useEffect(() => {
    if (onSubmit instanceof Function) {
      return groupContext.on('submit', onSubmit);
    }
  }, [groupContext, onSubmit]);

  return <Provider value={groupContext}>{children}</Provider>;
}
