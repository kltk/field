import { Field, Form } from 'kltk-field';
import React from 'react';
import Input from '../components/Input';
import Radio from '../components/Radio';

function Example() {
  const [disabled, setDisabled] = React.useState('none');

  const options = [
    { label: '无', value: 'none' },
    { label: '输入框', value: 'input' },
    { label: '按钮', value: 'button' },
    { label: '表单', value: 'form' },
  ];
  return (
    <>
      <Form value={disabled} onChange={setDisabled as any}>
        <Field label="禁用">
          <Radio options={options} />
        </Field>
        <Field>
          <div />
        </Field>
      </Form>
      {/** 禁用整个表单 */}
      <Form disabled={disabled === 'form' || undefined}>
        {/** 禁用表单项 */}
        <Field
          path="input"
          label="输入框"
          disabled={disabled === 'input' || undefined}
        >
          <Input />
        </Field>
        <Field>
          {/** 在控件上设置 */}
          <button type="submit" disabled={disabled === 'button' || undefined}>
            按钮
          </button>
        </Field>
      </Form>
    </>
  );
}

export default Example;
