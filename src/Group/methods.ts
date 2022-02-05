import { get, has, set } from 'lodash';
import { castContext } from './castContext';
import { GroupContext } from './types';

export function createMethods<T extends {}>(context: GroupContext<T>) {
  return castContext({
    getFieldsMeta(syms) {
      return context.getState((root) =>
        root.meta.filter((item) => !syms || syms.includes(item.key)),
      );
    },
    setFieldMeta(key, meta) {
      return context.setState((root) => {
        root.meta = root.meta.map((item) => (item.key === key ? meta : item));
      });
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

    hasFieldValue(path) {
      const isEmptyPath = !path || !get(path, 'length');
      if (isEmptyPath) return true;
      return context.getState((root) => has(root.value, path));
    },
    registerField(key) {
      context.setState((root) => {
        root.meta.push({ key });
      });
      return () => context.unregisterField(key);
    },
    unregisterField(key) {
      context.setState((root) => {
        root.meta = root.meta.filter((meta) => meta.key !== key);
      });
    },
  });
}
