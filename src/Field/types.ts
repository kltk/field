import { Assign } from 'kltk-observable/dist/types';
import { GroupContext } from '../Group/types';
import { NamePath } from '../types';

export type FieldMeta<Value = any> = {
  sym: symbol;
  path?: NamePath;
  initial?: Value;
  value?: Value;

  control?: React.ReactNode;
  validate?: () => void | Promise<void>;
  errors?: (string | Error)[];
};

export type FieldContext = Assign<
  GroupContext,
  {
    hasValue: () => boolean;
    getValue: <Value>() => Value;
    setValue: <Value>(value: Value) => void;
    getMeta: () => FieldMeta;
    updateMeta: (changed: Partial<FieldMeta>) => void;
  }
>;