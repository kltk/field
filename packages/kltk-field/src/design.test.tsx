/**
 * 关于表单组件设计及一些问题的说明
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Field, Group } from '.';

describe('options', function () {
  test('not disabled', async () => {
    render(
      <Group>
        <Field>
          <input type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).not.toBeDisabled();
  });
  test('disabled false', async () => {
    render(
      <Group disabled={false}>
        <Field>
          <input type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).not.toBeDisabled();
  });
  test('disabled at group', async () => {
    render(
      <Group disabled>
        <Field>
          <input type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).toBeDisabled();
  });
  test('disabled at field', async () => {
    render(
      <Group>
        <Field disabled>
          <input type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).toBeDisabled();
  });
  test('overwrite disabled of group at field', async () => {
    render(
      <Group disabled>
        <Field disabled={false}>
          <input type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).not.toBeDisabled();
  });
  test('overwrite disabled of field at control', async () => {
    render(
      <Group>
        <Field disabled>
          <input disabled={false} type="text" role="input" />
        </Field>
      </Group>,
    );
    const input = await screen.findByRole('input');
    expect(input).not.toBeDisabled();
  });
});
