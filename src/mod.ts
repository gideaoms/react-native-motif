import { TextStyle, ViewStyle, ImageStyle } from 'react-native'

type Style = TextStyle & ViewStyle & ImageStyle

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type GET<T, K extends keyof T, U extends keyof T[K]> = {
  readonly get: (
    variant: (U extends 'true' | 'false' ? boolean : U) | undefined
  ) => T[K][U] | undefined
}

export type VariantProps<T> = {
  [K in keyof T]?:
  keyof T[K] extends 'true' | 'false' ? boolean : Exclude<keyof T[K], 'get'>
}

export function styled<
  const T extends { [V in keyof Style]: { [Y in string]: Style[V] } },
  K extends keyof T,
  U extends keyof T[K]
>(config: T) {
  const keys = Object.keys(config) as K[]
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: {
      ...config[key],
      get: function (variant: U | undefined) {
        if (variant === undefined) {
          return undefined
        }
        return config[key][variant]
      },
    },
  }), {} as Prettify<Record<K, Prettify<T[K] & GET<T, K, U>>>>)
}
