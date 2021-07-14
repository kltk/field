import { Observable } from 'kltk-observable';

type CastArray<T> = T | T[];

export type EventType = 'change' | 'submit';

export type NamePath = CastArray<string | number>;

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};

export type FieldMeta<Value = any> = {
  path: NamePath;
  initial?: Value;
  value?: Value;

  control?: React.ReactNode;
};

export type GroupState<T = any> = {
  initial?: T;
  value?: T;
};

export type GroupContext<S = any> = Observable<GroupState<S>> & {
  on: (type: EventType, listener: Function) => () => void;
  off: (type: EventType, listener?: Function) => void;
  emit: (type: EventType) => void;

  hasFieldValue: (path: NamePath) => boolean;
  getFieldValue: <Value>(path: NamePath) => Value;
  setFieldValue: <Value>(path: NamePath, value: Value) => void;

  reset: () => void;
  submit: () => void | Promise<void>;
};

export type FieldContext = GroupContext & {
  hasValue: () => boolean;
  getValue: <Value>() => Value;
  setValue: <Value>(value: Value) => void;
};
