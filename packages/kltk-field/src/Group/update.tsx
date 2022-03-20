import React from 'react';
import shallowEqual from 'shallowequal';
import { FieldRender } from '..';
import { GroupContext } from './types';

/**
 * 更新上下文数据
 * @param context
 * @param initial
 * @param value
 * @param options
 */
export function useUpdate<State, Options>(
  context: GroupContext<State, Options>,
  initial?: State,
  value?: State,
  render?: FieldRender<Options>,
  options?: Options,
) {
  if (initial !== undefined) {
    if (initial !== context.state.initial) {
      context.setState((draft) => {
        draft.initial = initial;
      });
    }
  }

  const ref = React.useRef<State>();
  if (value !== undefined) {
    // 弱受控模式
    // 使用浅比较可以在数据正确的情况下减少渲染
    // context.state.value 可能改变
    // 只在 `props.value` 改变时重新赋值
    // 防止循环赋值，并减少渲染次数
    if (!shallowEqual(value, ref.current)) {
      ref.current = value;
      if (!shallowEqual(value, context.state.value)) {
        context.setState((draft) => {
          draft.value = value;
        });
      }
    }
  }

  if (context.state.value === undefined) {
    if (context.state.initial !== undefined) {
      context.setState((draft) => {
        draft.value = draft.initial;
      });
    }
  }

  if (render !== context.state.render) {
    context.setState((draft) => {
      draft.render = render;
    });
  }

  if (!shallowEqual(options, context.state.options)) {
    context.setState((draft) => {
      draft.options = options;
    });
  }
}
