import { castContext } from './castContext';
import { EventType } from './types';

export function createEmitter() {
  const listenersMap = {
    change: new Set<Function>(),
    invalid: new Set<Function>(),
    submit: new Set<Function>(),
  };

  function emit(type: EventType, ...rest: any[]) {
    const listeners = Array.from(listenersMap[type]);
    return Promise.all(listeners.map((listener) => listener(...rest)));
  }

  return castContext({
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
  });
}
