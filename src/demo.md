### Basic Usage

```tsx
import { Field } from './Field';
import { Form } from './Form';
import { Group } from './Group';
import { useGroupContext } from './GroupContext';

function Input(props) {
  const { value = '', ...rest } = props;
  return <input value={value} {...rest} />;
}

const context = useGroupContext();
const [state, setState] = React.useState();

<>
  <Form
    context={context}
    onChange={(values) => console.log('change', values)}
    onReset={() => console.log('reset')}
    onSubmit={(values) => setState(values)}
  >
    <Field path="username">
      <Input placeholder="username" />
    </Field>
    <Field path="password">
      <Input type="password" placeholder="password" />
    </Field>
    <button type="submit">submit</button>
    <button type="reset">reset</button>
  </Form>
  <div>{JSON.stringify(state)}</div>
</>;
```
