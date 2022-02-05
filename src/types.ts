export type CastArray<T> = T | T[];

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};
