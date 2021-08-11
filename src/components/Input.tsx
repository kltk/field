import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  const { value = '', ...rest } = props;
  return <input value={value} {...rest} />;
}

export default Input;
