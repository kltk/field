import { render } from '@testing-library/react';
import React from 'react';
import { Group } from './Group';
import { createGroupContext } from './GroupContext';

const values = [
  {}, // empty
  { value: 1 },
  { value: 2 },
];

const shadows = JSON.parse(JSON.stringify(values));

describe('Group', () => {
  describe('initial & state must shallow equal', () => {
    test('empty', () => {
      const context = createGroupContext({ initial: values[0] });
      render(<Group context={context} />);
      expect(context.state.initial).toBe(values[0]);
      expect(context.state.value).toBe(values[0]);
    });

    test('set initial', () => {
      const context = createGroupContext();
      render(<Group context={context} initial={values[0]} />);
      expect(context.state.initial).toBe(values[0]);
      expect(context.state.value).toBe(values[0]);
    });

    test('set value', () => {
      const context = createGroupContext();
      render(<Group context={context} value={values[0]} />);
      expect(context.state.value).toBe(values[0]);
    });

    test('set initial & value', () => {
      const context = createGroupContext();
      render(
        <Group context={context} initial={values[0]} value={shadows[0]} />,
      );
      expect(context.state.initial).toBe(values[0]);
      expect(context.state.value).toBe(shadows[0]);
    });

    test('update initial with rerender', () => {
      const context = createGroupContext();
      const { rerender } = render(
        <Group context={context} initial={values[1]} />,
      );
      rerender(<Group context={context} initial={values[2]} />);
      expect(context.state.initial).toBe(values[2]);
      expect(context.state.value).toBe(values[1]);
    });
  });

  describe('event', () => {
    test('update value with rerender', () => {
      const context = createGroupContext();
      const value1 = { value: 1 };
      const value2 = { value: 2 };
      const { rerender } = render(<Group context={context} value={value1} />);
      rerender(<Group context={context} value={value2} />);
      expect(context.state.value).toBe(value2);
    });

    test('render with onChange', () => {
      const context = createGroupContext<{ value: number }, {}>();
      const value1 = { value: 1 };
      const value2 = { value: 2 };
      const fn = jest.fn();
      const onChange = (...rest: any[]) => fn(...rest);
      render(<Group context={context} value={value1} onChange={onChange} />);
      expect(fn).toBeCalledTimes(0);
      context.setState((draft) => {
        draft.value.value = 2;
      });
      expect(fn).toBeCalledTimes(1);
      expect(fn).toBeCalledWith(value2);
    });
  });
});
