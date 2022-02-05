export type CastArray<T> = T | T[];

export type UniArrObj<T> = Record<keyof any, T> | T[];

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};
