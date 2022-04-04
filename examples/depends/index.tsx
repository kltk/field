import { Field, Form } from 'kltk-field';
import React from 'react';
import Dump from '../components/Dump';
import Input from '../components/Input';
import Radio from '../components/Radio';

function Demo() {
  const options = [
    { label: '显示', value: 'true' },
    { label: '隐藏', value: 'false' },
  ];
  return (
    <Form>
      <Field path="show" label="显示输入框" initial="true">
        <Radio options={options} />
      </Field>
      <Field depends={['show']}>
        {(ctx, data) =>
          data.dependValues[0] === 'true' && (
            <Field path="input" label="输入框">
              <Input />
            </Field>
          )
        }
      </Field>
      <Field>
        <Dump />
      </Field>
    </Form>
  );
}

export default Demo;
