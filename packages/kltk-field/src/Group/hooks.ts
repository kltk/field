import React from 'react';
import { useSelector } from '../utils/useSelector';
import { castContext } from './castContext';
import { GroupContext } from './types';

export function createHooks<State>(context: GroupContext<State>) {
  return castContext({
    /**
     * 订阅数据变化
     * 使用[浅比较shallowequal](https://www.npmjs.com/package/shallowequal)
     * TODO 由 observable 实现 useSelector
     * @param getter 有三种情况会调用 getter
     *  - 组件第一次渲染，用于初始化
     *  - 组件第一次渲染后，useEffect 执行时，用于检测初始化后订阅前的变化
     *  - getter 返回的数据有变化的时候
     */
    useSelector(getter) {
      return useSelector(context, getter);
    },

    /**
     * 在 React 组件生命周期里绑定事件处理
     * @param type
     * @param listener
     */
    useEvent(type, listener) {
      React.useEffect(() => {
        if (!(listener instanceof Function)) return;

        return context.on(type, listener);
      }, [context, type, listener]);
    },

    useFieldValue(spec) {
      return context.useSelector(() => context.getFieldValue(spec));
    },

    useFieldsValue(specs) {
      return context.useSelector(() => context.getFieldsValue(specs));
    },
  });
}
