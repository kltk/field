import { Assign } from 'kltk-observable/dist/types';
import { GroupContext } from '../Group/types';
import { CastArray } from '../types';

export type FieldPath = CastArray<keyof any>;

export type FieldSpec = symbol | FieldPath;

export type FieldValidate<Value = any> = (
  context: FieldContext,
  value: Value,
) => void | Promise<void>;

export type FieldRender = (context: FieldContext, meta: any) => React.ReactNode;

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

export type FieldContext<Value = any> = Assign<
  GroupContext,
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
