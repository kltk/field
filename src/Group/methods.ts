import { get, has, set } from 'lodash';
import { castContext } from './castContext';
import { GroupContext } from './types';

export function createMethods<T extends {}>(context: GroupContext<T>) {
  return castContext({
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
  });
}