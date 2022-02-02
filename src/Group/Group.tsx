import React from 'react';
import shallowEqual from 'shallowequal';
import { FieldMeta } from '../Field/types';
import { ControlProps } from '../types';
import { context } from '../utils/context';
import { useGroupContext } from './GroupContext';
import { GroupContext } from './types';

const { Provider } = context;

export type GroupProps<T> = ControlProps<T> & {
  context?: GroupContext<T>;
  initial?: T;
  disabled?: boolean;
  onInvalid?: (errorFields: FieldMeta[]) => void | Promise<void>;
  onSubmit?: (values: T) => void | Promise<void>;
  children?: React.ReactNode;
};

export function Group<T>(props: GroupProps<T>) {
  const { context, initial, value, disabled, children = null } = props;
  const { onChange, onInvalid, onSubmit } = props;

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

      if (disabled !== undefined) {
        draft.disabled = disabled;
      }
    });
  }, [disabled, groupContext, initial, value]);

  /**
   * 为了尽早使用 initial/value，在首次渲染的时候直接更新数据
   * 相当于 constructor/willMount
   */
  React.useState(update);

  React.useEffect(update, [update]);

  groupContext.useEvent('change', onChange);
  groupContext.useEvent('invalid', onInvalid);
  groupContext.useEvent('submit', onSubmit);

  return <Provider value={groupContext}>{children}</Provider>;
}
