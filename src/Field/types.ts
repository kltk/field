import { Assign } from 'kltk-observable/dist/types';
import { GroupContext } from '../Group/types';
import { CastArray } from '../types';

export type FieldPath = CastArray<keyof any>;

export type FieldSpec = symbol | FieldPath;

export type FieldValidate<Value = any> = (
  context: FieldContext,
  value: Value,
) => void | Promise<void>;

export type FieldMeta<Value = any> = {
  key: symbol;
  path?: FieldPath;
  initial?: Value;
  value?: Value;

  control?: React.ReactNode;
  validate?: () => void | Promise<void>;
  errors?: (string | Error)[];
};

export type FieldContext<Value = any> = Assign<
  GroupContext,
  {
    getMeta: () => FieldMeta;
    getValue: () => Value;
    setValue: (value: Value) => void;
    updateMeta: (changed: Partial<FieldMeta>) => void;
    hasValue: () => boolean;
  }
>;
