import { Observable } from 'kltk-observable';
import { FieldMeta } from '../Field/types';
import { NamePath } from '../types';

export type EventType = 'change' | 'invalid' | 'submit';

export type GroupState<T = any> = {
  initial?: T;
  value?: T;
  disabled?: boolean;
  meta: FieldMeta[];
};

type GroupContextEmitter = {
  on: (type: EventType, listener: Function) => () => void;
  off: (type: EventType, listener?: Function) => void;
  emit: (type: EventType, ...rest: any[]) => void;
  reset: () => void;
  validate: () => void | Promise<void>;
  submit: () => void | Promise<void>;
};

type GroupMethods = {
  hasFieldValue: (path: NamePath) => boolean;
  getFieldValue: <Value>(path: NamePath) => Value;
  setFieldValue: <Value>(path: NamePath, value: Value) => void;

  registerField: (sym: symbol) => () => void;
  unregisterField: (sym: symbol) => void;

  getFieldsMeta: (syms?: symbol[]) => FieldMeta[];
  setFieldMeta: (sym: symbol, meta: FieldMeta) => void;
};

export type GroupContext<S = any> = Observable<GroupState<S>> &
  GroupContextEmitter &
  GroupMethods;
