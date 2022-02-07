import React from 'react';
import shallowEqual from 'shallowequal';
import { GroupContext, GroupState } from '../Group/types';
import { useEffectWithLatestState } from './useEffectWithLatestState';

export function useSelector<T, R>(
  context: GroupContext<T>,
  getter: (state: GroupState<T>) => R,
) {
  const [state, setState] = React.useState(() => getter(context.state));

  useEffectWithLatestState(
    (latest) => {
      const update = () => {
        const { context, getter, state } = latest;
        const newState = getter(context.state);
        if (!shallowEqual(newState, state)) {
          setState(newState);
        }
      };

      /**
       * effect 在渲染完成后执行
       * 中间可能有其它地方修改数据
       * 这里检测下数据有没有变更
       */
      update();

      return context.subscribe(update);
    },
    { context, getter, state },
  );

  return state;
}
