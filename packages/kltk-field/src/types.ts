import React from 'react';
import { FieldError } from './Field';

export type CastArray<T> = T | T[];

export type UniArrObj<T> = Record<keyof any, T> | T[];

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};

export type RenderOptions = {
  disabled?: boolean;
  trigger?: string;
  normalize?:
    | string
    | (<Value>(e?: Value | InputChangeEvent) => Value | undefined);
  valueName?: string;
};

export type LayoutOptions = {
  layout?: string | null;
  required?: boolean;
  label?: string;
  colon?: boolean;
  description?: string;
  errors?: FieldError[];
};
