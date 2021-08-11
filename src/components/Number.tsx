import React from 'react';
import { Field, Group } from '..';
import Input from './Input';
import Step from './Step';

type NumberProps = {
  value?: number;
  onChange?: (changed?: number) => void;
};

function Number(props: NumberProps) {
  const { value, onChange } = props;
  return (
    <Group value={value} onChange={onChange}>
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
