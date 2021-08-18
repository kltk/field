/**
 * title: 校验
 * desc:
 */
import { Field, Form } from 'kltk-field';
import React from 'react';
import Input from '../components/Input';

function Example() {
  const [disabled, setDisabled] = React.useState(false);

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
      throw 'username is required';
    }
  };

  return (
    <Form disabled={disabled} onInvalid={handleInvalid} onSubmit={handleSubmit}>
      <Field path="username" validate={validate}>
        <Input placeholder="username" />
      </Field>
      <button type="submit">submit</button>
    </Form>
  );
}

export default Example;
