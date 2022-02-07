import { FieldProps } from '../Field/Field';
import { FieldContext } from '../Field/types';
import { defaultRender } from './defaultRender';
import { getOnlyChild } from './getOnlyChild';

export function useRender<Value>(
  context: FieldContext,
  props: FieldProps<Value>,
) {
  const { dependencies: deps = [], children, ...rest } = props;
  const { key, errors } = context.useField() || {};
  const value = context.useValue();
  const control = getOnlyChild(children);

  const { disabled } = context.useSelector((root) => root.options || {});

  context.useSelector(() => deps.map((path) => context.getFieldValue(path)));

  const data = { key, value, disabled, errors, control, ...rest };
  const render = children instanceof Function ? children : defaultRender;
  return render(context, data) as React.ReactElement;
}
