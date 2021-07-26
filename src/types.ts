import { Observable } from 'kltk-observable';
import { Assign } from 'kltk-observable/dist/types';

type CastArray<T> = T | T[];

export type EventType = 'change' | 'invalid' | 'submit';

export type NamePath = CastArray<string | number>;

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};

export type FieldMeta<Value = any> = {
  sym: symbol;
  path?: NamePath;
  initial?: Value;
  value?: Value;

  control?: React.ReactNode;
  validate?: () => void | Promise<void>;
  errors?: (string | Error)[];
};

export type GroupState<T = any> = {
  initial?: T;
  value?: T;
  disabled?: boolean;
  meta: FieldMeta[];
};

export type GroupContext<S = any> = Observable<GroupState<S>> & {
  on: (type: EventType, listener: Function) => () => void;
  off: (type: EventType, listener?: Function) => void;
  emit: (type: EventType) => void;

  hasFieldValue: (path: NamePath) => boolean;
  getFieldValue: <Value>(path: NamePath) => Value;
  setFieldValue: <Value>(path: NamePath, value: Value) => void;

  registerField: (sym: symbol) => () => void;
  unregisterField: (sym: symbol) => void;

  getFieldsMeta: (syms?: symbol[]) => FieldMeta[];
  setFieldMeta: (sym: symbol, meta: FieldMeta) => void;

  reset: () => void;
  validate: () => void | Promise<void>;
  submit: () => void | Promise<void>;
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
