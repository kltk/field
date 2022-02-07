import { filter, find, findIndex, flatMap, get, has, set } from 'lodash';
import { mapValues } from '../utils/mapValues';
import { castContext } from './castContext';
import { fieldMatches } from './fieldMatches';
import { toValuePath } from './toValuePath';
import { GroupContext } from './types';

export function createMethods<T>(context: GroupContext<T>) {
  return castContext({
    getField(spec) {
      return find(context.state.meta, fieldMatches(spec));
    },
    setField(spec, meta) {
      return context.setState((root) => {
        const index = findIndex(root.meta, fieldMatches(spec));
        if (~index) root.meta[index] = meta;
      });
    },
    getFieldValue(path) {
      return get(context.state, toValuePath(path));
    },
    setFieldValue(path, value) {
      context.setState((root) => {
        set(root, toValuePath(path), value);
      });
    },
    getFieldErrors(spec) {
      return flatMap(filter(context.state.meta, fieldMatches(spec)), 'errors');
    },
    setFieldErrors(spec, errors) {
      context.updateField(spec, { errors });
    },

    updateField(spec, meta) {
      const state = context.getField(spec);
      context.setField(spec, Object.assign({}, state, meta));
    },
    validateFields(specs) {
      const metas = flatMap(specs, (spec) =>
        filter(context.state.meta, fieldMatches(spec)),
      );
      metas.map((meta) => meta.validate?.());
    },
    getFieldsValue(paths = []) {
      return mapValues(paths, (path) => context.getFieldValue(path));
    },
    hasFieldValue(path) {
      return has(context.state, toValuePath(path));
    },
    registerField(field) {
      context.setState((root) => {
        root.meta.push(field);
      });
      return () => context.unregisterField(field);
    },
    unregisterField(field) {
      const match = fieldMatches(field.key);
      context.setState((root) => {
        root.meta = filter(root.meta, (meta) => !match(meta));
      });
    },
  });
}
