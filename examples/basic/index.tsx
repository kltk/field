import { Field, Form } from 'kltk-field';
import React from 'react';
import Input from '../components/Input';

function Example() {
  const [state, setState] = React.useState();

  return (
    <>
      <Form
        onChange={(values: any) => setState(values)}
        onSubmit={(values: any) => alert(JSON.stringify(values))}
      >
        <Field path="username">
          <Input placeholder="username" />
        </Field>
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </Form>
      <code>{JSON.stringify(state)}</code>
    </>
  );
}

export default Example;
