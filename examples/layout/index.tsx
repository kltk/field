import { Field, Form, useGroupContext } from 'kltk-field';
import React from 'react';
import Dump from '../components/Dump';
import Input from '../components/Input';
import Radio from '../components/Radio';

function Example() {
  const context = useGroupContext();
  const layout: string = context.useFieldValue('layout');

  const layoutOptions = [
    { label: '垂直', value: 'horizontal' },
    { label: '水平', value: 'vertical' },
    { label: '行内', value: 'inline' },
  ];
  return (
    <Form context={context} layout={layout} initial={{ layout: 'vertical' }}>
      <Field path="layout" label="布局">
        <Radio options={layoutOptions} />
      </Field>
      <Field path="username" label="Username" colon required>
        <Input placeholder="username" />
      </Field>
      <Field path="password" label="Password">
        <Input placeholder="password" type="password" />
      </Field>
      <Field>
        <Dump />
      </Field>
    </Form>
  );
}

export default Example;
