import { ControlProps } from 'kltk-field';
import React from 'react';

type RadioProps = ControlProps & { options: any[] };

function Radio(props: RadioProps) {
  const { options, value, onChange } = props;
  return (
    <>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            checked={value === option.value}
            value={option.value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </>
  );
}

export default Radio;
