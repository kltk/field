import React from 'react';
import shallowEqual from 'shallowequal';
import { GroupContext, GroupState } from '../Group/types';

export function useSelector<T, O, R>(
  context: GroupContext<T, O>,
  selector: (state: GroupState<T, O>) => R,
) {
  const [[state], forceUpdate] = React.useState(() => [
    {
      context,
      selector,
      value: selector(context.state),
      waitForRender: true,
      unmounted: false,
    },
  ]);
  state.selector = selector;
  state.waitForRender = false;

  React.useEffect(() => () => void (state.unmounted = true), []);

  React.useEffect(() => {
    const update = async () => {
      const { context, selector } = state;
      const newValue = selector(context.state);

      if (shallowEqual(state.value, newValue)) return;
      state.value = newValue;

      if (state.waitForRender) return;
      state.waitForRender = true;

      await 0;

      if (state.unmounted) return;

      forceUpdate((state) => [...state]);
    };

    /**
     * effect 在渲染完成后执行
     * 中间可能有其它地方修改数据
     * 这里检测下数据有没有变更
     */
    update();

    return context.subscribe(update);
  }, []);

  return state.value;
}
