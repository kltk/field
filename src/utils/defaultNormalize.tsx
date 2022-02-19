import { get, has } from 'lodash';
import { InputChangeEvent } from '../types';

export function defaultNormalize<Value>(
  e?: Value | InputChangeEvent,
): Value | undefined {
  // 支持 html 事件
  const key = get(e, 'target.type') === 'checkbox' ? 'checked' : 'value';
  const value = has(e, 'target') ? get(e, ['target', key]) : e;
  return value;
}
