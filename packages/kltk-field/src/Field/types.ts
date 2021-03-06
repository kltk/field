import { Assign } from 'kltk-observable/dist/types';
import { GroupContext } from '../Group/types';
import { CastArray } from '../types';

export type FieldPath = CastArray<keyof any>;

export type FieldSpec = symbol | FieldPath;

export type FieldValidate<Value, Options> = (
  context: FieldContext<Value, Options>,
  value: Value,
) => void | Promise<void>;

export type FieldRender<O extends { dependValues?: any }, Value = any> = (
  context: FieldContext<Value, O>,
  meta: O,
) => React.ReactNode;

export type FieldMeta<Value = any> = {
  /** 一个字段同时有多个控制组件时用于关联状态和组件 */
  key: symbol;
  path?: FieldPath;
  initial?: Value;
  value?: Value;

  control?: React.ReactNode;
  validate?: () => void | Promise<void>;
  errors?: (string | Error)[];
};

export type FieldContext<Value = any, Options = {}> = Assign<
  GroupContext<any, Options>,
  {
    getMeta: () => FieldMeta;
    setMeta: (changed: FieldMeta) => void;
    getValue: () => Value;
    setValue: (value: Value) => void;
    getErrors: () => (string | Error)[];
    setErrors: (errors: (string | Error)[]) => void;
    updateMeta: (changed: Partial<FieldMeta>) => void;
    validate: () => void;
    hasValue: () => boolean;
    useMeta: () => FieldMeta;
    useValue: () => Value;
    useErrors: () => (string | Error)[];
    unregister: () => void;
  }
>;
