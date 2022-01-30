import { observable } from 'kltk-observable';
import { extend } from 'kltk-observable/dist/extend';
import React from 'react';
import shallowEqual from 'shallowequal';
import { createEmitter } from './emitter';
import { createEvent } from './event';
import { createMethods } from './methods';
import { GroupContext, GroupState } from './types';

export function createGroupContext<T>(initial?: T): GroupContext<T> {
  const state: GroupState<T> = { initial, value: initial, meta: [] };
  const context = observable(state) as GroupContext<T>;
  const emitter = createEmitter();
  const event = createEvent(context);
  const methods = createMethods(context);

  let prevState = context.state.value;
  context.subscribe((root) => {
    if (!shallowEqual(prevState, root.value)) {
      prevState = root.value;
      context.emit('change', root.value);
    }
  });

  return extend(context, emitter, event, methods);
}

export function useGroupContext<T>(context?: GroupContext<T>, initial?: T) {
  return React.useState(() => context ?? createGroupContext<T>(initial))[0];
}
