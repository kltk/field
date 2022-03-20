import React from 'react';

type StepProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> & {
  step: number;
  onChange?: (changed?: number) => void;
};

function Step(props: StepProps) {
  const { step = 1, value = 0, onChange, ...rest } = props;
  const onClick = () => onChange?.(step + (value ? Number(value) : 0));
  return <button type="button" {...rest} onClick={onClick} />;
}

export default Step;
