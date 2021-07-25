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
const [errorFields = [], setErrorFields] = React.useState();

<>
  <Form
    context={context}
    onChange={(values) => console.log('change', values)}
    onReset={() => console.log('reset')}
    onInvalid={(errors) => {
      setErrorFields(errors);
    }}
    onSubmit={(values) => {
      setErrorFields([]);
      setState(values);
    }}
  >
    <Field
      path="username"
      validate={(field, value) => {
        if (!value) {
          throw new Error('username is required');
        }
      }}
    >
      <Input placeholder="username" />
    </Field>
    <Field path="password">
      <Input type="password" placeholder="password" />
    </Field>
    <button type="submit">submit</button>
    <button type="reset">reset</button>
  </Form>
  {errorFields.length ? (
    <ol>
      {errorFields.map((m, index) =>
        m.errors.map((err, index2) => (
          <li key={`${index}-${index2}`}>{(err && err.message) || err}</li>
        )),
      )}
    </ol>
  ) : (
    <div>{JSON.stringify(state)}</div>
  )}
</>;
```
