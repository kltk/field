import { defaults, get, has } from 'lodash';
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
  const { key, path, initial, value, errors, ...rest1 } = props;
  const { normalize = defaultNormalize, ...rest2 } = rest1;
  const { trigger = 'onChange', valueName = 'value', ...rest3 } = rest2;
  const { depends, dependValues, children, ...rest4 } = rest3;
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
  };
  defaults(newProps, children.props, rest4);
  return cloneNode(children, newProps);
}
