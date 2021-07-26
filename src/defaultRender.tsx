import { get, has } from 'lodash';
import React from 'react';
import { FieldContext } from './types';
import { cloneNode } from './utils/cloneNode';
import { nop } from './utils/nop';

export function defaultRender<Value>(context: FieldContext, meta: any) {
  const { control, value, disabled } = meta;
  const { onChange: originOnChange = nop } = get(control, 'props') || {};

  function onChange(e: Value | React.ChangeEvent<HTMLInputElement>) {
    // 支持 html 事件
    const key = get(e, 'target.type') === 'checkbox' ? 'checked' : 'value';
    const value = has(e, 'target') ? get(e, ['target', key]) : e;
    context.setValue(value);

    // 支持控件原来的回调
    originOnChange(e);
  }

  return cloneNode(control, { value, onChange, disabled });
}
