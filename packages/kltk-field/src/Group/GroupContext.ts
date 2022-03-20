import { observable } from 'kltk-observable';
import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import shallowEqual from 'shallowequal';
import { createEmitter } from './emitter';
import { createEvent } from './event';
import { createHooks } from './hooks';
import { createMethods } from './methods';
import { GroupContext, GroupState } from './types';

const sym = Symbol('GroupContext');

type ContextOrState<T> = GroupContext<T> | Partial<GroupState<T>>;

function isGroupContext<T>(data?: ContextOrState<T>): data is GroupContext<T> {
  if (!data) return false;
  return sym in data;
}

export function createGroupContext<T>(
  data?: Partial<GroupState<T>>,
): GroupContext<T> {
  const { initial } = data || {};
  const { value = initial } = data || {};
  const state: GroupState<T> = { initial, value, meta: [] };
  const context = observable(state) as GroupContext<T>;
  Object.defineProperty(context, sym, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true,
  });
  const emitter = createEmitter();
  const event = createEvent(context);
  const methods = createMethods(context);
  const hooks = createHooks(context);

  let prevState = context.state.value;
  context.subscribe((root) => {
    if (!shallowEqual(prevState, root.value)) {
      prevState = root.value;
      context.emit('change', root.value);
    }
  });

  return extend(context, emitter, event, methods, hooks);
}

export function useGroupContext<T>(data?: ContextOrState<T>) {
  return React.useState(() =>
    isGroupContext(data) ? data : createGroupContext(data),
  )[0];
}
