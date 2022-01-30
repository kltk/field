export type CastTypeFn<T> = <U extends T>(data: U) => U;
export function castType<T>(data: T) {
  return data;
}
