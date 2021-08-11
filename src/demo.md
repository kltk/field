### 基础用法

`<Field />` 会自动将数据对应的 `value` `onChange` 绑定到表单控件

```tsx
import { Field } from './Field';
import { Form } from './Form';
import { useGroupContext } from './GroupContext';
import Input from './components/Input';

function Demo() {
  const [state, setState] = React.useState();

  return (
    <>
      <Form
        onChange={(values) => setState(values)}
        onSubmit={(values) => alert(JSON.stringify(values))}
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

<Demo />;
```

### 禁用表单

使用 `disabled` 禁用表单内支持 `disabled` 的控件

```tsx
import { Field } from './Field';
import { Form } from './Form';
import { Group } from './Group';
import Input from './components/Input';
import Dump from './components/Dump';

const [disabled, setDisabled] = React.useState(false);

const handleSubmit = (values) => {
  setDisabled(true);
  setTimeout(() => {
    setDisabled(false);
  }, 5000);
};

<Form disabled={disabled} onSubmit={handleSubmit}>
  <Field path="number">
    <Input placeholder="username" />
  </Field>
  <Field>
    <button type="submit">submit</button>
  </Field>
</Form>;
```

### 校验

```tsx
import { Field } from './Field';
import { Form } from './Form';
import { Group } from './Group';
import Input from './components/Input';
import Dump from './components/Dump';

const [disabled, setDisabled] = React.useState(false);

const handleInvalid = (errorFields) => {
  alert(
    errorFields.map(({ errors = [] }) =>
      errors.map((err) => (err && err.message) || err),
    ),
  );
};

const handleSubmit = (values) => {
  alert(JSON.stringify(values));
};

const validate = (context, value) => {
  if (!value) {
    throw 'username is required';
  }
};

<Form disabled={disabled} onInvalid={handleInvalid} onSubmit={handleSubmit}>
  <Field path="username" validate={validate}>
    <Input placeholder="username" />
  </Field>
  <button type="submit">submit</button>
</Form>;
```

### 自定义控件

使用 `<Group />` `<Field />` 自定义表单控件

```tsx
import { Field } from './Field';
import { Form } from './Form';
import { Group } from './Group';
import { useGroupContext } from './GroupContext';
import Dump from './components/Dump';
import Input from './components/Input';
import Step from './components/Step';

function Number(props) {
  const { value, onChange } = props;
  return (
    <Group value={value} onChange={onChange}>
      <Field path="value">
        <Step step={-1}>-</Step>
      </Field>
      <Field path="value">
        <Input />
      </Field>
      <Field path="value">
        <Step step={1}>+</Step>
      </Field>
    </Group>
  );
}

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

<Demo />;
```

### 布局

TODO

1. 内置表单布局实现
2. 

### 数据展示模式
