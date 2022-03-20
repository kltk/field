import { EventType, GroupContext } from './types';

export function createEmitter<T, O>() {
  const listenersMap = {
    change: new Set<Function>(),
    invalid: new Set<Function>(),
    submit: new Set<Function>(),
  };

  function emit(type: EventType, ...rest: any[]) {
    const listeners = Array.from(listenersMap[type]);
    return Promise.all(listeners.map((listener) => listener(...rest)));
  }

  return {
    ...({} as GroupContext<T, O>),
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
  } as GroupContext<T, O>;
}
