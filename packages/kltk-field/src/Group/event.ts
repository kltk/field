import { castContext } from './castContext';
import { GroupContext } from './types';

export function createEvent<T>(context: GroupContext<T>) {
  return castContext({
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
        await context.emit('invalid', errorFields);
      } else {
        await context.emit('submit', values);
      }
    },
  });
}
