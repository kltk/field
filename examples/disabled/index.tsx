/**
 * title: 禁用表单
 * desc: 使用 `disabled` 禁用表单内支持 `disabled` 的控件
 */
import { Field, Form } from 'kltk-field';
import React from 'react';
import Input from '../components/Input';

function Example() {
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = (values: any) => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
  };

  return (
    <Form disabled={disabled} onSubmit={handleSubmit}>
      <Field path="number">
        <Input placeholder="username" />
      </Field>
      <Field>
        <button type="submit">submit</button>
      </Field>
    </Form>
  );
}

export default Example;
