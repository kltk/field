import { get, has } from 'lodash';
import React from 'react';
import { InputChangeEvent } from '../types';
import { cloneNode } from '../utils/cloneNode';
import { nop } from '../utils/nop';
import { FieldContext } from './types';

export function defaultNormalize<Value>(e: Value | InputChangeEvent) {
  // 支持 html 事件
  const key = get(e, 'target.type') === 'checkbox' ? 'checked' : 'value';
  const value = has(e, 'target') ? get(e, ['target', key]) : e;
  return value;
}

export function defaultRender<Value>(context: FieldContext, props: any) {
  const { children, value, disabled } = props;
  const { normalize = defaultNormalize } = props;
  const { trigger = 'onChange', valueName = 'value' } = props;
  const originTrigger = get(children, ['props', trigger], nop);

  function onChange(e: Value | InputChangeEvent) {
    let value;
    if (normalize instanceof Function) {
      value = normalize(e);
    } else if (typeof normalize === 'string') {
      value = get(e, normalize);
    } else {
      value = e;
    }
    context.setValue(value);

    // 支持控件原来的回调
    originTrigger(e);
  }

  const newProps = {
    [trigger]: onChange,
    [valueName]: value,
    ...(disabled === undefined || disabled === null ? {} : { disabled }),
  };
  return cloneNode(children, newProps);
}