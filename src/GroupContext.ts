import { observable, Observable } from 'kltk-observable';
import { get, has, set } from 'lodash';
import React from 'react';
import shallowEqual from 'shallowequal';
import { EventType, GroupContext, GroupState } from './utils/types';

export function createGroupContext<T extends {}>(initial?: T): GroupContext<T> {
  const listenersMap = {
    change: new Set<Function>(),
    invalid: new Set<Function>(),
    submit: new Set<Function>(),
  };
  const groupState: GroupState<T> = { initial, value: initial, meta: [] };
  const context = observable(groupState) as GroupContext<T>;

  function emit(type: EventType, ...rest: any[]) {
    const listeners = Array.from(listenersMap[type]);
    return Promise.all(listeners.map((listener) => listener(...rest)));
  }

  const methods: Omit<GroupContext<T>, keyof Observable<T>> = {
    on(type, listener) {
      const listeners = listenersMap[type];
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    off(type, listener) {
      const listeners = listenersMap[type];
      if (listener) {
        listeners.delete(listener);
      } else {
        listeners.clear();
      }
    },
    emit,

    hasFieldValue(path) {
      const isEmptyPath = !path || !get(path, 'length');
      if (isEmptyPath) return true;
      return context.getState((root) => has(root.value, path));
    },
    getFieldValue(path) {
      const isEmptyPath = !path || !get(path, 'length');
      return context.getState((root) =>
        isEmptyPath ? root.value : get(root.value, path),
      );
    },
    setFieldValue(path, value) {
      const isEmptyPath = !path || !get(path, 'length');
      context.setState((root) => {
        root.value = isEmptyPath
          ? (value as unknown as typeof root.value)
          : set({ ...root.value! }, path, value);
      });
    },

    registerField(sym) {
      context.setState((root) => {
        root.meta.push({ sym });
      });
      return () => context.unregisterField(sym);
    },
    unregisterField(sym) {
      context.setState((root) => {
        root.meta = root.meta.filter((meta) => meta.sym !== sym);
      });
    },

    getFieldsMeta(syms) {
      return context.getState((root) =>
        root.meta.filter((item) => !syms || syms.includes(item.sym)),
      );
    },
    setFieldMeta(sym, meta) {
      return context.setState((root) => {
        root.meta = root.meta.map((item) => (item.sym === sym ? meta : item));
      });
    },

    reset() {
      context.setState((state) => {
        state.value = state.initial;
      });
    },
    async validate() {
      const metas = context.getState((root) => root.meta);
      await Promise.all(metas.map((meta) => meta.validate?.()));
    },
    async submit() {
      const values = context.state.value;
      await context.validate();
      const metas = context.getState((root) => root.meta);
      const errorFields = metas.filter((meta) => meta.errors?.length);
      if (errorFields.length) {
        await emit('invalid', errorFields);
      } else {
        await emit('submit', values);
      }
    },
  };

  let prevState = context.state.value;
  context.subscribe((root) => {
    if (!shallowEqual(prevState, root.value)) {
      prevState = root.value;
      emit('change', root.value);
    }
  });

  return Object.assign(context, methods);
}

export function useGroupContext<T extends {}>(
  context?: GroupContext<T>,
  initial?: T,
) {
  return React.useState(() => context ?? createGroupContext<T>(initial))[0];
}
