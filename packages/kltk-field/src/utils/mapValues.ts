import { map as mapArray, mapValues as mapObject } from 'lodash';
import { UniArrObj } from '../types';

export function mapValues<T, R>(obj: UniArrObj<T>, callback: (item: T) => R) {
  if (Array.isArray(obj)) {
    return mapArray(obj, callback);
  }
  return mapObject(obj, callback);
}
