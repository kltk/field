import { Field, Form } from 'kltk-field';
import React from 'react';
import Input from '../components/Input';

function Example() {
  const handleInvalid = (errorFields: any) => {
    alert(
      errorFields.map(({ errors = [] }: any) =>
        errors.map((err: any) => (err && err.message) || err),
      ),
    );
  };

  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  const validate = (context: any, value: any) => {
    if (!value) {
      throw 'input is required';
    }
  };

  return (
    <Form onInvalid={handleInvalid} onSubmit={handleSubmit}>
      <Field path="input" label="输入框" validate={validate}>
        <Input placeholder="input" />
      </Field>
      <Field>
        <button type="submit">提交</button>
      </Field>
    </Form>
  );
}

export default Example;
