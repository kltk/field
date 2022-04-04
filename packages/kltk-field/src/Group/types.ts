import { Observable } from 'kltk-observable';
import { FieldError, FieldMeta, FieldPath, FieldRender, FieldSpec } from '../Field/types'; // prettier-ignore
import { UniArrObj } from '../types';

export type EventType = 'change' | 'invalid' | 'submit';

export type GroupState<Value = any, Options = {}> = {
  initial: Value;
  value: Value;
  render?: FieldRender<Options>;
  options?: Options;
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
  getFieldErrors: (spec: FieldSpec) => FieldError[];
  setFieldErrors: (spec: FieldSpec, errors: FieldError[]) => void;

  updateField: (spec: FieldSpec, meta: Partial<FieldMeta>) => void;
  validateFields: (specs?: FieldSpec[]) => void | Promise<void>;
  getFieldsValue: (paths?: UniArrObj<FieldPath>) => any;
  hasFieldValue: (path: FieldPath) => boolean;
  registerField: (field: FieldMeta) => () => void;
  unregisterField: (field: FieldMeta) => void;
};

type GroupContextHook<State, Options> = {
  useSelector: <Return>(
    getter: (state: GroupState<State, Options>) => Return,
  ) => Return;
  useEvent: (type: EventType, listener?: Function) => void;
  useFieldValue: <Value>(path: FieldPath) => Value;
  useFieldsValue: (paths?: UniArrObj<FieldPath>) => any;
};

export type GroupContext<Value = any, Options = {}> = Observable<
  GroupState<Value, Options>
> &
  GroupContextEmitter &
  GroupMethods &
  GroupContextHook<Value, Options>;
