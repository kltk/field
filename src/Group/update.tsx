import { isEmpty } from 'lodash';
import shallowEqual from 'shallowequal';
import { GroupContext, GroupOptions } from './types';

/**
 * 更新上下文数据
 * @param context
 * @param initial
 * @param value
 * @param options
 */
export function update<State>(
  context: GroupContext<State>,
  initial?: State,
  value?: State,
  options?: GroupOptions,
) {
  if (initial !== undefined) {
    if (initial !== context.state.initial) {
      context.setState((draft) => {
        draft.initial = initial;
      });
    }
  }

  // 受控模式
  // 使用浅比较可以在数据正确的情况下减少渲染
  if (value !== undefined) {
    if (!shallowEqual(value, context.state.value)) {
      context.setState((draft) => {
        draft.value = value;
      });
    }
  }

  if (options && !isEmpty(options)) {
    if (!shallowEqual(options, context.state.options)) {
      context.setState((draft) => {
        draft.options = options;
      });
    }
  }
}