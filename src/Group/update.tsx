import { isEmpty } from 'lodash';
import shallowEqual from 'shallowequal';
import { RenderOptions } from '../types';
import { GroupContext } from './types';

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
  options?: RenderOptions,
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

  if (context.state.value === undefined) {
    if (context.state.initial !== undefined) {
      context.setState((draft) => {
        draft.value = draft.initial;
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
