import { FieldProps } from '../Field/Field';
import { defaultRender } from './defaultRender';
import { getOnlyChild } from './getOnlyChild';
import { FieldContext } from './types';
import { useSelector } from './useSelector';

export function useRender<Value>(
  context: FieldContext,
  props: FieldProps<Value>,
) {
  const { dependencies = [], children, ...rest } = props;
  const { sym, errors } = useSelector(context, () => context.getMeta() || {});
  const value = useSelector(context, () => context.getValue());
  const control = getOnlyChild(children);

  const disabled = useSelector(context, (root) => root.disabled);

  useSelector(context, () =>
    dependencies.map((path) => context.getFieldValue(path)),
  );

  const data = { sym, value, disabled, errors, control, ...rest };
  const render = children instanceof Function ? children : defaultRender;
  return render(context, data) as React.ReactElement;
}
