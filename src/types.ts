export type CastArray<T> = T | T[];

export type UniArrObj<T> = Record<keyof any, T> | T[];

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ControlProps<T = any> = {
  value?: T;
  onChange?: (changed?: T) => void;
};

export type RenderOptions = {
  disabled?: boolean;
  trigger?: string;
  valueName?: string;
  normalize?: <Value>(e?: Value | InputChangeEvent) => Value | undefined;
};
