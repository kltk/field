import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Group } from '../Group/Group';
import { createGroupContext } from '../Group/GroupContext';
import { Field } from './Field';

describe('Field', () => {
  afterEach(cleanup);
  it('render', () => {
    const context = createGroupContext();
    const { container } = render(
      <Group context={context}>
        <Field path="name">
          <input />
        </Field>
      </Group>,
    );
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(1);
    expect(inputs[0].value).toBe('');
  });

  it('render children', () => {
    const context = createGroupContext();
    const { container } = render(
      <Group context={context}>
        <Field path="name">{() => <input />}</Field>
      </Group>,
    );
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(1);
    expect(inputs[0].value).toBe('');
  });

  it('render with initial', () => {
    const context = createGroupContext();
    const { container } = render(
      <Group context={context}>
        <Field path="name" initial="value">
          <input />
        </Field>
      </Group>,
    );
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(1);
    expect(inputs[0].value).toBe('value');
  });
});
