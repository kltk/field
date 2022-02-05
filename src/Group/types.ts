import { Observable } from 'kltk-observable';
import { FieldMeta, FieldPath } from '../Field/types';

export type EventType = 'change' | 'invalid' | 'submit';

export type GroupOptions = {
  /** 禁用表单，支持 `disabled` 的控件会被禁用 */
  disabled?: boolean;
};

export type GroupState<T = any, O = GroupOptions> = {
  initial?: T;
  value?: T;
  options?: O;
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
  hasFieldValue: (path: FieldPath) => boolean;
  getFieldValue: <Value>(path: FieldPath) => Value;
  setFieldValue: <Value>(path: FieldPath, value: Value) => void;

  registerField: (key: symbol) => () => void;
  unregisterField: (key: symbol) => void;

  getFieldsMeta: (syms?: symbol[]) => FieldMeta[];
  setFieldMeta: (key: symbol, meta: FieldMeta) => void;
};

type GroupContextHook<State> = {
  useSelector: <Return>(getter: (state: State) => Return) => Return;
  useEvent: (type: EventType, listener?: Function) => void;
};

export type GroupContext<S = any> = Observable<GroupState<S>> &
  GroupContextEmitter &
  GroupMethods &
  GroupContextHook<GroupState<S>>;
