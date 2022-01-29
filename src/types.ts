type CastArray<T> = T | T[];

export type NamePath = CastArray<string | number>;

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};
