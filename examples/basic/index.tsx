import { Field, Form } from 'kltk-field';
import React from 'react';
import Dump from '../components/Dump';
import Input from '../components/Input';

function Example() {
  const handleSubmit = (values: any) => alert(JSON.stringify(values));
  return (
    <Form onSubmit={handleSubmit}>
      <Field path="username" label="名称">
        <Input placeholder="username" />
      </Field>
      <Field>
        <button type="submit">提交</button>
      </Field>
      {/* Dump 用于展示表单值，实际使用时不需要 */}
      <Field>
        <Dump />
      </Field>
    </Form>
  );
}

export default Example;
