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

type ContextOrState<T, O> = GroupContext<T, O> | Partial<GroupState<T, O>>;

function isGroupContext<T, O>(
  data?: ContextOrState<T, O>,
): data is GroupContext<T, O> {
  if (!data) return false;
  return sym in data;
}

export function createGroupContext<T, O>(
  data?: Partial<GroupState<T, O>>,
): GroupContext<T, O> {
  const { initial } = data || {};
  const { value = initial } = data || {};
  const { options, render } = data || {};

  const state: GroupState<T | undefined, O> = {
    initial,
    value,
    options,
    render,
    meta: [],
  };
  const context = observable(state) as GroupContext<T, O>;
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

export function useGroupContext<T, O>(data?: ContextOrState<T, O>) {
  return React.useState(() =>
    isGroupContext(data) ? data : createGroupContext(data),
  )[0];
}
