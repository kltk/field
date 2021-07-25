import { defaultRender } from '../defaultRender';
import { FieldProps } from '../Field';
import { FieldContext } from '../types';
import { getOnlyChild } from './getOnlyChild';
import { useSelector } from './useSelector';

export function useRender<Value>(
  context: FieldContext,
  props: FieldProps<Value>,
) {
  const { path, initial, children } = props;
  const { sym, errors } = useSelector(context, () => context.getMeta() || {});
  const value = useSelector(context, () => context.getValue());
  const control = getOnlyChild(children);

  const data = { sym, path, initial, value, errors, control };
  const render = children instanceof Function ? children : defaultRender;
  return render(context, data) as React.ReactElement;
}
