import { Observable } from 'kltk-observable';
import { FieldMeta, FieldPath, FieldSpec } from '../Field/types';
import { RenderOptions, UniArrObj } from '../types';

export type EventType = 'change' | 'invalid' | 'submit';

export type GroupState<T = any, O = RenderOptions> = {
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
  getField: (spec: FieldSpec) => FieldMeta | undefined;
  setField: (spec: FieldSpec, meta: FieldMeta) => void;
  getFieldValue: <Value>(path: FieldPath) => Value;
  setFieldValue: <Value>(path: FieldPath, value: Value) => void;
  getFieldErrors: (spec: FieldSpec) => (string | Error)[];
  setFieldErrors: (spec: FieldSpec, errors: (string | Error)[]) => void;

  updateField: (spec: FieldSpec, meta: Partial<FieldMeta>) => void;
  validateFields: (specs?: FieldSpec[]) => void | Promise<void>;
  getFieldsValue: (paths?: UniArrObj<FieldPath>) => any;
  hasFieldValue: (path: FieldPath) => boolean;
  registerField: (field: FieldMeta) => () => void;
  unregisterField: (field: FieldMeta) => void;
};

type GroupContextHook<State> = {
  useSelector: <Return>(getter: (state: State) => Return) => Return;
  useEvent: (type: EventType, listener?: Function) => void;
  useFieldValue: <Value>(path: FieldPath) => Value;
  useFieldsValue: (paths?: UniArrObj<FieldPath>) => any;
};

export type GroupContext<S = any> = Observable<GroupState<S>> &
  GroupContextEmitter &
  GroupMethods &
  GroupContextHook<GroupState<S>>;
