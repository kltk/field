import { ControlProps, Field, Group } from 'kltk-field';
import React from 'react';
import Input from './Input';
import Step from './Step';

type NumberProps = ControlProps<number>;

function Number(props: NumberProps) {
  const { value, onChange } = props;
  return (
    <Group value={value} onChange={onChange} layout={null}>
      <Field path="value">
        <Step step={-1}>-</Step>
      </Field>
      <Field path="value">
        <Input />
      </Field>
      <Field path="value">
        <Step step={1}>+</Step>
      </Field>
    </Group>
  );
}

export default Number;
