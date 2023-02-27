export type NonNullableProps<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};
