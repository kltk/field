import { Field, Form } from 'kltk-field';
import React from 'react';
import Dump from '../components/Dump';
import Number from '../components/Number';

function Demo() {
  return (
    <Form>
      <Field path="number" label="输入框" initial={{ value: 0 }}>
        <Number />
      </Field>
      <Field>
        <Dump />
      </Field>
    </Form>
  );
}

export default Demo;
