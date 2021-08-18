/**
 * title: 自定义控件
 * desc: 使用 `<Group />` `<Field />` 自定义表单控件
 */
import { Field, Form, useGroupContext } from 'kltk-field';
import React from 'react';
import Dump from '../components/Dump';
import Number from '../components/Number';

function Demo() {
  const context = useGroupContext();
  const [errorFields, setErrorFields] = React.useState([]);

  return (
    <Form>
      <Field path="number" initial={{ value: 0 }}>
        <Number />
      </Field>
      <div>
        <Field>
          <Dump />
        </Field>
      </div>
    </Form>
  );
}

export default Demo;
