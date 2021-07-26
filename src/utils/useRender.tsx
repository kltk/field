import { defaultRender } from '../defaultRender';
import { FieldProps } from '../Field';
import { FieldContext } from '../types';
import { getOnlyChild } from './getOnlyChild';
import { useSelector } from './useSelector';

export function useRender<Value>(
  context: FieldContext,
  props: FieldProps<Value>,
) {
  const { path, initial, dependencies = [], children } = props;
  const { sym, errors } = useSelector(context, () => context.getMeta() || {});
  const value = useSelector(context, () => context.getValue());
  const control = getOnlyChild(children);

  const disabled = useSelector(context, (root) => root.disabled);

  useSelector(context, () =>
    dependencies.map((path) => context.getFieldValue(path)),
  );

  const data = { sym, path, initial, value, disabled, errors, control };
  const render = children instanceof Function ? children : defaultRender;
  return render(context, data) as React.ReactElement;
}
